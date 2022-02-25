// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Basic{
    uint a = 10;
    address public contractOwner = msg.sender;

    function getA() public view returns(uint aVal){
        return a;
    }

    function setA(uint x) public{
        a = x;
    }
}