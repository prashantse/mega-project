// backend/routes/invoices.js
const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Medicine = require('../models/medicineArray');

router.post('/addInvoice', async (req, res) => {
  try {
    const { customerName, customerAge, paymentType, selectedMedicines } = req.body;

    if (!customerName || !customerAge || !paymentType || selectedMedicines.length === 0) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const processedMedicines = await Promise.all(selectedMedicines.map(async (med) => {
      const medicine = await Medicine.findById(med.id);  // Ensure you use `id` to match your front-end
      if (!medicine) throw new Error('Medicine not found');
      const newStock = medicine.stock - med.amount; 

      if (newStock < 0) throw new Error(`Insufficient stock for medicine: ${medicine.name}`);
      medicine.stock = newStock;
      await medicine.save();
      
      return {
        medicine: med.id,
        medicineName: medicine.name,
        amount: med.amount,
        price: medicine.rate,
      };
    }));

    const totalAmount = processedMedicines.reduce((acc, med) => acc + (med.amount * med.price), 0);

    const newInvoice = new Invoice({
      customerName,
      customerAge,
      paymentType,
      medicines: processedMedicines,
      totalAmount,
    });

    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Error saving invoice', error: error.message });
  }
});

router.get('/allInvoices', async (req, res) => {
  try {
    const invoices = await Invoice.find();

    res.json({
      message: 'Invoices found',
      data: invoices
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;
