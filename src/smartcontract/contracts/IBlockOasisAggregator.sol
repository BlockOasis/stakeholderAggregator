// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Interface for DataAccumulation Contract
 * @dev Interface for the functions in the DataAccumulation contract.
 * This interface abstracts the functionalities of the DataAccumulation contract.
 */
interface IStakeholderAggregator {
    /**
     * @dev Emitted when data is stored in the contract
     */
    event DataStored(uint256 indexed timestamp, string cid);

    /**
     * @notice Adds a new aggregator role to an address.
     * @dev Grants AGGREGATOR_ROLE to a provided address.
     * @param aggregator The address to be granted the aggregator role.
     */
    function addAggregator(address aggregator) external;

    /**
     * @notice Adds a new admin role to an address.
     * @dev Grants DEFAULT_ADMIN_ROLE to a provided address.
     * @param newAdmin The address to be granted the admin role.
     */
    function addAdmin(address newAdmin) external;

    /**
     * @notice Stores the given data associated with a timestamp.
     * @dev Stores the IPFS CID corresponding to a timestamp.
     * @param timestamp The unique timestamp associated with the data.
     * @param cid The IPFS CID of the data to be stored.
     */
    function storeData(uint256 timestamp, string calldata cid) external;

    /**
     * @notice Retrieves the IPFS CID associated with a given timestamp.
     * @param timestamp The timestamp for which to retrieve the data.
     * @return The IPFS CID associated with the given timestamp.
     */
    function getDataByTimestamp(uint256 timestamp) external view returns (string memory);

    /**
     * @notice Retrieves the timestamp associated with a given IPFS CID.
     * @param cid The IPFS CID for which to retrieve the timestamp.
     * @return The timestamp associated with the given IPFS CID.
     */
    function getTimestampByCid(string calldata cid) external view returns (uint256);

    /**
     * @notice Pauses the contract, preventing certain actions.
     * @dev Can only be called by an address with the DEFAULT_ADMIN_ROLE.
     */
    function pause() external;

    /**
     * @notice Unpauses the contract, allowing actions to be performed again.
     * @dev Can only be called by an address with the DEFAULT_ADMIN_ROLE.
     */
    function unpause() external;
}
