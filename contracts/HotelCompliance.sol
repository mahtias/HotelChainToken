// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract HotelCompliance is Ownable {
    mapping(address => bool) public isKYCApproved;
    address public hotelAssetToken;

    constructor(address _hotelAssetToken) {
        hotelAssetToken = _hotelAssetToken;
    }

    function approveKYC(address user) external onlyOwner {
        isKYCApproved[user] = true;
    }

    function checkCompliance(address user) external view returns (bool) {
        return isKYCApproved[user];
    }
}