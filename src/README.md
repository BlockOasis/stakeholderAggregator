# Source Code Directory (src)

This directory contains the main source code files for the MQTT data handling system that saves received data into chunks. It includes modules for handling MQTT communication, data processing, interacting with smart contracts, and utility functions.

## Directory Structure

The `src` directory is organized into the following subdirectories and files:

### 1. `mqtt`

This directory contains the files related to MQTT communication and data handling.

- **Files**:
  - `mqttClient.js`: Manages the MQTT client connection and message handling.
  - `mqttConfig.js`: Contains the configuration settings for the MQTT client.
  - `dataHandler.js`: Handles incoming MQTT messages, saves the data into chunks, and uploads them to IPFS.

### 2. `data`

This directory contains the files related to data processing.

- **Files**:
  - `csvUtils.js`: Provides a utility function to convert a JavaScript object into a CSV string.
  - `dataHandler.js`: Handles incoming MQTT messages, saves the data into chunks, and uploads them to IPFS.

### 3. `smartcontract`

This directory contains the files related to the Ethereum smart contract interaction.

- **Subdirectories**:
  - `builds`: Contains the compiled smart contract artifact (`compiledContract.json`) after running the `compile.js` script.
  - `contracts`: Contains the Solidity smart contract code (`BlockOasisAggregator.sol`).
  - `scripts`: Contains the script `compile.js` which compiles the Solidity smart contract code and generates the compiled contract artifact.
  - `utils`: Contains the utility script `utils.js` that provides utility functions to interact with the Ethereum smart contract


### 4. `utils`

This directory contains utility files used throughout the application.

- **Files**:
  - `logger.js`: Provides logging functionality to log various events and messages in the application.

### 5. `index.js`

The main entry point of the application. It initiates the MQTT client and starts the MQTT data handling system.

## Configuration

The configuration settings for the MQTT data handling system, IPFS, and Ethereum smart contract interactions are specified in the `config.json` file. Ensure that the necessary configuration values, such as private keys and API credentials, are correctly set before running the application.

## Usage

To run the MQTT data handling system, follow these steps:

1. Ensure you have Node.js and the required dependencies installed by running `npm install` in the root directory of the project.

2. Update the `config.json` file with your specific configuration settings.

3. Start the MQTT client and data handling system by running `npm start` in the root directory of the project.

4. The system will connect to the MQTT broker, start handling incoming data messages, and upload data chunks to IPFS. The IPFS CIDs will be stored on the Ethereum smart contract.

## Important Notes

- Take care of sensitive information such as private keys and API secrets. Avoid committing them to version control and keep them secure.

- Ensure that the IoT Simulator (acting as the MQTT broker) is set up and running for simulating data to test the MQTT data handling system.

- For production deployments, consider securing your MQTT broker, IPFS service, and Ethereum smart contracts, and follow best practices for handling and storing sensitive data.
