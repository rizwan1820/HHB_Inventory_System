import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemInput.css';
import ItemList from './ItemList';

const ItemForm = ({ onItemAdded }) => {
  const [item, setItem] = useState({
    itemCode: '',
    itemName: '',
    totalAmount: '',
    remainingAmount: '',
    price: '',
    salePrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/items', item);
      // Clear the form after successful submission
      setItem({
        itemCode: '',
        itemName: '',
        totalAmount: '',
        remainingAmount: '',
        price: '',
        salePrice: '',
      });
      // Notify the parent component that a new item is added
      onItemAdded(response.data);
    } catch (error) {
      console.error('Failed to add item:', error.message);
    }
  };

  return (
    <div className="item-form-container">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Item Code:</label>
        <input
          type="number"
          name="itemCode"
          value={item.itemCode}
          onChange={handleChange}
          required
        />
        <label>Item Name:</label>
        <input
          type="text"
          name="itemName"
          value={item.itemName}
          onChange={handleChange}
          required
        />
        <label>Total Amount:</label>
        <input
          type="number"
          name="totalAmount"
          value={item.totalAmount}
          onChange={handleChange}
          required
        />
        <label>Remaining Amount:</label>
        <input
          type="number"
          name="remainingAmount"
          value={item.remainingAmount}
          onChange={handleChange}
          required
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={item.price}
          onChange={handleChange}
          required
        />
        <label>Sale Price:</label>
        <input
          type="number"
          name="salePrice"
          value={item.salePrice}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

const ItemInput = () => {
  const [items, setItems] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    // Fetch all items from the server when the component mounts
    axios.get('/items')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch items:', error.message);
      });
  }, []);

  const handleItemAdded = (item) => {
    // Update the items state with the newly added item
    setItems((prevItems) => [...prevItems, item]);
  };

  const handleViewAllClick = () => {
    setViewAll(true);
  };

  return (
    <div className="item-input-container">
      <ItemForm onItemAdded={handleItemAdded} />
      {viewAll ? (
        <ItemList items={items} />
      ) : (
        <button style={{ marginTop:'20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={handleViewAllClick}>View All Items</button>
      )}
    </div>
  );
};

export default ItemInput;
