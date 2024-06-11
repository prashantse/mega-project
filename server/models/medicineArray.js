const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        // unique: true,
        // required: true
    },
    salt: String,
    manufacturer: String,
    rate: Number,
    expiryDate: String,
    stock: Number,
    shelf: String,
    use: String,
})

const medicineModal = mongoose.model("medicineArray", medicineSchema)
module.exports = medicineModal