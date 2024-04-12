import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
  const { data, error } = await resend.emails.send({
    from: "noreply@pixeldevs.digital",
    to: "antonio@pixeldevs.digital",
    subject: "Idk man seems to work fine",
    html: "<p>Okay done</p>",
  });
  if (error) {
    throw error;
  }
  return data;
}
