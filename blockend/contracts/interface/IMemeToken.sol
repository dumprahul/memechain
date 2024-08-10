// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.0;


interface IMemeToken{
    function releaseTokens(address _receiver, uint256 _amount) external;

    function balanceOf(address _user) external view returns(uint256);
}