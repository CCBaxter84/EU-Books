// Import .env file if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import dependencies
import nodemailer from "nodemailer";

// Declare interfaces
interface IProps {
  to: string,
  subject: string,
  text: string;
}

// Declare & export function to send password reset email
export const sendEmail = async function(props: IProps) {
  // Destructure props
  const { to, subject, text } = props;
  console.log("host: ", process.env.EMAIL_HOST);
  // Create nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    },
    secure: true
  });
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Hold on to your butts...");
    }
  });

  // Send the email
  try {
    await transporter.sendMail({
      from: `${process.env.EMAIL_ADDRESS}`,
      to,
      subject,
      text
    });
  } catch(error) {
    console.log(error);
  }
};