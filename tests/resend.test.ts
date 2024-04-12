import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendEmail } from '../src/services/resend'; // Assuming your function is exported from emailSender.ts

// Mock the Resend module
vi.mock('resend', () => {
  return {
    Resend: vi.fn().mockImplementation(() => {
      return {
        emails: {
          send: vi.fn()
        }
      };
    })
  };
});

describe('sendEmail function', () => {
  let resendMock: { emails: { send: { mockResolvedValue: (arg0: { data: { success: boolean; message: string; } | { success: boolean; message: string; } | null; error: { message: string; } | null; }) => void; }; }; };

  beforeEach(() => {
    // Reset the mock before each test
    resendMock = new (require('resend').Resend)();
    process.env.RESEND_API_KEY = 'test_api_key';
  });

  it('should send an email successfully', async () => {
    // Setup the mock to resolve with specific data
    resendMock.emails.send.mockResolvedValue({
      data: { success: true, message: 'Email sent' },
      error: null
    });

    const result = await sendEmail('antonio@pixeldevs.digital', 'Subject', '<p>HTML content</p>');
    expect(result).toEqual({ success: true, message: 'Email sent' });
  });

  it('should throw an error when email sending fails', async () => {
    // Setup the mock to reject with an error
    resendMock.emails.send.mockResolvedValue({
      data: null,
      error: { message: 'Failed to send email' }
    });

    // We expect the sendEmail function to throw an error
    await expect(sendEmail('antonio@pixeldevs.digital', 'Subject', '<p>HTML content</p>'))
      .rejects
      .toThrow('Failed to send email');
  });

  it('should handle different inputs properly', async () => {
    // Here you might want to check how your function handles edge cases like empty strings
    resendMock.emails.send.mockResolvedValue({
      data: { success: true, message: 'Email sent with minimal inputs' },
      error: null
    });

    const result = await sendEmail('', '', '');
    expect(result).toEqual({ success: true, message: 'Email sent with minimal inputs' });
  });
});
