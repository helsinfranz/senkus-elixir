// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract KingdomOfScienceBlueprint is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    address public gameController;

    constructor(
        address initialOwner
    ) ERC721("Kingdom of Science Blueprint", "KOSB") Ownable(initialOwner) {}

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://rose-permanent-cricket-557.mypinata.cloud/ipfs/bafkreibhb5zs6qv5fhhie7fphrnii2hexkiahxdan3jms7atnxffywbgea";
    }

    modifier onlyGame() {
        require(msg.sender == gameController, "Only game controller can mint");
        _;
    }

    function setGameController(address _controller) external onlyOwner {
        gameController = _controller;
    }

    function safeMint(address to) public onlyGame {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _baseURI());
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
