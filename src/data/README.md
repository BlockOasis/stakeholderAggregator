# Data Directory

This directory contains the files related to data processing and handling.

## Files

### 1. `csvUtils.js`

This utility file provides a function to convert a JavaScript object into a CSV string.

- **Functionality**:
  - `convertToCsv(dataObject)`: Converts the `dataObject` (a JavaScript object) into a CSV string format and returns it.

### 2. `dataHandler.js`

This file handles the incoming MQTT messages and saves the data into chunks. It also uploads the chunks to IPFS and stores the IPFS CIDs on the smart contract.

- **Functionality**:
  - `handleIncomingMessage(topic, message)`: This function is called when a new MQTT message is received. It processes the message, converts it to CSV format, and appends it to the `receivedData` variable. When the `receivedData` exceeds the maximum file size specified in the `config.json` file, it saves the data as a chunk file and uploads it to IPFS. It then stores the IPFS CID on the smart contract using the `storeDataToContract` function from the `utils.js` file.

## Usage

The files in this directory are primarily used by the MQTT data handling system located in the `src/mqtt` directory. The data handler (`dataHandler.js`) is responsible for processing incoming MQTT messages, converting them into CSV format, and saving the data into chunks.

## Important Notes

- Take care of sensitive information such as private keys and API secrets, as some files in this directory may require access to Ethereum smart contracts and IPFS.

- Ensure that the MQTT data handling system in the `src/mqtt` directory is correctly configured and connected to the MQTT broker and IPFS service to enable proper data processing.

- For production deployments, consider securing your MQTT broker, IPFS service, and Ethereum smart contracts, and follow best practices for handling and storing sensitive data.

