// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// this code allows the owner to mint NFTs to the players

contract NFT is ERC721URIStorage {
    uint private _tokenIds;
    // Counters.Counter private _tokenIds;
    // constructore is only called once when the contract is deployed
    // the ERC721 will take in the name and symbol of the NFT 
    constructor() ERC721("VoiceRec", "VP") {}

    // this function will be called when the owner wants to mint an NFT
    // the function should be accessed from the outside of the contract and should return the current token count

    function mint(string memory _tokenURI) external returns (uint256) {
        // increment the token count
        _tokenIds++;
        // get the current token count
        uint256 newItemId = _tokenIds;
        // mint the NFT to the owner
        _safeMint(msg.sender, newItemId);
        // set the token URI
        _setTokenURI(newItemId, _tokenURI);

        return newItemId;
    }
    // this function will return the total supply of the NFTs
    function totalSupply() public view returns (uint256) {
        return _tokenIds;
    }
}