import React, { useState } from "react";
import "./SearchOrder.css";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const SearchOrder = () => {
  const [orderNumber, setOrderNumber] = useState(0);
  const [result, setResult] = useState([]);

  const search = () => {
    Axios.get(`http://localhost:3000/orders/${orderNumber}`)
      .then((data) => {
        setResult(data.data);
        if(data.data[0]==null)
        {
          Swal.fire('Sorry! No Order Found');
        }
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
        console.log("sorry");
      });
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
      </div>
      <div className="input-section">
        <label>Order Number</label>
        <input
          autoComplete="off"
          required="true"
          type="text"
          className="form-control"
          name="customerPhone"
          placeholder="Customer Phone"
          value={orderNumber}
          onChange={(event) => {
            setOrderNumber(event.target.value);
          }}
        />
      </div>
      <div className="search-btn">
        <button onClick={search}>Search Invoice</button>
      </div>
      <div className={result[0] != null ? "table-container" : "hidden"}>
        <h2>Order Found</h2>
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Customer Name</th>
              <th>Customer Phone</th>
              <th>Date</th>
              <th>Total Bill</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {result &&
              result.map((order, index) => (
                <tr key={index}>
                  <td>{order.billNumber}</td>
                  <td>{order.customerName}</td>
                  <td>{order.customerPhone}</td>
                  <td>{order.createdAt.split("T")[0]}</td>
                  <td>{order.totalBill}</td>
                  <td>
                    <button className="view-button">
                      {" "}
                      <NavLink to={`/order/${order.billNumber}`}>
                        View Order
                      </NavLink>{" "}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchOrder;
