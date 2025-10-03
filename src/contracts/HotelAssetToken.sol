// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

contract HotelAssetToken is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

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

    mapping(uint256 => HotelAsset) public hotelAssets;
    mapping(address => uint256[]) public ownerTokens;

    event HotelAssetMinted(
        uint256 indexed tokenId, address indexed owner, string name, string location, uint256 totalValue
    );

    event HotelAssetTransferred(uint256 indexed tokenId, address indexed from, address indexed to);

    constructor() ERC721("HotelVest Asset Token", "HVAT") {}

    function mintHotelAsset(
        address to,
        string memory name,
        string memory location,
        string memory hotelType,
        uint256 totalValue,
        uint256 rooms,
        uint256 rating,
        string memory uri
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

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

    function transferFrom(address from, address to, uint256 tokenId) public override(ERC721, IERC721) {
        // slither-disable-next-line erc20-unchecked-transfer
        super.transferFrom(from, to, tokenId);

        hotelAssets[tokenId].currentOwner = to;
        _removeTokenFromOwner(from, tokenId);
        ownerTokens[to].push(tokenId);

        emit HotelAssetTransferred(tokenId, from, to);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data)
        public
        override(ERC721, IERC721)
    {
        super.safeTransferFrom(from, to, tokenId, data);

        hotelAssets[tokenId].currentOwner = to;
        _removeTokenFromOwner(from, tokenId);
        ownerTokens[to].push(tokenId);

        emit HotelAssetTransferred(tokenId, from, to);
    }

    function getHotelAsset(uint256 tokenId) public view virtual returns (HotelAsset memory) {
        require(ownerOf(tokenId) != address(0), "HotelAssetToken: Token does not exist");
        return hotelAssets[tokenId];
    }

    function getOwnerTokens(address owner) public view returns (uint256[] memory) {
        return ownerTokens[owner];
    }

    function updateHotelValue(uint256 tokenId, uint256 newValue) public onlyOwner {
        require(ownerOf(tokenId) != address(0), "HotelAssetToken: Token does not exist");
        hotelAssets[tokenId].totalValue = newValue;
    }

    function toggleHotelActive(uint256 tokenId) public onlyOwner {
        require(ownerOf(tokenId) != address(0), "HotelAssetToken: Token does not exist");
        hotelAssets[tokenId].isActive = !hotelAssets[tokenId].isActive;
    }

    function getTotalHotelAssets() public view virtual returns (uint256) {
        return _tokenIdCounter.current();
    }

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
