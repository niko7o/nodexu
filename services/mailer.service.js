const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const defaultFrom = process.env.EMAIL_SENDER

module.exports.confirmSignUp = (user) => {
  // ...
}
