import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import MailRouter from "./routes/mail";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
//host static files
app.use(express.static("src/public"));

// Routes
app.use("/mail", MailRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
