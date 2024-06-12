const express = require('express');
const router = express.Router();
const Medicine = require('../models/medicineArray');
const Invoice = require('../models/Invoice');

router.post('/invoices', async (req, res) => {
    const { customerName, customerAge, paymentType, medicines } = req.body;

    if (!customerName || !customerAge || !paymentType || !medicines || medicines.length === 0) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        let totalAmount = 0;
        const medicineUpdates = medicines.map(async (item) => {
            const medicine = await Medicine.findById(item.medicine);
            if (!medicine) {
                throw new Error(`Medicine with ID ${item.medicine} not found`);
            }
            if (medicine.stock < item.amount) {
                throw new Error(`Insufficient stock for medicine ${medicine.name}`);
            }

            medicine.stock -= item.amount;
            totalAmount += item.amount * medicine.rate;
            await medicine.save();

            return {
                medicine: medicine._id,
                amount: item.amount,
            };
        });

        const updatedMedicines = await Promise.all(medicineUpdates);

        const newInvoice = new Invoice({
            customerName,
            customerAge,
            paymentType,
            medicines: updatedMedicines,
            totalAmount,
        });

        await newInvoice.save();

        res.json(newInvoice);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
      const invoices = await Invoice.find().populate('medicines.medicine');
      res.json(invoices);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
