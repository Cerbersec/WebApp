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
  <p>Hey ${user.username || user.email},</p>
  <p>We heard that you lost your Brantayes password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>–The Brantayes team</p>
  `

  return { from, to, subject, html }
}

const orderConfirmation = (user) => {
  const from = process.env.EMAIL_LOGIN
  const to = user.email_address
  const subject = "Your order has been shipped!"
  const html = `
  <p>Hey ${user.username || user.email},</p>
  <p>We heard that you lost your Brantayes password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>–The Brantayes team</p>
  `

  return { from, to, subject, html }
}

exports.transporter = transporter
exports.getPasswordResetURL = getPasswordResetURL
exports.resetPasswordTemplate = resetPasswordTemplate
exports.orderconfirmation = orderConfirmation