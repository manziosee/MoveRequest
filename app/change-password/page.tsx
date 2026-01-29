import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import ChangePasswordForm from './ChangePasswordForm';

export default function ChangePasswordPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <ChangePasswordForm />
      </DashboardLayout>
    </ProtectedRoute>
  );
}