import React, { useState } from 'react';
import Select from 'react-select';
import './AddProduct.css';
import Invoice from './Invoice';

function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    qty: '',
    price: '',
    total: '',
    discount: 0,
    net: '',
    description: ''
  });

  const [serialNumber, setSerialNumber] = useState(1);
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewProduct((prevProduct) => {
      let updatedProduct = {
        ...prevProduct,
        [name]: value
      };

      if (name === 'qty' || name === 'price') {
        const newTotal = parseInt(updatedProduct.qty) * parseInt(updatedProduct.price);
        updatedProduct = {
          ...updatedProduct,
          total: newTotal
        };
      }

      if (name === 'discount') {
        const newNet = parseInt(updatedProduct.total) - (parseInt(updatedProduct.total) * (parseInt(value) / 100));
        updatedProduct = {
          ...updatedProduct,
          discount: value,
          net: newNet
        };
      }

      return updatedProduct;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSerialNumber((prevSerialNumber) => prevSerialNumber + 1);
    setProducts((prevProducts) => [...prevProducts, newProduct]);

    setNewProduct({
      name: '',
      qty: '',
      price: '',
      total: '',
      discount: 0,
      net: '',
      description: ''
    });
  };

  const deleteProduct = (index) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });
  };

  const { name, qty, price, description, total, discount, net } = newProduct;
  const productSuggestions = [
    { label: 'Medium Pipe', value: 'Medium Pipe' },
    { label: 'Large Pipe', value: 'Large Pipe' },
    { label: 'Small Pipe', value: 'Small Pipe' },
    { label: 'Steel Rod', value: 'Steel Rod' },
    { label: 'Iron Sheet', value: 'Iron Sheet' },
    { label: 'LED Bulb', value: 'LED Bulb' },
    // Add more product suggestions here
  ];

  return (
    <>
      <div className="sales-container">
        <div className="header">
          <h1 className="main-heading">
            Haji Hanif Electric Sanitary & Fancy Light Store
          </h1>
          <h2 className="secondary-heading">
            28-B Commercial Sector C Bahria Town Lahore, Pakistan
          </h2>
          <h3 className="third-heading">
            Mobile No. Abid Jutt 0343-4573908 M. Rasheed 0301-4128554
          </h3>
        </div>
      </div>
      <div className="form-container">
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-2">
              <label>Serial Number</label>
              <input type="text" className="form-control" value={serialNumber} readOnly />
            </div>
            <div className="form-group col-md-7">
              <label>Product Name</label>
              <Select
                options={productSuggestions}
                value={productSuggestions.find((option) => option.value === name)}
                onChange={(selectedOption) => handleChange({ target: { name: 'name', value: selectedOption.value } })}
                placeholder="Product Name"
              />

            </div>
            <div className="form-group col-md-4">
              <label htmlFor="amount">Quantity</label>
              <input
                type="number"
                className="form-control"
                name="qty"
                placeholder="Quantity"
                value={qty}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="Price"
                value={price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Total</label>
              <input type="number" className="form-control" value={total} readOnly />
            </div>
            <div className="form-group col-md-2">
              <label>Discount</label>
              <input
                type="number"
                className="form-control"
                name="discount"
                placeholder="Discount"
                value={discount}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Net</label>
              <input type="number" className="form-control" value={net} readOnly />
            </div>
            <div className="form-group col-md-5">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Description"
                value={description}
                onChange={handleChange}
              />
            </div>
            <input type="submit" className="btn btn-primary mr-2" value="Add Product" />
          </div>
        </form>
      </div>
      
      <div className="product-list-container">
        <Invoice products={products} deleteProduct={deleteProduct} />
      </div>
    </>
  );
}

export default AddProduct;



