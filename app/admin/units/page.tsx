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
import { Plus, Pencil, Trash2, Ruler } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ConfirmDialog';

interface Unit {
  id: string;
  name: string;
  abbreviation: string;
  type: 'quantity' | 'weight' | 'volume' | 'length';
  usageCount: number;
}

const initialUnits: Unit[] = [
  { id: '1', name: 'Pieces', abbreviation: 'pcs', type: 'quantity', usageCount: 234 },
  { id: '2', name: 'Box', abbreviation: 'box', type: 'quantity', usageCount: 89 },
  { id: '3', name: 'Kilogram', abbreviation: 'kg', type: 'weight', usageCount: 56 },
  { id: '4', name: 'Liter', abbreviation: 'ltr', type: 'volume', usageCount: 34 },
  { id: '5', name: 'Meter', abbreviation: 'm', type: 'length', usageCount: 23 },
  { id: '6', name: 'Set', abbreviation: 'set', type: 'quantity', usageCount: 67 },
];

export default function UnitsPage() {
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', abbreviation: '', type: 'quantity' as Unit['type'] });

  const handleAdd = () => {
    setEditingUnit(null);
    setFormData({ name: '', abbreviation: '', type: 'quantity' });
    setDialogOpen(true);
  };

  const handleEdit = (unit: Unit) => {
    setEditingUnit(unit);
    setFormData({ name: unit.name, abbreviation: unit.abbreviation, type: unit.type });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.abbreviation.trim()) {
      toast.error('All fields are required');
      return;
    }

    if (editingUnit) {
      setUnits(units.map(u =>
        u.id === editingUnit.id
          ? { ...u, ...formData }
          : u
      ));
      toast.success('Unit updated successfully');
    } else {
      const newUnit: Unit = {
        id: Date.now().toString(),
        ...formData,
        usageCount: 0
      };
      setUnits([...units, newUnit]);
      toast.success('Unit added successfully');
    }

    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setUnits(units.filter(u => u.id !== deletingId));
      toast.success('Unit deleted successfully');
      setDeleteConfirmOpen(false);
      setDeletingId(null);
    }
  };

  const getTypeColor = (type: Unit['type']) => {
    switch (type) {
      case 'quantity': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'weight': return 'bg-green-100 text-green-700 border-green-200';
      case 'volume': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'length': return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout>
        <div className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Units of Measurement 📏</h1>
              <p className="text-muted-foreground mt-1">Manage units for item quantities</p>
            </div>
            <Button
              onClick={handleAdd}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Unit
            </Button>
          </div>

          <Card className="border-gray-200/60 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-primary" />
                <CardTitle>All Units ({units.length})</CardTitle>
              </div>
              <CardDescription>Manage measurement units for requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-gray-200/60 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead>Unit Name</TableHead>
                      <TableHead>Abbreviation</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Usage Count</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {units.map((unit) => (
                      <TableRow key={unit.id}>
                        <TableCell className="font-medium">{unit.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {unit.abbreviation}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getTypeColor(unit.type)}>
                            {unit.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{unit.usageCount} times</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(unit)}
                              className="h-8 gap-2"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(unit.id)}
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
                <DialogTitle>{editingUnit ? 'Edit Unit' : 'Add New Unit'}</DialogTitle>
                <DialogDescription>
                  {editingUnit ? 'Update the unit details below' : 'Create a new measurement unit'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Unit Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Pieces"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="abbreviation">Abbreviation *</Label>
                  <Input
                    id="abbreviation"
                    value={formData.abbreviation}
                    onChange={(e) => setFormData({ ...formData, abbreviation: e.target.value })}
                    placeholder="e.g., pcs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Unit Type *</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Unit['type'] })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="quantity">Quantity</option>
                    <option value="weight">Weight</option>
                    <option value="volume">Volume</option>
                    <option value="length">Length</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingUnit ? 'Update' : 'Add'} Unit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation */}
          <ConfirmDialog
            open={deleteConfirmOpen}
            onOpenChange={setDeleteConfirmOpen}
            title="Delete Unit"
            description="Are you sure you want to delete this unit? This action cannot be undone."
            onConfirm={confirmDelete}
            confirmText="Delete"
            variant="destructive"
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
