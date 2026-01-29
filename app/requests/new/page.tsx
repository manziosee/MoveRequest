import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import NewRequestForm from './NewRequestForm';

export default function NewRequestPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <NewRequestForm />
      </DashboardLayout>
    </ProtectedRoute>
  );
}