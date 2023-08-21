import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/phones');
        setPhones(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  const handlePhoneSelect = (phone) => {
    setSelectedPhone(phone);
  };

  return (
    <div className="App">
      <h1>Phone Catalog</h1>
      {isLoading ? <p>Loading...</p> : null}
      <div className="phone-list">
        {phones.map(phone => (
          <div
            key={phone.id}
            className={`phone-item ${selectedPhone === phone ? 'selected' : ''}`}
            onClick={() => handlePhoneSelect(phone)}
          >
            {phone.name}
          </div>
        ))}
      </div>
      <div className="phone-details">
        {selectedPhone && (
          <div>
            <h2>Phone Details</h2>
            <p>Name: {selectedPhone.name}</p>
            <p>Brand: {selectedPhone.manufacturer}</p>
            <p>Description: {selectedPhone.description}</p>
            <p>Color: {selectedPhone.color}</p>
            <p>Price: ${selectedPhone.price.toFixed(2)}</p>
            <p>Image: {selectedPhone.imageFileName}</p>
            <p>Screen: {selectedPhone.screen}</p>
            <p>Processor: {selectedPhone.processor}</p>
            <p>Ram: {selectedPhone.ram}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
