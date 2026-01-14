# StayHub

A full-stack web application for hotel booking built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can search for hotels, view details, make bookings, and manage their hotels if they are hosts.

## Features

### User Authentication
- User registration and login
- JWT-based authentication with HTTP-only cookies
- Protected routes for authenticated users

### Hotel Management
- Add new hotels (for hosts)
- Edit existing hotels
- View and manage your hotels
- Upload multiple images for hotels

### Hotel Search & Discovery
- Search hotels by destination, dates, guest count, etc.
- Filter by hotel type, star rating, facilities, and price
- View detailed hotel information
- Latest destinations on home page

### Booking System
- Book rooms with payment intent (Stripe integration)
- View booking details and summary
- Manage your bookings

### Responsive Design
- Mobile-friendly UI built with Tailwind CSS
- Modern and intuitive user interface

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **Cloudinary** - Image hosting
- **CORS** - Cross-origin resource sharing

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SravyaSajja88/mern-booking-app.git
   cd mern-booking-app
   ```

2. **Install dependencies for both frontend and backend:**

   **Backend:**
   ```bash
   cd backend
   npm install
   ```

   **Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   MONGODB_CONNECTION_STRING=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   STRIPE_API_KEY=your_stripe_secret_key
   FRONTEND_URL=http://localhost:5173
   ```

   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Start the application:**

   **Backend:**
   ```bash
   cd backend
   npm start
   ```

   **Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the application:**

   Open your browser and go to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/validate-token` - Validate JWT token

### Users
- `POST /api/users/register` - User registration
- `GET /api/users/me` - Get current user info

### Hotels
- `GET /api/hotels/search` - Search hotels with filters
- `GET /api/hotels/:id` - Get hotel details
- `POST /api/hotels/:id/bookings/payment-intent` - Create payment intent
- `POST /api/hotels/:id/bookings` - Create booking

### My Hotels (for hosts)
- `GET /api/my-hotels` - Get user's hotels
- `POST /api/my-hotels` - Add new hotel
- `GET /api/my-hotels/:id` - Get specific hotel
- `PUT /api/my-hotels/:id` - Update hotel
- `DELETE /api/my-hotels/:id` - Delete hotel

### My Bookings
- `GET /api/my-bookings` - Get user's bookings

## Project Structure

```
mern-booking-app/
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── forms/
│   │   ├── layouts/
│   │   └── ...
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built following modern MERN stack best practices
- UI inspired by modern hotel booking platforms
- Thanks to the open-source community for the amazing tools and libraries
