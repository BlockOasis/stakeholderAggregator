// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StakeholderAggregator {
    address private owner;
    bool public paused = false;
    mapping(address => bool) public allowedAddresses;

    struct Data {
        address sender;
        string ipfsCID;
    }

    mapping(uint256 => Data) private dataMap;
    mapping(bytes32 => uint256) private cidToTimestamp;

    event DataEvent(address indexed sender, uint256 indexed timestamp, string ipfsCID);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this");
        _;
    }

    modifier onlyAllowedAddress() {
        require(allowedAddresses[msg.sender], "You are not authorized to call this function");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function storeData(uint256 userTimestamp, string memory ipfsCID) external onlyAllowedAddress whenNotPaused {
        require(dataMap[userTimestamp].sender == address(0), "Data already exists for this timestamp");

        dataMap[userTimestamp] = Data(msg.sender, ipfsCID);
        cidToTimestamp[keccak256(bytes(ipfsCID))] = userTimestamp;
        
        emit DataEvent(msg.sender, userTimestamp, ipfsCID);
    }

    function getDataByTimestamp(uint256 timestamp) external view returns (address sender, string memory ipfsCID) {
        Data memory data = dataMap[timestamp];
        require(data.sender != address(0), "No data found for this timestamp");
        
        return (data.sender, data.ipfsCID);
    }

    function getTimestampByCID(string calldata ipfsCID) external view returns (uint256 timestamp) {
        timestamp = cidToTimestamp[keccak256(bytes(ipfsCID))];
        require(dataMap[timestamp].sender != address(0), "No data found for this IPFS CID");
        
        return timestamp;
    }

    function pause() external onlyOwner {
        paused = true;
    }

    function unpause() external onlyOwner {
        paused = false;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        owner = newOwner;
    }

    function allowAddress(address _address) external onlyOwner {
        allowedAddresses[_address] = true;
    }

    function disallowAddress(address _address) external onlyOwner {
        allowedAddresses[_address] = false;
    }
}
