import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';

import {
  CalendarToday,
  FileDownloadOutlined,
  Refresh,
  People,
  MedicalServices,
  PendingActions,
  Chat,
  ReceiptLong,
  TrendingDown,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

import { ConsultationChart } from './charts/ConsultationChart';
import { PrescriptionChart } from './charts/PrescriptionChart';
import { UsersBarChart } from './charts/BarChart';
import { SpecialtyChart } from './charts/SpecialityChart';
import { PatientsTable } from './components/PatientTables';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { StatCard } from './components/StatCard';

import { useDashboardStats, useRecentPatients } from '../../api/DashboardApi';

/* ---------------------------------- */
/* Stat config */
/* ---------------------------------- */

const statIcons = {
  patients: People,
  doctors: MedicalServices,
  pending_reviews: PendingActions,
  consultations: Chat,
  prescriptions: ReceiptLong,
  funding_refusal: TrendingDown,
};

const statColors = {
  patients: { bg: '#F0F9FF', icon: '#0EA5E9' },
  doctors: { bg: '#F0FDF4', icon: '#10B981' },
  pending_reviews: { bg: '#FEF3C7', icon: '#F59E0B' },
  consultations: { bg: '#F5F3FF', icon: '#8B5CF6' },
  prescriptions: { bg: '#FEF7CD', icon: '#EAB308' },
  funding_refusal: { bg: '#FEE2E2', icon: '#EF4444' },
};

/* ---------------------------------- */
/* Animations */
/* ---------------------------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

/* ---------------------------------- */
/* Dashboard */
/* ---------------------------------- */

export const DashboardHome = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const [searchQuery] = useState('');
  const [statusFilter] = useState('all');

  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: patientsData } = useRecentPatients();

  /* ---------- Stats ---------- */

  const statCards = stats
    ? [
        {
          id: 'patients',
          title: 'Total Patients',
          value: stats.patients.total_patients,
          percentage: `${stats.patients.patients_percentage_since_last_week}%`,
          positive: stats.patients.positive,
          subtitle: `${stats.patients.patients_this_week} this week`,
          icon: statIcons.patients,
          color: statColors.patients,
        },
        {
          id: 'doctors',
          title: 'Total Doctors',
          value: stats.doctors.total_doctors,
          percentage: `${stats.doctors.doctors_percentage_since_last_week}%`,
          positive: stats.doctors.positive,
          subtitle: `${stats.doctors.doctors_this_week} this week`,
          icon: statIcons.doctors,
          color: statColors.doctors,
        },
        {
          id: 'pending_reviews',
          title: 'Pending Reviews',
          value: stats.pending_reviews.total_pending_reviews,
          percentage: `${stats.pending_reviews.pending_reviews_percentage_since_last_week}%`,
          positive: stats.pending_reviews.positive,
          subtitle: `${stats.pending_reviews.pending_reviews_this_week} this week`,
          icon: statIcons.pending_reviews,
          color: statColors.pending_reviews,
        },
        {
          id: 'consultations',
          title: 'Total Consultations',
          value: stats.consultations.total_consultations,
          percentage: `${stats.consultations.consultations_percentage_since_last_week}%`,
          positive: stats.consultations.positive,
          subtitle: `${stats.consultations.consultations_this_week} this week`,
          icon: statIcons.consultations,
          color: statColors.consultations,
        },
        {
          id: 'prescriptions',
          title: 'Prescriptions Issued',
          value: stats.prescriptions.total_prescriptions,
          percentage: `${stats.prescriptions.prescriptions_percentage_since_last_week}%`,
          positive: stats.prescriptions.positive,
          subtitle: `${stats.prescriptions.prescriptions_this_week} this week`,
          icon: statIcons.prescriptions,
          color: statColors.prescriptions,
        },
        {
          id: 'funding_refusal',
          title: 'Funding Refusal',
          value: 0,
          percentage: '-0%',
          positive: false,
          subtitle: '0 this week',
          icon: statIcons.funding_refusal,
          color: statColors.funding_refusal,
        },
      ]
    : [];

  /* ---------- Chart data ---------- */

  const consultationData =
    stats?.consultationOverTime?.map((item) => ({
      name: item.month,
      consultations: item.count,
    })) || [];

  const prescriptionData =
    stats?.prescriptionVolumeTrend?.map((item) => ({
      name: item.month,
      prescriptions: item.count,
    })) || [];

  const barChartData =
    stats?.active_doctors_vs_patients?.categories?.map((category, index) => ({
      name: category,
      doctors: stats.active_doctors_vs_patients.series[0]?.data[index] || 0,
      patients: stats.active_doctors_vs_patients.series[1]?.data[index] || 0,
    })) || [];

  const specialtyData =
    stats?.top_specialities_in_demand?.map((item, index) => {
      const colors = ['#0EA5E9', '#10B981', '#F59E0B', '#8B5CF6'];
      return {
        name: item.speciality,
        value: item.count,
        color: colors[index] || colors[colors.length - 1],
      };
    }) || [];

  /* ---------- Layout functions ---------- */

  const getStatCardWidth = () => {
    if (isMobile) return 'calc(50% - 12px)';
    if (isTablet) return 'calc(33.333% - 16px)';
    return 'calc(16.666% - 20px)';
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ pb: 4 }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          mb: 4,
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Latest update for the last 7 days.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Paper sx={{ px: 2, py: 1, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarToday fontSize="small" />
            <Typography variant="body2">12th Sept - 15th Sept, 2025</Typography>
          </Paper>

          <Button
            variant="contained"
            startIcon={<FileDownloadOutlined />}
            sx={{ bgcolor: '#283C85', textTransform: 'none' }}
          >
            Export
          </Button>

          <IconButton>
            <Refresh />
          </IconButton>
        </Stack>
      </Box>

      {/* Stats - Using Flexbox instead of Grid */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          mb: 4,
        }}
      >
        {statsLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: getStatCardWidth(),
                  minWidth: isMobile ? '140px' : 'auto',
                }}
              >
                <LoadingSkeleton height={140} borderRadius={12} />
              </Box>
            ))
          : statCards.map((stat) => (
              <Box
                key={stat.id}
                sx={{
                  width: getStatCardWidth(),
                  minWidth: isMobile ? '140px' : 'auto',
                  flexShrink: 0,
                }}
              >
                <StatCard {...stat} />
              </Box>
            ))}
      </Box>

      {/* Charts - Using Flexbox */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          gap: 3,
          mb: 4,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ borderRadius: '16px', overflow: 'hidden', height: '100%' }}>
            <ConsultationChart data={consultationData} />
          </Paper>
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ borderRadius: '16px', overflow: 'hidden', height: '100%' }}>
            <PrescriptionChart data={prescriptionData} />
          </Paper>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          gap: 3,
          mb: 4,
        }}
      >
        <Box sx={{ flex: isDesktop ? 7 : 1 }}>
          <Paper sx={{ borderRadius: '16px', overflow: 'hidden', height: '100%' }}>
            <UsersBarChart data={barChartData} />
          </Paper>
        </Box>
        
        <Box sx={{ flex: isDesktop ? 5 : 1 }}>
          <Paper sx={{ borderRadius: '16px', overflow: 'hidden', height: '100%' }}>
            <SpecialtyChart data={specialtyData} />
          </Paper>
        </Box>
      </Box>

      {/* Patients Table */}
      <Paper sx={{ borderRadius: '16px', overflow: 'hidden', mb: 4 }}>
        <PatientsTable
          data={patientsData?.data || []}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
        />
      </Paper>
    </Box>
  );
};