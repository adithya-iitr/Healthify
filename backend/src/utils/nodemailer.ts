import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',  // Use your email provider, e.g., Gmail, SendGrid
  auth: {
    user: 'adithya.jaiswal341@gmail.com',
    pass: 'pksb fqpb kaiv rjcy',  // Use an app-specific password or environment variable
  },
});

// Function to send email
export async function sendVerificationEmail(userEmail: string, token: string) {
  const verificationLink = `http://localhost:5175/verify-email?token=${token}`;  // Change to your front-end URL
  
  const mailOptions = {
    from: 'adithya.jaiswal341@gmail.com',  // Your email
    to: 'adithya_j@ee.iitr.ac.in',  // Recipient's email
    subject: 'Email Verification',
    text: `Click this link to verify your email: ${verificationLink}`,
    html: `<p>Click this <a href="${verificationLink}">link</a> to verify your email.</p>`,  // HTML email body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}
