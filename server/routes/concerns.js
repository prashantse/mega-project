// routes/concerns.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { getMaxListeners } = require('../models/Invoice');

// POST /api/concerns - Create a new concern and send email to admin
router.post('/concerns', async (req, res) => {
  const { employeeName, subject, concern } = req.body;

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Your SMTP server host
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'karan8888mca@gmail.com', // Your email account
      pass: 'fumo bdtm gttu aqfe', // Your email password
    },
  });

  // Define email content
  const mailOptions = {
    from: 'karan8888mca@gmail.com', // Sender address
    to: 'prashantd0003@gmail.com',  // List of receivers
    subject: subject, // Subject line (comes from frontend form)
    text: `Employee Name: ${employeeName}\n\nConcern: ${concern}`, // Plain text body
  };

  try {
    // Send email
     transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'Concern submitted successfully' });
  } catch (error) {
    console.error('Error sending concern email:', error);
    res.status(500).json({ message: 'Failed to submit concern' });
  }
});

module.exports = router;
