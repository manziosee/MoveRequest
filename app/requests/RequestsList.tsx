'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Filter, Eye, FileText, Clock, CheckCircle, XCircle, TrendingUp, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface Request {
  id: number;
  title: string;
  status: string;
  priority: string;
  department: string;
  category: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export default function RequestsList() {
  const { user } = useAuth();
  const canCreateRequest = user?.role === 'employee';
  const [requests, setRequests] = useState<Request[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await api.getRequests(token);
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterRequests = useCallback(() => {
    let filtered = requests;

    if (searchTerm) {
      filtered = filtered.filter(req =>
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.id.toString().includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    setFilteredRequests(filtered);
  }, [requests, searchTerm, statusFilter]);

  useEffect(() => {
    filterRequests();
  }, [filterRequests]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'draft': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const statusStats = [
    { name: 'Approved', value: requests.filter(r => r.status === 'approved').length, color: '#16A34A' },
    { name: 'Pending', value: requests.filter(r => r.status === 'pending').length, color: '#F59E0B' },
    { name: 'Rejected', value: requests.filter(r => r.status === 'rejected').length, color: '#DC2626' },
    { name: 'Draft', value: requests.filter(r => r.status === 'draft').length, color: '#6B7280' },
  ];

  const priorityData = [
    { priority: 'High', count: requests.filter(r => r.priority === 'high').length },
    { priority: 'Medium', count: requests.filter(r => r.priority === 'medium').length },
    { priority: 'Low', count: requests.filter(r => r.priority === 'low').length },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Movement Requests 📦</h1>
          <p className="text-muted-foreground mt-1">Manage your movement and procurement requests</p>
        </div>
        {canCreateRequest && (
          <Link href="/requests/new">
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 gap-2">
              <Plus className="h-4 w-4" />
              New Request
            </Button>
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Requests</p>
                <p className="text-3xl font-bold text-foreground">{requests.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Pending</p>
                <p className="text-3xl font-bold text-foreground">
                  {requests.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Approved</p>
                <p className="text-3xl font-bold text-foreground">
                  {requests.filter(r => r.status === 'approved').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Success Rate</p>
                <p className="text-3xl font-bold text-foreground">
                  {requests.length > 0 
                    ? Math.round((requests.filter(r => r.status === 'approved').length / requests.length) * 100)
                    : 0}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-base">Request Status Distribution</CardTitle>
            <CardDescription>Overview of all request statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusStats.map((item, index) => (
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
                      <Progress value={(item.value / requests.length) * 100} className="h-2" />
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
          <CardHeader>
            <CardTitle className="text-base">Priority Breakdown</CardTitle>
            <CardDescription>Requests by priority level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] relative bg-gradient-to-b from-blue-50 to-white rounded-lg border p-4">
              <svg width="100%" height="100%" className="overflow-visible">
                <defs>
                  <linearGradient id="priorityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[0, 1, 2, 3].map(i => (
                  <line key={i} x1="0" y1={40 + i * 40} x2="100%" y2={40 + i * 40} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                ))}
                {priorityData.map((_, i) => (
                  <line key={i} x1={60 + i * 80} y1="0" x2={60 + i * 80} y2="100%" stroke="#f3f4f6" strokeWidth="1" />
                ))}
                
                {/* Zigzag line */}
                <path
                  d={`M 60,${180 - (priorityData[0].count * 1.5)} ${priorityData.map((item, i) => 
                    `L ${60 + i * 80},${180 - (item.count * 1.5)}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Fill area */}
                <path
                  d={`M 60,180 L 60,${180 - (priorityData[0].count * 1.5)} ${priorityData.map((item, i) => 
                    `L ${60 + i * 80},${180 - (item.count * 1.5)}`
                  ).join(' ')} L ${60 + (priorityData.length - 1) * 80},180 Z`}
                  fill="url(#priorityGradient)"
                />
                
                {/* Data points */}
                {priorityData.map((item, i) => (
                  <g key={i}>
                    <circle
                      cx={60 + i * 80}
                      cy={180 - (item.count * 1.5)}
                      r="5"
                      fill="#2563eb"
                      stroke="white"
                      strokeWidth="2"
                      className="hover:r-7 transition-all cursor-pointer"
                    />
                    <text x={60 + i * 80} y={200} textAnchor="middle" className="text-xs fill-gray-600 font-medium">
                      {item.priority}
                    </text>
                    <text x={60 + i * 80} y={180 - (item.count * 1.5) - 12} textAnchor="middle" className="text-xs fill-gray-800 font-bold">
                      {item.count}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200/60 shadow-sm">
        <CardHeader>
          <CardTitle>All Requests ({filteredRequests.length})</CardTitle>
          <CardDescription>View and manage your requests</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by title or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Requests Table */}
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchTerm || statusFilter !== 'all' ? 'No requests match your filters' : 'No requests yet'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first request to get started'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && canCreateRequest && (
                <Link href="/requests/new">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Request
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200/60 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="font-semibold">Request ID</TableHead>
                    <TableHead className="font-semibold">Title</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Priority</TableHead>
                    <TableHead className="font-semibold">Department</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold">Created</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="font-mono text-sm">#{request.id}</TableCell>
                      <TableCell className="font-medium">{request.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{request.department}</TableCell>
                      <TableCell className="text-sm">{request.category}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{format(new Date(request.createdAt), 'MMM dd, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/requests/${request.id}`}>
                          <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}