import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: 'smtp-auth.mailprotect.be',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD
  }
})

export const getPasswordResetURL = (user, token) =>
  `${process.env.HOST}:${process.env.PORT}/password-reset/${user.user_id}/${token}`

export const resetPasswordTemplate = (user, url) => {
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