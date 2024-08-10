// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

error NotAuthorized(address caller);

contract Aura is ERC20 {

    address public core;

    constructor(address _core)
        ERC20("Aura", "AUR")
    {
        core=_core;
    }

    modifier onlyCore{
        if(msg.sender != core) revert NotAuthorized(msg.sender);
        _;
    }

    function mintTokens(address _receiver, uint256 _amount) external onlyCore{
        _mint(_receiver, _amount);
    }
}