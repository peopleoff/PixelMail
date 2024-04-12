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
  const { data, error } = await resend.emails.send({
    from: "noreply@pixeldevs.digital",
    to: "antonio@pixeldevs.digital",
    subject: "Idk man seems to work fine",
    html: "<p>Okay done</p>",
  });
  if (error) {
    res.status(500).json({ error });
  }
  res.json(data);
});

app.post("/", async (req: Request, res: Response) => {
  try {
    const htmlToSend = processTemplate(2, req.body);
    const emailResult = sendEmail("antonio@pixel", "Test", htmlToSend);
    return emailResult;
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
