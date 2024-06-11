const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerAge: { type: Number, required: true },
    paymentType: { type: String, required: true },
    medicines: [{
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'medicineArray', required: true },
        amount: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
