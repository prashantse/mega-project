const express = require('express');
const bcrypt = require('bcrypt');
const Employee = require('../models/employee');
const router = express.Router();

router.post('/addEmployee', async (req, res) => {
  const { username, email, password, firstName, lastName, phoneNumber, address } = req.body;

  // Custom validation
  if (!username || !/^[a-zA-Z0-9]+$/.test(username)) {
    return res.status(400).json({ success: false, message: 'Username is required and can only contain letters and numbers' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'A valid email is required' });
  }
  if (!password || password.length < 8) {
    return res.status(400).json({ success: false, message: 'Password is required and must be at least 8 characters long' });
  }
  if (!firstName) {
    return res.status(400).json({ success: false, message: 'First name is required' });
  }
  if (!lastName) {
    return res.status(400).json({ success: false, message: 'Last name is required' });
  }
  if (!phoneNumber || !/^\d+$/.test(phoneNumber)) {
    return res.status(400).json({ success: false, message: 'Phone number is required and can only contain numbers' });
  }
  if (!address) {
    return res.status(400).json({ success: false, message: 'Address is required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      address,
    });

    await newEmployee.save();
    res.json({ success: true, message: 'Employee added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding employee', error });
  }
});

router.get('/allEmployees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({
      message: 'Employees found',
      data: employees
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
