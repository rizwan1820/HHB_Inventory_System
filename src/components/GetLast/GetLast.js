import React, { useState, useEffect } from "react";
import './GetLast.css'
import Axios from "axios";

const GetLast = () => {
  const [result, setResult] = useState();

  useEffect(() => {
    Axios.get(`http://localhost:3000/orders/getlast`)
      .then((data) => {
        setResult(data.data);
        console.log(data.data);
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
        console.log("sorry");
      });
  },[]);

  const handlePrint = () => {
    window.print();
    window.location = "/";
  };

  return (
    <div>
      <div className="Home-Page">
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
        <div className="details">
          <div className="orderDetails">
            <span>
              <label>OrderNumber: </label>
              <label>{result && result.billNumber}</label>
            </span>
            <span>
              <label>Date: </label>
              <label>{result && result.createdAt.split("T")[0]}</label>
            </span>
          </div>
          <div className="customerDetails">
            <span>
              <label>Customer Name: </label>
              <label>{result && result.customerName}</label>
            </span>
            <span>
              <label>Customer Ph# </label>
              <label>{result && result.customerPhone}</label>
            </span>
          </div>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Total Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {result &&
              result.Products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.productName}</td>
                  <td>{product.productQuantity}</td>
                  <td>{product.productPrice}</td>
                  <td>{product.productDiscount}</td>
                  <td>{product.productbill}</td>
                  <td>{product.productDescription}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="bottom">
          <div className="net-total">
            <strong>Net Total: {result && result.totalBill}</strong>
          </div>
          <div className="bottom-btns print-hide">
            <button className="save-btn" onClick={handlePrint}>
              Print Invoice
            </button>
            <button className="save-btn" onClick={()=>{window.location = '/'}}>
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetLast