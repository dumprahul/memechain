// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

error NotAuthorized(address caller);

contract MemeToken is ERC20 {

    address public core;
    string public metadata;
    
    constructor(string memory _name, string memory _symbol, string memory _metadata)
        ERC20(name, symbol)
    {
        core=msg.sender;
        metadata=_metadata;
    }

    modifier onlyCore{
        if(msg.sender != core) revert NotAuthorized(msg.sender);
        _;
    }

    function mintTokens(address _receiver, uint256 _amount) external onlyCore{
        _mint(_receiver, _amount);
    }
}