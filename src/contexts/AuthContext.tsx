/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface Role {
  id: number;
  name: string;
  slug: string;
  default: number;
}

interface User {
  id: number;
  email: string;
  roles: Role[];
  first_name: string | null;
  last_name: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Define logout function first so it can be used in useEffect
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    setToken(null);
    setUser(null);
    
    // Redirect to login page
    window.location.href = '/loginpage';
  };

  useEffect(() => {
    // Check for stored token and user data on mount
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('userData');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear invalid data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setToken(null);
        setUser(null);
      }
    }
    
    setIsLoading(false);
  }, []); // Remove logout from dependencies array

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('userData', JSON.stringify(newUser));
    
    setToken(newToken);
    setUser(newUser);
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.roles?.some(role => role.slug === 'admin') || false;

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Also export AuthContext for direct access if needed
export { AuthContext };