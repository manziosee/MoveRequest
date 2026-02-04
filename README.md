# MoveRequest - Movement & Procurement Management System

A modern, full-featured web application for managing movement requests and procurement processes built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### One-Command Deployment
```bash
git clone <repository-url>
cd MoveRequest
./deploy.sh
```

### Access URLs
- **Frontend**: http://localhost
- **Backend API**: http://localhost/api
- **API Documentation**: http://localhost/api/docs

### Demo Accounts
- **Admin**: admin@company.com / password
- **Procurement**: procurement@company.com / password
- **Employee**: employee@company.com / password

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: SQLite + TypeORM
- **Authentication**: JWT + bcrypt
- **Documentation**: Swagger/OpenAPI

### DevOps
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **API Testing**: Postman Collection

## 🎯 Key Features

### 🔐 Authentication & Security
- JWT-based authentication with role-based access control
- Password reset functionality with secure tokens
- Three user roles: Employee, Procurement, Admin
- Rate limiting and CORS protection

### 📋 Request Management
- Complete CRUD operations for movement requests
- 4-step wizard for creating new requests
- Advanced filtering, search, and sorting
- File attachment support
- Request lifecycle tracking

### ✅ Approval Workflow
- Multi-level approval system
- Bulk approval capabilities
- Approval history and audit trail
- Automated notifications

### 📊 Analytics & Reporting
- Real-time dashboards with interactive charts
- Custom report generation
- Export capabilities (CSV, PDF, Excel)
- Financial tracking in RWF currency
- Department and user analytics

### ⚙️ Admin Panel
- User management with role assignment
- Category and department management
- System configuration
- Activity monitoring

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Role-specific dashboards
│   ├── requests/          # Request management
│   ├── approvals/         # Approval workflows
│   ├── reports/           # Analytics & reporting
│   ├── admin/             # Admin panel
│   ├── login/             # Authentication
│   └── forgot-password/   # Password recovery
├── backend/               # NestJS API server
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── requests/      # Request management
│   │   ├── approvals/     # Approval workflows
│   │   ├── users/         # User management
│   │   ├── admin/         # Admin operations
│   │   └── common/        # Shared utilities
│   └── Dockerfile         # Backend container
├── components/            # Reusable UI components
├── contexts/             # React contexts
├── lib/                  # Utilities & configurations
├── docker-compose.yml    # Full stack deployment
├── postman-collection.json # API testing
└── deploy.sh             # One-command deployment
```

## 🚀 Deployment

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)

### Production Deployment
```bash
# Quick deployment
./deploy.sh

# Manual deployment
docker-compose up -d

# Check system status
./status.sh
```

### Local Development
```bash
# Frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run start:dev
```

## 📡 API Testing

Import `postman-collection.json` into Postman for complete API testing with 60+ endpoints covering:
- Authentication (login, register, password reset)
- Request management (CRUD, filtering, search)
- Approval workflows (approve, reject, bulk operations)
- Dashboard analytics and reporting
- Admin operations (user, category, department management)
- File uploads and notifications

## 🔧 Configuration

### Environment Variables
```env
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
DATABASE_URL=file:./data/moverequest.db
NEXT_PUBLIC_API_URL=http://localhost/api
```

## 📊 System Monitoring

### Health Checks
```bash
# System status
./status.sh

# Service logs
docker-compose logs -f

# Health endpoints
curl http://localhost/health
curl http://localhost/api/health
```

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Modern UI**: Gradient backgrounds, smooth animations, hover effects
- **Interactive Charts**: Custom SVG visualizations with trading-style designs
- **Loading States**: Skeleton components and optimistic updates
- **Accessibility**: WCAG compliant components
- **Performance**: Optimized builds with code splitting

## 🔒 Security Features

- JWT authentication with secure token handling
- Password hashing with bcrypt
- Role-based access control with route protection
- Input validation and sanitization
- Rate limiting and CORS configuration
- SQL injection prevention

## 📈 Performance Optimizations

- React optimizations (useMemo, useCallback)
- Next.js production build with standalone output
- Nginx caching and compression
- Database query optimization
- Image optimization (WebP/AVIF)
- Code splitting and lazy loading

## 👨💻 Author

**Manzi Niyongira Osee**
- Email: manziosee3@gmail.com
- GitHub: [@manziosee](https://github.com/manziosee)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Backend powered by [NestJS](https://nestjs.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ in Rwanda 🇷🇼