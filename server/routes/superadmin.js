const express = require('express');
const router = express.Router();
const Superadmin = require('../models/superAdmin');
const Employee = require('../models/employee');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, "ilskbpqUADGQ812QUWJM223ws");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};


router.post('/employee', verifyToken, async (req, res) => {
  try {
    if (req.userRole !== 'superadmin') {
      return res.status(403).send({ success: false, message: 'Unauthorized access' });
    }

    const { username, email, password, firstName, lastName, phoneNumber, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      address
    });

    await newEmployee.save();
    res.status(201).send({ success: true, message: 'Employee added successfully' });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error adding employee', error });
  }
});

module.exports = router;
