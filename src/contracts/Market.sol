pragma solidity ^0.5.10;

contract Marketplace{
    string public name;
    uint public productCount = 0;
    mapping(uint=> Product) public products;

    struct Product{
        uint id;
        string name;
        string category;
        string lat;
        string lng;
        string owner_address;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated();

    event ProductPurchased();

    constructor() public {
        name = 'Bazar';
    }

    function createProduct(string memory _name,string memory _category,string memory _lat,string memory _lng,string memory _owner_address, uint _price) public {
        //second parameter in require statement is error...
        require(bytes(_name).length > 0,"statment is incorrect");  //require a valid product name
        require(bytes(_owner_address).length > 0,"invalid address");  //require a valid sellers address
        require(bytes(_lat).length>0 && bytes(_lng).length>0,"invalid product lat and lng");//require a valid sellers address
        require(bytes(_category).length > 0,"statment is incorrect");  //require a valid product category
        require(_price > 0,"statment is incorrect"); //require a valid price
         //underscore denotes the local varialble
        productCount++;
        products[productCount] = Product(productCount,_name,_category,_lat,_lng,_owner_address,_price, msg.sender,false);
        emit ProductCreated();
    }

    function purchaseProduct(uint _id) public payable{
        //fetch the product
        Product memory _product = products[_id];
        address payable _seller = _product.owner;
        require(_product.id>0 && _product.id<=productCount,"invalid product id");
        require(msg.value>=_product.price,"you don't have enough money"); //check there is enough ether in the transaction
        require(!_product.purchased,"product is already purchased");
        require(_seller != msg.sender,"seller should not buy its own products");

        _product.owner = msg.sender;
        _product.purchased = true;
        products[_id] = _product;
        address(_seller).transfer(msg.value);

        emit ProductPurchased();
    }
}