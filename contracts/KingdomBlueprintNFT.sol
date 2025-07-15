// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract KingdomBlueprintNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    address public gameController;

    constructor(
        address initialOwner
    ) ERC721("Kingdom of Science Blueprint", "KOSB") Ownable(initialOwner) {}

    modifier onlyGame() {
        require(msg.sender == gameController, "Only game controller can mint");
        _;
    }

    function setGameController(address _controller) external onlyOwner {
        gameController = _controller;
    }

    function mintTo(address to) external onlyGame {
        _tokenIdCounter.increment();
        uint256 newId = _tokenIdCounter.current();
        _safeMint(to, newId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://rose-permanent-cricket-557.mypinata.cloud/ipfs/bafybeie7iiiwjxkucnzb2ut7fdmellhp7rmuicp3ubxbqia2wvzpoqeloe";
    }
}
