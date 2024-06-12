const express = require('express');
const bcrypt = require('bcrypt');
const Employee = require('../models/employee');
const router = express.Router();

router.post('/employees', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, phoneNumber, address } = req.body;
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
    res.json({ success: false, message: 'Error adding employee', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
