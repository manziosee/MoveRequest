# MoveRequest Backend API

NestJS backend for the MoveRequest movement and procurement management system.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure database**
   - Create MySQL database named `moverequest`
   - Update `.env` file with your database credentials

3. **Run development server**
   ```bash
   npm run start:dev
   ```

4. **API Documentation**
   - Swagger UI: http://localhost:3001/api

## Features Implemented

### ✅ Core Features
- **Authentication** - JWT-based auth with login/register
- **User Management** - Role-based access (employee, procurement, admin)
- **Request Management** - CRUD operations for movement requests
- **Approval Workflow** - Status updates with history tracking

### 🏗️ Database Schema
- **Users** - User accounts with roles
- **Movement Requests** - Main request entity
- **Request Items** - Items within requests
- **Approval History** - Audit trail for all actions

### 🔐 Security
- JWT authentication
- Role-based authorization
- Input validation with class-validator
- Password hashing with bcrypt

### 📚 API Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

#### Requests
- `GET /requests` - Get all requests (filtered by user role)
- `POST /requests` - Create new request
- `GET /requests/:id` - Get request details
- `PATCH /requests/:id/status` - Update request status

## Next Steps

1. Implement remaining modules (approvals, reports, admin)
2. Add file upload for attachments
3. Add email notifications
4. Add advanced filtering and pagination
5. Add comprehensive testing

## Database Setup

```sql
CREATE DATABASE moverequest;
```

The application will automatically create tables on first run.