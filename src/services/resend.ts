import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
  const { data, error } = await resend.emails.send({
    from: "noreply@pixeldevs.digital",
    to: to,
    subject: subject,
    html: html,
  });
  if (error) {
    throw error;
  }
  return data;
}
