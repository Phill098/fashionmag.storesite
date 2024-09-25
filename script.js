const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
  bar.addEventListener('click', () =>{
    nav.classList.add('active');
  })
}

if (close) {
  close.addEventListener('click', () =>{
    nav.classList.remove('active');
  })
}
 
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

exports.sendOrder = functions.https.onCall((data, context) => {
  const { orderDetails } = data;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@example.com',
    subject: 'New Order from Fashion Mag',
    text: `Order details:\n\n${JSON.stringify(orderDetails, null, 2)}`
  };

  return transporter.sendMail(mailOptions)
    .then(() => {
      return { success: true };
    })
    .catch(error => {
      console.error('Error sending email: ', error);
      throw new functions.https.HttpsError('unknown', 'Failed to send email', error);
    });
});

document.querySelector('.pro').addEventListener('click', function() {
  var prodetails = document.getElementById('prodetails');
  if (prodetails.style.display === 'none' || prodetails.style.display === '') {
    prodetails.style.display = 'flex';  // Show the product details section
  } else {
    prodetails.style.display = 'none';  // Hide the product details section
  }
});