/* eslint-disable react-hooks/static-components */
// components/charts/SpecialtyChart.tsx
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Stack,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface SpecialtyChartProps {
  data: Array<{ name: string; value: number; color: string }>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: { name: string; value: number; color: string };
    value: number;
  }>;
}

export const SpecialtyChart: React.FC<SpecialtyChartProps> = ({ data }) => {
  const theme = useTheme();
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const centerPercentage = total > 0 ? Math.round((data[0]?.value / total) * 100) : 0;

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      const percentage = total > 0 ? ((payload[0].value / total) * 100).toFixed(1) : '0';
      return (
        <Paper
          elevation={3}
          sx={{
            p: 1.5,
            borderRadius: '8px',
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: payload[0].payload.color }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {payload[0].payload.name}
            </Typography>
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {payload[0].value} cases ({percentage}%)
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 4 }}>
        Top Specialties in Demand
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', height: 250 }}>
        <Box sx={{ width: '50%', height: '100%', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {centerPercentage}%
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Total Demand
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: '50%', pl: 3 }}>
   
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            {data.map((item, index) => (
              <Box 
                key={index}
                sx={{ display: 'flex' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%' }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '2px',
                      bgcolor: item.color,
                      mr: 1.5,
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                        fontSize: '11px',
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        fontSize: '20px',
                        lineHeight: 1.2,
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};