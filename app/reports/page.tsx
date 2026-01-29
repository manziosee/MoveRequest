import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import ReportsContent from './ReportsContent';

export default function ReportsPage() {
  return (
    <ProtectedRoute allowedRoles={['admin', 'procurement']}>
      <DashboardLayout>
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">System Reports 📊</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">Analytics and comprehensive reporting</p>
            </div>
          </div>
          <ReportsContent />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
