// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title Data Accumulation Contract
 * @dev Implements storage and retrieval of data timestamps and IPFS CIDs.
 * This contract utilizes role-based access control for security.
 */
contract StakeholderAggregator is AccessControl, Pausable {
    bytes32 public constant AGGREGATOR_ROLE = keccak256("AGGREGATOR_ROLE");

    // Mapping from timestamp to IPFS CID
    mapping(uint256 => string) private timestampToCid;
    // Mapping from IPFS CID to timestamp
    mapping(string => uint256) private cidToTimestamp;

    /**
     * @dev Emitted when data is stored in the contract.
     */
    event DataStored(uint256 indexed timestamp, string cid);

    /**
     * @dev Sets the deployer as the default admin and grants the aggregator role to the deployer.
     */
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(AGGREGATOR_ROLE, msg.sender); // Optional: Grant aggregator role to deployer
    }

    /**
     * @notice Adds a new aggregator role to an address.
     * @dev Grants AGGREGATOR_ROLE to a provided address.
     * @param aggregator The address to be granted the aggregator role.
     */
    function addAggregator(address aggregator) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");
        grantRole(AGGREGATOR_ROLE, aggregator);
    }

    /**
     * @notice Adds a new admin role to an address.
     * @dev Grants DEFAULT_ADMIN_ROLE to a provided address.
     * @param newAdmin The address to be granted the admin role.
     */
    function addAdmin(address newAdmin) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");
        grantRole(DEFAULT_ADMIN_ROLE, newAdmin);
    }

    /**
     * @notice Stores the given data associated with a timestamp.
     * @dev Stores the IPFS CID corresponding to a timestamp.
     * @param timestamp The unique timestamp associated with the data.
     * @param cid The IPFS CID of the data to be stored.
     */
    function storeData(uint256 timestamp, string memory cid) public onlyRole(AGGREGATOR_ROLE) whenNotPaused {
        timestampToCid[timestamp] = cid;
        cidToTimestamp[cid] = timestamp;

        emit DataStored(timestamp, cid);
    }

    /**
     * @notice Retrieves the IPFS CID associated with a given timestamp.
     * @param timestamp The timestamp for which to retrieve the data.
     * @return The IPFS CID associated with the given timestamp.
     */
    function getDataByTimestamp(uint256 timestamp) public view returns (string memory) {
        return timestampToCid[timestamp];
    }

    /**
     * @notice Retrieves the timestamp associated with a given IPFS CID.
     * @param cid The IPFS CID for which to retrieve the timestamp.
     * @return The timestamp associated with the given IPFS CID.
     */
    function getTimestampByCid(string memory cid) public view returns (uint256) {
        return cidToTimestamp[cid];
    }

    /**
     * @notice Pauses the contract, preventing certain actions.
     * @dev Can only be called by an address with the DEFAULT_ADMIN_ROLE.
     */
    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /**
     * @notice Unpauses the contract, allowing actions to be performed again.
     * @dev Can only be called by an address with the DEFAULT_ADMIN_ROLE.
     */
    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
