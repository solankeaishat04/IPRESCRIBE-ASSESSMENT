// AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { DashboardHome } from '../pages/dashboard/Dashboard';
import Unauthorized from '../pages/Unauthorized';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    {/* Public Routes without Layout */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/unauthorized" element={<Unauthorized />} />
    
    {/* Protected Routes with Layout */}
    <Route
      path="/dashboard/*"
      element={
        <ProtectedRoute requireAdmin>
          <DashboardHome />
        </ProtectedRoute>
      }
    />
    
    {/* Redirect unknown routes */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;