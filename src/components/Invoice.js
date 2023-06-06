import React from "react";
import "./Invoice.css";
import Axios from "axios";
import Swal from "sweetalert2";

function Invoice({ products, deleteProduct, customerName, customerPhone }) {
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

  const addToList = () => {
    if (products[0]) {
      const productsData = products.map((product) => ({
        productName: product.name,
        productPrice: product.price,
        productDescription: product.description,
        productQuantity: product.qty,
        productbill: product.total,
      }));

      const requestData = {
        customerName: customerName,
        customerPhone: customerPhone,
        Products: productsData,
        totalBill: calculateNetTotal(),
      };

      Axios.post("http://localhost:3000/orders", requestData)
        .then((order) => {
          console.log("Success");
          console.log(order);
          window.location = `/order/${order.data.billNumber}`;
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      Swal.fire("Empty Invoice");
    }
  };

  return (
    <div className={products[0] == null ? "hidden" : "table-container"}>
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
                <button
                  className="delete-button"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>{" "}
              {/* Delete button */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bottom">
        <div className="net-total">
          <strong>Net Total: {calculateNetTotal()}</strong>
        </div>
      </div>
      <button className="save-btn" onClick={addToList}>
        Goto Invoice
      </button>
    </div>
  );
}

export default Invoice;
