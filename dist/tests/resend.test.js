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
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const resend_1 = require("../src/services/resend"); // Assuming your function is exported from emailSender.ts
// Mock the Resend module
vitest_1.vi.mock('resend', () => {
    return {
        Resend: vitest_1.vi.fn().mockImplementation(() => {
            return {
                emails: {
                    send: vitest_1.vi.fn()
                }
            };
        })
    };
});
(0, vitest_1.describe)('sendEmail function', () => {
    let resendMock;
    (0, vitest_1.beforeEach)(() => {
        // Reset the mock before each test
        resendMock = new (require('resend').Resend)();
        process.env.RESEND_API_KEY = 'test_api_key';
    });
    (0, vitest_1.it)('should send an email successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        // Setup the mock to resolve with specific data
        resendMock.emails.send.mockResolvedValue({
            data: { success: true, message: 'Email sent' },
            error: null
        });
        const result = yield (0, resend_1.sendEmail)('antonio@pixeldevs.digital', 'Subject', '<p>HTML content</p>');
        (0, vitest_1.expect)(result).toEqual({ success: true, message: 'Email sent' });
    }));
    (0, vitest_1.it)('should throw an error when email sending fails', () => __awaiter(void 0, void 0, void 0, function* () {
        // Setup the mock to reject with an error
        resendMock.emails.send.mockResolvedValue({
            data: null,
            error: { message: 'Failed to send email' }
        });
        // We expect the sendEmail function to throw an error
        yield (0, vitest_1.expect)((0, resend_1.sendEmail)('antonio@pixeldevs.digital', 'Subject', '<p>HTML content</p>'))
            .rejects
            .toThrow('Failed to send email');
    }));
    (0, vitest_1.it)('should handle different inputs properly', () => __awaiter(void 0, void 0, void 0, function* () {
        // Here you might want to check how your function handles edge cases like empty strings
        resendMock.emails.send.mockResolvedValue({
            data: { success: true, message: 'Email sent with minimal inputs' },
            error: null
        });
        const result = yield (0, resend_1.sendEmail)('', '', '');
        (0, vitest_1.expect)(result).toEqual({ success: true, message: 'Email sent with minimal inputs' });
    }));
});
