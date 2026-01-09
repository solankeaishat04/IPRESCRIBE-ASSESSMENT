/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Paper, Typography, Chip, useTheme } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

interface StatCardProps {
  title: string;
  value: number;
  percentage: string;
  positive: boolean;
  subtitle: string;
  icon: React.ElementType;
  color: {
    bg: string;
    icon: string;
  };
  variants?: any;
}

export const StatCard = ({
  title,
  value,
  percentage,
  positive,
  subtitle,
  icon: Icon,
  color,
  variants,
}: StatCardProps) => {
  const theme = useTheme();

  return (
    <MotionPaper
      variants={variants}
      initial="hidden"
      animate="visible"
      elevation={0}
      sx={{
        p: 2,
        height: '100%',
        borderRadius: '12px',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: color.bg,
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: theme.shadows[2],
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              fontSize: '24px',
              mt: 1,
              mb: 0.5,
            }}
          >
            {value.toLocaleString()}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {positive ? (
              <TrendingUp sx={{ fontSize: '14px', color: '#10B981' }} />
            ) : (
              <TrendingDown sx={{ fontSize: '14px', color: '#EF4444' }} />
            )}

            <Chip
              label={percentage}
              size="small"
              sx={{
                bgcolor: positive ? '#DCFCE7' : '#FEE2E2',
                color: positive ? '#166534' : '#991B1B',
                fontSize: '10px',
                height: '20px',
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            bgcolor: color.icon,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
          }}
        >
          <Icon sx={{ fontSize: '18px' }} />
        </Box>
      </Box>

      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontSize: '10px',
          display: 'block',
          mt: 0.5,
        }}
      >
        {subtitle}
      </Typography>
    </MotionPaper>
  );
};
