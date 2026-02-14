'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { 
  Plus, Trash2, Calendar as CalendarIcon, 
  Save, Send, ArrowLeft, Upload 
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';

interface RequestItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  estimatedCost: number;
}
import Link from 'next/link';

interface FormData {
  title: string;
  department: string;
  priority: 'low' | 'medium' | 'high';
  neededBy: Date | undefined;
  neededByTime: string;
  fromLocation: string;
  toLocation: string;
  purpose: string;
  items: RequestItem[];
}

const initialFormData: FormData = {
  title: '',
  department: '',
  priority: 'medium',
  neededBy: undefined,
  neededByTime: '09:00',
  fromLocation: '',
  toLocation: '',
  purpose: '',
  items: [{ id: '1', name: '', category: '', quantity: 1, unit: 'pcs', estimatedCost: 0 }]
};

const units = ['pcs', 'box', 'kg', 'liter', 'meter', 'set'];

export default function NewRequestForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [departments, setDepartments] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const [deptResponse, catResponse] = await Promise.all([
        api.getDepartments(token),
        api.getCategories(token)
      ]);

      if (deptResponse.ok) {
        const deptData = await deptResponse.json();
        setDepartments(deptData.map((d: any) => d.name));
      }

      if (catResponse.ok) {
        const catData = await catResponse.json();
        setCategories(catData.map((c: any) => c.name));
      }
    } catch (error) {
      console.error('Failed to load form data:', error);
      toast.error('Failed to load form data');
    } finally {
      setLoadingData(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    const newItem: RequestItem = {
      id: Date.now().toString(),
      name: '',
      category: '',
      quantity: 1,
      unit: 'pcs',
      estimatedCost: 0
    };
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateItem = (id: string, field: keyof RequestItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.title && formData.department && formData.priority && formData.neededBy && formData.neededByTime);
      case 2:
        return !!(formData.fromLocation && formData.toLocation && formData.purpose);
      case 3:
        return formData.items.every(item => item.name && item.category && item.quantity > 0);
      default:
        return true;
    }
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    if (!user) return;

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Authentication required');
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        title: formData.title,
        department: formData.department,
        priority: formData.priority,
        neededBy: formData.neededBy!.toISOString(),
        fromLocation: formData.fromLocation,
        toLocation: formData.toLocation,
        purpose: formData.purpose,
        items: formData.items.map(({ id, ...item }) => item),
      };

      const response = await api.createRequest(token, requestData);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create request');
      }
      
      toast.success('Request submitted successfully');
      router.push('/requests');
    } catch (error: any) {
      console.error('Request creation error:', error);
      toast.error(error.message || 'Failed to save request');
    } finally {
      setLoading(false);
    }
  };

  const getTotalCost = () => {
    return formData.items.reduce((total, item) => total + (item.quantity * item.estimatedCost), 0);
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200",
              currentStep >= step
                ? "bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/25"
                : "bg-muted text-muted-foreground"
            )}
          >
            {step}
          </div>
          {step < 4 && (
            <div
              className={cn(
                "w-20 h-1 mx-3 rounded-full transition-all duration-200",
                currentStep > step ? "bg-primary" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  const StepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="border-gray-200/60 shadow-sm">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Provide basic details about your request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Request Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  placeholder="Enter a descriptive title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select value={formData.department} onValueChange={(value) => updateFormData('department', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <Select value={formData.priority} onValueChange={(value: 'low' | 'medium' | 'high') => updateFormData('priority', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Low
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                          Medium
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                          High
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Needed By Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.neededBy && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.neededBy ? format(formData.neededBy, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.neededBy}
                        onSelect={(date) => updateFormData('neededBy', date)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="neededByTime">Needed By Time *</Label>
                  <Input
                    id="neededByTime"
                    type="time"
                    value={formData.neededByTime}
                    onChange={(e) => updateFormData('neededByTime', e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="border-gray-200/60 shadow-sm">
            <CardHeader>
              <CardTitle>Movement Details</CardTitle>
              <CardDescription>Specify locations and purpose</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromLocation">From Location *</Label>
                  <Input
                    id="fromLocation"
                    value={formData.fromLocation}
                    onChange={(e) => updateFormData('fromLocation', e.target.value)}
                    placeholder="e.g., Main Office - Floor 3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toLocation">To Location *</Label>
                  <Input
                    id="toLocation"
                    value={formData.toLocation}
                    onChange={(e) => updateFormData('toLocation', e.target.value)}
                    placeholder="e.g., Branch Office - Floor 1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose / Justification *</Label>
                <Textarea
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => updateFormData('purpose', e.target.value)}
                  placeholder="Explain the reason for this movement request..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="border-gray-200/60 shadow-sm">
            <CardHeader>
              <CardTitle>Items</CardTitle>
              <CardDescription>Add items to be moved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Name *</TableHead>
                      <TableHead>Category *</TableHead>
                      <TableHead>Quantity *</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Est. Cost</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Input
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                            placeholder="Item name"
                          />
                        </TableCell>
                        <TableCell>
                          <Select value={item.category} onValueChange={(value) => updateItem(item.id, 'category', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                          />
                        </TableCell>
                        <TableCell>
                          <Select value={item.unit} onValueChange={(value) => updateItem(item.id, 'unit', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {units.map((unit) => (
                                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.estimatedCost}
                            onChange={(e) => updateItem(item.id, 'estimatedCost', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            disabled={formData.items.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-between items-center">
                  <Button variant="outline" onClick={addItem}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                  <div className="text-lg font-semibold">
                    Total: ${getTotalCost().toFixed(2)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="border-gray-200/60 shadow-sm">
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>Review your request before submitting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Basic Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Title:</strong> {formData.title}</p>
                    <p><strong>Department:</strong> {formData.department}</p>
                    <p><strong>Priority:</strong> 
                      <Badge className={cn(
                        "ml-2",
                        formData.priority === 'high' && "bg-red-100 text-red-800",
                        formData.priority === 'medium' && "bg-amber-100 text-amber-800",
                        formData.priority === 'low' && "bg-green-100 text-green-800"
                      )}>
                        {formData.priority}
                      </Badge>
                    </p>
                    <p><strong>Needed By:</strong> {formData.neededBy ? `${format(formData.neededBy, "PPP")} at ${formData.neededByTime}` : 'Not set'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Movement Details</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>From:</strong> {formData.fromLocation}</p>
                    <p><strong>To:</strong> {formData.toLocation}</p>
                    <p><strong>Purpose:</strong> {formData.purpose}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Items ({formData.items.length})</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.quantity} {item.unit}</TableCell>
                          <TableCell>${(item.quantity * item.estimatedCost).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="text-right mt-2 font-semibold">
                  Total Estimated Cost: ${getTotalCost().toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-3 sm:p-6 max-w-4xl mx-auto animate-fade-in">
      {loadingData ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading form data...</p>
          </div>
        </div>
      ) : (
        <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">New Movement Request 📝</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Create a new movement or procurement request</p>
        </div>
        <Link href="/requests" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Requests
          </Button>
        </Link>
      </div>

      <StepIndicator />
      <StepContent />

      <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 gap-3">
        <div>
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="w-full sm:w-auto gap-2"
            >
              Previous
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          {currentStep < 4 ? (
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!validateStep(currentStep)}
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25"
            >
              Next
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => handleSubmit(true)}
                disabled={loading}
                className="w-full sm:w-auto gap-2"
              >
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              <Button
                onClick={() => handleSubmit(false)}
                disabled={loading}
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 gap-2"
              >
                <Send className="h-4 w-4" />
                Submit Request
              </Button>
            </>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
}