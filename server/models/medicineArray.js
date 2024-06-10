const mongoose= require('mongoose')

const medicineSchema = new mongoose.Schema({
    name: String,
    salt: String,
    manufacturer: String,
    rate: Number,
    expiryDate: String,
    stock: Number,
    shelf: String,
    use: String,
})

const medicineModal= mongoose.model("medicineArray",medicineSchema)
module.exports = medicineModal