import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Use your email provider, e.g., Gmail, SendGrid
  auth: {
    user: process.env.NODEMAILER_ID,
    pass: process.env.NODEMAILER_PASS,  // Use an app-specific password or environment variable
  },
});

// Function to send email
export async function sendVerificationEmail(userEmail: string, subject:string, text:string, html:string) {
  
  const mailOptions = {
    from: 'adithya.jaiswal341@gmail.com',  // Your email
    to: userEmail,  // Recipient's email
    subject: subject,
    text: text,
    html: html,  // HTML email body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
