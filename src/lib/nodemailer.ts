// Import .env file if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import dependencies
import nodemailer from "nodemailer";
import * as SMTPTransport from "nodemailer/lib/smtp-transport";
import { v4 } from "uuid";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

// Declare interfaces
interface IProps {
  to: string,
  subject: string,
  text: string;
}

const createTransporter = async function() {
  // Create OAuth client
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((error, token) => {
      if (error) {
        reject();
      } else {
        resolve(token);
      }
    });
  });

  // Create nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_ADDRESS,
      accessToken: accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  } as SMTPTransport.Options);
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Hold on to your butts...");
    }
  });
  return transporter;
};

// Declare & export function to send password reset email
export const sendEmail = async function(props: IProps) {
  // Destructure props
  const { to, subject, text } = props;
  try {
    let transporter = await createTransporter();
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

export const createToken = function(): string {
  return v4().toString().replace(/-/g, '');
}