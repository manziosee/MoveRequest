'use client';

import { useState, useEffect } from 'react';
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
import { Plus, Pencil, Trash2, Building2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { api } from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';

interface Department {
  id: number;
  name: string;
  description: string | null;
  budget: number | null;
  createdAt: string;
  updatedAt: string;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', budget: '' });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setLoading(true);
      const response = await api.getDepartments(token);
      if (response.ok) {
        const data = await response.json();
        setDepartments(data);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
      toast.error('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingDept(null);
    setFormData({ name: '', description: '', budget: '' });
    setDialogOpen(true);
  };

  const handleEdit = (dept: Department) => {
    setEditingDept(dept);
    setFormData({ 
      name: dept.name, 
      description: dept.description || '', 
      budget: dept.budget?.toString() || '' 
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Department name is required');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = {
      name: formData.name,
      description: formData.description || null,
      budget: formData.budget ? parseFloat(formData.budget) : null
    };

    try {
      if (editingDept) {
        const response = await api.updateDepartment(token, editingDept.id.toString(), payload);
        if (response.ok) {
          toast.success('Department updated successfully');
          fetchDepartments();
        } else {
          toast.error('Failed to update department');
        }
      } else {
        const response = await api.createDepartment(token, payload);
        if (response.ok) {
          toast.success('Department added successfully');
          fetchDepartments();
        } else {
          toast.error('Failed to create department');
        }
      }
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving department:', error);
      toast.error('Failed to save department');
    }
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await api.deleteDepartment(token, deletingId.toString());
      if (response.ok) {
        toast.success('Department deleted successfully');
        fetchDepartments();
      } else {
        toast.error('Failed to delete department');
      }
      setDeleteConfirmOpen(false);
      setDeletingId(null);
    } catch (error) {
      console.error('Error deleting department:', error);
      toast.error('Failed to delete department');
    }
  };

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

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
              {departments.length === 0 ? (
                <div className="text-center py-12">
                  <Building2 className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground mb-2">No departments yet</p>
                  <p className="text-sm text-muted-foreground/70 mb-4">
                    Create your first department to get started
                  </p>
                  <Button onClick={handleAdd} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Department
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200/60 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead>Department</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Budget (RWF)</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departments.map((dept) => (
                        <TableRow key={dept.id}>
                          <TableCell className="font-medium">{dept.name}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {dept.description || 'No description'}
                          </TableCell>
                          <TableCell>
                            {dept.budget ? (
                              <Badge variant="outline" className="font-mono bg-green-50 text-green-700 border-green-200">
                                {dept.budget.toLocaleString()}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground text-sm">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(dept.createdAt), { addSuffix: true })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
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
              )}
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
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of this department"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (RWF)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g., 1000000"
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
