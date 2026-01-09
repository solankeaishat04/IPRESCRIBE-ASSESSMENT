// api/dashboardApi.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

// Create axios instance
const api = axios.create({
  baseURL: 'https://stagingapi.iprescribe.online/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/loginpage';
    }
    return Promise.reject(error);
  }
);

// Types
interface DashboardStats {
  patients: {
    total_patients: number;
    patients_this_week: number;
    patients_last_week: number;
    patients_percentage_since_last_week: number;
    positive: boolean;
  };
  doctors: {
    total_doctors: number;
    doctors_this_week: number;
    doctors_last_week: number;
    doctors_percentage_since_last_week: number;
    positive: boolean;
  };
  pending_reviews: {
    total_pending_reviews: number;
    pending_reviews_this_week: number;
    pending_reviews_last_week: number;
    pending_reviews_percentage_since_last_week: number;
    positive: boolean;
  };
  consultations: {
    total_consultations: number;
    consultations_this_week: number;
    consultations_last_week: number;
    consultations_percentage_since_last_week: number;
    positive: boolean;
  };
  prescriptions: {
    total_prescriptions: number;
    prescriptions_this_week: number;
    prescriptions_last_week: number;
    prescriptions_percentage_since_last_week: number;
    positive: boolean;
  };
  active_doctors_vs_patients: {
    categories: string[];
    series: Array<{
      name: string;
      data: number[];
    }>;
  };
  consultationOverTime: Array<{
    month: string;
    count: number;
  }>;
  prescriptionVolumeTrend: Array<{
    month: string;
    count: number;
  }>;
  top_specialities_in_demand: Array<{
    speciality: string;
    count: number;
  }>;
}

interface Patient {
  id: number;
  user_id: number;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  gender: string | null;
  phone: string | null;
  patient_id: string;
  email: string | null;
  parent_id: string;
  relationship: string | null;
  dob: string;
  marital_status: string | null;
  address1: string | null;
  address2: string | null;
  state: string | null;
  lga: string | null;
  attended_to: number;
  primary_account: number;
  created_at: string;
  status: string;
  last_seen: string;
  user: {
    id: number;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    dob: string;
    phone: string | null;
    state: string | null;
    lga: string | null;
    address1: string | null;
    address2: string | null;
    devices: Array<{
      platform: string;
      device_name: string;
    }>;
  };
}

interface PatientsResponse {
  current_page: number;
  data: Patient[];
  per_page: number;
  total: number;
  last_page: number;
}

// Dashboard stats query
export const useDashboardStats = () => {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      if (!isAuthenticated) {
        throw new Error('User not authenticated');
      }
      
      const { data } = await api.get<{ data: DashboardStats; message: string; status: number }>(
        '/admin/dashboard-stats'
      );
      return data.data;
    },
    enabled: isAuthenticated,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Recent patients query
export const useRecentPatients = (page = 1, perPage = 10) => {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['recentPatients', page, perPage],
    queryFn: async () => {
      if (!isAuthenticated) {
        throw new Error('User not authenticated');
      }
      
      const { data } = await api.get<{ 
        data: PatientsResponse; 
        message: string; 
        status: number 
      }>('/admin/patients', {
        params: {
          page,
          per_page: perPage,
          sort_by: 'created_at',
          sort_order: 'desc',
        },
      });
      return data.data;
    },
    enabled: isAuthenticated,
    retry: 1,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Patient details query
export const usePatientDetails = (patientId: number) => {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['patientDetails', patientId],
    queryFn: async () => {
      if (!isAuthenticated) {
        throw new Error('User not authenticated');
      }
      
      const { data } = await api.get<{ 
        data: Patient; 
        message: string; 
        status: number 
      }>(`/admin/patients/${patientId}`);
      return data.data;
    },
    enabled: isAuthenticated && !!patientId,
  });
};

// Update patient status mutation
export const useUpdatePatientStatus = () => {
  const { isAuthenticated } = useAuth();
  
  return {
    mutate: async (patientId: number, status: string) => {
      if (!isAuthenticated) {
        throw new Error('User not authenticated');
      }
      
      const { data } = await api.put(`/admin/patients/${patientId}/status`, { status });
      return data;
    },
  };
};

// Export API instance
export { api };