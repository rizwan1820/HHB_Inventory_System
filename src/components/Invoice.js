import React from 'react';
import './Invoice.css';

function Invoice({ products, deleteProduct }) {
  const calculateNetTotal = () => {
    let netTotal = 0;
    products.forEach((product) => {
      netTotal += parseFloat(product.net);
    });
    return netTotal.toFixed(2); // Display net total with 2 decimal places
  };

  const handleDelete = (index) => {
    deleteProduct(index);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Discount</th>
            <th>Net</th>
            <th>Description</th>
            <th>Action</th> {/* New column for Delete button */}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.qty}</td>
              <td>{product.price}</td>
              <td>{product.total}</td>
              <td>{product.discount}</td>
              <td>{product.net}</td>
              <td>{product.description}</td>
              <td>
                <button className='delete-button'onClick={() => handleDelete(index)}>Delete</button>
              </td> {/* Delete button */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="net-total">
        <strong>Net Total: {calculateNetTotal()}</strong>
      </div>
    </div>
  );
}

export default Invoice;
