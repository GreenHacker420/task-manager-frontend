
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard or login based on authentication status
    const isAuthenticated = localStorage.getItem('auth_token');
    console.log('Index: Checking authentication status', { isAuthenticated });

    if (isAuthenticated) {
      console.log('Index: Redirecting to dashboard');
      navigate('/dashboard');
    } else {
      console.log('Index: Redirecting to login');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-2xl font-medium mb-2">Task Management</h1>
        <p className="text-gray-600">Loading your workspace...</p>
      </div>
    </div>
  );
};

export default Index;
