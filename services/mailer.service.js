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
  transporter.sendMail({
    from: defaultFrom,
    to: user.email,
    subject: 'Activate your account, human!',
    html: `
      <!DOCTYPE html>
        <html>
        <head>
        </head>
        <body>
          Hello ${user.name}!
          As you may or may not know, robots are taking over the world.
          To make sure you're not one of them, please..
          Activate your account by <a href="${process.env.APP_URL}/users/confirm?token=${user.token}">clicking here</a>
        </body>
        </html>
    `
  })
    .then((info) => console.log(info))
    .catch((error) => console.log(error))
}
