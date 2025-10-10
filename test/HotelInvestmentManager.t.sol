// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test} from "forge-std/Test.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {HotelInvestmentManager} from "../contracts/HotelInvestmentManager.sol";
import {HotelAssetToken} from "../contracts/HotelAssetToken.sol";
import {HotelCompliance} from "../contracts/HotelCompliance.sol";
import {MockChainlinkPriceOracle} from "./mocks/MockChainlinkPriceOracle.sol";

/// --------------------
/// Mock Contracts
/// --------------------
contract MockHotelAssetToken is HotelAssetToken {
    function ownerOf(uint256 tokenId) public view override(ERC721, IERC721) returns (address) {
        return super.ownerOf(tokenId);
    }
}

/// --------------------
/// Test Contract
/// --------------------
contract HotelInvestmentManagerTest is Test, IERC721Receiver {
    HotelInvestmentManager manager;
    MockHotelAssetToken hotelAssetToken;
    HotelCompliance compliance;
    MockChainlinkPriceOracle priceOracle;

    // Define HotelAsset struct to match HotelAssetToken.sol
    struct HotelAsset {
        string name;
        string location;
        string hotelType;
        uint256 totalValue;
        uint256 rooms;
        uint256 rating;
        bool isActive;
        address currentOwner;
        uint256 createdAt;
    }

    // Implement ERC721Receiver
    function onERC721Received(address, address, uint256, bytes calldata) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function setUp() public {
        hotelAssetToken = new MockHotelAssetToken();
        compliance = new HotelCompliance(address(hotelAssetToken));
        priceOracle = new MockChainlinkPriceOracle(2000 * 10 ** 8); // $2000
        manager = new HotelInvestmentManager(address(hotelAssetToken), address(priceOracle), address(compliance));

        // Mint and approve NFT for testing
        vm.prank(manager.owner());
        uint256 tokenId = hotelAssetToken.mintHotelAsset(
            address(this), "Test Hotel", "Test Location", "Luxury", 1000 ether, 100, 400, "https://example.com/token/1"
        );
        vm.prank(address(this));
        hotelAssetToken.approve(address(manager), tokenId);

        // Approve KYC for tester
        vm.prank(compliance.owner());
        compliance.approveKyc(address(this));
    }

    function testDeployment() public view {
        assertTrue(address(manager) != address(0), "Contract should be deployed");
        assertEq(address(manager.hotelAssetToken()), address(hotelAssetToken), "HotelAssetToken set");
        assertEq(address(manager.priceOracle()), address(priceOracle), "PriceOracle set");
        assertTrue(compliance.checkCompliance(address(this)), "KYC should be approved");
    }
}
