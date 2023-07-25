// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StakeholderAggregator {
  struct Data {
    address sender;
    string ipfsCID;
  }

  mapping(uint256 => Data) private dataMap;

  event DataStored(address indexed sender, uint256 indexed timestamp, string ipfsCID);

  function storeData(uint256 timestamp, string memory ipfsCID) external {
    require(dataMap[timestamp].sender == address(0), "Data already exists for this timestamp");
    
    dataMap[timestamp] = Data(msg.sender, ipfsCID);
    emit DataStored(msg.sender, timestamp, ipfsCID);
  }

  function getDataByTimestamp(uint256 timestamp) external view returns (address sender, string memory ipfsCID) {
    Data memory data = dataMap[timestamp];
    require(data.sender != address(0), "No data found for this timestamp");
    
    return (data.sender, data.ipfsCID);
  }

  function getTimestampByCID(string calldata ipfsCID) external view returns (address sender, uint256 timestamp) {
    uint256 length = block.timestamp;
    for (uint256 i = 0; i <= length; i++) {
      Data memory data = dataMap[i];
      if (keccak256(bytes(data.ipfsCID)) == keccak256(bytes(ipfsCID))) {
        return (data.sender, i);
      }
    }
    revert("No data found for this IPFS CID");
  }
}
