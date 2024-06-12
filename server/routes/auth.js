const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Superadmin = require('../models/superAdmin');
const Employee = require('../models/employee');
const router = express.Router();

router.post('/login/superadmin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Superadmin.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: 'superadmin' }, "ilskbpqUADGQ812QUWJM223ws", { expiresIn: '1h' });
    res.json({ success: true, message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in', error });
  }
});

router.post('/login/employee', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Employee.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: 'employee' }, "ilskbpqUADGQ812QUWJM223ws", { expiresIn: '1h' });
    res.json({ success: true, message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in', error });
  }
});

module.exports = router;
