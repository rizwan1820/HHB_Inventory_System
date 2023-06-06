import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
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
      <div className="action">
        <h2>Action Buttons</h2>
        <div className="action-btn">
          <button className="add">
            <NavLink to="/addorder">Add new Order</NavLink>
          </button>
          <button className="get-all">
            <NavLink to="/allorders">All Order</NavLink>
          </button>
          <button className="search">
            <NavLink to="/searchorder">Search Order</NavLink>
          </button>
          <button className="search">
            <NavLink to="/getlast">Last Order</NavLink>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
