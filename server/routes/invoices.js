const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice'); // Assuming you have an Invoice model
const Medicine = require('../models/medicineArray'); // Assuming you have a Medicine model

// POST request to save invoice and update medicine stock
router.post('/api/invoices', async (req, res) => {
  try {
    const { customerInfo, selectedMedicines } = req.body;

    // Create new invoice
    const invoice = new Invoice({
      customerInfo,
      selectedMedicines,
      totalAmount: selectedMedicines.reduce((total, item) => {
        return total + (item.selectedMedicine.rate * item.amount);
      }, 0)
    });

    // Save invoice to database
    await invoice.save();

    // Update stock of selected medicines
    await Promise.all(selectedMedicines.map(async (item) => {
      const medicine = await Medicine.findById(item.selectedMedicine._id);
      if (medicine) {
        medicine.stock -= item.amount;
        await medicine.save();
      }
    }));

    res.status(201).json({ message: 'Invoice saved successfully' });
  } catch (error) {
    console.error('Error saving invoice:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
