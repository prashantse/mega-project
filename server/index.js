const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const medicineModal = require('./models/medicineArray');
const Invoice = require('./models/Invoice');
const invoiceRoutes = require('./routes/invoices');
// const medicineRoutes = require('./routes/medicineRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const superadminRoutes = require('./routes/superadmin');
const employeeRoutes = require('./routes/employee');
const authRoutes = require('./routes/auth');

app.use('/api/superadmin', superadminRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/invoices', invoiceRoutes);
 
// connectDB(); 

mongoose.connect("mongodb+srv://PrashantSharma:prashant123@cluster007.zrel9cq.mongodb.net/RxRelief")
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
 
// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).send({ success: false, message: 'No token provided.' });
  }
  jwt.verify(token, "ilskbpqUADGQ812QUWJM223ws", (err, decoded) => {
    if (err) {
      return res.status(500).send({ success: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

app.get('/api/v1/getAllmeds',(req,res)=>{
    medicineModal.find({})
   .then(meds =>res.json(meds) )
   .catch(err => res.json(err))
})
app.get('/api/v2/getAllmeds',(req,res)=>{
  medicineModal.find({})
 .then(meds =>res.json({
  message: 'Got all med',
  data: meds
 }) )
 .catch(err => res.json(err))
})
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

app.post("/api/medicines/addNewMedicine",   async (req, res) => {
    const { name, salt, manufacturer, rate, expiryDate, stock, shelf, use } = req.body;
    try {
      // Check if the medicine already exists
      const alreadyHave = await medicineModal.findOne({ name, manufacturer });
      if (alreadyHave) {
        return res.status(409).json({ error: 'Medicine with the same name and manufacturer already exists' });
      }
  
      // Create new medicine
      const newMedicine = await medicineModal.create({ name, salt, manufacturer, rate, expiryDate, stock, shelf, use });
      return res.status(201).json(newMedicine);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error adding medicine'+ err.message });
    }
  });


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


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})