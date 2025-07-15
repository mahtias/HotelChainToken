// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title HotelAssetToken
 * @dev ERC-721 NFT representing ownership of hotel real estate assets
 * Each token represents a unique hotel property with metadata
 */
contract HotelAssetToken is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    struct HotelAsset {
        string name;
        string location;
        string hotelType;
        uint256 totalValue;
        uint256 rooms;
        uint256 rating; // Rating out of 500 (5.00 stars = 500)
        bool isActive;
        address currentOwner;
        uint256 createdAt;
    }
    
    mapping(uint256 => HotelAsset) public hotelAssets;
    mapping(address => uint256[]) public ownerTokens;
    
    event HotelAssetMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string name,
        string location,
        uint256 totalValue
    );
    
    event HotelAssetTransferred(
        uint256 indexed tokenId,
        address indexed from,
        address indexed to
    );
    
    constructor() ERC721("HotelVest Asset Token", "HVAT") {}
    
    /**
     * @dev Mint a new hotel asset NFT
     * @param to Address to receive the NFT
     * @param name Hotel name
     * @param location Hotel location
     * @param hotelType Type of hotel (luxury, business, boutique, etc.)
     * @param totalValue Total value of the hotel in wei
     * @param rooms Number of rooms
     * @param rating Hotel rating (out of 500)
     * @param tokenURI Metadata URI for the NFT
     */
    function mintHotelAsset(
        address to,
        string memory name,
        string memory location,
        string memory hotelType,
        uint256 totalValue,
        uint256 rooms,
        uint256 rating,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        hotelAssets[tokenId] = HotelAsset({
            name: name,
            location: location,
            hotelType: hotelType,
            totalValue: totalValue,
            rooms: rooms,
            rating: rating,
            isActive: true,
            currentOwner: to,
            createdAt: block.timestamp
        });
        
        ownerTokens[to].push(tokenId);
        
        emit HotelAssetMinted(tokenId, to, name, location, totalValue);
        
        return tokenId;
    }
    
    /**
     * @dev Transfer hotel asset NFT
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        super.transferFrom(from, to, tokenId);
        
        // Update hotel asset owner
        hotelAssets[tokenId].currentOwner = to;
        
        // Update owner token arrays
        _removeTokenFromOwner(from, tokenId);
        ownerTokens[to].push(tokenId);
        
        emit HotelAssetTransferred(tokenId, from, to);
    }
    
    /**
     * @dev Safe transfer hotel asset NFT
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override {
        super.safeTransferFrom(from, to, tokenId, data);
        
        // Update hotel asset owner
        hotelAssets[tokenId].currentOwner = to;
        
        // Update owner token arrays
        _removeTokenFromOwner(from, tokenId);
        ownerTokens[to].push(tokenId);
        
        emit HotelAssetTransferred(tokenId, from, to);
    }
    
    /**
     * @dev Get hotel asset details
     */
    function getHotelAsset(uint256 tokenId) public view returns (HotelAsset memory) {
        require(_exists(tokenId), "HotelAssetToken: Token does not exist");
        return hotelAssets[tokenId];
    }
    
    /**
     * @dev Get all tokens owned by an address
     */
    function getOwnerTokens(address owner) public view returns (uint256[] memory) {
        return ownerTokens[owner];
    }
    
    /**
     * @dev Update hotel asset value (only owner)
     */
    function updateHotelValue(uint256 tokenId, uint256 newValue) public onlyOwner {
        require(_exists(tokenId), "HotelAssetToken: Token does not exist");
        hotelAssets[tokenId].totalValue = newValue;
    }
    
    /**
     * @dev Toggle hotel asset active status
     */
    function toggleHotelActive(uint256 tokenId) public onlyOwner {
        require(_exists(tokenId), "HotelAssetToken: Token does not exist");
        hotelAssets[tokenId].isActive = !hotelAssets[tokenId].isActive;
    }
    
    /**
     * @dev Get total number of hotel assets
     */
    function getTotalHotelAssets() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    /**
     * @dev Remove token from owner's token array
     */
    function _removeTokenFromOwner(address owner, uint256 tokenId) internal {
        uint256[] storage tokens = ownerTokens[owner];
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i] == tokenId) {
                tokens[i] = tokens[tokens.length - 1];
                tokens.pop();
                break;
            }
        }
    }
    
    // Override required functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}