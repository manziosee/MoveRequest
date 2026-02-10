'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Home, FileText, Users, Settings, Bell, LogOut,
  Package, BarChart3, UserCheck, Building2, Menu, X,
  CheckCircle2, Clock, AlertCircle, Info
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect, useMemo, useCallback } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const mockNotifications = [
  {
    id: '1',
    type: 'success',
    icon: CheckCircle2,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Request Approved',
    description: 'Your office equipment transfer request has been approved',
    time: '2 hours ago'
  },
  {
    id: '2',
    type: 'warning',
    icon: Clock,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Pending Review',
    description: 'Your stationery request is awaiting procurement review',
    time: '1 day ago'
  },
  {
    id: '3',
    type: 'info',
    icon: Info,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'System Update',
    description: 'New features have been added to the request form',
    time: '3 days ago'
  }
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = useMemo(() => {
    const baseItems = [
      { href: '/dashboard', icon: Home, label: 'Dashboard' },
      { href: '/requests', icon: FileText, label: 'Requests' },
      { href: '/notifications', icon: Bell, label: 'Notifications' },
      { href: '/profile', icon: UserCheck, label: 'Profile' },
    ];

    if (user?.role === 'procurement') {
      return [
        ...baseItems.slice(0, 2),
        { href: '/approvals', icon: Package, label: 'Approvals' },
        ...baseItems.slice(2),
        { href: '/reports', icon: BarChart3, label: 'Reports' }
      ];
    }

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { href: '/admin/users', icon: Users, label: 'Users' },
        { href: '/admin/categories', icon: Package, label: 'Categories' },
        { href: '/admin/departments', icon: Building2, label: 'Departments' },
        { href: '/admin/setup', icon: Settings, label: 'Setup' },
        { href: '/reports', icon: BarChart3, label: 'Reports' }
      ];
    }

    return baseItems;
  }, [user?.role]);

  const roleBadgeClass = useMemo(() => {
    switch (user?.role) {
      case 'admin': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'procurement': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  }, [user?.role]);

  const pageTitle = useMemo(() => {
    const titles: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/requests': 'Movement Requests',
      '/requests/new': 'New Request',
      '/approvals': 'Pending Approvals',
      '/notifications': 'Notifications',
      '/profile': 'Profile',
      '/admin/users': 'User Management',
      '/admin/setup': 'System Setup',
      '/reports': 'Reports'
    };
    return titles[pathname] || 'Dashboard';
  }, [pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setSidebarOpen(false);
  }, [pathname]);

  // Handle window resize with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth >= 1024) {
          setMobileMenuOpen(false);
          setSidebarOpen(true);
        } else {
          setSidebarOpen(false);
        }
      }, 100);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform lg:translate-x-0 lg:static lg:inset-0 flex-shrink-0',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col bg-white border-r border-gray-200/60 shadow-xl">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-100">
            <Link href="/dashboard" className="flex items-center space-x-3" prefetch={true}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground tracking-tight">MoveReq</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Pro</span>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(false)}
              className="h-8 w-8 p-0 lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-none',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-100">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold text-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{user.department}</p>
                </div>
              </div>
              <Badge variant="outline" className={cn('text-xs font-medium w-fit', roleBadgeClass)}>
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200/60">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            {/* Mobile Menu Button & Title */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(true)}
                className="h-9 w-9 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">{pageTitle}</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-white text-[9px] rounded-full flex items-center justify-center font-semibold">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 max-w-[calc(100vw-2rem)]" align="end">
                  <DropdownMenuLabel>
                    <div className="flex items-center justify-between">
                      <span>Notifications</span>
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary">
                        Mark all read
                      </Button>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <div className="max-h-80 overflow-y-auto">
                    {mockNotifications.map((notification) => {
                      const IconComponent = notification.icon;
                      return (
                        <DropdownMenuItem key={notification.id} className="p-3">
                          <div className="flex items-start space-x-3 w-full">
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", notification.iconBg)}>
                              <IconComponent className={cn("h-4 w-4", notification.iconColor)} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{notification.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {notification.description}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      );
                    })}
                  </div>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/notifications" className="w-full text-center text-sm text-primary font-medium" prefetch={true}>
                      View all notifications
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <Badge variant="outline" className={cn('mt-2 w-fit text-xs', roleBadgeClass)}>
                        {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" prefetch={true}>
                      <UserCheck className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/change-password" prefetch={true}>
                      <Settings className="mr-2 h-4 w-4" />
                      Change Password
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
