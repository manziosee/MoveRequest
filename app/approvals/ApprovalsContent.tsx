'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Eye, Clock, AlertCircle, TrendingUp, FileText, Zap } from 'lucide-react';
import { mockDataService, MovementRequest } from '@/lib/mockData';
import { toast } from 'sonner';
import { format } from 'date-fns';


export default function ApprovalsContent() {
  const [requests, setRequests] = useState<MovementRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<MovementRequest | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await mockDataService.getRequests();
      setRequests(data.filter(req => req.status === 'pending'));
    } catch (error) {
      toast.error('Failed to load requests');
    }
  };

  const handleAction = async () => {
    if (!selectedRequest || !actionType) return;

    setLoading(true);
    try {
      // Optimistic update
      setRequests(prev => prev.filter(req => req.id !== selectedRequest.id));
      
      await mockDataService.updateRequestStatus(
        selectedRequest.id,
        actionType === 'approve' ? 'approved' : 'rejected',
        actionType === 'reject' ? comment : undefined
      );

      toast.success(`Request ${actionType}d successfully`);
      setSelectedRequest(null);
      setActionType(null);
      setComment('');
    } catch (error) {
      toast.error(`Failed to ${actionType} request`);
      loadRequests(); // Revert on error
    } finally {
      setLoading(false);
    }
  };

  const memoizedRequests = useMemo(() => requests, [requests]);
  const memoizedStats = useMemo(() => ({
    pending: requests.length,
    approvedToday: 14,
    avgReviewTime: '2.1d',
    approvalRate: '94%'
  }), [requests.length]);

  const getPriorityColor = useMemo(() => (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  }, []);

  const approvalTrendData = [
    { week: 'Week 1', approved: 12, rejected: 2 },
    { week: 'Week 2', approved: 15, rejected: 1 },
    { week: 'Week 3', approved: 18, rejected: 3 },
    { week: 'Week 4', approved: 14, rejected: 2 },
  ];

  const processingTimeData = [
    { day: 'Mon', avgTime: 2.1 },
    { day: 'Tue', avgTime: 1.8 },
    { day: 'Wed', avgTime: 2.3 },
    { day: 'Thu', avgTime: 1.9 },
    { day: 'Fri', avgTime: 2.5 },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Pending Approvals ✓</h1>
          <p className="text-muted-foreground mt-1">Review and approve movement requests</p>
        </div>
        <Badge className="bg-primary text-primary-foreground px-4 py-2 text-base transition-all duration-150">
          {memoizedStats.pending} Pending
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Awaiting Review</p>
                <p className="text-3xl font-bold text-foreground">{memoizedStats.pending}</p>
                <p className="text-xs text-amber-600 mt-1">Requires action</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse">
                <AlertCircle className="h-6 w-6 text-white" />
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
                <p className="text-3xl font-bold text-foreground">{memoizedStats.approvedToday}</p>
                <p className="text-xs text-green-600 mt-1">↑ 28% vs yesterday</p>
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
                <p className="text-sm font-medium text-muted-foreground mb-1">Avg. Review Time</p>
                <p className="text-3xl font-bold text-foreground">{memoizedStats.avgReviewTime}</p>
                <p className="text-xs text-blue-600 mt-1">↓ 0.3d improvement</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Approval Rate</p>
                <p className="text-3xl font-bold text-foreground">{memoizedStats.approvalRate}</p>
                <p className="text-xs text-green-600 mt-1">Excellent performance</p>
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
            <CardTitle className="text-base">Approval Trends</CardTitle>
            <CardDescription>Approved vs rejected requests over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] relative bg-gradient-to-b from-green-50 to-white rounded-lg border p-4">
              <svg width="100%" height="100%" className="overflow-visible">
                <defs>
                  <linearGradient id="approvedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#16a34a" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="rejectedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[0, 1, 2, 3].map(i => (
                  <line key={i} x1="0" y1={40 + i * 40} x2="100%" y2={40 + i * 40} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                ))}
                {approvalTrendData.map((_, i) => (
                  <line key={i} x1={50 + i * 70} y1="0" x2={50 + i * 70} y2="100%" stroke="#f3f4f6" strokeWidth="1" />
                ))}
                
                {/* Approved zigzag line */}
                <path
                  d={`M 50,${180 - (approvalTrendData[0].approved * 8)} ${approvalTrendData.map((item, i) => 
                    `L ${50 + i * 70},${180 - (item.approved * 8)}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Rejected zigzag line */}
                <path
                  d={`M 50,${180 - (approvalTrendData[0].rejected * 40)} ${approvalTrendData.map((item, i) => 
                    `L ${50 + i * 70},${180 - (item.rejected * 40)}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="5,5"
                />
                
                {/* Data points */}
                {approvalTrendData.map((item, i) => (
                  <g key={i}>
                    <circle cx={50 + i * 70} cy={180 - (item.approved * 8)} r="4" fill="#16a34a" stroke="white" strokeWidth="2" />
                    <circle cx={50 + i * 70} cy={180 - (item.rejected * 40)} r="3" fill="#dc2626" stroke="white" strokeWidth="2" />
                    <text x={50 + i * 70} y={200} textAnchor="middle" className="text-xs fill-gray-600 font-medium">
                      {item.week}
                    </text>
                    <text x={50 + i * 70} y={180 - (item.approved * 8) - 10} textAnchor="middle" className="text-xs fill-green-700 font-bold">
                      {item.approved}
                    </text>
                  </g>
                ))}
                
                {/* Legend */}
                <g transform="translate(10, 10)">
                  <circle cx="5" cy="5" r="3" fill="#16a34a" />
                  <text x="15" y="9" className="text-xs fill-gray-700">Approved</text>
                  <circle cx="5" cy="20" r="3" fill="#dc2626" />
                  <text x="15" y="24" className="text-xs fill-gray-700">Rejected</text>
                </g>
              </svg>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-base">Processing Time</CardTitle>
            <CardDescription>Average review time per day (in days)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] relative bg-gradient-to-b from-blue-50 to-white rounded-lg border p-4">
              <svg width="100%" height="100%" className="overflow-visible">
                <defs>
                  <linearGradient id="processingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[0, 1, 2, 3].map(i => (
                  <line key={i} x1="0" y1={40 + i * 40} x2="100%" y2={40 + i * 40} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                ))}
                {processingTimeData.map((_, i) => (
                  <line key={i} x1={50 + i * 60} y1="0" x2={50 + i * 60} y2="100%" stroke="#f3f4f6" strokeWidth="1" />
                ))}
                
                {/* Zigzag line */}
                <path
                  d={`M 50,${180 - (processingTimeData[0].avgTime * 60)} ${processingTimeData.map((item, i) => 
                    `L ${50 + i * 60},${180 - (item.avgTime * 60)}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Fill area */}
                <path
                  d={`M 50,180 L 50,${180 - (processingTimeData[0].avgTime * 60)} ${processingTimeData.map((item, i) => 
                    `L ${50 + i * 60},${180 - (item.avgTime * 60)}`
                  ).join(' ')} L ${50 + (processingTimeData.length - 1) * 60},180 Z`}
                  fill="url(#processingGradient)"
                />
                
                {/* Data points */}
                {processingTimeData.map((item, i) => (
                  <g key={i}>
                    <circle
                      cx={50 + i * 60}
                      cy={180 - (item.avgTime * 60)}
                      r="5"
                      fill="#2563eb"
                      stroke="white"
                      strokeWidth="2"
                      className="hover:r-7 transition-all cursor-pointer"
                    />
                    <text x={50 + i * 60} y={200} textAnchor="middle" className="text-xs fill-gray-600 font-medium">
                      {item.day}
                    </text>
                    <text x={50 + i * 60} y={180 - (item.avgTime * 60) - 12} textAnchor="middle" className="text-xs fill-gray-800 font-bold">
                      {item.avgTime}d
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Requests Awaiting Approval ({memoizedStats.pending})</CardTitle>
          <CardDescription>Click on a request to review details and take action</CardDescription>
        </CardHeader>
        <CardContent>
          {memoizedRequests.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No pending requests</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Needed By</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {memoizedRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-mono">{request.id}</TableCell>
                    <TableCell className="font-medium">{request.title}</TableCell>
                    <TableCell>{request.department}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(new Date(request.neededBy), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{format(new Date(request.createdAt), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedRequest(request)}
                          className="transition-all duration-150 hover:scale-105"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 transition-all duration-150 hover:scale-105"
                          onClick={() => {
                            setSelectedRequest(request);
                            setActionType('approve');
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setSelectedRequest(request);
                            setActionType('reject');
                          }}
                          className="transition-all duration-150 hover:scale-105"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Request Details Dialog */}
      <Dialog open={!!selectedRequest && !actionType} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Request Details - {selectedRequest?.id}</DialogTitle>
            <DialogDescription>Review the complete request information</DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Basic Information</h4>
                  <div className="text-sm space-y-1 mt-2">
                    <p><strong>Title:</strong> {selectedRequest.title}</p>
                    <p><strong>Department:</strong> {selectedRequest.department}</p>
                    <div><strong>Priority:</strong> 
                      <Badge className={`ml-2 ${getPriorityColor(selectedRequest.priority)}`}>
                        {selectedRequest.priority}
                      </Badge>
                    </div>
                    <p><strong>Needed By:</strong> {format(new Date(selectedRequest.neededBy), 'PPP')}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold">Movement Details</h4>
                  <div className="text-sm space-y-1 mt-2">
                    <p><strong>From:</strong> {selectedRequest.fromLocation}</p>
                    <p><strong>To:</strong> {selectedRequest.toLocation}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Purpose</h4>
                <p className="text-sm mt-1 p-2 bg-gray-50 rounded">{selectedRequest.purpose}</p>
              </div>

              <div>
                <h4 className="font-semibold">Items ({selectedRequest.items.length})</h4>
                <Table className="mt-2">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedRequest.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.quantity} {item.unit}</TableCell>
                        <TableCell>{(item.quantity * item.estimatedCost).toFixed(0)} RWF</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="text-right mt-2 font-semibold">
                  Total: {selectedRequest.items.reduce((sum, item) => sum + (item.quantity * item.estimatedCost), 0).toFixed(0)} RWF
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedRequest(null)}>
              Close
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setActionType('approve')}
            >
              Approve
            </Button>
            <Button
              variant="destructive"
              onClick={() => setActionType('reject')}
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Dialog */}
      <Dialog open={!!actionType} onOpenChange={() => setActionType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Approve Request' : 'Reject Request'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'approve' 
                ? 'Are you sure you want to approve this request?'
                : 'Please provide a reason for rejection.'
              }
            </DialogDescription>
          </DialogHeader>

          {actionType === 'reject' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Rejection Reason *</label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Explain why this request is being rejected..."
                rows={3}
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionType(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              disabled={loading || (actionType === 'reject' && !comment.trim())}
              className={actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}
              variant={actionType === 'reject' ? 'destructive' : 'default'}
            >
              {loading ? 'Processing...' : (actionType === 'approve' ? 'Approve' : 'Reject')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}