import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import RequestDetails from './RequestDetails';

export default async function RequestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <RequestDetails requestId={id} />
      </DashboardLayout>
    </ProtectedRoute>
  );
}