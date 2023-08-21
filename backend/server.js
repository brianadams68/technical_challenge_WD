const express = require('express');
const phonesData = require('./data/phones.json');

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON data
app.use(express.json());

// Route to get all phones
app.get('/phones', (req, res) => {
  res.json(phonesData);
});

// Route to get phone details by ID
app.get('/phones/:id', (req, res) => {
  const phoneId = req.params.id;
  const phone = phonesData.find(phone => phone.id === phoneId);

  if (!phone) {
    res.status(404).json({ error: 'Phone not found' });
  } else {
    res.json(phone);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});