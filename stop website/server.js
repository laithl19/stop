const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Use bodyParser middleware to parse JSON data
app.use(bodyParser.json());

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service here
  auth: {
    user: 'stopinamman@gmail.com', // Your email address
    pass: '1234123412341234', // Your email password
  },
});

// Endpoint to receive order data and send email notification
app.post('/send-order-notification', (req, res) => {
  const orderData = req.body;

  // Create the email message
  const mailOptions = {
    from: 'stopinamman@gmail.com',
    to: 'stopinamman@gmail.com', // Replace with your email
    subject: 'New Order Notification',
    html: `
      <h2>New Order</h2>
      <p>Name: ${orderData.name}</p>
      <p>Email: ${orderData.email}</p>
      <p>Mobile Number: ${orderData.mobile}</p>
      <p>Order Details: ${orderData.order}</p>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
