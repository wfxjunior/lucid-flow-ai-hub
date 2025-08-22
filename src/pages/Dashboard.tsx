
import { BusinessDashboard } from '@/components/BusinessDashboard';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();

  return <BusinessDashboard onNavigate={(path) => navigate(path)} />;
}
