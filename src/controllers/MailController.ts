import { Request, Response } from "express";
import { processTemplate } from "../utils/templates";
import { sendEmail } from "../services/resend";

export async function sendMail(req: Request, res: Response) {
  try {
    const emailData = req.body.email;
    const templateData = req.body.data;
    const htmlToSend = processTemplate(
      emailData.templateId,
      templateData,
    );
    const emailResult = await sendEmail(
      emailData.to,
      emailData.subject,
      htmlToSend
    );
    if (!emailResult) {
      throw new Error("Failed to send email");
    }
    res.json({ result: "success", id: emailResult.id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
