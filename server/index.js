const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const medicineModal = require('./models/medicineArray');
const Invoice = require('./models/Invoice');
const invoiceRoutes = require('./routes/invoices');

const app = express();
app.use(cors());
app.use(express.json());
 
// connectDB(); 

mongoose.connect("mongodb+srv://PrashantSharma:prashant123@cluster007.zrel9cq.mongodb.net/RxRelief")

app.use('/api/invoices', invoiceRoutes);
app.get("/",(req, res) => {
    medicineModal.find({})
  .then(meds =>res.json(meds) )
  .catch(err => res.json(err))
})
app.get('/getmeds/:id', (req, res) =>{
    const id = req.params.id;
    medicineModal.findById({_id:id})
    .then(meds =>res.json(meds) )
    .catch(err => res.json(err))
})

// app.post("/generateBill", (req, res) =>{
//     const id = req.params.id;
//     const {name, age, paymentType} = req.body;
//     const billdetails = Invoice.create({
//         customerInfo:{
//             name:name,
//             age:age,
//             paymentType:paymentType
//         },
//         selectedMedicines:req.body.selectedMedicines,
//         medicineAmounts:req.body.medicineAmounts,
//         totalAmount:req.body.totalAmount
//     })
//     billdetails.save()
//    .then(meds =>res.json(meds) )
// });

app.put("/api/updatemedicine/:id",(req, res) => {
    const id = req.params.id;
    medicineModal.findByIdAndUpdate({_id:id},
        {  name:req.body.name,
            salt:req.body.salt,
            manufacturer:req.body.manufacturer,
            rate:req.body.rate,
            expiryDate:req.body.expiryDate,
            stock:req.body.stock,
            shelf:req.body.shelf,
            use:req.body.use,
        }).then(meds =>res.json(meds) )
        .catch(err => res.json(err))
})

app.post("/api/addNewmedicine",(req, res) => {
    medicineModal.create(req.body)
    .then(medicineArray =>res.json(medicineArray) )
    .catch(err => res.json(err))
})

app.post("/api/generateInvoice", (req, res) => {
    invoiceModel.create(req.body)
        .then(invoice => res.json(invoice))
        .catch(err => res.json(err));
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})