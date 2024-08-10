
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

error TemplateDoesNotExist(uint256 templateId);
error MemeCategoryDoesNotExist(uint256 memeCategoryId);
error NotAuthorized(address caller);

import "./MemeToken.sol";

contract Memecast{

    struct MemeCategory{
        uint256 memeCategoryId;
        string name;
        string symbol;
        string metadata;
        address proposedBy;
        address memeTokenAddress;
        Template[] templates;
        Meme[] memes;
    }

    struct Template{
        uint256 templateId;
        uint256 memeCategoryId;
        string metadata;
        address creator;
    }

    struct Meme{
        uint256 memeId;
        uint256 memeCategoryId;
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

    constructor() {
        owner = msg.sender;
        categoriesCounter=0;
        templatesCounter=0;
        memesCounter=0;
    }

    event MemeCategoryCreated(MemeCategory memeCategory);
    event TemplateCreated(Template template);
    event MemeCreated(Meme meme);

    modifier onlyOwner {
        if(msg.sender != owner) revert NotAuthorized(msg.sender);
        _;
    }

    function createMemeCategory(string memory name, string memory symbol, string memory metadata) external {
        address memeToken=new MemeToken(name, symbol, metadata);

        categories[categoriesCounter]=MemeCategory(categoriesCounter, name, symbol, metadata, msg.sender, memeToken, new Template[](0), new Meme[](0));

        emit MemeCategoryCreated(categories[categoriesCounter]);
        categoriesCoutner+=1;
    }

    function createTemplate(uint256 memeCategoryId, string memory metadata) external {
        if(memeCategoryId >= categoriesCounter) revert MemeCategoryDoesNotExist(memeCategoryId);

        templates[templatesCounter]=Template(templatesCounter, memeCategoryId, metadata, msg.sender);

        emit TemplateCreated(templates[templatesCounter]);
        templatesCounter +=1;
    }

    function createMeme(uint256 templateId, string memory metadata) external{
        if(templateId >= templatesCounter) revert TemplateDoesNotExist(memeCategoryId);

        memes[memesCounter]=Meme(memesCounter, memeCategoryId, templateId, metadata, msg.sender);

        emit MemeCreated(memes[memesCounter]);
        memesCounter +=1;
    }

    function _claimAuraAndMemeTokens(address _receiver, uint256 _auraAmount, uint256[] memory _memeCategoryId, uint256[] memory _tokenAmount) external onlyOwner {
        // TODO: Receive cross chain transaction from Base via Hyperlane

        
    }
}