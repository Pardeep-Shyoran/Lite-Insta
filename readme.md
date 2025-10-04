# Lite-Insta

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Lite-Insta is a lightweight social media application inspired by Instagram. It allows users to register, login, create posts with images, view profiles, and interact with posts. The project is split into a backend API built with Node.js and Express, and a frontend web application built with React and Vite.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Scripts](#scripts)
- [Usage](#usage)
- [API Endpoints Overview](#api-endpoints-overview)
- [Contributing](#contributing)
- [Future Enhancements](#future-enhancements)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## Project Overview

Lite-Insta aims to provide a simplified version of a social media platform where users can share photos and connect with others. Key functionalities include:

- User authentication and profile management
- Post creation, viewing, updating, and deletion with image uploads
- Responsive design for mobile and desktop
- AI-powered features for content generation

The application uses modern web technologies for scalability and security. It's ideal for learning full-stack development and can be extended with features like comments, likes, and messaging.

## Project Structure

The project is organized into two main directories: `Backend` for the server-side API and `Frontend` for the client-side application. Below is a detailed overview of the key directories and files.

- **[Backend/](./Backend/)**: Backend API server (Node.js + Express)
  - **src/**
    - **[controllers/](./Backend/src/controllers/)**: API controllers for auth and posts
    - **[db/](./Backend/src/db/)**: Database connection
    - **[middlewares/](./Backend/src/middlewares/)**: Authentication middleware
    - **[models/](./Backend/src/models/)**: Mongoose models for User and Post
    - **[routes/](./Backend/src/routes/)**: API routes
    - **[services/](./Backend/src/services/)**: AI and storage services
  - **package.json**: Backend dependencies and scripts
  - **server.js**: Entry point
  - **.gitignore**: Files to ignore in version control

- **[Frontend/](./Frontend/)**: Frontend React app
  - **public/**: Static assets
  - **src/**
    - **[api/](./Frontend/src/api/)**: Axios configuration
    - **[assets/](./Frontend/src/assets/)**: Images and icons
    - **[components/](./Frontend/src/components/)**: Reusable UI components
    - **[features/](./Frontend/src/features/)**: Redux slices and actions
    - **[pages/](./Frontend/src/pages/)**: Page components
    - **[routes/](./Frontend/src/routes/)**: Routing configuration
    - **[store/](./Frontend/src/store/)**: Redux store
  - **package.json**: Frontend dependencies and scripts
  - **vite.config.js**: Vite configuration
  - **index.html**: Main HTML template

- **readme.md**: This documentation file

**Notes:**
- Clickable links are provided for easy navigation to directories.
- Node modules and build outputs are omitted for clarity.
- The structure follows a modular approach for scalability.

## Architecture

The application follows a client-server architecture:

### Backend
- **RESTful API** built with Express.js
- **Database**: MongoDB with Mongoose for data persistence
- **Authentication**: JWT tokens for secure access
- **File Handling**: Multer for uploads, ImageKit for storage
- **AI Integration**: Google GenAI for content features

### Frontend
- **SPA** using React 18 with Vite for fast development
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **API Calls**: Axios with configured base URL
- **Styling**: CSS modules for scoped styles
- **Forms**: React Hook Form for efficient handling

Communication is via HTTP requests with CORS enabled.

## Features

- **User Authentication**: Secure registration/login with JWT and password hashing
- **Post Management**: Full CRUD operations for posts with image uploads
- **Profile Management**: View and edit profiles with bio and pictures
- **Responsive UI**: Mobile-friendly design
- **AI Features**: Integration with Google GenAI for content suggestions
- **Notifications**: Toast messages for user feedback
- **Protected Routes**: Authenticated access to certain pages

## Tech Stack

### Backend
- Node.js & Express
- MongoDB (Mongoose)
- JWT, Multer, ImageKit
- Google GenAI, CORS

### Frontend
- React 18 & Vite
- Redux Toolkit, React Router
- Axios, React Hook Form
- React Toastify, ESLint

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud instance)
- ImageKit account for image storage
- Google GenAI API key

### Backend Setup
1. Navigate to Backend:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with required variables:
   - `PORT=5000`
   - `MONGODB_URI=your_mongodb_uri`
   - `JWT_SECRET=your_jwt_secret`
   - `IMAGEKIT_PUBLIC_KEY=your_public_key`
   - `IMAGEKIT_PRIVATE_KEY=your_private_key`
   - `IMAGEKIT_URL_ENDPOINT=your_endpoint`
   - `GOOGLE_GENAI_API_KEY=your_api_key`

4. **Start server**:
   ```bash
   node server.js
   ```

### Frontend Setup
1. Navigate to Frontend:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. **Start dev server**:
   ```bash
   npm run dev
   ```
4. Open browser at `http://localhost:5173`

## Scripts

### Backend
- `node server.js` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

1. **Register/Login** with credentials
2. **Create Posts** with images
3. **Edit Profile** and view others
4. **Browse & Interact** with posts

## API Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/logout` | Logout user |
| GET | `/api/posts` | Get all posts |
| POST | `/api/posts` | Create post |
| GET | `/api/posts/:id` | Get post details |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |

## Contributing

Contributions welcome! Follow these steps:

1. Fork the repo
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes & run `npm run lint`
4. Commit: `git commit -m 'Add feature'`
5. Push & open PR

Ensure code is documented and styled consistently.

## Future Enhancements

- Comments & likes on posts
- Direct messaging
- Search for users/posts
- Advanced AI features (e.g., auto-tagging)
- Push notifications
- Dark mode toggle

## Acknowledgments

- Inspired by Instagram
- Built with open-source tools

## License

Licensed under [ISC License](https://opensource.org/licenses/ISC).
