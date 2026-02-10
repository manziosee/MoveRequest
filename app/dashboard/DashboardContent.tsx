'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Home, RefreshCw, FileText, Clock, CheckCircle, XCircle, 
  TrendingUp, Users, Package, AlertTriangle, Building2
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Area
} from 'recharts';
import Link from 'next/link';

// Movement Request System Data
const monthlyRequestsData = [
  { month: 'Jan', pending: 12, approved: 25, rejected: 3, total: 40 },
  { month: 'Feb', pending: 8, approved: 30, rejected: 2, total: 40 },
  { month: 'Mar', pending: 15, approved: 28, rejected: 5, total: 48 },
  { month: 'Apr', pending: 10, approved: 35, rejected: 1, total: 46 },
  { month: 'May', pending: 14, approved: 32, rejected: 4, total: 50 },
  { month: 'Jun', pending: 9, approved: 38, rejected: 3, total: 50 },
];

const statusData = [
  { name: 'Approved', value: 188, color: '#22c55e' },
  { name: 'Pending', value: 68, color: '#f59e0b' },
  { name: 'Rejected', value: 18, color: '#ef4444' },
  { name: 'Draft', value: 12, color: '#6b7280' },
];

const priorityData = [
  { priority: 'High', count: 35, color: '#ef4444' },
  { priority: 'Medium', count: 78, color: '#f59e0b' },
  { priority: 'Low', count: 56, color: '#22c55e' },
];

const departmentData = [
  { name: 'IT', requests: 45, value: 35000000 },
  { name: 'HR', requests: 32, value: 12000000 },
  { name: 'Finance', requests: 28, value: 18000000 },
  { name: 'Operations', requests: 38, value: 28000000 },
  { name: 'Marketing', requests: 22, value: 15000000 },
];

const categoryData = [
  { name: 'Office Equipment', value: 85, color: '#2E5AAC' },
  { name: 'IT Hardware', value: 62, color: '#F5C518' },
  { name: 'Furniture', value: 48, color: '#E57373' },
  { name: 'Stationery', value: 35, color: '#4CAF50' },
  { name: 'Vehicles', value: 24, color: '#64B5F6' },
];

// Format currency in RWF
const formatCurrency = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M RWF`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K RWF`;
  return `${value} RWF`;
};

