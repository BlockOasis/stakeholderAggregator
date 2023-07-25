# BlockOasisAggregator Smart Contract

This directory contains the Solidity smart contract and utility files related to the BlockOasisAggregator contract. The smart contract is deployed on the Goerli test network, and the utility file `contractInteract.js` is used for testing interactions with the deployed contract.

## Files

### 1. `BlockOasisAggregator.sol`

This file contains the Solidity smart contract `StakeholderAggregator`. It includes functions to store data on the contract, retrieve data by timestamp, and get a timestamp by IPFS CID. The contract emits events when data is stored.

### 2. `compile.js`

This script is used to compile the `BlockOasisAggregator.sol` smart contract. It reads the contract code, compiles it using solc (Solidity compiler), and generates the ABI and bytecode required for contract interaction.

### 3. `utils.js`

This utility file provides functions to interact with the deployed `BlockOasisAggregator` contract on the Goerli test network. It uses the ethers library to handle interactions with the contract.

## Interacting with the Contract (For Testing)

The `contractInteract.js` file located in `src/smartcontracts/contractInteract` is used for testing interactions with the deployed contract. Before using this script, make sure to replace the placeholders in the code with actual values:

- `contractAddress`: Replace with the deployed contract address on the Goerli test network.
- `privateKey`: Replace with the private key of your Ethereum wallet.
- `infuraProjectId`: Replace with your Infura project ID.
- `infuraAPISecret`: Replace with your Infura API secret.

The script includes functions for storing data on the contract, retrieving data by timestamp, and getting a timestamp by IPFS CID. The function calls are currently commented out; uncomment them and replace the arguments with appropriate values for testing.

```javascript
// Example usage for testing:
// storeDataToContract(Date.now(), "Qmf7CLcVRnyMPmSzKh7P2sPcinNYos61C93U3QrzVKDeDa");
// getDataByTimestampFromContract(1690239813183);
```

To use this script, you should have Node.js and the required dependencies installed. Run the script using `node contractInteract.js` from the terminal.

Please note that the contract interactions are for testing purposes on the Goerli test network. Make sure you have the necessary test Ether (GOETH) in your wallet to perform contract interactions on the test network.

**Important:** Be cautious with private keys and sensitive information. Do not share private keys or commit them to version control. Always ensure you keep sensitive data secure and confidential.

