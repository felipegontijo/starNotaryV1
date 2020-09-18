// SPDX-License-Identifier: MIT
pragma solidity >=0.4.24 <0.8.0;

contract StarNotary {

    string public starName;
    address public starOwner;

    event starClaimed(address owner);
    event nameChanged(string name);

    constructor() public {
        starName = "Awesome Udacity Star";
    }

    function claimStar() public {
        starOwner = msg.sender;
        emit starClaimed(msg.sender);
    }

    function changeName(string memory newName) public {
        starName = newName;
        emit nameChanged(newName);
    }

}