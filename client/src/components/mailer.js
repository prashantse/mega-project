// mailer.js

const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Your SMTP host
  port: 587, // Your SMTP port
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your-email@example.com', // Your email address
    pass: 'your-password', // Your email password
  },
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: 'your-email@example.com', // Sender address (must be same as authenticated user)
      to, // List of recipients
      subject, // Subject line
      text, // Plain text body
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
