// REMOVE BrowserRouter import - only need Routes, Route, Navigate
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import { LoginPage } from '../pages/auth/LoginPage';
import Dashboard from '../pages/dashboard/Dashboard';
import Unauthorized from '../pages/Unauthorized';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => (
  // NO Router wrapper here!
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/unauthorized" element={<Unauthorized />} />
    
    {/* Protected Routes */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute requireAdmin>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    
    {/* Redirect unknown routes */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;