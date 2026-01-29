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
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ConfirmDialog';

interface Location {
  id: string;
  name: string;
  building: string;
  floor: string;
  address: string;
  usageCount: number;
}

const initialLocations: Location[] = [
  { id: '1', name: 'Main Office', building: 'HQ Building', floor: 'Floor 1', address: 'KN 5 Ave, Kigali', usageCount: 234 },
  { id: '2', name: 'Branch Office', building: 'Branch A', floor: 'Floor 2', address: 'KG 7 St, Kigali', usageCount: 156 },
  { id: '3', name: 'Warehouse', building: 'Storage Facility', floor: 'Ground', address: 'KN 12 Rd, Kigali', usageCount: 89 },
  { id: '4', name: 'Server Room', building: 'HQ Building', floor: 'Floor 3', address: 'KN 5 Ave, Kigali', usageCount: 45 },
  { id: '5', name: 'Training Center', building: 'Training Block', floor: 'Floor 1', address: 'KK 15 Ave, Kigali', usageCount: 67 },
];

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', building: '', floor: '', address: '' });

  const handleAdd = () => {
    setEditingLocation(null);
    setFormData({ name: '', building: '', floor: '', address: '' });
    setDialogOpen(true);
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      building: location.building,
      floor: location.floor,
      address: location.address
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.building.trim()) {
      toast.error('Name and building are required');
      return;
    }

    if (editingLocation) {
      setLocations(locations.map(l =>
        l.id === editingLocation.id
          ? { ...l, ...formData }
          : l
      ));
      toast.success('Location updated successfully');
    } else {
      const newLocation: Location = {
        id: Date.now().toString(),
        ...formData,
        usageCount: 0
      };
      setLocations([...locations, newLocation]);
      toast.success('Location added successfully');
    }

    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setLocations(locations.filter(l => l.id !== deletingId));
      toast.success('Location deleted successfully');
      setDeleteConfirmOpen(false);
      setDeletingId(null);
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout>
        <div className="p-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Locations 📍</h1>
              <p className="text-muted-foreground mt-1">Manage organizational locations and buildings</p>
            </div>
            <Button
              onClick={handleAdd}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Location
            </Button>
          </div>

          <Card className="border-gray-200/60 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <CardTitle>All Locations ({locations.length})</CardTitle>
              </div>
              <CardDescription>Manage locations for movement requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-gray-200/60 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead>Location Name</TableHead>
                      <TableHead>Building</TableHead>
                      <TableHead>Floor</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {locations.map((location) => (
                      <TableRow key={location.id}>
                        <TableCell className="font-medium">{location.name}</TableCell>
                        <TableCell className="text-muted-foreground">{location.building}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {location.floor}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{location.address}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {location.usageCount} times
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(location)}
                              className="h-8 gap-2"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(location.id)}
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
                <DialogTitle>{editingLocation ? 'Edit Location' : 'Add New Location'}</DialogTitle>
                <DialogDescription>
                  {editingLocation ? 'Update the location details below' : 'Create a new location'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Location Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Main Office"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="building">Building *</Label>
                  <Input
                    id="building"
                    value={formData.building}
                    onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                    placeholder="e.g., HQ Building"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floor">Floor</Label>
                  <Input
                    id="floor"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                    placeholder="e.g., Floor 1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g., KN 5 Ave, Kigali"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingLocation ? 'Update' : 'Add'} Location
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation */}
          <ConfirmDialog
            open={deleteConfirmOpen}
            onOpenChange={setDeleteConfirmOpen}
            title="Delete Location"
            description="Are you sure you want to delete this location? This action cannot be undone."
            onConfirm={confirmDelete}
            confirmText="Delete"
            variant="destructive"
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
