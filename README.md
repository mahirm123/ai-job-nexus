
# AI Job Portal with MongoDB

This is a full-stack job portal application with MongoDB as the database backend.

## Requirements

- Node.js
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Getting Started

### Backend Setup

1. Make sure MongoDB is running on your machine or you have a MongoDB Atlas connection string
2. Update the `.env` file with your MongoDB connection string
3. Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

4. Start the server:

```bash
npm start
```

The server will run on http://localhost:5000

### Frontend Setup

1. In the root directory, install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The application will run on http://localhost:5173

## Features

- User authentication (register, login, profile management)
- Job listings with search and filter functionality
- Job applications
- Employer dashboard
- Admin dashboard
- MongoDB database integration

## API Endpoints

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile

### Jobs
- GET /api/jobs - Get all jobs with filters
- GET /api/jobs/:id - Get job by ID
- POST /api/jobs - Create a new job
- POST /api/jobs/:id/save - Save job for a user
- DELETE /api/jobs/:id/save - Unsave job for a user

### Applications
- POST /api/applications - Submit a job application
- GET /api/applications/user - Get applications for a user
- GET /api/applications/job/:jobId - Get applications for a job
- PUT /api/applications/:id - Update application status
