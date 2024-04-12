import express from "express";
import { sendMailPolicy } from "../policies/MailPolicy";
import { sendMail } from "../controllers/MailController";

const router = express.Router();

router.post("/send", sendMailPolicy, sendMail);

export default router;
