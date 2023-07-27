import React from 'react';

const ItemList = ({ items }) => {
  return (
    <div className="item-list-container">
      <h2>All Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <p>Item Code: {item.itemCode}</p>
            <p>Item Name: {item.itemName}</p>
            <p>Total Amount: {item.totalAmount}</p>
            <p>Remaining Amount: {item.remainingAmount}</p>
            <p>Price: {item.price}</p>
            <p>Sale Price: {item.salePrice}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
