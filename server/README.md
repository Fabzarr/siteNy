# New York Café - Backend

This is the backend server for the New York Café website, built with Nest.js, TypeORM, and PostgreSQL.

## Features

- User authentication (admin only)
- Reservation management
- Menu and drinks management
- Site configuration management
- RESTful API endpoints
- PostgreSQL database integration
- JWT-based authentication
- Input validation
- CORS support

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL (v12 or later)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the server directory:
   ```bash
   cd server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following content:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=newyorkcafe
   JWT_SECRET=your-super-secret-key-change-in-production
   PORT=4000
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```
5. Create the PostgreSQL database:
   ```bash
   createdb newyorkcafe
   ```

## Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- POST /api/auth/login - Login with username and password
- POST /api/auth/register - Register a new admin user

### Reservations
- GET /api/reservations - Get all reservations
- POST /api/reservations - Create a new reservation
- GET /api/reservations/:id - Get a specific reservation
- PUT /api/reservations/:id - Update a reservation
- DELETE /api/reservations/:id - Delete a reservation

### Menu
- GET /api/menu - Get all menu items
- POST /api/menu - Create a new menu item (admin only)
- PUT /api/menu/:id - Update a menu item (admin only)
- DELETE /api/menu/:id - Delete a menu item (admin only)

### Drinks
- GET /api/drinks - Get all drinks
- POST /api/drinks - Create a new drink (admin only)
- PUT /api/drinks/:id - Update a drink (admin only)
- DELETE /api/drinks/:id - Delete a drink (admin only)

### Configuration
- GET /api/config - Get site configuration
- PUT /api/config - Update site configuration (admin only)

## Security

- All admin endpoints are protected with JWT authentication
- Passwords are hashed using bcrypt
- CORS is enabled for the frontend application
- Input validation is implemented using class-validator
- Environment variables are used for sensitive data

## Database Schema

The application uses the following main entities:
- User (admin)
- Reservation
- MenuItem
- Drink
- Configuration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 