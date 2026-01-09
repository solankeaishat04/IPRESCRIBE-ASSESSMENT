// components/ui/LoadingSkeleton.tsx
import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  height?: number;
  width?: number | string;
  borderRadius?: number;
  variant?: 'rectangular' | 'text' | 'circular';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  height = 100,
  width = '100%',
  borderRadius = 12,
  variant = 'rectangular',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Skeleton
        variant={variant}
        animation="wave"
        sx={{
          height,
          width,
          borderRadius,
          bgcolor: 'action.hover',
        }}
      />
    </motion.div>
  );
};

// Card Skeleton
export const CardSkeleton: React.FC = () => (
  <Box sx={{ p: 3 }}>
    <Skeleton variant="rectangular" height={40} sx={{ mb: 2, borderRadius: 1 }} />
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="40%" />
  </Box>
);

// Table Skeleton
export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <Box sx={{ p: 3 }}>
    {Array.from(new Array(rows)).map((_, i) => (
      <Skeleton key={i} variant="rectangular" height={50} sx={{ mb: 1, borderRadius: 1 }} />
    ))}
  </Box>
);