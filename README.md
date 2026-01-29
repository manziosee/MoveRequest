# MoveRequest - Movement & Procurement Management System

A modern, full-featured web application for managing movement requests and procurement processes built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure login/logout with role-based access control
- **Movement Requests** - Create, edit, and track movement/procurement requests
- **Approval Workflow** - Multi-level approval system with procurement and admin roles
- **Real-time Notifications** - Stay updated on request status changes
- **Advanced Reporting** - Comprehensive analytics with custom charts and export options

### User Roles
- **Employee** - Create and manage personal requests
- **Procurement** - Review and approve/reject requests
- **Admin** - Full system access with user management and analytics

### Dashboard Features
- **Interactive Charts** - Trading-style zigzag visualizations
- **Performance Metrics** - Real-time system monitoring
- **Custom Reports** - Scheduled reports with multiple export formats
- **Bulk Operations** - Mass approval and notification tools

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Notifications**: Sonner
- **Currency**: Rwandan Franc (RWF)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/moverequest.git
   cd moverequest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard pages
│   ├── requests/          # Request management
│   ├── approvals/         # Approval workflows
│   ├── reports/           # Analytics & reporting
│   └── admin/             # Admin panel
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── DashboardLayout.tsx
├── contexts/             # React contexts
├── hooks/                # Custom React hooks
├── lib/                  # Utilities & mock data
└── public/               # Static assets
```

## 🎨 Key Features

### Advanced Analytics
- **System Performance** - Real-time CPU, memory, and request monitoring
- **User Growth** - Monthly registration trends
- **Role Distribution** - User breakdown by role type
- **Department Activity** - Request volume by department
- **Custom Report Builder** - Template-based report generation

### Performance Optimizations
- **React Optimizations** - useMemo, useCallback for optimal re-renders
- **Optimistic Updates** - Instant UI feedback with error handling
- **Fast Transitions** - 150ms animations for responsive feel
- **Prefetched Navigation** - Instant page loads
- **Loading States** - Skeleton components for better UX

### Trading-Style Charts
- **Custom SVG Visualizations** - Zigzag lines with gradient fills
- **Interactive Data Points** - Hover effects and tooltips
- **Responsive Design** - Works on all screen sizes
- **Color-coded Legends** - Easy data interpretation

## 🔐 Authentication & Authorization

- **Role-based Access Control** - Employee, Procurement, Admin roles
- **Protected Routes** - Automatic redirection for unauthorized access
- **Session Management** - Secure user sessions with timeout

## 💰 Currency & Localization

- **Primary Currency**: Rwandan Franc (RWF)
- **Number Formatting**: Localized for Rwanda
- **Date Formats**: International standard with local preferences

## 🚀 Performance Features

- **Optimized Build** - Next.js production optimizations
- **Code Splitting** - Automatic route-based splitting
- **Image Optimization** - WebP/AVIF format support
- **CSS Optimization** - Tailwind CSS purging

## 📱 Responsive Design

- **Mobile-First** - Optimized for all device sizes
- **Touch-Friendly** - Large tap targets and smooth interactions
- **Progressive Enhancement** - Works without JavaScript

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Manzi Niyongira Osee**
- Email: manziosee3@gmail.com
- GitHub: [@manziosee](hhttps://github.com/manziosee)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ in Rwanda 🇷🇼