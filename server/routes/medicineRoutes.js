const express = require('express');
const router = express.Router();
const medicineModel = require('../models/medicineArray');

router.post('/addNewMedicine', async (req, res) => {
  const { name, salt, manufacturer, rate, expiryDate, stock, shelf, use } = req.body;

  if (!name || !salt || !manufacturer || !rate || !expiryDate || !stock || !shelf) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  if (parseInt(stock) <= 0 || parseInt(rate) <= 0) {
    return res.status(400).json({ error: 'Stock and Rate should be positive values' });
  }

  const today = new Date().toISOString().split('T')[0];
  if (expiryDate <= today) {
    return res.status(400).json({ error: 'Expiry Date should be a future date' });
  }

  try {
    const alreadyHave = await medicineModel.findOne({ name, salt, manufacturer });

    if (alreadyHave) {
      return res.status(400).json({ error: 'Medicine already exists' });
    }

    const newMedicine = await medicineModel.create({ name, salt, manufacturer, rate, expiryDate, stock, shelf, use });
    res.status(201).json(newMedicine);
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
