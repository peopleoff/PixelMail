# Email Sending API Documentation

## Endpoint: Send Email

This endpoint is used to send an email to a specified recipient using a predefined template.

### HTTP Method

`POST`

### URL

`/send-email`

### Request Body

The request body should be a JSON object with two main components: `email` and `data`.

#### `email` object:

| Field       | Type   | Description                                         | Required |
|-------------|--------|-----------------------------------------------------|----------|
| `to`        | string | The recipient's email address.                      | Yes      |
| `templateId`| number | The ID of the email template to use.                | Yes      |
| `subject`   | string | The subject line of the email.                      | Yes      |

#### `data` object:

This object contains any additional data required by the email template. Each key should match a variable in the email template.

| Field       | Type   | Description                                         | Required |
|-------------|--------|-----------------------------------------------------|----------|
| `firstName` | string | The first name of the recipient, used in the email. | No       |

### Example Request

```json
{
    "email": {
        "to": "ruslan@pixeldevs.digital",
        "templateId": 2,
        "subject": "Hello World"
    },
    "data": {
        "firstName": "Ruslan"
    }
}
```

### Example Response

```json
{
    "emailResult": {
        "id": "28c3366a-7948-4498-893d-b59f652360b0"
    }
}
```