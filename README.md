<div align="center">

# 🚀 MoveRequest

### Movement & Procurement Management System

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

**A modern, full-stack web application for managing movement requests and procurement workflows**

[Features](#-key-features) • [Quick Start](#-quick-start) • [API Docs](#-api-documentation) • [Tech Stack](#-tech-stack) • [Demo](#-demo-accounts)

</div>

---

## ⚡ Quick Start

### One-Command Deployment

```bash
git clone <repository-url>
cd MoveRequest
./deploy.sh
```

**That's it!** 🎉 The entire stack will be up and running in minutes.

### 🌐 Access URLs

| Service | URL | Description |
|---------|-----|-------------|
| 🎨 **Frontend** | http://localhost | Next.js web application |
| 🔌 **Backend API** | http://localhost/api | NestJS REST API |
| 📚 **API Docs** | http://localhost/api/docs | Swagger/OpenAPI documentation |
| 💓 **Health Check** | http://localhost/health | System status |

### 👤 Demo Accounts

| Role | Email | Password | Access Level |
|------|-------|----------|-------------|
| 🔴 **Admin** | manziosee3@gmail.com | 123456 | Full system access |
| 🟡 **Procurement** | manziosee2001@gmail.com | 123456 | Approval workflows |
| 🟢 **Employee** | oseemanzi3@gmail.com | 123456 | Create & track requests |

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%">

### Frontend 🎨

- ⚡ **Next.js 15** - App Router with React 18
- 📘 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first styling
- 🧩 **Radix UI + shadcn/ui** - Accessible components
- 🎯 **Lucide React** - Beautiful icons
- 🔔 **Sonner** - Toast notifications
- 📊 **Recharts** - Data visualization
- 🔌 **Socket.IO Client** - Real-time WebSocket

</td>
<td width="50%">

### Backend 🔧

- 🚀 **NestJS 10** - Enterprise Node.js framework
- 📘 **TypeScript** - End-to-end type safety
- 🗄️ **PostgreSQL + Prisma** - Production-ready database
- 🔐 **JWT + bcrypt** - Secure authentication
- 📖 **Swagger/OpenAPI** - Auto-generated docs
- ✅ **Class Validator** - Request validation
- 🔌 **Socket.IO** - WebSocket real-time events
- 📧 **SendGrid** - Email notifications

</td>
</tr>
</table>

### DevOps & Tools 🐳

- 🐳 **Docker + Docker Compose** - Containerized deployment
- 🌐 **Nginx** - Reverse proxy & load balancing
- 📮 **Postman Collection** - 60+ API endpoints ready to test
- 🔄 **Hot Reload** - Fast development workflow

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication & Security

✅ JWT-based authentication  
✅ Role-based access control (RBAC)  
✅ Password reset with secure tokens  
✅ bcrypt password hashing  
✅ Rate limiting & CORS protection  
✅ Protected routes & guards  

### 📋 Request Management

✅ Complete CRUD operations  
✅ 4-step creation wizard  
✅ Advanced filtering & search  
✅ File attachments support  
✅ Request lifecycle tracking  
✅ Status management (Draft → Approved)  

### ✅ Approval Workflow

✅ Multi-level approval system  
✅ Bulk approve/reject operations  
✅ Approval history & audit trail  
✅ Automated notifications  
✅ Comments & feedback system  

</td>
<td width="50%">

### 📊 Analytics & Reporting

✅ Real-time interactive dashboards  
✅ Custom report generation  
✅ Export to CSV, PDF, Excel  
✅ Financial tracking (RWF)  
✅ Department analytics  
✅ User activity reports  
✅ Trend analysis & forecasting  

### ⚙️ Admin Panel

✅ User management (CRUD)  
✅ Role assignment & permissions  
✅ Category management  
✅ Department management  
✅ System configuration & monitoring  
✅ Activity tracking & audit logs  
✅ Bulk operations (approve/reject)  
✅ Data export (users, requests)  
✅ System backup management  
✅ User activity reports  

### 🔔 Notifications

✅ Real-time WebSocket notifications  
✅ Toast notifications with Sonner  
✅ Email notifications via SendGrid  
✅ Unread count tracking  
✅ Mark as read functionality  
✅ Notification history & audit trail  
✅ Auto-connect on login  
✅ Request submission alerts  
✅ Approval/rejection alerts  

</td>
</tr>
</table>

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Role-specific dashboards with real-time stats
│   ├── requests/          # Request management with 4-step wizard
│   ├── approvals/         # Approval workflows with comments
│   ├── reports/           # Analytics & reporting with exports
│   ├── admin/             # Admin panel (users, categories, departments, setup)
│   ├── notifications/     # Real-time notification center
│   ├── profile/           # User profile management
│   ├── login/             # Authentication
│   └── forgot-password/   # Password recovery
├── backend/               # NestJS API server
│   ├── src/
│   │   ├── auth/          # Authentication & JWT
│   │   ├── requests/      # Request management & notifications
│   │   ├── approvals/     # Approval workflows & notifications
│   │   ├── users/         # User management
│   │   ├── admin/         # Admin operations & bulk actions
│   │   ├── notifications/ # WebSocket gateway & notification service
│   │   ├── dashboard/     # Dashboard statistics
│   │   ├── reports/       # Reports & exports
│   │   ├── files/         # File management
│   │   └── common/        # Shared utilities & guards
│   └── Dockerfile         # Backend container
├── components/            # Reusable UI components
├── contexts/             # React contexts (Auth, Theme)
├── hooks/                # Custom React hooks (useRealtimeNotifications)
├── lib/                  # Utilities & API client
├── docker-compose.yml    # Full stack deployment with WebSocket
├── postman-collection.json # 60+ API endpoints
└── deploy.sh             # One-command deployment
```

## 🚀 Deployment

### Prerequisites

- 🐳 Docker & Docker Compose
- 📦 Node.js 18+ (for local development only)
- 🔧 Git

### 🐳 Production Deployment (Docker)

```bash
# One-command deployment
./deploy.sh

# Or manual steps
docker-compose build
docker-compose up -d

# Check system status
./status.sh

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 💻 Local Development

**Frontend:**
```bash
npm install
npm run dev
# Runs on http://localhost:3001
```

**Backend:**
```bash
cd backend
npm install
npm run start:dev
# Runs on http://localhost:5000
# API docs: http://localhost:5000/api
```

**Database Seeding:**
```bash
cd backend
npm run seed
# Creates demo accounts and sample data
```

## 📡 API Documentation

### 📮 Postman Collection

Import **`postman-collection.json`** into Postman for instant API testing!

**60+ Endpoints Organized by Category:**

| Category | Endpoints | Description |
|----------|-----------|-------------|
| 🔐 **Authentication** | 6 | Login, register, password reset, profile |
| 📊 **Dashboard** | 3 | Employee, procurement, admin real-time stats |
| 📋 **Requests** | 7 | CRUD, filtering, search, statistics |
| ✅ **Approvals** | 5 | Approve, reject, bulk operations, history |
| 👥 **Users** | 7 | User management, roles, activity |
| 🔔 **Notifications** | 4 | Get, mark read, unread count, WebSocket |
| 🏢 **Admin - Categories** | 4 | Category CRUD operations |
| 🏛️ **Admin - Departments** | 5 | Department management with budgets |
| ⚙️ **Admin - System** | 8 | System stats, user activity, backups, bulk ops, exports |
| 📈 **Reports** | 6 | Summary, export (CSV/PDF/Excel) |
| 📎 **Files** | 5 | Upload, download, delete |
| 💓 **Health** | 2 | Health checks |

### 🔑 Quick Start with Postman

1. Import `postman-collection.json`
2. Login with demo account (auto-saves token)
3. All requests use `{{access_token}}` automatically
4. Base URL: `{{base_url}}` = http://localhost:5000

### 📚 Swagger Documentation

Interactive API docs available at: **http://localhost/api/docs**

- Try endpoints directly in browser
- View request/response schemas
- See all available parameters
- Auto-generated from code

## 🔧 Configuration

### Environment Variables

**Root `.env`:**
```env
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key
NEXT_PUBLIC_API_URL=http://localhost/api
```

**Backend `.env`:**
```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/moverequest
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@company.com
SENDGRID_FROM_NAME=MoveRequest System
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📊 System Monitoring

### Health Checks

```bash
# Quick status check
./status.sh

# View all service logs
docker-compose logs -f

# View specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Health endpoints
curl http://localhost/health
curl http://localhost/api/health

# Check running containers
docker-compose ps

# Resource usage
docker stats
```

### 🔍 Troubleshooting

```bash
# Restart services
docker-compose restart

# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Access container shell
docker-compose exec backend sh
docker-compose exec frontend sh

# Check database
docker-compose exec backend ls -la /app/data/
```

## 🎨 UI/UX Features

- ✨ **Responsive Design** - Mobile-first, touch-friendly
- 🎭 **Modern UI** - Gradients, animations, hover effects
- 📊 **Interactive Charts** - Custom SVG visualizations
- ⏳ **Loading States** - Skeleton loaders, optimistic updates
- ♿ **Accessibility** - WCAG compliant components
- ⚡ **Performance** - Code splitting, lazy loading
- 🌙 **Dark Mode Ready** - Theme support built-in
- 🎯 **Intuitive Navigation** - Clear user flows
- 🔔 **Toast Notifications** - Real-time feedback with Sonner
- 🔄 **Real-time Updates** - WebSocket-powered live data

## 🔒 Security Features

- 🔐 **JWT Authentication** - Secure token-based auth
- 🔑 **Password Hashing** - bcrypt with salt rounds
- 🛡️ **RBAC** - Role-based access control (employee, procurement, admin)
- ✅ **Input Validation** - Class-validator sanitization
- 🚦 **Rate Limiting** - API abuse prevention
- 🌐 **CORS** - Configured cross-origin policies
- 💉 **SQL Injection Prevention** - Prisma parameterized queries
- 🔒 **XSS Protection** - Content security policies
- 🔌 **WebSocket Auth** - JWT-based socket authentication
- 🔑 **Password Reset** - Secure token-based recovery

## 📈 Performance Optimizations

- ⚛️ **React Optimizations** - useMemo, useCallback, memo
- 🏗️ **Next.js Standalone** - Minimal production builds
- 🗜️ **Nginx Compression** - Gzip for static assets
- 🗄️ **Query Optimization** - Indexed database queries
- 🖼️ **Image Optimization** - WebP/AVIF formats
- 📦 **Code Splitting** - Dynamic imports, lazy loading
- 💾 **Caching Strategy** - Browser & server-side caching
- 🚀 **CDN Ready** - Static asset optimization
- 🔌 **WebSocket Pooling** - Efficient real-time connections
- 📊 **Database Indexing** - Optimized Prisma queries

## 📸 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

### Request Management
![Requests](https://via.placeholder.com/800x400?text=Request+Management)

### Approval Workflow
![Approvals](https://via.placeholder.com/800x400?text=Approval+Workflow)

### Analytics & Reports
![Reports](https://via.placeholder.com/800x400?text=Analytics+Reports)

</details>

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Manzi Niyongira Osee**

- 📧 Email: manziosee3@gmail.com
- 🐙 GitHub: [@manziosee](https://github.com/manziosee)
- 💼 LinkedIn: [Connect with me](https://linkedin.com/in/manziosee)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Backend powered by [NestJS](https://nestjs.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

## 📞 Support

For support, email manziosee3@gmail.com or open an issue in the repository.

---

<div align="center">

**Made with ❤️ in Rwanda 🇷🇼**

⭐ Star this repo if you find it useful!

[Report Bug](https://github.com/manziosee/MoveRequest/issues) • [Request Feature](https://github.com/manziosee/MoveRequest/issues)

</div>