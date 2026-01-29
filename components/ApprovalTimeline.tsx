'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, FileText, Send, Clock, Ban } from 'lucide-react';
import { ApprovalHistory } from '@/lib/mockData';
import { format } from 'date-fns';

interface ApprovalTimelineProps {
  history: ApprovalHistory[];
}

export function ApprovalTimeline({ history }: ApprovalTimelineProps) {
  const getIcon = (action: ApprovalHistory['action']) => {
    switch (action) {
      case 'created':
        return <FileText className="h-4 w-4" />;
      case 'submitted':
        return <Send className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'cancelled':
        return <Ban className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getColor = (action: ApprovalHistory['action']) => {
    switch (action) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getActionText = (action: ApprovalHistory['action']) => {
    switch (action) {
      case 'created':
        return 'Draft Created';
      case 'submitted':
        return 'Request Submitted';
      case 'approved':
        return 'Request Approved';
      case 'rejected':
        return 'Request Rejected';
      case 'cancelled':
        return 'Request Cancelled';
      case 'updated':
        return 'Request Updated';
      default:
        return action;
    }
  };

  if (!history || history.length === 0) {
    return null;
  }

  return (
    <Card className="border-gray-200/60 shadow-sm">
      <CardHeader>
        <CardTitle>Approval History</CardTitle>
        <CardDescription>Timeline of all actions performed on this request</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((entry, index) => (
            <div key={entry.id} className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  entry.action === 'approved' ? 'bg-green-100' :
                  entry.action === 'rejected' ? 'bg-red-100' :
                  entry.action === 'cancelled' ? 'bg-gray-100' :
                  entry.action === 'submitted' ? 'bg-blue-100' :
                  'bg-gray-100'
                }`}>
                  <span className={
                    entry.action === 'approved' ? 'text-green-600' :
                    entry.action === 'rejected' ? 'text-red-600' :
                    entry.action === 'cancelled' ? 'text-gray-600' :
                    entry.action === 'submitted' ? 'text-blue-600' :
                    'text-gray-600'
                  }>
                    {getIcon(entry.action)}
                  </span>
                </div>
                {index < history.length - 1 && (
                  <div className="w-0.5 h-full bg-border mt-2"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className={getColor(entry.action)}>
                        {getActionText(entry.action)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(entry.timestamp), 'MMM dd, yyyy · hh:mm a')}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{entry.performedByName}</p>
                    {entry.comment && (
                      <p className="text-sm text-muted-foreground mt-2 p-3 bg-muted/50 rounded-lg border border-border">
                        {entry.comment}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
