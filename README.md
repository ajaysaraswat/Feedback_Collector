# Feedback Collector Application

A modern, responsive feedback collection system with both frontend and backend components.

## Features

- Clean, responsive UI with dark/light theme support
- Form validation for name, email, and feedback message
- Admin view to see all submitted feedbacks
- Mobile-first design with smooth transitions
- Timestamp tracking for each submission
- Loading states and user-friendly error messages

## Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS for styling
- React Hook Form for form handling
- React Query for data fetching
- Framer Motion for animations

### Backend

- Node.js with Express
- MongoDB for data storage
- JWT for authentication
- CORS enabled for frontend integration

## Project Structure

```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── context/      # React context providers
│   │   └── utils/        # Utility functions
│   └── public/           # Static assets
│
└── server/               # Backend Express application
    ├── controllers/      # Route controllers
    ├── models/          # Database models
    ├── routes/          # API routes
    └── middleware/      # Custom middleware
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Create a `.env` file in the server directory:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the development servers:

   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd client
   npm run dev
   ```

## Deployment

The application can be deployed using various platforms:

### Frontend

- Netlify

### Backend

- Render
