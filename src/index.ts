import express, { Express, Request, Response } from "express";
import { Resend } from "resend";
import dotenv from "dotenv";
import { processTemplate } from "./utils/templates";
import { sendEmail } from "./services/resend";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/", async (req: Request, res: Response) => {
  try {
    const emailData = req.body.email;
    const templateData = req.body.data;
    const htmlToSend = processTemplate(emailData.templateId, templateData);
    const emailResult = sendEmail(emailData.to, emailData.subject, htmlToSend);
    return emailResult;
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
