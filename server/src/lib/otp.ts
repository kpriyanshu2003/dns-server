import { config } from "dotenv";
import nodemailer from "nodemailer";
import { ForgotPassword } from "../templates/Forgot-Password";

config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTPHOST,
  port: Number(process.env.SMTPPORT),
  secure: true,
  auth: { user: process.env.SMTPUSER, pass: process.env.SMTPPASS },
} as nodemailer.TransportOptions);

export function generateOTP(n: number) {
  let digits = "0123456789";
  let OTP = "";
  let len = digits.length;
  for (let i = 0; i < n; i++) OTP += digits[Math.floor(Math.random() * len)];
  return OTP;
}

export async function sendOTP(otp: string, user: string) {
  const info: nodemailer.SentMessageInfo = await transporter.sendMail({
    from: '"Webyapar Solutions" <no-reply@webyaparsolutions.com>',
    to: user,
    subject: "Verification OTP",
    html: ForgotPassword(otp, user),
  });
  console.log("Message sent: %s", info.messageId);
}
