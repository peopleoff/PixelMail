"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resend_1 = require("resend");
const dotenv_1 = __importDefault(require("dotenv"));
const templates_1 = require("./utils/templates");
const resend_2 = require("./services/resend");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
// Middleware to parse JSON bodies
app.use(express_1.default.json());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield resend.emails.send({
        from: "noreply@pixeldevs.digital",
        to: "antonio@pixeldevs.digital",
        subject: "Idk man seems to work fine",
        html: "<p>Okay done</p>",
    });
    if (error) {
        res.status(500).json({ error });
    }
    res.json(data);
}));
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const htmlToSend = (0, templates_1.processTemplate)(2, req.body);
        const emailResult = (0, resend_2.sendEmail)("antonio@pixel", "Test", htmlToSend);
        return emailResult;
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
