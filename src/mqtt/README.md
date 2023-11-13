# MQTT Client

This directory contains the files related to the MQTT data handling system that saves received data into chunks.

## Files

### 1. `mqttClient.js`

This file is responsible for managing the MQTT client connection and message handling. It uses the MQTT library to connect to the MQTT broker, subscribe to a specific topic, and handle incoming messages.

- **Functionality**:
  - `connect(mqttConfig)`: Connects to the MQTT broker specified in the `mqttConfig` object and subscribes to the topic.
  - `onMessage(messageHandler)`: Listens for incoming messages and calls the `messageHandler` function to process them.
  - `disconnect()`: Closes the MQTT connection gracefully on receiving the SIGINT signal (Ctrl+C).

### 2. `mqttConfig.js`

This file contains the configuration settings for the MQTT client. It is used by the `mqttClient.js` file to establish a connection with the MQTT broker.

### 3. `dataHandler.js`

This file handles the incoming MQTT messages and saves the data into chunks. It also uploads the chunks to IPFS and stores the IPFS CIDs on the smart contract.

- **Functionality**:
  - `handleIncomingMessage(topic, message)`: This function is called when a new MQTT message is received. It processes the message, converts it to CSV format, and appends it to the `receivedData` variable. When the `receivedData` exceeds the maximum file size specified in the `config.json` file, it saves the data as a chunk file and uploads it to IPFS. It then stores the IPFS CID on the smart contract using the `storeDataToContract` function from the `utils.js` file.

### 4. `csvUtils.js`

This utility file provides a function to convert a JavaScript object into a CSV string.

- **Functionality**:
  - `convertToCsv(dataObject)`: Converts the `dataObject` (a JavaScript object) into a CSV string format and returns it.

## Configuration

### `config.json`

This configuration file contains various settings for the MQTT data handling system and IPFS interactions. It includes:

- `privateKey`: The private key for interacting with the smart contract and IPFS.
- `infuraProjectId`: The Infura project ID for connecting to the Ethereum network.
- `infuraAPISecret`: The Infura API secret for authenticating API requests.
- `contractAddress`: The contract address of the deployed smart contract on the Ethereum network.
- `web3StorageToken`: The API key for accessing the Web3 Storage service for uploading data to IPFS.
- `mqtt`: MQTT broker configuration with `brokerIp`, `port`, and `topic` settings.
- `maxFileSizeBytes`: The maximum file size (in bytes) for each data chunk before it is uploaded to IPFS.

**Note**: Before running the application, make sure to replace the placeholders in the `config.json` file with the actual values for your setup.


## IoT Simulator

To run the MQTT data handling system, you also need the IoT Simulator, which simulates data and acts as the MQTT broker. The IoT Simulator can be found at the following GitHub repository:

**GitHub Repository**: [BlockOasis/IoTSimulator](https://github.com/BlockOasis/IoTSimulator)

Please follow the instructions in the IoT Simulator repository to set up and run the simulator. The MQTT data handling system will interact with the IoT Simulator to receive simulated data messages.

## Usage

1. Ensure you have Node.js and the required dependencies installed by running `npm install` in the root directory of the project.

2. Update the `config.json` file with your specific configuration settings.

3. Start the MQTT client and data handling system by running `npm start` in the root directory of the project.

4. The system will connect to the MQTT broker and start handling incoming data messages. When the data size exceeds the specified maximum file size, it will create a new chunk file and upload it to IPFS. The IPFS CID will be stored on the smart contract.

## Important Notes

- Make sure you have the necessary permissions and credentials to access the MQTT broker and IPFS service.

- Take care of sensitive information such as private keys and API secrets. Avoid committing them to version control and keep them secure.

- For production deployments, consider securing your MQTT broker and following best practices for interacting with Ethereum smart contracts and IPFS.

