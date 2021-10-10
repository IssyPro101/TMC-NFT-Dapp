// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract TamaNFT is ERC721, Ownable, ERC721Enumerable, ERC721URIStorage {

  using Strings for uint256;

  mapping(uint => address) public nftOwners;
  uint public saleStart;
  uint public nftsSale;
  uint public price = 25000000000000000;
  string public baseURI = "http://ipfs.infura.io/ipfs/QmThMfr6aW1CqruWaKgxwEFC1fT2vHAV8V9FATFFHFiV5B/";

  mapping(address => uint) amountMinted;

  uint public MAX_MINT = 10000;
  uint public MAX_INDI_MINT = 20;
  

  address[] public airdropTo = [0x92579f9b193a1d41aE65fbf187b6adb058F583cF,
                                0x498b49E51aaE848b1fF7B1F1c56330c5241D8f85,
                                0x5daf1d7271b9eaA4BDBED253314B293bc8Ea3d1F,
                                0xA684BdF5DB1b316202F91fDA2D590B2d538D8eaa,
                                0xEDc681F89333fab7c7dde19dB2a40c4390A05d46,
                                0x4E55D9aa0C8A9464c2A63cF3D0818fe09fC9e17b,
                                0x82372e5EF6648331a8Dbce24D55DD305fB5d9ee3,
                                0x732657B1746a95d82c80E8512E3A11B48acfd169,
                                0x699ce2Ca25FA89226C6d441fBA8377dd90bA3E4A,
                                0xD7779bb0e52E60413147Df10eb5F6C52fFda1AD1,
                                0x62756de5B5A170417c716695918F2253fF901bB8,
                                0xC03fe5A6a856adcb1b2A1f3080D44888F47385CD,
                                0x48f46281777fb384b89EcDFBca3283ba304d6207,
                                0x531ab8B3aE8E6777c7054Fc1939f54e910d0bB78,
                                0x7b05829b90a6E7928b81bC419B171179d4B4201b];
  bool airdropped = false;

  constructor(uint _saleStart) ERC721("Tama Monster Club", "TAMA") {
    saleStart = _saleStart;

    for (uint256 i = 0; i < 25; i++) {
      _safeMint(0x51b03278E8FdC2C3F123d0e460BB8f942E4a9FCf, totalSupply()+1);
    }
  }

  function setSaleStart(uint _newStart) public onlyOwner {
    saleStart = _newStart;
  }

  function changeMaxMint(uint _newMax) public onlyOwner {
    MAX_MINT = _newMax;
  }

  function changeMaxIndividualMint(uint _newMax) public onlyOwner {
    MAX_INDI_MINT = _newMax;
  }

  function setPrice(uint _newPrice) public onlyOwner {
    price = _newPrice;
  }

  function mint(uint _mintAmount) public payable {
    require(block.timestamp >= saleStart, "Sale has not started.");
    require((amountMinted[msg.sender] + _mintAmount) <= MAX_INDI_MINT, "You have already minted 20 NFTs.");
    require(msg.value >= price*_mintAmount, "You have not payed enough to mint");

    payable(owner()).transfer(msg.value);

    if(!airdropped) {
      for (uint i = 0; i < airdropTo.length; i++) {
        _safeMint(airdropTo[i], totalSupply()+1);
      }
      airdropped = true;
    }

    amountMinted[msg.sender] += _mintAmount;
    for (uint i = 0; i < _mintAmount; i++) {
      _safeMint(msg.sender, totalSupply()+1);
    }
  }
  
  function _beforeTokenTransfer(address from, address to, uint256 tokenId)
      internal
      override(ERC721, ERC721Enumerable)
  {
      super._beforeTokenTransfer(from, to, tokenId);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
      super._burn(tokenId);
  }

  function setBaseURI(string memory baseURI_) public onlyOwner {
      baseURI = baseURI_;
  }

  function _baseURI() internal view override returns (string memory) {
      return baseURI;
  }

  function tokenURI(uint256 tokenId)
      public
      view
      override(ERC721, ERC721URIStorage)
      returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), ".json"))
        : "";
  }

  function supportsInterface(bytes4 interfaceId)
      public
      view
      override(ERC721, ERC721Enumerable)
      returns (bool)
  {
      return super.supportsInterface(interfaceId);
  }

  receive () payable external {}

  fallback () external {}

}