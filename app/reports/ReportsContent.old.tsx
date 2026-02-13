'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Download, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Filter,
  DollarSign,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  Search,
  BarChart3,
  PieChart,
  FileSpreadsheet,
  Mail
} from 'lucide-react';

// Monthly Requests Trend Data
const monthlyRequestsData = [
  { month: 'Jan', total: 40, approved: 32, rejected: 5, pending: 3, approvedPercent: 80, pendingPercent: 7.5 },
  { month: 'Feb', total: 48, approved: 40, rejected: 4, pending: 4, approvedPercent: 83, pendingPercent: 8.3 },
  { month: 'Mar', total: 51, approved: 43, rejected: 6, pending: 2, approvedPercent: 84, pendingPercent: 3.9 },
  { month: 'Apr', total: 59, approved: 50, rejected: 5, pending: 4, approvedPercent: 85, pendingPercent: 6.8 },
  { month: 'May', total: 65, approved: 55, rejected: 7, pending: 3, approvedPercent: 85, pendingPercent: 4.6 },
  { month: 'Jun', total: 58, approved: 48, rejected: 6, pending: 4, approvedPercent: 83, pendingPercent: 6.9 },
];

// Requests by Department Data
const departmentData = [
  { name: 'IT', count: 45, value: 35000000, percentage: 27 },
  { name: 'HR', count: 32, value: 12000000, percentage: 19 },
  { name: 'Finance', count: 28, value: 18000000, percentage: 17 },
  { name: 'Operations', count: 38, value: 28000000, percentage: 23 },
  { name: 'Marketing', count: 22, value: 15000000, percentage: 13 },
];

// Request Status Distribution Data
const statusDistributionData = [
  { name: 'Approved', value: 165, color: '#22c55e', percentage: 80 },
  { name: 'Rejected', value: 20, color: '#ef4444', percentage: 10 },
  { name: 'Pending', value: 13, color: '#f59e0b', percentage: 6 },
  { name: 'Draft', value: 8, color: '#6b7280', percentage: 4 },
];

// Priority Breakdown Data
const priorityData = [
  { priority: 'High', count: 45, color: '#ef4444', percentage: 22 },
  { priority: 'Medium', count: 98, color: '#f59e0b', percentage: 48 },
  { priority: 'Low', count: 63, color: '#22c55e', percentage: 30 },
];

// Processing Timeline Data
const processingTimelineData = [
  { week: 'Week 1', avgDays: 2.3, target: 2.5 },
  { week: 'Week 2', avgDays: 1.9, target: 2.5 },
  { week: 'Week 3', avgDays: 2.1, target: 2.5 },
  { week: 'Week 4', avgDays: 1.8, target: 2.5 },
];

