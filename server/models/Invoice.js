const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerAge: { type: Number, required: true },
  paymentType: { type: String, required: true },
  medicines: [{
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'medicineArray', required: true },
    medicineName: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
