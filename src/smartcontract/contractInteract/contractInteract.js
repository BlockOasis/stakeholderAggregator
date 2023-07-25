const { ethers, InfuraProvider } = require('ethers');
const { abi } = require("../builds/compiledContract.json")
const contractAddress = "0xe50861925D9B886cD1D8dc37415c835f472f9d11"; // Replace with the deployed contract address
const privateKey = "1da8cd43728e610cd6f35f1eeb962288de12485c82218c7e517e4212e9cb4368"; // Replace with the private key of your Ethereum wallet
const infuraProjectId = "b6f5b40911084f30baad1da3cfcd2d7b"; // Replace with your Infura project ID
const infuraAPISecret = "9bc3c76ddb4347b0997bd38c14dce7a5";

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
    const provider = new InfuraProvider("goerli", infuraProjectId, infuraAPISecret);
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const data = await contract.getDataByTimestamp(timestamp);
    console.log('Data:', data);
  } catch (error) {
    console.error('Error getting data from the contract:', error);
  }
}

async function getTimestampByCIDFromContract(ipfsCID) {
  try {
    const provider = new InfuraProvider("goerli", infuraProjectId, infuraAPISecret);
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const timestamp = await contract.getTimestampByCID(ipfsCID);
    console.log('Timestamp by CID:', timestamp);
  } catch (error) {
    console.error('Error getting timestamp by CID from the contract:', error);
  }
}

storeDataToContract(Date.now(), "Qmf7CLcVRnyMPmSzKh7P2sPcinNYos61C93U3QrzVKDeDa")
//getDataByTimestampFromContract(1690239813183)