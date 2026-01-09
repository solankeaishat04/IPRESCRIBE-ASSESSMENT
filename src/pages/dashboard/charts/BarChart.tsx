/* eslint-disable react-hooks/static-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/charts/UsersBarChart.tsx
import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  Chip,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  
} from 'recharts';

interface UsersBarChartProps {
  data: Array<{ name: string; doctors: number; patients: number }>;
}

export const UsersBarChart: React.FC<UsersBarChartProps> = ({ data }) => {
  const theme = useTheme();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px',
            p: 1.5,
            boxShadow: theme.shadows[3],
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
            {payload[0].payload.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Chip
              label={`Doctors: ${payload[0].value}`}
              size="small"
              sx={{ bgcolor: '#F2A62C', color: '#FFFFFF', fontWeight: 600 }}
            />
            <Chip
              label={`Patients: ${payload[1].value}`}
              size="small"
              sx={{ bgcolor: '#0EA5E9', color: '#FFFFFF', fontWeight: 600 }}
            />
          </Box>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '18px', color: 'text.primary', mb: 3 }}>
        Active Doctors vs Active Patients
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '2px', bgcolor: '#F2A62C' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            Doctors
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '2px', bgcolor: '#0EA5E9' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            Patients
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, minHeight: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="doctors"
              fill="#F2A62C"
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
            <Bar
              dataKey="patients"
              fill="#0EA5E9"
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};