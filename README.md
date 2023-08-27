# Stakeholder Aggregator

This project implements an MQTT data handling system that saves received data into chunks. It connects to an MQTT broker, processes incoming messages, and uploads the data to IPFS. The IPFS Content Identifiers (CIDs) are then stored on an Ethereum smart contract.

## Data Flow Diagrams
To better understand the data flow within the Stakeholder Aggregator, refer to the following diagrams:

- **Level 0 DFD:** ![Stakeholder Aggregator Level 0 DFD](https://github.com/BlockOasis/dataFlowDiagrams/blob/main/stakeholder-aggregator-level-0.svg)
  
- **Level 1 DFD:** ![Stakeholder Aggregator Level 1 DFD](https://github.com/BlockOasis/dataFlowDiagrams/blob/main/stakeholder-aggregator-level-1.svg)

## Directory Structure

The project directory is organized as follows:

- **[src](src/README.md)**: Contains the main source code files for the MQTT data handling system.
  - **[mqtt](src/utils/README.md):** Contains the files related to MQTT communication and data handling.
  - **[data](src/data/README.md):** Contains the files related to data processing.
  - **[smartcontract](src/smartcontract/README.md):** Contains the Solidity smart contract code and compiled contract artifacts.
  - **[utils](src/utils/README.md):** Contains utility files used throughout the application.
  - **[index.js](src/README.md):** The main entry point of the application.
  
- `config.json`: Configuration file with various settings for the application.
- `Dockerfile`: Dockerfile for containerization of the application.
- `package.json`: Node.js package file specifying dependencies and scripts.
- **[IoTSimulator](https://github.com/BlockOasis/IoTSimulator):** An external repository simulating data and acting as the MQTT broker for testing.


## Installation and Setup

1. Clone the repository to your local machine using Git:

```shell
git clone https://github.com/BlockOasis/stakeholderAggregator.git
cd stakeholderAggregator
```

2. Install the project dependencies:

```shell
npm install
```

3. Update the `config.json` file with your specific configuration settings. Provide the necessary private keys, API credentials, contract address, and other parameters.

## Running the Application

### Option 1: Using Node.js

To start the MQTT data handling system, run the following command:

```shell
npm start
```


The application will connect to the MQTT broker (IoT Simulator) specified in the `config.json` file, handle incoming data messages, and upload data chunks to IPFS. The IPFS CIDs will be stored on the Ethereum smart contract.

### Option 2: Using Docker

1. Make sure you have Docker installed on your system.

2. Build the Docker image using the provided Dockerfile:

```shell
docker build -t stakeholderaggregator .
```

3. Run the application in a Docker container:

```shell
docker run -d --name stakeholderaggregator-app stakeholderaggregator
```


The application will be running inside the Docker container, connecting to the MQTT broker (IoT Simulator) and handling incoming data messages as before.

## Important Notes

- Ensure that the IoT Simulator (acting as the MQTT broker) is set up and running for simulating data to test the MQTT data handling system.

- Take care of sensitive information such as private keys and API secrets. Avoid committing them to version control and keep them secure.

- For production deployments, consider securing your MQTT broker, IPFS service, and Ethereum smart contracts, and follow best practices for handling and storing sensitive data.
