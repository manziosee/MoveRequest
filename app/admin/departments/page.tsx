'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ConfirmDialog';

interface Department {
  id: string;
  name: string;
  code: string;
  manager: string;
  userCount: number;
  requestCount: number;
  active: boolean;
}

const initialDepartments: Department[] = [
  { id: '1', name: 'Information Technology', code: 'IT', manager: 'John Doe', userCount: 32, requestCount: 145, active: true },
  { id: '2', name: 'Human Resources', code: 'HR', manager: 'Jane Smith', userCount: 28, requestCount: 98, active: true },
  { id: '3', name: 'Finance', code: 'FIN', manager: 'Mike Johnson', userCount: 25, requestCount: 112, active: true },
  { id: '4', name: 'Operations', code: 'OPS', manager: 'Sarah Williams', userCount: 45, requestCount: 167, active: true },
  { id: '5', name: 'Marketing', code: 'MKT', manager: 'David Brown', userCount: 18, requestCount: 76, active: true },
  { id: '6', name: 'Sales', code: 'SLS', manager: 'Emma Davis', userCount: 22, requestCount: 89, active: true },
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '', manager: '' });

  const handleAdd = () => {
    setEditingDept(null);
    setFormData({ name: '', code: '', manager: '' });
    setDialogOpen(true);
  };

  const handleEdit = (dept: Department) => {
    setEditingDept(dept);
    setFormData({ name: dept.name, code: dept.code, manager: dept.manager });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.code.trim()) {
      toast.error('Name and code are required');
      return;
    }

    if (editingDept) {
      setDepartments(departments.map(d =>
        d.id === editingDept.id
          ? { ...d, ...formData }
          : d
      ));
      toast.success('Department updated successfully');
    } else {
      const newDept: Department = {
        id: Date.now().toString(),
        ...formData,
        userCount: 0,
        requestCount: 0,
        active: true
      };
      setDepartments([...departments, newDept]);
      toast.success('Department added successfully');
    }

    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setDepartments(departments.filter(d => d.id !== deletingId));
      toast.success('Department deleted successfully');
      setDeleteConfirmOpen(false);
      setDeletingId(null);
    }
  };

  const toggleActive = (id: string) => {
    setDepartments(departments.map(d =>
      d.id === id ? { ...d, active: !d.active } : d
    ));
    toast.success('Department status updated');
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout>
        <div className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Departments 🏢</h1>
              <p className="text-muted-foreground mt-1">Manage organizational departments</p>
            </div>
            <Button
              onClick={handleAdd}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Department
            </Button>
          </div>

          <Card className="border-gray-200/60 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <CardTitle>All Departments ({departments.length})</CardTitle>
              </div>
              <CardDescription>View and manage organization departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-gray-200/60 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead>Department</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Requests</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departments.map((dept) => (
                      <TableRow key={dept.id}>
                        <TableCell className="font-medium">{dept.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono bg-blue-50 text-blue-700 border-blue-200">
                            {dept.code}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{dept.manager}</TableCell>
                        <TableCell>{dept.userCount}</TableCell>
                        <TableCell>{dept.requestCount}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={dept.active ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}
                          >
                            {dept.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleActive(dept.id)}
                              className="h-8"
                            >
                              {dept.active ? 'Deactivate' : 'Activate'}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(dept)}
                              className="h-8 gap-2"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(dept.id)}
                              className="h-8 gap-2 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Add/Edit Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingDept ? 'Edit Department' : 'Add New Department'}</DialogTitle>
                <DialogDescription>
                  {editingDept ? 'Update the department details below' : 'Create a new department'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Department Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Information Technology"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Department Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="e.g., IT"
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">Manager Name</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    placeholder="e.g., John Doe"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingDept ? 'Update' : 'Add'} Department
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation */}
          <ConfirmDialog
            open={deleteConfirmOpen}
            onOpenChange={setDeleteConfirmOpen}
            title="Delete Department"
            description="Are you sure you want to delete this department? This action cannot be undone."
            onConfirm={confirmDelete}
            confirmText="Delete"
            variant="destructive"
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
