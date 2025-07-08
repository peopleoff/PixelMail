# PixelMail

A TypeScript-based email sending API service built with Express.js that uses Handlebars templates and the Resend service for reliable email delivery.

## Features

- 🚀 Express.js API with TypeScript
- 📧 Email sending via Resend service
- 🎨 Handlebars template engine for dynamic email content
- ✅ Request validation with Joi
- 🐳 Docker support for easy deployment
- 🧪 Testing with Vitest

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Resend API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PixelMail
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
RESEND_API_KEY=your_resend_api_key_here
PORT=3000
```

### Development

Start the development server with hot reload:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run prod
```

### Running Tests

```bash
npm test
```

## API Documentation

### Send Email

**Endpoint:** `POST /mail/send`

Sends an email to a specified recipient using a predefined template.

#### Request Body

```json
{
    "email": {
        "to": "recipient@example.com",
        "templateId": 2,
        "subject": "Your Subject Here"
    },
    "data": {
        "firstName": "John",
        "customField": "Custom Value"
    }
}
```

#### Request Fields

**email object:**
| Field       | Type   | Description                    | Required |
|-------------|--------|--------------------------------|----------|
| `to`        | string | Recipient's email address      | Yes      |
| `templateId`| number | ID of the email template (1-7) | Yes      |
| `subject`   | string | Email subject line             | Yes      |

**data object:**
Contains template variables. Fields depend on the selected template.

#### Response

```json
{
    "result": "success",
    "id": "28c3366a-7948-4498-893d-b59f652360b0"
}
```

#### Available Templates

| ID | Template                           | File                               |
|----|------------------------------------|------------------------------------|
| 1  | Test Template                      | test.html                          |
| 2  | Basic Template                     | basic.html                         |
| 3  | Contact Form                       | contactForm.hbs                    |
| 4  | Rocket Health Generic              | rocket-health-generic.html         |
| 5  | Rocket Health Contact              | rocket-health-contact.hbs          |
| 6  | Rocket Health Lead Thank You       | rocket-health-lead-thankyou.html   |
| 7  | Rocket Health Profile Request      | rocket-health-profile-request.hbs  |

## Docker

### Using Docker Compose

```bash
docker-compose up --build
```

### Using Docker directly

```bash
docker build -t pixelmail .
docker run -p 3000:3000 --env-file .env pixelmail
```

## Project Structure

```
src/
├── controllers/     # Request handlers
├── policies/        # Validation middleware
├── routes/          # Route definitions
├── services/        # External service integrations
├── utils/           # Utility functions
└── public/          # Static assets

templates/           # Email templates
tests/              # Test files
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests and ensure they pass
6. Submit a pull request

## License

ISC