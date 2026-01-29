'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, FileText, Clock, CheckCircle, XCircle, 
  TrendingUp, Users, Package, AlertTriangle, Building2
} from 'lucide-react';
import Link from 'next/link';

// Monthly trend data with more months
const requestsData = [
  { month: 'Jan', pending: 12, approved: 25, rejected: 3 },
  { month: 'Feb', pending: 8, approved: 30, rejected: 2 },
  { month: 'Mar', pending: 15, approved: 28, rejected: 5 },
  { month: 'Apr', pending: 10, approved: 35, rejected: 1 },
  { month: 'May', pending: 14, approved: 32, rejected: 4 },
  { month: 'Jun', pending: 9, approved: 38, rejected: 3 },
];

// Status distribution data
const statusData = [
  { name: 'Approved', value: 188, color: '#22c55e', percentage: 67 },
  { name: 'Pending', value: 68, color: '#f59e0b', percentage: 24 },
  { name: 'Rejected', value: 18, color: '#ef4444', percentage: 6 },
  { name: 'Draft', value: 12, color: '#6b7280', percentage: 3 },
];

// Priority breakdown data
const priorityData = [
  { priority: 'High', count: 35, color: '#ef4444', percentage: 21 },
  { priority: 'Medium', count: 78, color: '#f59e0b', percentage: 46 },
  { priority: 'Low', count: 56, color: '#22c55e', percentage: 33 },
];

// Department data for procurement
const departmentData = [
  { name: 'IT', requests: 45, color: '#3b82f6', percentage: 32 },
  { name: 'HR', requests: 32, color: '#22c55e', percentage: 23 },
  { name: 'Finance', requests: 28, color: '#f59e0b', percentage: 20 },
  { name: 'Operations', requests: 38, color: '#8b5cf6', percentage: 25 },
];

// Monthly trend data
const monthlyData = [
  { month: 'Jan', approved: 25, pending: 12, rejected: 3 },
  { month: 'Feb', approved: 30, pending: 8, rejected: 2 },
  { month: 'Mar', approved: 28, pending: 15, rejected: 5 },
  { month: 'Apr', approved: 35, pending: 10, rejected: 1 },
  { month: 'May', approved: 32, pending: 14, rejected: 4 },
  { month: 'Jun', approved: 38, pending: 9, rejected: 3 },
];

