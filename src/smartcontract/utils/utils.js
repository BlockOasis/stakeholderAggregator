const { ethers, InfuraProvider } = require('ethers');
const { abi } = require("../builds/compiledContract.json")
const contractAddress = "0xe50861925D9B886cD1D8dc37415c835f472f9d11"; // Replace with the deployed contract address
const privateKey = "8516c8e7a31a190f95f64943de4048659ffa7c0880678edd939b94150bfb33c9"; // Replace with the private key of your Ethereum wallet
const infuraProjectId = "b6f5b40911084f30baad1da3cfcd2d7b"; // Replace with your Infura project ID
const infuraAPISecret = "9bc3c76ddb4347b0997bd38c14dce7a5";

async function storeDataToContract(timestamp, ipfsCID) {
  try {
    const provider = new InfuraProvider("goerli", infuraProjectId, infuraAPISecret);
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.storeData(timestamp, ipfsCID);
    const receipt = await tx.wait();
    console.log('Transaction receipt:', receipt);
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