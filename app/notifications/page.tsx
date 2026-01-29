import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, Clock, XCircle, AlertCircle, Package, Check } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Request Approved',
      message: 'Your office equipment transfer request (REQ-045) has been approved.',
      time: '2 hours ago',
      read: false,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100',
    },
    {
      id: 2,
      type: 'pending',
      title: 'Pending Review',
      message: 'Your stationery request (REQ-046) is pending procurement approval.',
      time: '5 hours ago',
      read: false,
      icon: Clock,
      color: 'text-amber-600 bg-amber-100',
    },
    {
      id: 3,
      type: 'info',
      title: 'New Comment',
      message: 'Sarah from Procurement commented on your request REQ-044.',
      time: '1 day ago',
      read: true,
      icon: AlertCircle,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      id: 4,
      type: 'rejected',
      title: 'Request Rejected',
      message: 'Request REQ-043 was rejected due to insufficient budget.',
      time: '2 days ago',
      read: true,
      icon: XCircle,
      color: 'text-red-600 bg-red-100',
    },
    {
      id: 5,
      type: 'info',
      title: 'Request Submitted',
      message: 'Your request REQ-047 has been successfully submitted.',
      time: '3 days ago',
      read: true,
      icon: Package,
      color: 'text-blue-600 bg-blue-100',
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-6 animate-fade-in">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
                  <Bell className="h-7 w-7 text-primary" />
                  Notifications
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-2">Stay updated with your request status</p>
              </div>
              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <Badge className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
                    {unreadCount} New
                  </Badge>
                )}
                <Button variant="outline" size="sm" className="text-xs">
                  <Check className="h-4 w-4 mr-2" />
                  Mark All Read
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Unread Notifications */}
              {notifications.filter(n => !n.read).length > 0 && (
                <Card className="border-primary/20 shadow-sm bg-primary/5">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      Unread Notifications
                    </CardTitle>
                    <CardDescription>Recent updates requiring your attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {notifications.filter(n => !n.read).map((notification) => {
                        const IconComponent = notification.icon;
                        return (
                          <div
                            key={notification.id}
                            className="flex items-start gap-4 p-4 rounded-xl border bg-white/80 backdrop-blur-sm transition-all hover:shadow-md hover:bg-white cursor-pointer group"
                          >
                            <div className={`w-12 h-12 rounded-xl ${notification.color} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-semibold text-foreground text-base">{notification.title}</h4>
                                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0 mt-1"></div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground/70 mt-3 font-medium">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* All Notifications */}
              <Card className="border-gray-200/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    All Notifications
                  </CardTitle>
                  <CardDescription>Complete history of your updates and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  {notifications.length === 0 ? (
                    <div className="text-center py-16">
                      <Bell className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6" />
                      <p className="text-xl font-medium text-muted-foreground mb-2">No notifications yet</p>
                      <p className="text-sm text-muted-foreground/70">
                        You&apos;ll see updates about your requests here
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {notifications.map((notification) => {
                        const IconComponent = notification.icon;
                        return (
                          <div
                            key={notification.id}
                            className={`flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer group ${
                              notification.read
                                ? 'bg-white border-border/50 hover:border-border'
                                : 'bg-primary/5 border-primary/20 hover:bg-primary/10'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-xl ${notification.color} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-semibold text-foreground text-base">{notification.title}</h4>
                                {!notification.read && (
                                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0 mt-1"></div>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground/70 mt-3 font-medium">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
