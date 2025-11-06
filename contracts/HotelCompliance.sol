// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract HotelCompliance is Ownable {
    mapping(address => bool) public isKycApproved;
    address public hotelAssetToken;

    constructor(address _hotelAssetToken) {
        hotelAssetToken = _hotelAssetToken;
    }

    function approveKyc(address user) external onlyOwner {
        isKycApproved[user] = true;
    }

    function checkCompliance(address user) external view returns (bool) {
        return isKycApproved[user];
    }
}
