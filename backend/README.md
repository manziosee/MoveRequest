# MoveRequest Backend API

NestJS backend for the MoveRequest movement and procurement management system.

## Tech Stack

- **NestJS 10** - Enterprise Node.js framework
- **TypeScript** - Type-safe development
- **PostgreSQL + Prisma** - Production database with ORM
- **JWT + bcrypt** - Secure authentication
- **Swagger/OpenAPI** - Auto-generated API documentation
- **Class Validator** - Request validation
- **SendGrid** - Email notifications

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Create a `.env` file in the backend directory:

```env
# Database Configuration (PostgreSQL with Prisma)
DATABASE_URL=postgresql://user:password@localhost:5432/moverequest

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this

# Application Configuration
NODE_ENV=development
PORT=5000

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# SendGrid Configuration (Optional - for email notifications)
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@company.com
SENDGRID_FROM_NAME=MoveRequest System
```

### 3. Setup database
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database with demo data
npm run seed
```

### 4. Run development server
```bash
npm run start:dev
```

The API will be available at:
- **API**: http://localhost:5000
- **Swagger Docs**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

## Features Implemented

### ✅ Core Modules

#### Authentication (`/auth`)
- JWT-based authentication
- User registration and login
- Password reset functionality
- Profile management
- Role-based access control (RBAC)

#### User Management (`/users`)
- CRUD operations for users
- Role assignment (employee, procurement, admin)
- User activity tracking
- Department assignment

#### Request Management (`/requests`)
- Complete CRUD operations
- Advanced filtering and search
- Status management (draft, pending, approved, rejected)
- Priority levels (low, medium, high, urgent)
- Request items with pricing
- File attachments support

#### Approval Workflow (`/approvals`)
- Multi-level approval system
- Approve/reject operations
- Bulk operations
- Approval history and audit trail
- Comments and feedback

#### Dashboard (`/dashboard`)
- Employee dashboard statistics
- Procurement dashboard metrics
- Admin system overview
- Real-time data aggregation

#### Reports (`/reports`)
- Dashboard statistics
- Monthly trends analysis
- Department-wise reports
- Status distribution
- Priority breakdown
- Export functionality (JSON/CSV)

#### Admin Panel (`/admin`)
- Category management
- Department management
- System configuration
- System statistics
- User management

#### Notifications (`/notifications`)
- Real-time notifications
- Email notifications via SendGrid
- Unread count tracking
- Mark as read functionality

#### File Management (`/files`)
- File upload support
- Secure file storage
- File download
- File deletion

### 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **Role-Based Access Control** - Guards for different user roles
- **Input Validation** - Class-validator for all DTOs
- **CORS Protection** - Configured cross-origin policies
- **SQL Injection Prevention** - Prisma ORM parameterized queries

### 📚 API Documentation

Swagger/OpenAPI documentation is automatically generated and available at:
**http://localhost:5000/api**

Features:
- Interactive API testing
- Request/response schemas
- Authentication support
- All endpoints documented

### 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. Main entities:

- **Users** - User accounts with roles and permissions
- **MovementRequest** - Main request entity with status tracking
- **RequestItem** - Items within requests with pricing
- **Approval** - Approval workflow and history
- **Notification** - User notifications
- **Category** - Request categories
- **Department** - Organization departments
- **File** - File attachments

### 📡 API Endpoints Summary

| Module | Endpoints | Description |
|--------|-----------|-------------|
| 🔐 Auth | 6 | Login, register, password reset, profile |
| 👥 Users | 7 | User CRUD, roles, activity |
| 📋 Requests | 7 | Request CRUD, filtering, search |
| ✅ Approvals | 5 | Approve, reject, bulk operations |
| 📊 Dashboard | 3 | Employee, procurement, admin stats |
| 📈 Reports | 6 | Analytics, trends, exports |
| ⚙️ Admin | 12 | Categories, departments, system config |
| 🔔 Notifications | 4 | Get, mark read, unread count |
| 📎 Files | 5 | Upload, download, delete |
| 💓 Health | 2 | Health checks |

## Development

### Available Scripts

```bash
# Development
npm run start:dev      # Start with hot reload
npm run start:debug    # Start with debugging

# Production
npm run build          # Build for production
npm run start:prod     # Run production build

# Database
npm run seed           # Seed database with demo data
npx prisma studio      # Open Prisma Studio (DB GUI)
npx prisma migrate dev # Create new migration

# Testing
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Run tests with coverage
npm run test:e2e       # Run e2e tests

# Code Quality
npm run lint           # Lint code
npm run format         # Format code with Prettier
```

### Project Structure

```
src/
├── auth/              # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/    # JWT & Local strategies
│   └── dto/           # Auth DTOs
├── users/             # User management
├── requests/          # Request management
├── approvals/         # Approval workflow
├── dashboard/         # Dashboard statistics
├── reports/           # Reports & analytics
├── admin/             # Admin operations
├── notifications/     # Notification system
├── files/             # File management
├── prisma/            # Prisma service
├── common/            # Shared utilities
│   ├── guards/        # Auth & role guards
│   ├── decorators/    # Custom decorators
│   └── filters/       # Exception filters
└── main.ts            # Application entry point

prisma/
├── schema.prisma      # Database schema
├── migrations/        # Database migrations
└── seed.ts            # Database seeding
```

## Production Deployment

### Using Docker

```bash
# Build image
docker build -t moverequest-backend .

# Run container
docker run -p 5000:5000 \
  -e DATABASE_URL="postgresql://..." \
  -e JWT_SECRET="your-secret" \
  moverequest-backend
```

### Environment Variables for Production

Ensure these are set in production:

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/moverequest
JWT_SECRET=strong-random-secret-key
FRONTEND_URL=https://yourdomain.com
SENDGRID_API_KEY=your-production-key
```

## Testing

### Demo Accounts

After running `npm run seed`, these accounts are available:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@company.com | password |
| Procurement | procurement@company.com | password |
| Employee | employee@company.com | password |

### Using Postman

1. Import the Postman collection from the root directory
2. Set base URL to `http://localhost:5000`
3. Login with a demo account
4. Token is automatically saved for subsequent requests

## Troubleshooting

### Database Connection Issues

```bash
# Check database connection
npx prisma db pull

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Port Already in Use

```bash
# Change PORT in .env file or:
PORT=5001 npm run start:dev
```

### Prisma Client Issues

```bash
# Regenerate Prisma client
npx prisma generate
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Author

**Manzi Niyongira Osee**
- Email: manziosee3@gmail.com
- GitHub: [@manziosee](https://github.com/manziosee)

## Support

For issues and questions:
- Open an issue on GitHub
- Email: manziosee3@gmail.com