export default function ReportsContent() {
  const [dateRange, setDateRange] = useState('quarter');
  const [reportType, setReportType] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Controls */}
      <Card className="border-gray-200/60 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Advanced Reports Dashboard
              </CardTitle>
              <CardDescription>Comprehensive analytics with real-time data</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setAutoRefresh(!autoRefresh)}>
                <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
                {autoRefresh ? 'Auto' : 'Manual'}
              </Button>
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Export All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Department Filter</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quick Actions</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Enhanced Summary Stats with Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Requests</p>
                <p className="text-3xl font-bold text-foreground">206</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-green-600">↑ 23% vs last {dateRange}</p>
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700">+47</Badge>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
              <Download className="h-3 w-3 mr-1" /> Export CSV
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Approval Rate</p>
                <p className="text-3xl font-bold text-foreground">80%</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-green-600">↑ 5% vs last {dateRange}</p>
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700">Target: 75%</Badge>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
              <PieChart className="h-3 w-3 mr-1" /> View Breakdown
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Avg Processing</p>
                <p className="text-3xl font-bold text-foreground">2.0d</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-amber-600">↓ 0.5d vs last {dateRange}</p>
                  <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700">Target: 2.5d</Badge>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
              <BarChart3 className="h-3 w-3 mr-1" /> Timeline View
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Value</p>
                <p className="text-3xl font-bold text-foreground">108M</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-purple-600">↑ 15M vs last {dateRange}</p>
                  <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">RWF</Badge>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
              <FileSpreadsheet className="h-3 w-3 mr-1" /> Cost Analysis
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Monthly Requests Trend */}
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Monthly Requests Trend
            </CardTitle>
            <CardDescription>Request volume over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] relative bg-gradient-to-b from-slate-50 to-white rounded-lg border p-4">
              <svg width="100%" height="100%" className="overflow-visible">
                <defs>
                  <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map(i => (
                  <line key={i} x1="0" y1={50 + i * 50} x2="100%" y2={50 + i * 50} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                ))}
                {monthlyRequestsData.map((_, i) => (
                  <line key={i} x1={60 + i * 80} y1="0" x2={60 + i * 80} y2="100%" stroke="#f3f4f6" strokeWidth="1" />
                ))}
                
                {/* Zigzag line */}
                <path
                  d={`M 60,${250 - (monthlyRequestsData[0].total * 3)} ${monthlyRequestsData.map((item, i) => 
                    `L ${60 + i * 80},${250 - (item.total * 3)}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Fill area */}
                <path
                  d={`M 60,250 L 60,${250 - (monthlyRequestsData[0].total * 3)} ${monthlyRequestsData.map((item, i) => 
                    `L ${60 + i * 80},${250 - (item.total * 3)}`
                  ).join(' ')} L ${60 + (monthlyRequestsData.length - 1) * 80},250 Z`}
                  fill="url(#trendGradient)"
                />
                
                {/* Data points */}
                {monthlyRequestsData.map((item, i) => (
                  <g key={i}>
                    <circle
                      cx={60 + i * 80}
                      cy={250 - (item.total * 3)}
                      r="6"
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth="2"
                      className="hover:r-8 transition-all cursor-pointer"
                    />
                    <text x={60 + i * 80} y={270} textAnchor="middle" className="text-xs fill-gray-600 font-medium">
                      {item.month}
                    </text>
                    <text x={60 + i * 80} y={250 - (item.total * 3) - 15} textAnchor="middle" className="text-xs fill-gray-800 font-bold">
                      {item.total}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Requests by Department */}
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
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium">{item.name}</span>
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

        {/* Request Status Distribution */}
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Request Status Distribution
            </CardTitle>
            <CardDescription>Overview of all request statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusDistributionData.map((item, index) => (
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

        {/* Priority Breakdown */}
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Priority Breakdown
            </CardTitle>
            <CardDescription>Requests by priority level</CardDescription>
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

        {/* Processing Timeline */}
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Processing Timeline
            </CardTitle>
            <CardDescription>Average processing time per week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] relative bg-gradient-to-b from-amber-50 to-white rounded-lg border p-4">
              <svg width="100%" height="100%" className="overflow-visible">
                <defs>
                  <linearGradient id="timeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map(i => (
                  <line key={i} x1="0" y1={50 + i * 50} x2="100%" y2={50 + i * 50} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                ))}
                {processingTimelineData.map((_, i) => (
                  <line key={i} x1={80 + i * 120} y1="0" x2={80 + i * 120} y2="100%" stroke="#f3f4f6" strokeWidth="1" />
                ))}
                
                {/* Target line */}
                <line x1="0" y1={250 - (2.5 * 80)} x2="100%" y2={250 - (2.5 * 80)} stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5" />
                <text x="10" y={250 - (2.5 * 80) - 5} className="text-xs fill-red-600 font-medium">Target: 2.5d</text>
                
                {/* Zigzag line */}
                <path
                  d={`M 80,${250 - (processingTimelineData[0].avgDays * 80)} ${processingTimelineData.map((item, i) => 
                    `L ${80 + i * 120},${250 - (item.avgDays * 80)}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Fill area */}
                <path
                  d={`M 80,250 L 80,${250 - (processingTimelineData[0].avgDays * 80)} ${processingTimelineData.map((item, i) => 
                    `L ${80 + i * 120},${250 - (item.avgDays * 80)}`
                  ).join(' ')} L ${80 + (processingTimelineData.length - 1) * 120},250 Z`}
                  fill="url(#timeGradient)"
                />
                
                {/* Data points */}
                {processingTimelineData.map((item, i) => (
                  <g key={i}>
                    <circle
                      cx={80 + i * 120}
                      cy={250 - (item.avgDays * 80)}
                      r="6"
                      fill={item.avgDays <= item.target ? '#22c55e' : '#f59e0b'}
                      stroke="white"
                      strokeWidth="2"
                      className="hover:r-8 transition-all cursor-pointer"
                    />
                    <text x={80 + i * 120} y={270} textAnchor="middle" className="text-xs fill-gray-600 font-medium">
                      {item.week}
                    </text>
                    <text x={80 + i * 120} y={250 - (item.avgDays * 80) - 15} textAnchor="middle" className="text-xs fill-gray-800 font-bold">
                      {item.avgDays}d
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Report Builder */}
      <Card className="border-gray-200/60 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Custom Report Builder
              </CardTitle>
              <CardDescription>Create and schedule custom reports</CardDescription>
            </div>
            <Button className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Report Templates</h4>
              {[
                {name: 'Monthly Financial Summary', desc: 'Complete financial overview', icon: DollarSign},
                {name: 'Department Performance', desc: 'Department-wise analytics', icon: BarChart3},
                {name: 'User Activity Report', desc: 'User engagement metrics', icon: TrendingUp}
              ].map((template, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <template.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{template.name}</p>
                    <p className="text-xs text-muted-foreground">{template.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Export Options</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <FileSpreadsheet className="h-4 w-4" /> Excel
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <FileText className="h-4 w-4" /> PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" /> CSV
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Mail className="h-4 w-4" /> Email
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Scheduled Reports</h4>
              {[
                {name: 'Weekly Summary', next: 'Mon 9:00 AM', status: 'active'},
                {name: 'Monthly Report', next: '1st of month', status: 'active'},
                {name: 'Quarterly Review', next: 'Apr 1st', status: 'paused'}
              ].map((report, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <p className="text-sm font-medium">{report.name}</p>
                    <p className="text-xs text-muted-foreground">{report.next}</p>
                  </div>
                  <Badge variant={report.status === 'active' ? 'default' : 'secondary'}>
                    {report.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-gray-200/60 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Department Financial Summary</CardTitle>
              <CardDescription>Total request values by department with drill-down capabilities</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Search className="h-4 w-4" />
                Advanced Search
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-200/60 overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-muted/30 border-b border-gray-200/60">
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Department</th>
                  <th className="text-right p-4 text-sm font-semibold text-foreground">Request Count</th>
                  <th className="text-right p-4 text-sm font-semibold text-foreground">Total Value (RWF)</th>
                  <th className="text-right p-4 text-sm font-semibold text-foreground">Avg Value (RWF)</th>
                  <th className="text-right p-4 text-sm font-semibold text-foreground">% of Total</th>
                  <th className="text-right p-4 text-sm font-semibold text-foreground">Trend</th>
                  <th className="text-right p-4 text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departmentData.map((dept, index) => {
                  const totalValue = departmentData.reduce((sum, d) => sum + d.value, 0);
                  const percentage = ((dept.value / totalValue) * 100).toFixed(1);
                  const trends = ['+12%', '+8%', '-3%', '+15%', '+5%'];
                  return (
                    <tr key={index} className="border-b border-gray-200/60 hover:bg-muted/20 transition-colors">
                      <td className="p-4 text-sm font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          {dept.name}
                          <Badge variant="outline" className="text-xs">{dept.count} active</Badge>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-right text-muted-foreground">{dept.count}</td>
                      <td className="p-4 text-sm text-right font-medium text-foreground">
                        {(dept.value / 1000000).toFixed(1)}M
                      </td>
                      <td className="p-4 text-sm text-right text-muted-foreground">
                        {((dept.value / dept.count) / 1000).toFixed(0)}K
                      </td>
                      <td className="p-4 text-sm text-right">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {percentage}%
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-right">
                        <span className={`text-xs font-medium ${
                          trends[index].startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {trends[index]}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-right">
                        <Button variant="ghost" size="sm" className="text-xs">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-muted/50 font-semibold">
                  <td className="p-4 text-sm">Total</td>
                  <td className="p-4 text-sm text-right">
                    {departmentData.reduce((sum, d) => sum + d.count, 0)}
                  </td>
                  <td className="p-4 text-sm text-right">
                    {(departmentData.reduce((sum, d) => sum + d.value, 0) / 1000000).toFixed(1)}M
                  </td>
                  <td className="p-4 text-sm text-right">-</td>
                  <td className="p-4 text-sm text-right">100%</td>
                  <td className="p-4 text-sm text-right text-green-600">+9.2%</td>
                  <td className="p-4 text-sm text-right">-</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
