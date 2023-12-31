const fs = require("fs");
const path = require("path");
const { convertToCsv } = require("./csvUtils");
const logger = require("../utils/logger");
const config = require("../../config");
const { storeDataToContract } = require("../smartcontract/utils/utils"); // Import the function from the smart contract utils
const { Web3Storage, getFilesFromPath } = require("web3.storage");

const fsPromises = fs.promises; // Add this line to get the 'promises' object from 'fs'

let receivedData = ""; // Variable to store received data as a CSV string
let isFirstLine = true; // Flag to indicate if it's the first line of the received data
let isUploading = false; // Flag to indicate if data is currently being uploaded to IPFS

const web3StorageAPIToken = config.web3StorageToken;

async function uploadToIPFS(chunkFileDirectory) {
  const storage = new Web3Storage({ token: web3StorageAPIToken });
  const files = await getFilesFromPath(chunkFileDirectory);
  var cid = await storage.put(files);
  return cid;
}

async function uploadChunkToIPFS(chunkFileDirectory, timestamp) {
  try {
    const uploadResponse = await uploadToIPFS(chunkFileDirectory);
    // Log the IPFS hash of the uploaded file
    logger.info(`Uploaded chunk to IPFS. IPFS Hash: ${uploadResponse}`);

    // Store the IPFS CID on the smart contract
    await storeDataToContract(uploadResponse, timestamp);
    //logger.info(`Transaction made on contract: ${ethRes}`)
  } catch (err) {
    logger.error(`Error uploading chunk to IPFS: ${err.message}`);
  }
}

async function handleIncomingMessage(topic, message) {
  if (isUploading) {
    // If currently uploading, wait for the upload to finish before processing new data
    await new Promise((resolve) => setTimeout(resolve, 100)); // Add a short delay or use other strategies to avoid busy waiting
    await handleIncomingMessage(topic, message);
    return;
  }

  try {
    isUploading = true;

    const jsonMessage = JSON.parse(message);

    // Add timestampAtAggregator field with the current timestamp in seconds
    jsonMessage.timestampAtAggregator = Math.floor(Date.now() / 1000);

    // Convert the message to a CSV string
    const csvString = convertToCsv(jsonMessage);

    // Check if appending the CSV string would exceed the maximum file size
    const totalSize = receivedData.length + csvString.length;
    if (totalSize >= config.maxFileSizeBytes) {
      // Save the current data as a chunk file with timestamp in the name
      const timestamp = Date.now();
      const chunkFileDirectory = path.join(
        __dirname,
        `../receivedFiles/chunk-${timestamp}`
      );
      const chunkFileName = `chunk-${timestamp}.csv`;
      const chunkFilePath = path.join(chunkFileDirectory, chunkFileName);

      // Create the directory if it doesn't exist (including parent directories)
      try {
        await fsPromises.mkdir(chunkFileDirectory, { recursive: true });
      } catch (error) {
        logger.error(`Error creating chunk directory: ${error}`);
        return;
      }

      // Save the current data as a chunk file
      await fsPromises.writeFile(chunkFilePath, receivedData);
      await uploadChunkToIPFS(chunkFileDirectory, timestamp);
      // Reset isFirstLine flag to true to start writing attribute names in the new file
      isFirstLine = true;

      // Clear receivedData to start receiving new data in the variable
      receivedData = "";
    }

    // Add attribute names as the first line if it's the beginning of the data
    if (isFirstLine) {
      const attributeNames = Object.keys(jsonMessage);
      receivedData += attributeNames.join(",") + "\n";
      isFirstLine = false;
    }

    // Append the CSV string to receivedData
    receivedData += csvString;

    // Log the current state after updating receivedData
    logger.info(`Current state after update:\n${receivedData}`);
  } catch (err) {
    logger.error(`Error processing MQTT message: ${err}`);
  } finally {
    isUploading = false; // Reset the flag after processing the data
  }
}

module.exports = {
  handleIncomingMessage,
};
