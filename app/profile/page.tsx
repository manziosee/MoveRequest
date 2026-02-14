'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Briefcase, Shield, Edit, Key, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<any[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await api.getActivity(token);
      if (response.ok) {
        const data = await response.json();
        setActivities(data.slice(0, 5)); // Show last 5 activities
      }
    } catch (error) {
      console.error('Failed to load activity:', error);
    } finally {
      setLoadingActivity(false);
    }
  };

  const getActivityIcon = (action: string) => {
    if (action.includes('login') || action.includes('Login')) return '🔐';
    if (action.includes('password') || action.includes('Password')) return '🔑';
    if (action.includes('profile') || action.includes('Profile')) return '👁️';
    if (action.includes('request') || action.includes('Request')) return '📋';
    if (action.includes('approv') || action.includes('Approv')) return '✅';
    return '📌';
  };

  const getActivityColor = (action: string) => {
    if (action.includes('login') || action.includes('Login')) return 'bg-green-100 text-green-700';
    if (action.includes('password') || action.includes('Password')) return 'bg-purple-100 text-purple-700';
    if (action.includes('profile') || action.includes('Profile')) return 'bg-blue-100 text-blue-700';
    if (action.includes('request') || action.includes('Request')) return 'bg-amber-100 text-amber-700';
    if (action.includes('approv') || action.includes('Approv')) return 'bg-green-100 text-green-700';
    return 'bg-gray-100 text-gray-700';
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'procurement':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-4 sm:p-6 space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Profile</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">View and manage your account information</p>
            </div>
            <Link href="/change-password" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <Key className="h-4 w-4" />
                Change Password
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Profile Avatar Card */}
            <Card className="lg:col-span-1 border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-primary/20">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 border-4 border-white rounded-full"></div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground">{user?.firstName} {user?.lastName}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getRoleBadgeColor(user?.role || '')} font-semibold`}
                  >
                    {user?.role.toUpperCase()}
                  </Badge>
                  <Button variant="outline" className="w-full gap-2 mt-4">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information Card */}
            <Card className="lg:col-span-2 border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your account details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Full Name</p>
                        <p className="font-semibold text-foreground truncate">{user?.firstName} {user?.lastName}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Email Address</p>
                        <p className="font-semibold text-foreground truncate">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Role</p>
                        <Badge
                          className={`${getRoleBadgeColor(user?.role || '')} mt-1 font-semibold`}
                          variant="outline"
                        >
                          {user?.role}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Department</p>
                        <p className="font-semibold text-foreground">
                          {user?.department || 'Not assigned'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Activity Card */}
          <Card className="border-gray-200/60 shadow-sm">
            <CardHeader>
              <CardTitle>Account Activity</CardTitle>
              <CardDescription>Recent activity on your account</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingActivity ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : activities.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No recent activity</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {activities.map((activity, index) => {
                    const timestamp = activity.timestamp ? new Date(activity.timestamp) : null;
                    const isValidDate = timestamp && !isNaN(timestamp.getTime());
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border/30">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg ${getActivityColor(activity.action)} flex items-center justify-center text-sm`}>
                            {getActivityIcon(activity.action)}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-foreground">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">
                              {isValidDate 
                                ? formatDistanceToNow(timestamp, { addSuffix: true })
                                : 'Recently'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
