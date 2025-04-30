// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract InventoryManagement is Ownable, ReentrancyGuard {
    struct Product {
        uint256 id;
        string name;
        uint256 quantity;
        uint256 price;
        address supplier;
        uint256 lastRestocked;
        bool active;
    }

    mapping(uint256 => Product) public products;
    mapping(address => bool) public authorizedSuppliers;

    event ProductAdded(uint256 indexed id, string name, uint256 quantity);
    event InventoryUpdated(uint256 indexed id, uint256 newQuantity);
    event SupplierAuthorized(address indexed supplier);

    constructor() Ownable(msg.sender) {}

    function addProduct(
        uint256 _id,
        string memory _name,
        uint256 _quantity,
        uint256 _price,
        address _supplier
    ) external onlyOwner {
        require(!products[_id].active, "Product already exists");
        
        products[_id] = Product({
            id: _id,
            name: _name,
            quantity: _quantity,
            price: _price,
            supplier: _supplier,
            lastRestocked: block.timestamp,
            active: true
        });

        emit ProductAdded(_id, _name, _quantity);
    }

    function updateInventory(uint256 _id, uint256 _newQuantity) 
        external 
        nonReentrant 
    {
        require(products[_id].active, "Product does not exist");
        require(
            msg.sender == owner() || authorizedSuppliers[msg.sender],
            "Unauthorized"
        );

        products[_id].quantity = _newQuantity;
        products[_id].lastRestocked = block.timestamp;

        emit InventoryUpdated(_id, _newQuantity);
    }

    function authorizeSupplier(address _supplier) external onlyOwner {
        authorizedSuppliers[_supplier] = true;
        emit SupplierAuthorized(_supplier);
    }
}