const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  customerInfo: {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    paymentType: { type: String, required: true }
  },
  selectedMedicines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' }],
  medicineAmounts: { type: Object, required: true } // Assuming medicineAmounts is an object with medicine IDs as keys and amounts as values
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
