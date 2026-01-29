import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import ApprovalsContent from './ApprovalsContent';

export default function ApprovalsPage() {
  return (
    <ProtectedRoute allowedRoles={['procurement', 'admin']}>
      <DashboardLayout>
        <ApprovalsContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}