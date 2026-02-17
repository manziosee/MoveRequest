'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plus, FileText, Clock, CheckCircle, XCircle,
  TrendingUp, Users, Package, Building2, Loader2, BarChart3, Activity
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area,
} from 'recharts';

export default function DashboardContent() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await api.getDashboardStats(token);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !stats) return null;

  const EmployeeDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-[#3D4B6E] to-[#2E3A54] rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">My Requests Overview</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Total Requests</p>
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">{stats.totalRequests || 0}</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Pending</p>
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <p className="text-3xl font-bold text-amber-600">{stats.pending || 0}</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Approved</p>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.approved || 0}</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Rejected</p>
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">{stats.rejected || 0}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/requests/new">
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 gap-2">
                <Plus className="h-4 w-4" />
                Create New Request
              </Button>
            </Link>
            <Link href="/requests">
              <Button variant="outline" className="w-full gap-2">
                <FileText className="h-4 w-4" />
                View All Requests
              </Button>
            </Link>
            <Link href="/notifications">
              <Button variant="outline" className="w-full gap-2">
                <Package className="h-4 w-4" />
                View Notifications
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ProcurementDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-[#3D4B6E] to-[#2E3A54] rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Procurement Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Pending Review</p>
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-600">{stats.pending || 0}</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Approved Today</p>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.approvedToday || 0}</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Total Value</p>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.totalValue || 0}M</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Departments</p>
              <Building2 className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.departments || 0}</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">This Month</p>
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.thisMonth || 0}</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Avg. Time</p>
              <Clock className="h-4 w-4 text-cyan-600" />
            </div>
            <p className="text-2xl font-bold text-cyan-600">{stats.avgProcessingTime || 0}d</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/approvals">
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 gap-2">
                <CheckCircle className="h-4 w-4" />
                Review Requests
              </Button>
            </Link>
            <Link href="/requests">
              <Button variant="outline" className="w-full gap-2">
                <FileText className="h-4 w-4" />
                All Requests
              </Button>
            </Link>
            <Link href="/reports">
              <Button variant="outline" className="w-full gap-2">
                <TrendingUp className="h-4 w-4" />
                View Reports
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const STATUS_COLORS = ['#f59e0b', '#22c55e', '#ef4444'];
  const ROLE_COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4'];

  const AdminDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-[#3D4B6E] to-[#2E3A54] rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">System Overview</h1>
        <p className="text-white/70 text-sm mt-1">Real-time system analytics and management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Total Users</p>
              <Users className="h-4 w-4 text-cyan-600" />
            </div>
            <p className="text-2xl font-bold text-cyan-600">{stats.totalUsers || 0}</p>
            <p className="text-xs text-muted-foreground mt-1">{stats.activeUsers || 0} active</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Departments</p>
              <Building2 className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.departments || 0}</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Total Requests</p>
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.totalRequests || 0}</p>
            <p className="text-xs text-muted-foreground mt-1">{stats.pending || 0} pending</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Approval Rate</p>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.approvalRate || 0}%</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Categories</p>
              <Package className="h-4 w-4 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{stats.categories || 0}</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">System Health</p>
              <Activity className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.systemHealth || 0}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1: Monthly Trends + Request Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-gray-200/60 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Monthly Request Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.monthlyTrends && stats.monthlyTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={stats.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="total" name="Total" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="approved" name="Approved" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="rejected" name="Rejected" stroke="#ef4444" fill="#ef4444" fillOpacity={0.05} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[280px] text-muted-foreground text-sm">No trend data available yet</div>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Request Status</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.statusDistribution && stats.statusDistribution.some((s: any) => s.value > 0) ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={stats.statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {stats.statusDistribution.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[220px] text-muted-foreground text-sm">No requests yet</div>
            )}
            <div className="flex justify-center gap-4 mt-2">
              {(stats.statusDistribution || []).map((item: any, i: number) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[i] }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: Department Activity + User Roles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-gray-200/60 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Requests by Department
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.departmentActivity && stats.departmentActivity.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={stats.departmentActivity} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" tick={{ fontSize: 12 }} allowDecimals={false} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={100} />
                  <Tooltip />
                  <Bar dataKey="requests" name="Requests" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[280px] text-muted-foreground text-sm">No department data available</div>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">User Roles</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.roleDistribution && stats.roleDistribution.some((r: any) => r.value > 0) ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={stats.roleDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {stats.roleDistribution.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={ROLE_COLORS[index % ROLE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[220px] text-muted-foreground text-sm">No user data</div>
            )}
            <div className="flex justify-center gap-4 mt-2">
              {(stats.roleDistribution || []).map((item: any, i: number) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ROLE_COLORS[i] }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Management Actions */}
      <Card className="border-gray-200/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Quick Management Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href="/admin/users">
              <Button variant="outline" className="w-full gap-2">
                <Users className="h-4 w-4" />
                Manage Users
              </Button>
            </Link>
            <Link href="/admin/departments">
              <Button variant="outline" className="w-full gap-2">
                <Building2 className="h-4 w-4" />
                Manage Departments
              </Button>
            </Link>
            <Link href="/admin/categories">
              <Button variant="outline" className="w-full gap-2">
                <Package className="h-4 w-4" />
                Manage Categories
              </Button>
            </Link>
            <Link href="/reports">
              <Button variant="outline" className="w-full gap-2">
                <TrendingUp className="h-4 w-4" />
                View Reports
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6">
      {user.role === 'employee' && <EmployeeDashboard />}
      {user.role === 'procurement' && <ProcurementDashboard />}
      {user.role === 'admin' && <AdminDashboard />}
    </div>
  );
}
