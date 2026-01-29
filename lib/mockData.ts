export interface User {
  id: string;
  email: string;
  name: string;
  role: 'employee' | 'procurement' | 'admin';
  department: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface ApprovalHistory {
  id: string;
  action: 'created' | 'submitted' | 'approved' | 'rejected' | 'cancelled' | 'updated';
  performedBy: string;
  performedByName: string;
  timestamp: string;
  comment?: string;
}

export interface MovementRequest {
  id: string;
  title: string;
  department: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  neededBy: string;
  fromLocation: string;
  toLocation: string;
  purpose: string;
  items: RequestItem[];
  createdBy: string;
  approvedBy?: string;
  rejectionReason?: string;
  attachments?: Attachment[];
  approvalHistory?: ApprovalHistory[];
}

export interface RequestItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  estimatedCost: number;
}

// Mock users
export const mockUsers: User[] = [
  { id: '1', email: 'employee@company.com', name: 'John Employee', role: 'employee', department: 'IT' },
  { id: '2', email: 'procurement@company.com', name: 'Sarah Procurement', role: 'procurement', department: 'Procurement' },
  { id: '3', email: 'admin@company.com', name: 'Admin User', role: 'admin', department: 'Administration' }
];

// Mock requests
export const mockRequests: MovementRequest[] = [
  {
    id: 'REQ-001',
    title: 'Office Equipment Transfer',
    department: 'IT',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-01-15T10:00:00Z',
    neededBy: '2024-01-25T00:00:00Z',
    fromLocation: 'Main Office - Floor 3',
    toLocation: 'Branch Office - Floor 1',
    purpose: 'Setting up new workstation for remote team',
    createdBy: '1',
    items: [
      { id: '1', name: 'Desktop Computer', category: 'Electronics', quantity: 2, unit: 'pcs', estimatedCost: 1200 },
      { id: '2', name: 'Monitor', category: 'Electronics', quantity: 4, unit: 'pcs', estimatedCost: 800 }
    ]
  },
  {
    id: 'REQ-002',
    title: 'Stationery Supplies',
    department: 'HR',
    status: 'approved',
    priority: 'medium',
    createdAt: '2024-01-10T14:30:00Z',
    neededBy: '2024-01-20T00:00:00Z',
    fromLocation: 'Storage Room A',
    toLocation: 'HR Department',
    purpose: 'Monthly office supplies replenishment',
    createdBy: '1',
    approvedBy: '2',
    items: [
      { id: '3', name: 'A4 Paper', category: 'Stationery', quantity: 10, unit: 'box', estimatedCost: 50 },
      { id: '4', name: 'Pens', category: 'Stationery', quantity: 20, unit: 'pcs', estimatedCost: 40 }
    ]
  }
];

// Mock authentication
export const mockAuth = {
  login: (email: string, password: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password') {
          localStorage.setItem('currentUser', JSON.stringify(user));
          resolve(user);
        } else {
          resolve(null);
        }
      }, 1000);
    });
  },
  
  logout: (): Promise<void> => {
    return new Promise((resolve) => {
      localStorage.removeItem('currentUser');
      resolve();
    });
  },
  
  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  }
};

// Mock data operations
export const mockDataService = {
  getRequests: (): Promise<MovementRequest[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockRequests]), 500);
    });
  },
  
  getRequest: (id: string): Promise<MovementRequest | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const request = mockRequests.find(r => r.id === id);
        resolve(request || null);
      }, 300);
    });
  },
  
  createRequest: (request: Omit<MovementRequest, 'id' | 'createdAt'>): Promise<MovementRequest> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRequest: MovementRequest = {
          ...request,
          id: `REQ-${String(mockRequests.length + 1).padStart(3, '0')}`,
          createdAt: new Date().toISOString()
        };
        mockRequests.push(newRequest);
        resolve(newRequest);
      }, 800);
    });
  },
  
  updateRequestStatus: (id: string, status: MovementRequest['status'], reason?: string): Promise<MovementRequest | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const requestIndex = mockRequests.findIndex(r => r.id === id);
        if (requestIndex !== -1) {
          const historyEntry: ApprovalHistory = {
            id: Date.now().toString(),
            action: status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'updated',
            performedBy: '2',
            performedByName: 'Sarah Procurement',
            timestamp: new Date().toISOString(),
            comment: reason
          };

          mockRequests[requestIndex] = {
            ...mockRequests[requestIndex],
            status,
            rejectionReason: status === 'rejected' ? reason : undefined,
            approvedBy: status === 'approved' ? '2' : undefined,
            approvalHistory: [...(mockRequests[requestIndex].approvalHistory || []), historyEntry]
          };
          resolve(mockRequests[requestIndex]);
        } else {
          resolve(null);
        }
      }, 500);
    });
  },

  cancelRequest: (id: string, reason: string): Promise<MovementRequest | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const requestIndex = mockRequests.findIndex(r => r.id === id);
        if (requestIndex !== -1) {
          const historyEntry: ApprovalHistory = {
            id: Date.now().toString(),
            action: 'cancelled',
            performedBy: mockRequests[requestIndex].createdBy,
            performedByName: 'John Employee',
            timestamp: new Date().toISOString(),
            comment: reason
          };

          mockRequests[requestIndex] = {
            ...mockRequests[requestIndex],
            status: 'cancelled',
            approvalHistory: [...(mockRequests[requestIndex].approvalHistory || []), historyEntry]
          };
          resolve(mockRequests[requestIndex]);
        } else {
          resolve(null);
        }
      }, 500);
    });
  },

  updateRequest: (id: string, data: Partial<MovementRequest>): Promise<MovementRequest | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const requestIndex = mockRequests.findIndex(r => r.id === id);
        if (requestIndex !== -1) {
          mockRequests[requestIndex] = {
            ...mockRequests[requestIndex],
            ...data
          };
          resolve(mockRequests[requestIndex]);
        } else {
          resolve(null);
        }
      }, 500);
    });
  }
};