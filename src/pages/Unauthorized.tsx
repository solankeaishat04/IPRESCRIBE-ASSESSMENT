
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        p: 3,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 700, color: '#283C85', mb: 2 }}>
        403
      </Typography>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Access Denied
      </Typography>
      <Typography sx={{ mb: 4, color: 'text.secondary', textAlign: 'center', maxWidth: 400 }}>
        You don't have permission to access this page. Please contact your administrator if you believe this is an error.
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate('/')}
        sx={{ 
          bgcolor: '#283C85',
          '&:hover': { bgcolor: '#1e2d63' }
        }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default Unauthorized;