export default function DashboardContent() {
  const { user } = useAuth();

  const EmployeeDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#3D4B6E] to-[#2E3A54] rounded-xl p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Home className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <RefreshCw className="h-5 w-5" />
              </Button>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">My Requests Overview</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">All Status</Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">All Categories</Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">Last 6 Months</Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">2024</Badge>
            <Link href="/requests/new">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 gap-2">
                <Plus className="h-4 w-4" />
                New Request
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Total Requests</p>
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">24</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Pending</p>
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <p className="text-3xl font-bold text-amber-600">8</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Approved</p>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">14</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Rejected</p>
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">2</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Requests Trend */}
        <Card className="border-gray-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Monthly Requests Trend
            </CardTitle>
            <CardDescription>Request volume over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="w-full overflow-x-auto">
            <LineChart width={500} height={300} data={monthlyRequestsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="approved" stroke="#22c55e" strokeWidth={2} name="Approved" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} name="Pending" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} name="Rejected" dot={{ r: 4 }} />
            </LineChart>
          </CardContent>
        </Card>

        {/* Request Status Distribution */}
        <Card className="border-gray-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Request Status Distribution</CardTitle>
            <CardDescription>Overall status breakdown</CardDescription>
          </CardHeader>
          <CardContent className="w-full overflow-x-auto flex justify-center">
            <PieChart width={400} height={300}>
              <Pie
                data={statusData}
                cx={200}
                cy={150}
                labelLine={true}
                label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>

        {/* Requests by Priority */}
        <Card className="border-gray-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Requests by Priority</CardTitle>
            <CardDescription>Priority level distribution</CardDescription>
          </CardHeader>
          <CardContent className="w-full overflow-x-auto">
            <BarChart width={500} height={300} data={priorityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="priority" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </CardContent>
        </Card>

        {/* Requests by Category */}
        <Card className="border-gray-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Requests by Category</CardTitle>
            <CardDescription>Top requested item categories</CardDescription>
          </CardHeader>
          <CardContent className="w-full overflow-x-auto">
            <BarChart width={500} height={300} data={categoryData} layout="horizontal" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis dataKey="name" type="category" width={100} stroke="#6b7280" style={{ fontSize: '11px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-gray-200/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
          <CardDescription>Common tasks and recent activity</CardDescription>
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
                <AlertTriangle className="h-4 w-4" />
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
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#3D4B6E] to-[#2E3A54] rounded-xl p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Home className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <RefreshCw className="h-5 w-5" />
              </Button>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Procurement Dashboard</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">All Departments</Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">Pending Review</Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">Last 6 Months</Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">2024</Badge>
            <Link href="/approvals">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 gap-2">
                <CheckCircle className="h-4 w-4" />
                Review Requests
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Pending Review</p>
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-600">15</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Approved Today</p>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">8</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Total Value</p>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">45M RWF</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Departments</p>
              <Building2 className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">12</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">This Month</p>
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">89</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Avg. Time</p>
              <Clock className="h-4 w-4 text-cyan-600" />
            </div>
            <p className="text-2xl font-bold text-cyan-600">2.3 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6">
        {/* Monthly Approval Trend */}
        <Card className="border-gray-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Monthly Request & Approval Trend
            </CardTitle>
            <CardDescription>Request volume and approval rate over time</CardDescription>
          </CardHeader>
          <CardContent className="w-full overflow-x-auto">
            <ComposedChart width={1000} height={350} data={monthlyRequestsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="total" fill="#e0e7ff" stroke="#6366f1" name="Total Requests" />
              <Bar dataKey="approved" fill="#22c55e" radius={[8, 8, 0, 0]} name="Approved" />
              <Bar dataKey="pending" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Pending" />
              <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} name="Rejected" dot={{ r: 4 }} />
            </ComposedChart>
          </CardContent>
        </Card>

        {/* Bottom Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Requests by Department */}
          <Card className="border-gray-200/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Requests by Department</CardTitle>
              <CardDescription>Department-wise request volume</CardDescription>
            </CardHeader>
            <CardContent className="w-full overflow-x-auto">
              <BarChart width={450} height={300} data={departmentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="requests" fill="#2E5AAC" radius={[8, 8, 0, 0]} />
              </BarChart>
            </CardContent>
          </Card>

          {/* Department Value */}
          <Card className="border-gray-200/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Department Spend Value</CardTitle>
              <CardDescription>Total estimated value by department</CardDescription>
            </CardHeader>
            <CardContent className="w-full overflow-x-auto flex justify-center">
              <PieChart width={400} height={300}>
                <Pie
                  data={departmentData}
                  cx={200}
                  cy={150}
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#2E5AAC" />
                  <Cell fill="#F5C518" />
                  <Cell fill="#E57373" />
                  <Cell fill="#4CAF50" />
                  <Cell fill="#64B5F6" />
                </Pie>
                <Tooltip formatter={(value: any) => formatCurrency(value)} />
              </PieChart>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const AdminDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#3D4B6E] to-[#2E3A54] rounded-xl p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Home className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <RefreshCw className="h-5 w-5" />
              </Button>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">System Overview</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">All Users</Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">All Departments</Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">This Quarter</Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">2024</Badge>
            <Link href="/admin/users">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 gap-2">
                <Users className="h-4 w-4" />
                Manage Users
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Total Users</p>
              <Users className="h-4 w-4 text-cyan-600" />
            </div>
            <p className="text-2xl font-bold text-cyan-600">156</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Departments</p>
              <Building2 className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">12</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Total Requests</p>
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">1,245</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Categories</p>
              <Package className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">24</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">Locations</p>
              <Building2 className="h-4 w-4 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">18</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">System Health</p>
              <CheckCircle className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-600">98%</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6">
        {/* System Activity Trend */}
        <Card className="border-gray-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              System Activity Trend
            </CardTitle>
            <CardDescription>Request submissions and approvals over time</CardDescription>
          </CardHeader>
          <CardContent className="w-full overflow-x-auto">
            <ComposedChart width={1000} height={350} data={monthlyRequestsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="total" fill="#ddd6fe" stroke="#7c3aed" name="Total Requests" fillOpacity={0.6} />
              <Line type="monotone" dataKey="approved" stroke="#22c55e" strokeWidth={2} name="Approved" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} name="Pending" dot={{ r: 4 }} />
            </ComposedChart>
          </CardContent>
        </Card>

        {/* Bottom Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Distribution by Department */}
          <Card className="border-gray-200/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Users by Department</CardTitle>
              <CardDescription>Active user distribution</CardDescription>
            </CardHeader>
            <CardContent className="w-full overflow-x-auto">
              <BarChart width={450} height={300} data={departmentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="requests" fill="#7c3aed" radius={[8, 8, 0, 0]} name="Users" />
              </BarChart>
            </CardContent>
          </Card>

          {/* Department Activity */}
          <Card className="border-gray-200/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Department Activity</CardTitle>
              <CardDescription>Requests submitted per department</CardDescription>
            </CardHeader>
            <CardContent className="w-full overflow-x-auto flex justify-center">
              <PieChart width={400} height={300}>
                <Pie
                  data={departmentData}
                  cx={200}
                  cy={150}
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="requests"
                >
                  <Cell fill="#2E5AAC" />
                  <Cell fill="#F5C518" />
                  <Cell fill="#E57373" />
                  <Cell fill="#4CAF50" />
                  <Cell fill="#64B5F6" />
                </Pie>
                <Tooltip />
              </PieChart>
            </CardContent>
          </Card>

          {/* Request Status Overview */}
          <Card className="border-gray-200/60 shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Request Status Overview</CardTitle>
              <CardDescription>Overall system request status distribution</CardDescription>
            </CardHeader>
            <CardContent className="w-full overflow-x-auto">
              <BarChart width={900} height={300} data={statusData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Management Actions */}
      <Card className="border-gray-200/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Quick Management Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
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

  if (!user) return null;

  return (
    <div className="p-6">
      {user.role === 'employee' && <EmployeeDashboard />}
      {user.role === 'procurement' && <ProcurementDashboard />}
      {user.role === 'admin' && <AdminDashboard />}
    </div>
  );
}
