const nodemailer = require('nodemailer');
require('dotenv').config();

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@apexstudios.com',
    to: to,
    subject: subject,
    text: text,
    html: `<pre>${text}</pre>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('❌ Email error:', error);
    } else {
      console.log('✅ Email sent:', info.response);
    }
  });
};

module.exports = { sendEmail };
