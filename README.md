# AI & Robotics Summer Workshop Landing Page (MERN Stack)

A modern, production-ready, fully responsive landing page for an educational platform similar to Kidrove, built using React, Express, and MongoDB.

## Features

- **Responsive Design**: Mobile-first grid layouts with custom Tailwind styles.
- **Modern Animations**: Powered by `framer-motion` for sections and interactive states.
- **Client Form Validation**: React Hook Form with custom patterns (Indian mobile format verification).
- **Decoupled API Client**: Clean Axios services communicating with local backend APIs.
- **Backend Schema & Validation**: Express, Mongoose schemas, and error validation through `express-validator` middleware.
- **Persistent Database**: Enquiry data saved directly to a MongoDB collection.

---

## Folder Structure

```
Workshop Landing Page/
│
├── client/                     # React + Vite Frontend
│   ├── src/
│   │   ├── components/         # Modular layout segments
│   │   │   ├── Hero.jsx
│   │   │   ├── WorkshopDetails.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── LearningOutcomes.jsx
│   │   │   ├── Curriculum.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── RegistrationForm.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx        # Landing Page Wrapper
│   │   ├── services/
│   │   │   └── api.js          # Axios API Config
│   │   ├── App.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   └── index.html
│
└── server/                     # Node.js + Express Backend
    ├── config/
    │   └── db.js               # MongoDB Mongoose Connection
    ├── controllers/
    │   └── enquiryController.js # Handle database savings
    ├── middleware/
    │   └── validation.js       # express-validator handler
    ├── models/
    │   └── Enquiry.js          # Mongoose Schema
    ├── routes/
    │   └── enquiryRoutes.js    # Routes definition
    ├── .env                    # Config environment variables
    └── server.js               # Express app bootstrap
```

---

## Default Admin Credentials

For development and administration testing, the database is automatically seeded with a default administrator account:
- **Admin Email**: `admin@workshop.com`
- **Admin Password**: `Admin@12345`

---

## Setup & Running Instructions

### Prerequisites

- Node.js installed locally (v16+)
- MongoDB server running locally (`mongodb://127.0.0.1:27017`) or a cloud MongoDB Atlas cluster link.

### 1. Backend Server Configuration

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. The server configuration variables are in `.env` (a template is available in `.env.example`):
   ```env
   PORT=5001
   MONGODB_URI=mongodb://127.0.0.1:27017/workshop_landing_page
   ```
3. Run the development server (automatically reloads on changes using `nodemon`):
   ```bash
   npm run dev
   ```
   *The server runs on http://localhost:5001*

### 2. Frontend Client Configuration

1. Open a new terminal window and navigate to the client folder:
   ```bash
   cd client
   ```
2. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   *The client runs on http://localhost:5173 (or similar active port)*

---

## API Documentation

### Register Enquiry

- **Endpoint**: `POST /api/enquiry`
- **Content-Type**: `application/json`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210"
}
```

**Validation Rules**:
- `name`: String, required, minimum 3 characters.
- `email`: String, required, valid email format.
- `phone`: String, required, valid 10-digit Indian mobile format (starts with 6-9).

**Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Registration submitted successfully"
}
```

**Error Response (400 Bad Request)**:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "Name is required",
      "path": "name",
      "location": "body"
    }
  ]
}
```
