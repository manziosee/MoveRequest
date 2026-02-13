const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = {
  // Health
  root: () => fetch(`${API_URL}/`),
  health: () => fetch(`${API_URL}/health`),

  // Auth
  login: (email: string, password: string) =>
    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }),

  register: (data: any) =>
    fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  forgotPassword: (email: string) =>
    fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token: string, password: string) =>
    fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    }),

  changePassword: (token: string, oldPassword: string, newPassword: string) =>
    fetch(`${API_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    }),

  getAuthProfile: (token: string) =>
    fetch(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Users
  getUsers: (token: string) =>
    fetch(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  createUser: (token: string, data: any) =>
    fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  getUserStats: (token: string) =>
    fetch(`${API_URL}/users/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getProfile: (token: string) =>
    fetch(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateProfile: (token: string, data: any) =>
    fetch(`${API_URL}/users/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  getActivity: (token: string) =>
    fetch(`${API_URL}/users/activity`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getUser: (token: string, id: string) =>
    fetch(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateUser: (token: string, id: string, data: any) =>
    fetch(`${API_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  updateUserRole: (token: string, id: string, role: string) =>
    fetch(`${API_URL}/users/${id}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    }),

  toggleUserActive: (token: string, id: string) =>
    fetch(`${API_URL}/users/${id}/toggle-active`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    }),

  changeOwnPassword: (token: string, oldPassword: string, newPassword: string) =>
    fetch(`${API_URL}/users/change-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    }),

  adminChangeUserPassword: (token: string, id: string, newPassword: string) =>
    fetch(`${API_URL}/users/${id}/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newPassword }),
    }),

  // Requests
  createRequest: (token: string, data: any) =>
    fetch(`${API_URL}/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  getRequests: (token: string, filters?: any) => {
    const params = new URLSearchParams(filters);
    return fetch(`${API_URL}/requests?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getRequestStats: (token: string) =>
    fetch(`${API_URL}/requests/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getRequest: (token: string, id: string) =>
    fetch(`${API_URL}/requests/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateRequest: (token: string, id: string, data: any) =>
    fetch(`${API_URL}/requests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  deleteRequest: (token: string, id: string) =>
    fetch(`${API_URL}/requests/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Approvals
  getPendingApprovals: (token: string) =>
    fetch(`${API_URL}/approvals/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getApprovalStats: (token: string) =>
    fetch(`${API_URL}/approvals/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  approveRequest: (token: string, requestId: string, comments?: string) =>
    fetch(`${API_URL}/approvals/${requestId}/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comments }),
    }),

  rejectRequest: (token: string, requestId: string, comments?: string) =>
    fetch(`${API_URL}/approvals/${requestId}/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comments }),
    }),

  bulkApprove: (token: string, requestIds: string[], comments?: string) =>
    fetch(`${API_URL}/approvals/bulk-approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ requestIds, comments }),
    }),

  // Reports
  getReportStats: (token: string) =>
    fetch(`${API_URL}/reports/dashboard-stats`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getMonthlyTrends: (token: string) =>
    fetch(`${API_URL}/reports/monthly-trends`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getDepartmentStats: (token: string) =>
    fetch(`${API_URL}/reports/department-stats`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getStatusDistribution: (token: string) =>
    fetch(`${API_URL}/reports/status-distribution`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getPriorityBreakdown: (token: string) =>
    fetch(`${API_URL}/reports/priority-breakdown`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  exportReport: (token: string, format: string = 'json') =>
    fetch(`${API_URL}/reports/export?format=${format}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Admin - Categories
  getCategories: (token: string) =>
    fetch(`${API_URL}/admin/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  createCategory: (token: string, data: any) =>
    fetch(`${API_URL}/admin/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  updateCategory: (token: string, id: string, data: any) =>
    fetch(`${API_URL}/admin/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  deleteCategory: (token: string, id: string) =>
    fetch(`${API_URL}/admin/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Admin - Departments
  getDepartments: (token: string) =>
    fetch(`${API_URL}/admin/departments`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  createDepartment: (token: string, data: any) =>
    fetch(`${API_URL}/admin/departments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  updateDepartment: (token: string, id: string, data: any) =>
    fetch(`${API_URL}/admin/departments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  deleteDepartment: (token: string, id: string) =>
    fetch(`${API_URL}/admin/departments/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),

  toggleDepartmentStatus: (token: string, id: string) =>
    fetch(`${API_URL}/admin/departments/${id}/toggle-status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Admin - System
  getSystemConfig: (token: string) =>
    fetch(`${API_URL}/admin/system-config`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateSystemConfig: (token: string, data: any) =>
    fetch(`${API_URL}/admin/system-config`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  getSystemStats: (token: string) =>
    fetch(`${API_URL}/admin/system-stats`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getUserActivity: (token: string) =>
    fetch(`${API_URL}/admin/user-activity`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getBackupInfo: (token: string) =>
    fetch(`${API_URL}/admin/backup-info`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  performBackup: (token: string) =>
    fetch(`${API_URL}/admin/backup`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }),

  bulkApproveRequestsAdmin: (token: string, requestIds: number[]) =>
    fetch(`${API_URL}/admin/bulk-approve-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ requestIds }),
    }),

  exportUsers: (token: string) =>
    fetch(`${API_URL}/admin/export-users`, {
      headers: { Authorization: `Bearer ${token}` },
    }),



  // Dashboard
  getDashboardStats: (token: string) =>
    fetch(`${API_URL}/dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Notifications
  getNotifications: (token: string) =>
    fetch(`${API_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getUnreadCount: (token: string) =>
    fetch(`${API_URL}/notifications/unread-count`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  markAsRead: (token: string, id: string) =>
    fetch(`${API_URL}/notifications/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    }),

  markAllAsRead: (token: string) =>
    fetch(`${API_URL}/notifications/mark-all-read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Files
  uploadFile: (token: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch(`${API_URL}/files/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
  },

  uploadFileToRequest: (token: string, requestId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch(`${API_URL}/files/upload/${requestId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
  },

  getRequestFiles: (token: string, requestId: string) =>
    fetch(`${API_URL}/files/request/${requestId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  downloadFile: (token: string, fileId: string) =>
    fetch(`${API_URL}/files/download/${fileId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  deleteFile: (token: string, fileId: string) =>
    fetch(`${API_URL}/files/${fileId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),
};
