'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowLeft, Edit, Ban, Download, FileText, Paperclip } from 'lucide-react';
import { api } from '@/lib/api';

interface MovementRequest {
  id: number;
  title: string;
  department: string;
  priority: string;
  status: string;
  neededBy: string;
  fromLocation: string;
  toLocation: string;
  purpose: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  items: Array<{
    id: number;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    estimatedCost: number;
  }>;
  user?: {
    firstName: string;
    lastName: string;
  };
  approvals?: any[];
  attachments?: any[];
  rejectionReason?: string;
  createdBy?: number;
  approvedBy?: number;
  approvalHistory?: any[];
}
import { format } from 'date-fns';
import Link from 'next/link';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { ApprovalTimeline } from '@/components/ApprovalTimeline';

interface RequestDetailsProps {
  requestId: string;
}

export default function RequestDetails({ requestId }: RequestDetailsProps) {
  const [request, setRequest] = useState<MovementRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelling, setCancelling] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const loadRequest = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await api.getRequest(token, requestId);
      if (response.ok) {
        const data = await response.json();
        setRequest(data);
      } else {
        toast.error('Failed to load request');
      }
    } catch (error) {
      console.error('Failed to load request:', error);
      toast.error('Failed to load request');
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    loadRequest();
  }, [loadRequest]);

  const handleCancelRequest = async () => {
    if (!cancelReason.trim()) {
      toast.error('Please provide a cancellation reason');
      return;
    }

    setCancelling(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await api.updateRequest(token, requestId, {
        status: 'cancelled',
        rejectionReason: cancelReason,
      });

      if (response.ok) {
        toast.success('Request cancelled successfully');
        setCancelDialogOpen(false);
        loadRequest();
      } else {
        toast.error('Failed to cancel request');
      }
    } catch (error) {
      console.error('Cancel error:', error);
      toast.error('Failed to cancel request');
    } finally {
      setCancelling(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-gray-500">Request not found</p>
          <Link href="/requests">
            <Button className="mt-4">Back to Requests</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalCost = request.items.reduce((sum, item) => sum + (item.quantity * item.estimatedCost), 0);
  const canEdit = request.status === 'draft' || request.status === 'rejected';
  const canCancel = (request.status === 'pending' || request.status === 'draft') && 
                    user?.id === request.createdBy;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link href="/requests">
            <Button variant="outline" className="mb-3" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Requests
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{request.title}</h1>
          <p className="text-muted-foreground mt-1">Request ID: {request.id}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={getStatusColor(request.status)}>
            {request.status}
          </Badge>
          {canEdit && (
            <Link href={`/requests/${request.id}/edit`}>
              <Button size="sm" variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </Link>
          )}
          {canCancel && (
            <Button
              size="sm"
              variant="outline"
              className="gap-2 text-destructive hover:text-destructive"
              onClick={() => setCancelDialogOpen(true)}
            >
              <Ban className="h-4 w-4" />
              Cancel Request
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200/60 shadow-sm">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Department:</span>
                <p className="font-medium text-foreground mt-1">{request.department}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Priority:</span>
                <div className="mt-1">
                  <Badge variant="outline" className={getPriorityColor(request.priority)}>
                    {request.priority}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Needed By:</span>
                <p className="font-medium text-foreground mt-1">{format(new Date(request.neededBy), 'PPP')}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Created:</span>
                <p className="font-medium text-foreground mt-1">{format(new Date(request.createdAt), 'PPP')}</p>
              </div>
            </div>
            {request.approvedBy && (
              <div className="pt-3 border-t border-border">
                <span className="text-sm font-medium text-muted-foreground">Approved By:</span>
                <p className="font-medium text-foreground mt-1">Procurement Team</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200/60 shadow-sm">
          <CardHeader>
            <CardTitle>Movement Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm font-medium text-muted-foreground">From Location:</span>
              <p className="font-medium text-foreground mt-1">{request.fromLocation}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">To Location:</span>
              <p className="font-medium text-foreground mt-1">{request.toLocation}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Total Items:</span>
                <p className="font-medium text-foreground mt-1">{request.items.length}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Total Cost:</span>
                <p className="font-medium text-foreground mt-1">{totalCost.toFixed(0)} RWF</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200/60 shadow-sm">
        <CardHeader>
          <CardTitle>Purpose & Justification</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">{request.purpose}</p>
        </CardContent>
      </Card>

      <Card className="border-gray-200/60 shadow-sm">
        <CardHeader>
          <CardTitle>Items ({request.items.length})</CardTitle>
          <CardDescription>Detailed list of items to be moved</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-200/60 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Total Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {request.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity} {item.unit}</TableCell>
                    <TableCell>{item.estimatedCost.toFixed(0)} RWF</TableCell>
                    <TableCell className="font-medium">{(item.quantity * item.estimatedCost).toFixed(0)} RWF</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="text-right mt-4 text-lg font-semibold">
            Total: {totalCost.toFixed(0)} RWF
          </div>
        </CardContent>
      </Card>

      {request.attachments && request.attachments.length > 0 && (
        <Card className="border-gray-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Paperclip className="h-5 w-5" />
              Attachments ({request.attachments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {request.attachments.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB · {format(new Date(file.uploadedAt), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {request.approvalHistory && request.approvalHistory.length > 0 && (
        <ApprovalTimeline history={request.approvalHistory} />
      )}

      {request.rejectionReason && (
        <Card className="border-red-200 shadow-sm bg-red-50/50">
          <CardHeader>
            <CardTitle className="text-red-700">Rejection Reason</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-800">{request.rejectionReason}</p>
          </CardContent>
        </Card>
      )}

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this request? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="cancelReason">Cancellation Reason *</Label>
            <Textarea
              id="cancelReason"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Please provide a reason for cancelling this request..."
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Keep Request
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelRequest}
              disabled={cancelling || !cancelReason.trim()}
            >
              {cancelling ? 'Cancelling...' : 'Cancel Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
