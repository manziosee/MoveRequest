import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import RequestsList from './RequestsList';

export default function RequestsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <RequestsList />
      </DashboardLayout>
    </ProtectedRoute>
  );
}