const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp-auth.mailprotect.be',
  port: 465,
  secure: true,
  logger: true,
  debug: true,
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD
  }
})

const getPasswordResetURL = (user, token) => {
  return `${process.env.RESET_URL}/account/recovery/update-password/${user.user_id}/${token}`
}

const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN
  const to = user.email_address
  const subject = "Brantayes: Password Reset"
  const html = `
  <p>Dear ${user.username || user.email},</p>
  <p>We're sorry to hear that you lost your Brantayes password.</p>
  <p>Please use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>The link will expire in 1 hour.</p>
  <p>Kind regards,</p>
  <p></p>
  <p>The Brantayes team</p>
  `

  return { from, to, subject, html }
}

const orderConfirmationTemp = (email) => {
  const from = process.env.EMAIL_LOGIN
  const to = email
  const subject = "Your order has been shipped"
  const html = `
  <p>Dear ${email},</p>
  <p>Your order has been shipped and will arrive as soon as possible.</p>
  <p>Thank you for using the Brantayes webshop and we hope to see you again soon.</p>
  <p>Kind regards,</p>
  <p></p>
  <p>The Brantayes team</p>
  `

  return { from, to, subject, html }
}

exports.transporter = transporter
exports.getPasswordResetURL = getPasswordResetURL
exports.resetPasswordTemplate = resetPasswordTemplate
exports.orderconfirmationTemp = orderConfirmationTemp