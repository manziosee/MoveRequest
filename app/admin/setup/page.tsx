'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Bell, 
  Mail, 
  Shield, 
  Database, 
  Zap,
  Globe,
  Palette,
  Lock,
  Clock,
  FileText,
  CheckCircle,
  AlertTriangle,
  Server,
  Workflow
} from 'lucide-react';

const systemHealthData = [
  { time: '00:00', cpu: 45, memory: 62, requests: 120 },
  { time: '04:00', cpu: 38, memory: 58, requests: 95 },
  { time: '08:00', cpu: 72, memory: 75, requests: 285 },
  { time: '12:00', cpu: 65, memory: 70, requests: 340 },
  { time: '16:00', cpu: 58, memory: 68, requests: 298 },
  { time: '20:00', cpu: 42, memory: 60, requests: 156 },
];

const performanceData = [
  { metric: 'Response Time', value: 245, unit: 'ms', status: 'good' },
  { metric: 'Throughput', value: 1200, unit: 'req/min', status: 'good' },
  { metric: 'Error Rate', value: 0.2, unit: '%', status: 'good' },
  { metric: 'Uptime', value: 99.8, unit: '%', status: 'excellent' },
];

export default function AdminSetupPage() {
  // General settings
  const [companyName, setCompanyName] = useState('Acme Corporation');
  const [timezone, setTimezone] = useState('UTC-5 (Eastern Time)');
  const [currency, setCurrency] = useState('RWF');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [notificationEmail, setNotificationEmail] = useState('admin@company.com');
  // Security settings
  const [sessionTimeout, setSessionTimeout] = useState('30');
  // Workflow settings
  const [autoApproval, setAutoApproval] = useState(false);
  const [approvalThreshold, setApprovalThreshold] = useState('500000');
  const [reviewPeriod, setReviewPeriod] = useState('3');
  // Data
  const [systemStats, setSystemStats] = useState<any>(null);
  const [userActivity, setUserActivity] = useState<any>(null);
  const [backupInfo, setBackupInfo] = useState<any>(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [bulkApproving, setBulkApproving] = useState(false);

  useEffect(() => {
    fetchSystemStats();
    fetchUserActivity();
    fetchBackupInfo();
    fetchSystemConfig();
  }, []);

  const fetchSystemConfig = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await api.getSystemConfig(token);
      if (response.ok) {
        const data = await response.json();
        setCompanyName(data.companyName ?? 'Acme Corporation');
        setTimezone(data.timezone ?? 'UTC-5 (Eastern Time)');
        setCurrency(data.currency ?? 'RWF');
        setMaintenanceMode(data.maintenanceMode ?? false);
        setEmailNotifications(data.emailNotifications ?? true);
        setAutoApproval(data.autoApproval ?? false);
        if (data.approvalThreshold) setApprovalThreshold(String(data.approvalThreshold));
      }
    } catch (error) {
      console.error('Error fetching system config:', error);
    }
  };

  const fetchSystemStats = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await api.getSystemStats(token);
      if (response.ok) {
        const data = await response.json();
        setSystemStats(data);
      }
    } catch (error) {
      console.error('Error fetching system stats:', error);
    }
  };

  const fetchUserActivity = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await api.getUserActivity(token);
      if (response.ok) {
        const data = await response.json();
        setUserActivity(data);
      }
    } catch (error) {
      console.error('Error fetching user activity:', error);
    }
  };

  const fetchBackupInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await api.getBackupInfo(token);
      if (response.ok) {
        const data = await response.json();
        setBackupInfo(data);
      }
    } catch (error) {
      console.error('Error fetching backup info:', error);
    }
  };

  const handleBackupNow = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await api.performBackup(token);
      if (response.ok) {
        toast.success('Backup initiated successfully');
        fetchBackupInfo();
      }
    } catch (error) {
      console.error('Error performing backup:', error);
      toast.error('Failed to initiate backup');
    }
  };

  const handleExportUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await api.exportUsers(token);
      if (response.ok) {
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users-export-${new Date().toISOString()}.json`;
        a.click();
        toast.success('User data exported successfully');
      }
    } catch (error) {
      console.error('Error exporting users:', error);
      toast.error('Failed to export user data');
    }
  };

  const handleSaveSettings = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setSavingSettings(true);
    try {
      const response = await api.updateSystemConfig(token, {
        companyName,
        timezone,
        currency,
        maintenanceMode,
        emailNotifications,
        pushNotifications,
        notificationEmail,
        sessionTimeout: Number(sessionTimeout),
        autoApproval,
        approvalThreshold,
        reviewPeriod: Number(reviewPeriod),
      });
      if (response.ok) {
        toast.success('Settings saved successfully!');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleBulkApprove = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setBulkApproving(true);
    try {
      const requestsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/requests?status=pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!requestsRes.ok) throw new Error('Failed to fetch pending requests');
      const pendingRequests = await requestsRes.json();
      if (!pendingRequests.length) {
        toast.info('No pending requests to approve');
        return;
      }
      const ids = pendingRequests.map((r: any) => r.id);
      const response = await api.bulkApproveRequestsAdmin(token, ids);
      if (response.ok) {
        const data = await response.json();
        toast.success(`${data.count} request(s) approved successfully`);
        fetchSystemStats();
      } else {
        toast.error('Failed to bulk approve requests');
      }
    } catch (error) {
      console.error('Error bulk approving:', error);
      toast.error('Failed to bulk approve requests');
    } finally {
      setBulkApproving(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout>
        <div className="p-6 space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">System Configuration ⚙️</h1>
              <p className="text-muted-foreground mt-1">Configure system settings and preferences</p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 gap-2" onClick={handleSaveSettings} disabled={savingSettings}>
              {savingSettings ? <><span className="animate-spin mr-1">⏳</span>Saving...</> : <><CheckCircle className="h-4 w-4" />Save Changes</>}
            </Button>
          </div>

          {/* Enhanced Admin Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Chart */}
            <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  User Growth
                </CardTitle>
                <CardDescription>Monthly new user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] relative bg-gradient-to-b from-green-50 to-white rounded-lg border p-4">
                  <svg width="100%" height="100%" className="overflow-visible">
                    <defs>
                      <linearGradient id="userGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    {[0, 1, 2, 3, 4].map(i => (
                      <line key={i} x1="0" y1={40 + i * 40} x2="100%" y2={40 + i * 40} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                    ))}
                    {[12, 15, 18, 22, 25, 20].map((_, i) => (
                      <line key={i} x1={40 + i * 50} y1="0" x2={40 + i * 50} y2="100%" stroke="#f3f4f6" strokeWidth="1" />
                    ))}
                    <path d="M 40,180 L 90,160 L 140,140 L 190,120 L 240,100 L 290,130" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 40,200 L 40,180 L 90,160 L 140,140 L 190,120 L 240,100 L 290,130 L 290,200 Z" fill="url(#userGradient)" />
                    {[12, 15, 18, 22, 25, 20].map((val, i) => (
                      <g key={i}>
                        <circle cx={40 + i * 50} cy={200 - val * 4} r="4" fill="#22c55e" stroke="white" strokeWidth="2" />
                        <text x={40 + i * 50} y={220} textAnchor="middle" className="text-xs fill-gray-600">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</text>
                        <text x={40 + i * 50} y={200 - val * 4 - 10} textAnchor="middle" className="text-xs fill-gray-800 font-bold">{val}</text>
                      </g>
                    ))}
                  </svg>
                </div>
              </CardContent>
            </Card>

            {/* Role Distribution */}
            <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  Role Distribution
                </CardTitle>
                <CardDescription>Users by role type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemStats && [
                    {name: 'Employee', count: systemStats.roleDistribution?.employee || 0, color: '#3b82f6'},
                    {name: 'Procurement', count: systemStats.roleDistribution?.procurement || 0, color: '#f59e0b'},
                    {name: 'Admin', count: systemStats.roleDistribution?.admin || 0, color: '#ef4444'}
                  ].map((role, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{backgroundColor: role.color}}></div>
                        <span className="text-sm font-medium">{role.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="h-2 rounded-full" style={{backgroundColor: role.color, width: `${(role.count/60)*100}%`}}></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-8 text-right">{role.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  System Alerts
                </CardTitle>
                <CardDescription>Recent system notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {type: 'warning', msg: 'High CPU usage detected', time: '2m ago', color: 'text-amber-600 bg-amber-100'},
                    {type: 'info', msg: 'Database backup completed', time: '1h ago', color: 'text-blue-600 bg-blue-100'},
                    {type: 'success', msg: 'Security scan passed', time: '3h ago', color: 'text-green-600 bg-green-100'}
                  ].map((alert, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className={`w-8 h-8 rounded-lg ${alert.color} flex items-center justify-center`}>
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.msg}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* API Usage */}
            <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  API Usage
                </CardTitle>
                <CardDescription>Endpoint usage statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {endpoint: '/api/requests', calls: 1250, status: 'healthy'},
                    {endpoint: '/api/users', calls: 890, status: 'healthy'},
                    {endpoint: '/api/approvals', calls: 650, status: 'warning'}
                  ].map((api, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="text-sm font-medium">{api.endpoint}</p>
                        <p className="text-xs text-muted-foreground">{api.calls} calls today</p>
                      </div>
                      <Badge variant={api.status === 'healthy' ? 'default' : 'secondary'} className={api.status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                        {api.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  System Performance
                </CardTitle>
                <CardDescription>Real-time system metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] relative bg-gradient-to-b from-blue-50 to-white rounded-lg border p-4">
                  <svg width="100%" height="100%" className="overflow-visible">
                    <defs>
                      <linearGradient id="perfGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map(i => (
                      <line key={i} x1="0" y1={40 + i * 40} x2="100%" y2={40 + i * 40} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                    ))}
                    {systemHealthData.map((_, i) => (
                      <line key={i} x1={50 + i * 60} y1="0" x2={50 + i * 60} y2="100%" stroke="#f3f4f6" strokeWidth="1" />
                    ))}
                    
                    {/* CPU Usage Line */}
                    <path
                      d={`M 50,${200 - (systemHealthData[0].cpu * 2)} ${systemHealthData.map((item, i) => 
                        `L ${50 + i * 60},${200 - (item.cpu * 2)}`
                      ).join(' ')}`}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    
                    {/* Memory Usage Line */}
                    <path
                      d={`M 50,${200 - (systemHealthData[0].memory * 2)} ${systemHealthData.map((item, i) => 
                        `L ${50 + i * 60},${200 - (item.memory * 2)}`
                      ).join(' ')}`}
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    
                    {/* Data points */}
                    {systemHealthData.map((item, i) => (
                      <g key={i}>
                        <circle cx={50 + i * 60} cy={200 - (item.cpu * 2)} r="3" fill="#3b82f6" />
                        <circle cx={50 + i * 60} cy={200 - (item.memory * 2)} r="3" fill="#16a34a" />
                        <text x={50 + i * 60} y={220} textAnchor="middle" className="text-xs fill-gray-600">
                          {item.time}
                        </text>
                      </g>
                    ))}
                    
                    {/* Legend */}
                    <g transform="translate(10, 10)">
                      <rect x="0" y="0" width="4" height="4" fill="#3b82f6" />
                      <text x="8" y="8" className="text-xs fill-gray-700">CPU</text>
                      <rect x="40" y="0" width="4" height="4" fill="#16a34a" />
                      <text x="48" y="8" className="text-xs fill-gray-700">Memory</text>
                    </g>
                  </svg>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  Request Volume
                </CardTitle>
                <CardDescription>API requests over 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] relative bg-gradient-to-b from-purple-50 to-white rounded-lg border p-4">
                  <svg width="100%" height="100%" className="overflow-visible">
                    <defs>
                      <linearGradient id="reqGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#9333ea" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#9333ea" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map(i => (
                      <line key={i} x1="0" y1={40 + i * 40} x2="100%" y2={40 + i * 40} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                    ))}
                    {systemHealthData.map((_, i) => (
                      <line key={i} x1={50 + i * 60} y1="0" x2={50 + i * 60} y2="100%" stroke="#f3f4f6" strokeWidth="1" />
                    ))}
                    
                    {/* Zigzag line */}
                    <path
                      d={`M 50,${200 - (systemHealthData[0].requests * 0.5)} ${systemHealthData.map((item, i) => 
                        `L ${50 + i * 60},${200 - (item.requests * 0.5)}`
                      ).join(' ')}`}
                      fill="none"
                      stroke="#9333ea"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Fill area */}
                    <path
                      d={`M 50,200 L 50,${200 - (systemHealthData[0].requests * 0.5)} ${systemHealthData.map((item, i) => 
                        `L ${50 + i * 60},${200 - (item.requests * 0.5)}`
                      ).join(' ')} L ${50 + (systemHealthData.length - 1) * 60},200 Z`}
                      fill="url(#reqGradient)"
                    />
                    
                    {/* Data points */}
                    {systemHealthData.map((item, i) => (
                      <g key={i}>
                        <circle
                          cx={50 + i * 60}
                          cy={200 - (item.requests * 0.5)}
                          r="4"
                          fill="#9333ea"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <text x={50 + i * 60} y={220} textAnchor="middle" className="text-xs fill-gray-600">
                          {item.time}
                        </text>
                        <text x={50 + i * 60} y={200 - (item.requests * 0.5) - 10} textAnchor="middle" className="text-xs fill-gray-800 font-bold">
                          {item.requests}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card className="border-gray-200/60 shadow-sm">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Current system performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {performanceData.map((metric, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">{metric.metric}</span>
                      {metric.status === 'excellent' && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      {metric.status === 'good' && (
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                      <span className="text-sm text-muted-foreground">{metric.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Management & Audit Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Activity Monitor */}
            <Card className="border-gray-200/60 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                    <Database className="h-5 w-5 text-cyan-700" />
                  </div>
                  <div>
                    <CardTitle>User Activity</CardTitle>
                    <CardDescription>Monitor user sessions and actions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Active Sessions</span>
                  <Badge className="bg-green-100 text-green-700">{userActivity?.activeSessions || 0} online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Failed Logins (24h)</span>
                  <Badge variant="outline" className="bg-red-100 text-red-700">{userActivity?.failedLogins || 0} attempts</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Avg Session Duration</span>
                  <span className="text-sm text-muted-foreground">{userActivity?.avgSessionDuration || 0} minutes</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Logs
                </Button>
              </CardContent>
            </Card>

            {/* Backup & Maintenance */}
            <Card className="border-gray-200/60 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Server className="h-5 w-5 text-indigo-700" />
                  </div>
                  <div>
                    <CardTitle>Backup & Maintenance</CardTitle>
                    <CardDescription>System backup and maintenance tools</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Backup</span>
                  <span className="text-sm text-muted-foreground">{backupInfo ? new Date(backupInfo.lastBackup).toLocaleString() : 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Next Scheduled</span>
                  <span className="text-sm text-muted-foreground">{backupInfo ? new Date(backupInfo.nextScheduled).toLocaleString() : 'N/A'}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={handleBackupNow}>
                    Backup Now
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Restore
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Operations */}
            <Card className="border-gray-200/60 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Workflow className="h-5 w-5 text-orange-700" />
                  </div>
                  <div>
                    <CardTitle>Bulk Operations</CardTitle>
                    <CardDescription>Mass update and management tools</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleBulkApprove} disabled={bulkApproving}>
                  <FileText className="h-4 w-4 mr-2" />
                  {bulkApproving ? 'Approving...' : 'Bulk Approve Requests'}
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Bulk Notifications
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleExportUsers}>
                  <Database className="h-4 w-4 mr-2" />
                  Export User Data
                </Button>
              </CardContent>
            </Card>

            {/* Performance Optimization */}
            <Card className="border-gray-200/60 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-pink-700" />
                  </div>
                  <div>
                    <CardTitle>Performance Tools</CardTitle>
                    <CardDescription>System optimization utilities</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Cache Hit Rate</span>
                  <span className="text-sm text-green-600 font-medium">94.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Database Size</span>
                  <span className="text-sm text-muted-foreground">2.4 GB</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Optimize Database
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Settings */}
            <Card className="border-gray-200/60 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>System-wide configurations</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-xs text-muted-foreground">
                      Disable system for maintenance
                    </p>
                  </div>
                  <Switch
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border-gray-200/60 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure notification preferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Send updates via email
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Browser push notifications
                    </p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input
                    id="notification-email"
                    type="email"
                    value={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="border-gray-200/60 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-red-700" />
                  </div>
                  <div>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Security and access control</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Session Timeout</Label>
                  <div className="flex items-center gap-2">
                    <Input type="number" value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)} className="w-24" />
                    <span className="text-sm text-muted-foreground">minutes</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Password Policy</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Minimum 8 characters</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Require uppercase letters</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Require numbers</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-xs text-muted-foreground">
                      Require 2FA for all users
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                    Enabled
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Workflow Settings */}
            <Card className="border-gray-200/60 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Workflow className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <CardTitle>Workflow</CardTitle>
                    <CardDescription>Request approval workflow</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-Approval</Label>
                    <p className="text-xs text-muted-foreground">
                      Auto-approve requests under 500,000 RWF
                    </p>
                  </div>
                  <Switch
                    checked={autoApproval}
                    onCheckedChange={setAutoApproval}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Approval Threshold</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">RWF</span>
                    <Input type="number" value={approvalThreshold} onChange={(e) => setApprovalThreshold(e.target.value)} className="flex-1" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Review Period</Label>
                  <div className="flex items-center gap-2">
                    <Input type="number" value={reviewPeriod} onChange={(e) => setReviewPeriod(e.target.value)} className="w-24" />
                    <span className="text-sm text-muted-foreground">business days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Integration Status */}
          <Card className="border-gray-200/60 shadow-sm">
            <CardHeader>
              <CardTitle>System Integrations</CardTitle>
              <CardDescription>Connected services and APIs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Email Service', icon: Mail, status: 'connected', color: 'bg-blue-100 text-blue-700' },
                  { name: 'Database', icon: Database, status: 'connected', color: 'bg-green-100 text-green-700' },
                  { name: 'API Gateway', icon: Zap, status: 'connected', color: 'bg-purple-100 text-purple-700' },
                  { name: 'Cloud Storage', icon: Server, status: 'connected', color: 'bg-cyan-100 text-cyan-700' },
                  { name: 'Authentication', icon: Lock, status: 'connected', color: 'bg-amber-100 text-amber-700' },
                  { name: 'Analytics', icon: Globe, status: 'pending', color: 'bg-gray-100 text-gray-700' },
                ].map((integration, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${integration.color} flex items-center justify-center`}>
                        <integration.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{integration.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {integration.status === 'connected' ? 'Active' : 'Pending'}
                        </p>
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      integration.status === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
