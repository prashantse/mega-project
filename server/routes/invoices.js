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
    res.status(500).json({ message: error.message });
  }
});

router.get('/getAllInvoices', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const invoices = await Invoice.find().sort({ date: -1 });
    const totalInvoices = await Invoice.countDocuments();

    res.json({
      invoices,
      totalPages: Math.ceil(totalInvoices / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/allInvoices', async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({date: -1});

    res.json({
      message: 'Invoices found',
      data: invoices
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.get('/invoices/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json({ invoice });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ message: 'Failed to fetch invoice' });
  }
});

module.exports = router;
