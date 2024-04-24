import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
  const createEmail = {
    from: "Contact Form <noreply@pixeldevs.digital>",
    to: to,
    subject: subject,
    html: html,
  };
  const { data, error } = await resend.emails.send(createEmail);
  if (error) {
    throw error;
  }
  return data;
}
