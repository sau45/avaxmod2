// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SecurityManagement {
    address public owner;
    
    enum UserRole { None, Admin, Employee, Guest }

    mapping(address => UserRole) public userRoles;

    event RoleAdded(address indexed user, UserRole role);
    event RoleRemoved(address indexed user, UserRole role);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
        userRoles[owner] = UserRole.Admin; 
        emit RoleAdded(owner, UserRole.Admin);
    }

    function addUser(address _user, string calldata _role) external onlyOwner {
        UserRole roleEnum = convertToUserRole(_role);
        userRoles[_user] = roleEnum;
        emit RoleAdded(_user, roleEnum);
    }


    function removeUser(address _user) external onlyOwner {
        UserRole roleToRemove = userRoles[_user];
        require(roleToRemove != UserRole.None, "User not found");
        
        userRoles[_user] = UserRole.None;
        emit RoleRemoved(_user, roleToRemove);
    }

    function checkUserRole(address _user) external view returns (string memory) {
        return convertToString(userRoles[_user]);
    }

    function convertToUserRole(string calldata _role) internal pure returns (UserRole) {
        if (compareStrings(_role, "Admin")) return UserRole.Admin;
        if (compareStrings(_role, "Employee")) return UserRole.Employee;
        if (compareStrings(_role, "Guest")) return UserRole.Guest;
        return UserRole.None;
    }

    function convertToString(UserRole _role) internal pure returns (string memory) {
        if (_role == UserRole.Admin) return "Admin";
        if (_role == UserRole.Employee) return "Employee";
        if (_role == UserRole.Guest) return "Guest";
        return "None";
    }

    function compareStrings(string calldata a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}
