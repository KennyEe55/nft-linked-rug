// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";


contract RugPayment is Ownable {
    event Payment(
        address indexed from,
        uint256 amount
    );
    uint256 public _minPrice = 0.20 ether;

    function payment () public payable {
        require (msg.value >= _minPrice, "Ether sent is not enough!");
        emit Payment (msg.sender, msg.value);
    }

    function withdraw () public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance; 
        (bool sent, ) = _owner.call{value: amount}("");
        require (sent, "Failed to send Ether");
    }

    receive() external payable {}
    fallback() external payable {}
}
