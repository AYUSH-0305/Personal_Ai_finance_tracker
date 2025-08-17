import { useAuth } from '@/contexts/AuthContext';
import { AuthForm } from '@/components/Auth/AuthForm';
import { Dashboard } from '@/components/Dashboard/Dashboard';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return <AuthForm />;
  }

  return <Dashboard />;
};

export default Index;
