
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  requireAuth: boolean;
}

export const AuthGuard = ({ requireAuth }: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Development mode - set to false to enable authentication checks
  const isDevelopmentMode = false;

  console.log('AuthGuard:', { requireAuth, isAuthenticated, isLoading, isDevelopmentMode });

  // Show loading state while checking authentication
  if (isLoading) {
    console.log('AuthGuard: Loading...');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  // In development mode, skip authentication checks
  if (isDevelopmentMode) {
    console.log('AuthGuard: Development mode, skipping checks');
    return <Outlet />;
  }

  // Redirect logic for production
  if (requireAuth && !isAuthenticated) {
    console.log('AuthGuard: Redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (!requireAuth && isAuthenticated) {
    console.log('AuthGuard: Redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('AuthGuard: Rendering outlet');
  return <Outlet />;
};
