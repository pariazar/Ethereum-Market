import React, { Component } from 'react';
import LocationPicker from 'react-location-picker';

/* Default position */
const defaultPosition = {
  lat: 35.6892,
  lng: 51.3890
};


class Main extends Component {
  //
  constructor (props) {
    super(props);
    this.state = {
      address: "Tehran",
      position: {
         lat: 0,
         lng: 0
      }
    };

    // Bind
    this.handleLocationChange = this.handleLocationChange.bind(this);
    
  }
  handleLocationChange ({ position, address, places }) {
    // Set new location
    this.setState({ position, address });
    console.log(this.state.lat)
  }

  render() {
    return (
        <div id="content">
          <div class="card bg-dark">
            <div class="card-header"> 
            <h2 class="text-muted">Add Products here....</h2> 
            </div>
            <div class="card-body">
              <form onSubmit={(event) => {
            event.preventDefault()
            const name = this.productName.value;
            const category = this.productCategory.value;
            const lat = this.state.position.lat;
            const lng = this.state.position.lng;
            const owner_address = this.state.address;
            const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether');
            this.props.createProduct(name,category,lat.toString(),lng.toString(),owner_address, price);
          }}>
            <div className="form-group mr-sm-2">
              <input
                id="productName"
                type="text"
                ref={(input) => { this.productName = input }}
                className="form-control"
                placeholder="Product Name"
                required />
            </div>
            <div className="form-group mr-sm-2">
              <input
                id="productCategory"
                type="text"
                ref={(input) => { this.productCategory = input }}
                className="form-control"
                placeholder="Product Category"
                required />
            </div>
            <div className="form-group mr-sm-2">
              <input
                id="productPrice"
                type="text"
                ref={(input) => { this.productPrice = input }}
                className="form-control"
                placeholder="Product Price"
                required />
            </div>


            <div class="card">
              <div class="card-header">Seller's address : please enter your address</div>
              <div class="card-body">
              <div>
              <LocationPicker
                containerElement={ <div style={ {height: '100%'} } /> }
                mapElement={ <div style={ {height: '400px'} } /> }
                defaultPosition={defaultPosition}
                onChange={this.handleLocationChange}
          />
            </div>
              </div>
              <div class="card-footer">
              <h8>{this.state.address}</h8>
              <h5>Lat: {this.state.position.lat}</h5>
              <h5>Lng: {this.state.position.lng}</h5>

              </div>
            </div>
            
            <button type="submit" className="btn btn-primary btn-block">Add Product</button>
          </form>
            </div>
          </div>
        
        <p>&nbsp;</p>
        
        
        <div class="card">
          <div class="card-header bg-dark">
          <h2 class="text-muted">Buy Product</h2>
          </div>
          <div class="card-body">
          <table id="table_id" className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Owner_Address</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
          {this.props.products.map((product,key)=>{
              return(
                <tr key={key}>
                    <th scope="row">{product.id.toString()}</th>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.owner_address}</td>
                    <td>{window.web3.utils.fromWei(product.price.toString(),'Ether')} Eth</td>
                    <td>{product.owner}</td>
                    <td>
                        {!product.purchased
                         ?
                            <button 
                            className="btn btn-primary"
                            name={product.id}
                            value={product.price}
                            onClick={(event)=>{
                                this.props.purchaseProduct(event.target.name,event.target.value);
                            }}
                            >
                            Buy
                            </button>
                        :null}
                    </td>
                </tr> 
              )
          })}
          </tbody>
        </table>

          </div>
        </div>
        
        </div>
    );
  }
}

export default Main;
