# StakeholderAggregator Smart Contract

This directory contains the Solidity smart contract and utility files related to the StakeholderAggregator contract. The contract allows storing IPFS content identifiers (CIDs) associated with a user-defined timestamp and has built-in functionality for permissions, ownership, and contract pausing.

## Files

### 1. `StakeholderAggregator.sol`

This file contains the Solidity smart contract `StakeholderAggregator`. The contract has functions to:

- Store an IPFS CID along with a user-defined timestamp.
- Retrieve a stored CID by its associated timestamp.
- Get the user-defined timestamp by a given IPFS CID.

Additionally, the contract allows the owner to:

- Pause and unpause the contract.
- Transfer ownership to a different address.
- Allow or disallow specific addresses to store data on the contract.

An event `DataEvent` is emitted whenever data is stored in the contract.

### 2. `compile.js`

This script compiles the `StakeholderAggregator.sol` smart contract. It uses the solc (Solidity compiler) to generate the ABI and bytecode essential for deploying and interacting with the contract.

### 3. `utils.js`

`utils.js` offers functionalities to communicate with the `StakeholderAggregator` contract. The script uses the ethers.js library to facilitate this communication.

## Interacting with the Contract (For Testing)

You can test interactions with the deployed contract using the `contractInteract.js` script located in `src/smartcontracts/contractInteract`. Before running this script, ensure you replace the placeholders with their respective actual values:

- `contractAddress`: The address of the deployed contract.
- `privateKey`: Your Ethereum wallet's private key.
- `infuraProjectId`: Your Infura project's ID.
- `infuraAPISecret`: Your Infura API secret.

The script has methods for storing data on the contract, retrieving a CID by its timestamp, and obtaining a timestamp by a given CID. By default, these function calls are commented out. Uncomment the desired function and replace the placeholders with suitable values for testing.

```javascript
// Example usage for testing:
// storeDataToContract(1690239813183, "Qmf7CLcVRnyMPmSzKh7P2sPcinNYos61C93U3QrzVKDeDa");
// getDataByTimestampFromContract(1690239813183);
```

Make sure you have Node.js and the necessary dependencies set up to run the script. Execute the script using the command `node contractInteract.js` from your terminal.

Remember that the contract interactions here are meant for testing on a testnet. Ensure you possess enough test Ether (e.g., GOETH) in your wallet for these interactions.

**Caution**: Protect your private keys and other sensitive details. Never disclose private keys publicly or include them in version control. Always handle sensitive data responsibly and securely.

