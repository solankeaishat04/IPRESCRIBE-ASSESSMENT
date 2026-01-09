import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      
      {/* Sidebar - Fixed on left */}
      <Sidebar />
      
      {/* Main content area - Positioned next to sidebar */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          ml: { xs: 0, md: '280px' }, // Margin left for sidebar on desktop
          transition: 'margin-left 0.3s ease',
        }}
      >
        {/* Topbar - Fixed at top */}
        <Topbar />
        
        {/* Main content container with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ flex: 1, overflow: 'auto' }}
          >
            <Container 
              maxWidth="xl" 
              sx={{ 
                py: 4, 
                px: { xs: 2, sm: 3 },
                mt: { xs: 7, sm: 8 }, // Margin top for topbar
                width: '100%',
              }}
            >
              {children}
            </Container>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};