# Security Management Smart Contract

This Solidity smart contract, named `SecurityManagement`, provides a simple role-based access control system for managing user roles within a decentralized application (DApp).

## Features

- Role-based access control system with predefined roles: Admin, Employee, Guest.
- Owner has administrative privileges.
- Events (`RoleAdded` and `RoleRemoved`) to track changes in user roles.
- Functions to add and remove users, and check the role of a specific user.

## Smart Contract Details

### Roles

The contract defines the following roles:

- **Admin**: Full administrative privileges.
- **Employee**: Employee role with specific access rights.
- **Guest**: Limited privileges for guests.
- **None**: Default role, indicating no specific role assigned.

### Functions

1. **`addUser(address _user, string calldata _role)`**: Adds a new user with the specified role. Only the contract owner can execute this function.

2. **`removeUser(address _user)`**: Removes a user and sets their role to None. Only the contract owner can execute this function.

3. **`checkUserRole(address _user) external view returns (string memory)`**: Retrieves the role of a specific user.

### Usage

1. Deploy the contract to the Ethereum blockchain.

2. The contract owner (deployer) is assigned the `Admin` role by default.

3. Use the `addUser` function to grant roles to other addresses.

4. Use the `removeUser` function to revoke roles from addresses.

5. Use the `checkUserRole` function to query the role of a specific address.

## Deployment

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: **npx hardhat node**
4. In the third terminal, type: **npx hardhat run --network localhost scripts/deploy.js**
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