export default function DashboardContent() {
  const { user } = useAuth();

  const EmployeeDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Welcome back, {user?.name.split(' ')[0]} 👋</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage your movement requests efficiently</p>
        </div>
        <Link href="/requests/new" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 gap-2">
            <Plus className="h-4 w-4" />
            New Request
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-3 sm:p-4 lg:p-6 relative">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 truncate">Total Requests</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">24</p>
                <p className="text-xs text-green-600 mt-1 hidden sm:block">↑ 12% this month</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-3 sm:p-4 lg:p-6 relative">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 truncate">Pending</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">8</p>
                <p className="text-xs text-amber-600 mt-1 hidden sm:block">Awaiting review</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 flex-shrink-0">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-3 sm:p-4 lg:p-6 relative">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 truncate">Approved</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">14</p>
                <p className="text-xs text-green-600 mt-1 hidden sm:block">58% success rate</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30 flex-shrink-0">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-3 sm:p-4 lg:p-6 relative">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 truncate">Rejected</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">2</p>
                <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Needs revision</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30 flex-shrink-0">
                <XCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              Request Status Overview
            </CardTitle>
            <CardDescription className="text-sm">Your requests by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24">
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              Priority Breakdown
            </CardTitle>
            <CardDescription className="text-sm">Requests by priority level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priorityData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm font-medium">{item.priority} Priority</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            Recent Activity
          </CardTitle>
          <CardDescription>Your latest request updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border/30">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 animate-pulse"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Office Equipment Transfer approved</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 flex-shrink-0">Approved</Badge>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border/30">
              <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0 animate-pulse"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Stationery Request pending review</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
              <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200 flex-shrink-0">Pending</Badge>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border/30">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">New request created</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 flex-shrink-0">Created</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ProcurementDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Procurement Dashboard 📦</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Review and manage movement requests</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Pending Review</p>
                <p className="text-3xl font-bold text-foreground">15</p>
                <p className="text-xs text-amber-600 mt-1">Needs attention</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Approved Today</p>
                <p className="text-3xl font-bold text-foreground">8</p>
                <p className="text-xs text-green-600 mt-1">↑ 25% vs yesterday</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Value</p>
                <p className="text-3xl font-bold text-foreground">45M RWF</p>
                <p className="text-xs text-blue-600 mt-1">This month</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Departments</p>
                <p className="text-3xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground mt-1">Active users</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Monthly Requests Trend
            </CardTitle>
            <CardDescription>Request volume over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.month}</span>
                    <span className="text-muted-foreground">
                      {item.approved + item.pending + item.rejected} total
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">Approved: {item.approved}</span>
                      <Progress value={(item.approved / (item.approved + item.pending + item.rejected)) * 100} className="h-1 flex-1" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-xs">Pending: {item.pending}</span>
                      <Progress value={(item.pending / (item.approved + item.pending + item.rejected)) * 100} className="h-1 flex-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Requests by Department
            </CardTitle>
            <CardDescription>Department-wise request distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24">
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {item.requests}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200/60 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            Priority Actions
          </CardTitle>
          <CardDescription>High priority requests requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200/60 rounded-lg hover:shadow-md hover:border-primary/30 transition-all group">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0 animate-pulse"></div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Emergency IT Equipment - REQ-045</p>
                  <p className="text-sm text-muted-foreground">Submitted by IT Department • High Priority</p>
                </div>
              </div>
              <div className="flex space-x-2 flex-shrink-0">
                <Link href="/approvals">
                  <Button size="sm" variant="outline">Review</Button>
                </Link>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 shadow-sm">Approve</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200/60 rounded-lg hover:shadow-md hover:border-primary/30 transition-all group">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-amber-500 rounded-full flex-shrink-0 animate-pulse"></div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Office Furniture Request - REQ-043</p>
                  <p className="text-sm text-muted-foreground">Submitted by HR Department • Medium Priority</p>
                </div>
              </div>
              <div className="flex space-x-2 flex-shrink-0">
                <Link href="/approvals">
                  <Button size="sm" variant="outline">Review</Button>
                </Link>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 shadow-sm">Approve</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AdminDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Admin Dashboard ⚙️</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">System overview and management</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Users</p>
                <p className="text-3xl font-bold text-foreground">156</p>
                <p className="text-xs text-green-600 mt-1">↑ 8 new this week</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Requests</p>
                <p className="text-3xl font-bold text-foreground">89</p>
                <p className="text-xs text-emerald-600 mt-1">↑ 15% increase</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">System Health</p>
                <p className="text-3xl font-bold text-foreground">98%</p>
                <p className="text-xs text-green-600 mt-1">All systems operational</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-violet-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Departments</p>
                <p className="text-3xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground mt-1">Active departments</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              System Performance
            </CardTitle>
            <CardDescription>Real-time system metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] relative bg-gradient-to-b from-orange-50 to-white rounded-lg border p-4">
              <svg width="100%" height="100%" className="overflow-visible">
                <defs>
                  <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[0, 1, 2, 3].map(i => (
                  <line key={i} x1="0" y1={40 + i * 40} x2="100%" y2={40 + i * 40} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                ))}
                {[85, 94, 99.8, 92, 88].map((_, i) => (
                  <line key={i} x1={40 + i * 40} y1="0" x2={40 + i * 40} y2="100%" stroke="#f3f4f6" strokeWidth="1" />
                ))}
                
                {/* Zigzag line */}
                <path
                  d={`M 40,${180 - (85 * 1.6)} L 80,${180 - (94 * 1.6)} L 120,${180 - (99.8 * 1.6)} L 160,${180 - (92 * 1.6)} L 200,${180 - (88 * 1.6)}`}
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Fill area */}
                <path
                  d={`M 40,180 L 40,${180 - (85 * 1.6)} L 80,${180 - (94 * 1.6)} L 120,${180 - (99.8 * 1.6)} L 160,${180 - (92 * 1.6)} L 200,${180 - (88 * 1.6)} L 200,180 Z`}
                  fill="url(#performanceGradient)"
                />
                
                {/* Data points */}
                {[85, 94, 99.8, 92, 88].map((value, i) => (
                  <g key={i}>
                    <circle
                      cx={40 + i * 40}
                      cy={180 - (value * 1.6)}
                      r="4"
                      fill="#f97316"
                      stroke="white"
                      strokeWidth="2"
                      className="hover:r-6 transition-all cursor-pointer"
                    />
                    <text x={40 + i * 40} y={200} textAnchor="middle" className="text-xs fill-gray-600 font-medium">
                      {['CPU', 'Memory', 'Uptime', 'Response', 'Load'][i]}
                    </text>
                    <text x={40 + i * 40} y={180 - (value * 1.6) - 10} textAnchor="middle" className="text-xs fill-gray-800 font-bold">
                      {value}%
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Growth
            </CardTitle>
            <CardDescription>New users per month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] relative bg-gradient-to-b from-cyan-50 to-white rounded-lg border p-4">
              <svg width="100%" height="100%" className="overflow-visible">
                <defs>
                  <linearGradient id="userGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[0, 1, 2, 3].map(i => (
                  <line key={i} x1="0" y1={40 + i * 40} x2="100%" y2={40 + i * 40} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                ))}
                {[12, 18, 25, 31, 28, 35].map((_, i) => (
                  <line key={i} x1={30 + i * 35} y1="0" x2={30 + i * 35} y2="100%" stroke="#f3f4f6" strokeWidth="1" />
                ))}
                
                {/* Zigzag line */}
                <path
                  d={`M 30,${180 - (12 * 4)} L 65,${180 - (18 * 4)} L 100,${180 - (25 * 4)} L 135,${180 - (31 * 4)} L 170,${180 - (28 * 4)} L 205,${180 - (35 * 4)}`}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Fill area */}
                <path
                  d={`M 30,180 L 30,${180 - (12 * 4)} L 65,${180 - (18 * 4)} L 100,${180 - (25 * 4)} L 135,${180 - (31 * 4)} L 170,${180 - (28 * 4)} L 205,${180 - (35 * 4)} L 205,180 Z`}
                  fill="url(#userGradient)"
                />
                
                {/* Data points */}
                {[12, 18, 25, 31, 28, 35].map((value, i) => (
                  <g key={i}>
                    <circle
                      cx={30 + i * 35}
                      cy={180 - (value * 4)}
                      r="4"
                      fill="#06b6d4"
                      stroke="white"
                      strokeWidth="2"
                      className="hover:r-6 transition-all cursor-pointer"
                    />
                    <text x={30 + i * 35} y={200} textAnchor="middle" className="text-xs fill-gray-600 font-medium">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                    </text>
                    <text x={30 + i * 35} y={180 - (value * 4) - 10} textAnchor="middle" className="text-xs fill-gray-800 font-bold">
                      {value}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Role Distribution
            </CardTitle>
            <CardDescription>Users by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { role: 'Employee', count: 128, color: '#22c55e', percentage: 82 },
                { role: 'Procurement', count: 18, color: '#3b82f6', percentage: 12 },
                { role: 'Admin', count: 10, color: '#8b5cf6', percentage: 6 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium">{item.role}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24">
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Department Activity
            </CardTitle>
            <CardDescription>Users vs requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] relative bg-gradient-to-b from-violet-50 to-white rounded-lg border p-4">
              <svg width="100%" height="100%" className="overflow-visible">
                <defs>
                  <linearGradient id="activityGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="activityGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[0, 1, 2, 3].map(i => (
                  <line key={i} x1="0" y1={40 + i * 40} x2="100%" y2={40 + i * 40} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                ))}
                {[32, 28, 24, 35].map((_, i) => (
                  <line key={i} x1={50 + i * 50} y1="0" x2={50 + i * 50} y2="100%" stroke="#f3f4f6" strokeWidth="1" />
                ))}
                
                {/* Users zigzag line */}
                <path
                  d={`M 50,${180 - (32 * 4)} L 100,${180 - (28 * 4)} L 150,${180 - (24 * 4)} L 200,${180 - (35 * 4)}`}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Requests zigzag line */}
                <path
                  d={`M 50,${180 - (45 * 3)} L 100,${180 - (32 * 3)} L 150,${180 - (28 * 3)} L 200,${180 - (38 * 3)}`}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="5,5"
                />
                
                {/* Data points */}
                {[32, 28, 24, 35].map((users, i) => {
                  const requests = [45, 32, 28, 38][i];
                  return (
                    <g key={i}>
                      <circle cx={50 + i * 50} cy={180 - (users * 4)} r="4" fill="#8b5cf6" stroke="white" strokeWidth="2" />
                      <circle cx={50 + i * 50} cy={180 - (requests * 3)} r="3" fill="#06b6d4" stroke="white" strokeWidth="2" />
                      <text x={50 + i * 50} y={200} textAnchor="middle" className="text-xs fill-gray-600 font-medium">
                        {['IT', 'HR', 'Finance', 'Ops'][i]}
                      </text>
                      <text x={50 + i * 50} y={180 - (users * 4) - 10} textAnchor="middle" className="text-xs fill-violet-700 font-bold">
                        {users}
                      </text>
                    </g>
                  );
                })}
                
                {/* Legend */}
                <g transform="translate(10, 10)">
                  <circle cx="5" cy="5" r="3" fill="#8b5cf6" />
                  <text x="15" y="9" className="text-xs fill-gray-700">Users</text>
                  <circle cx="5" cy="20" r="3" fill="#06b6d4" />
                  <text x="15" y="24" className="text-xs fill-gray-700">Requests</text>
                </g>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
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
