
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

error TemplateDoesNotExist(uint256 templateId);
error MemeCategoryDoesNotExist(uint256 _memeCategoryId);

import "./MemeToken.sol";
import "./interface/IMemeToken.sol";


contract Memecast{

    struct MemeCategory{
        uint256 _memeCategoryId;
        string name;
        string symbol;
        string metadata;
        address proposedBy;
        address memeTokenAddress;
    }

    struct Template{
        uint256 templateId;
        uint256 _memeCategoryId;
        string metadata;
        address creator;
    }

    struct Meme{
        uint256 memeId;
        uint256 _memeCategoryId;
        uint256 templateId;
        string metadata;
        address creator;
    }
    
    address public owner;
    mapping(uint256=>MemeCategory) public categories;
    mapping(uint256=>Template) public templates;
    mapping(uint256=>Meme) public memes;

    uint256 public categoriesCounter;
    uint256 public templatesCounter;
    uint256 public memesCounter;
    address public aura;

    constructor() {
        owner = msg.sender;
        categoriesCounter=0;
        templatesCounter=0;
        memesCounter=0;
    }

    event MemeCategoryCreated(MemeCategory memeCategory);
    event TemplateCreated(Template template);
    event MemeCreated(Meme meme);
    event MemeTokensClaimed(address receiver, uint256 categoryId, uint256 amount);
    event AuraClaimed(address receiver, uint256 amount);

    modifier onlyOwner {
        if(msg.sender != owner) revert NotAuthorized(msg.sender);
        _;
    }

    function setAuraContract(address _auraContract) external onlyOwner {
        aura=_auraContract;
    }

    function createMemeCategory(string memory name, string memory symbol, string memory metadata) external {
        MemeToken memeToken=new MemeToken(name, symbol, metadata);

        categories[categoriesCounter]=MemeCategory(categoriesCounter, name, symbol, metadata, msg.sender, address(memeToken));

        emit MemeCategoryCreated(categories[categoriesCounter]);
        categoriesCounter+=1;
    }

    function createTemplate(uint256 _memeCategoryId, string memory metadata) external {
        if(_memeCategoryId >= categoriesCounter) revert MemeCategoryDoesNotExist(_memeCategoryId);

        templates[templatesCounter]=Template(templatesCounter, _memeCategoryId, metadata, msg.sender);

        emit TemplateCreated(templates[templatesCounter]);
        templatesCounter +=1;
    }

    function createMeme(uint256 templateId, uint256 _memeCategoryId, string memory metadata) external{
        if(templateId >= templatesCounter) revert TemplateDoesNotExist(_memeCategoryId);

        memes[memesCounter]=Meme(memesCounter, _memeCategoryId, templateId, metadata, msg.sender);

        emit MemeCreated(memes[memesCounter]);
        memesCounter +=1;
    }

    function _claimAuraAndMemeTokens(address _receiver, uint256[] memory _memeCategoryId, uint256[] memory _tokenAmount) external onlyOwner {
        // TODO: Receive cross chain transaction from Base via Hyperlane
        uint256 _auraAmount = 0;
        for(uint256 i=0; i<_memeCategoryId.length; i++){
            if(_memeCategoryId[i] >= categoriesCounter) revert MemeCategoryDoesNotExist(_memeCategoryId[i]);
            IMemeToken(categories[_memeCategoryId[i]].memeTokenAddress).releaseTokens(_receiver, _tokenAmount[i]);
            _auraAmount += _tokenAmount[i];
            emit MemeTokensClaimed(_receiver, _memeCategoryId[i], _tokenAmount[i]);
        }

        IMemeToken(aura).releaseTokens(_receiver, _auraAmount);
        emit AuraClaimed(_receiver, _auraAmount);
    }

    function getAuraBalance(address _user) external view returns(uint256){
        return IMemeToken(aura).balanceOf(_user);
    }

    function memeTokenBalance(address _user, uint256 _memeCategoryId) external view returns(uint256){
        IMemeToken _memeToken = IMemeToken(categories[_memeCategoryId].memeTokenAddress);
        return _memeToken.balanceOf(_user);
    }
}