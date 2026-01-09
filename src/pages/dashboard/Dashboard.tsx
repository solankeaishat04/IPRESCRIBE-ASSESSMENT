
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext'; 
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Navbar */}
      <Box sx={{ bgcolor: '#283C85', color: 'white', py: 2, px: 4 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600}>
              iPrescribe Admin Dashboard
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography>
                Welcome, {user?.email}
              </Typography>
              <Button 
                variant="outlined" 
                onClick={logout}
                sx={{ 
                  color: 'white', 
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" gutterBottom>
              Dashboard Overview
            </Typography>
            <Typography color="text.secondary" paragraph>
              Welcome to your admin dashboard. You can manage all aspects of the iPrescribe platform from here.
            </Typography>
            
            {/* User Info */}
            <Box sx={{ mt: 4, p: 3, bgcolor: '#F0F4FF', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Your Information
              </Typography>
              <Typography>
                <strong>Email:</strong> {user?.email}
              </Typography>
              <Typography>
                <strong>Roles:</strong> {user?.roles?.map(role => role.name).join(', ')}
              </Typography>
              <Typography>
                <strong>User ID:</strong> {user?.id}
              </Typography>
            </Box>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Dashboard;