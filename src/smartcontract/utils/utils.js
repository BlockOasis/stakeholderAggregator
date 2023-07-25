const { ethers, InfuraProvider } = require('ethers');
const { abi } = require("../builds/compiledContract.json");
const config = require("../../../config");


const contractAddress = config.contractAddress; // Replace with the deployed contract address
const privateKey = config.privateKey; // Replace with the private key of your Ethereum wallet
const infuraProjectId = config.infuraProjectId; // Replace with your Infura project ID
const infuraAPISecret = config.infuraAPISecret;



async function storeDataToContract(timestamp, ipfsCID) {
  try {
    const provider = new InfuraProvider("goerli", infuraProjectId, infuraAPISecret);
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.storeData(timestamp, ipfsCID);
    await tx.wait();
    console.log('Data stored on the contract successfully!');
  } catch (error) {
    console.error('Error storing data on the contract:', error);
  }
}

async function getDataByTimestampFromContract(timestamp) {
  try {
    const provider = new ethers.providers.InfuraProvider("goerli", infuraProjectId);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const data = await contract.getDataByTimestamp(timestamp);
    console.log('Data:', data);
  } catch (error) {
    console.error('Error getting data from the contract:', error);
  }
}

async function getTimestampByCIDFromContract(ipfsCID) {
  try {
    const provider = new ethers.providers.InfuraProvider("goerli", infuraProjectId);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const timestamp = await contract.getTimestampByCID(ipfsCID);
    console.log('Timestamp by CID:', timestamp);
  } catch (error) {
    console.error('Error getting timestamp by CID from the contract:', error);
  }
}
module.exports = {
    storeDataToContract,
    getDataByTimestampFromContract,
    getTimestampByCIDFromContract
  };