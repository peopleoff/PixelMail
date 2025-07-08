# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PixelMail is a TypeScript-based email sending API service that uses Handlebars templates and the Resend service for email delivery. The application is built with Express.js and follows a modular MVC architecture.

## Development Commands

```bash
# Development with hot reload
npm run dev

# Run tests
npm test

# Build the project
npm run build

# Run production build
npm run prod
```

## Architecture

### Core Structure
- **Express.js API** with TypeScript
- **Handlebars templating** for dynamic email content
- **Resend service** for email delivery
- **Joi validation** for request validation
- **Vitest** for testing

### Key Directories
- `src/controllers/` - Request handlers (MailController.ts)
- `src/services/` - External service integrations (resend.ts)
- `src/policies/` - Input validation middleware (MailPolicy.ts)
- `src/routes/` - Route definitions (mail.ts)
- `src/utils/` - Template processing utilities
- `templates/` - Handlebars email templates
- `tests/` - Test files

### Email Template System
The application uses a template ID mapping system in `src/utils/templates.ts`:
- Template IDs (1-7) map to specific .html or .hbs files
- Templates support Handlebars syntax for dynamic content
- Template data is passed through the `data` object in requests

### API Endpoint
Main endpoint: `POST /mail/send`
- Requires `email` object (to, subject, templateId)
- Requires `data` object for template variables
- Uses Joi validation via MailPolicy middleware

### Environment Variables
- `RESEND_API_KEY` - Required for email sending
- `PORT` - Server port (defaults to 3000)

## Docker Support
The project includes Docker configuration:
- `Dockerfile` for containerization
- `docker-compose.yml` for orchestration

## Testing
- Uses Vitest testing framework
- Test files in `tests/` directory
- Includes tests for resend service and template processing