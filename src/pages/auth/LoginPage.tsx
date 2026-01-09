/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, 
  IconButton, InputAdornment, Paper, CircularProgress,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import brandLogo from "../../assets/icons/IPRESCRIBE LOGO 3 1.svg";
import { useLogin } from '../../hooks/useLogin';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const loginMutation = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return;
    }
    
    if (!password || password.length < 6) {
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, password });
    
    } catch (error) {
      
      console.log('Login failed');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{ 
        minHeight: '100vh', 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #283C85 0%, #1a237e 100%)',
        position: 'fixed', 
        top: 0, 
        left: 0,
        p: 2,
      }}
    >
      <MotionPaper
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        elevation={0}
        sx={{ 
          width: '100%', 
          maxWidth: '480px', 
          p: { xs: 4, md: 6 }, 
          borderRadius: '24px', 
          bgcolor: '#FFFFFF', 
          textAlign: 'center',
          mx: 2,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Back to home button */}
        <IconButton
          onClick={handleBackToHome}
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            color: '#283C85',
            '&:hover': { bgcolor: 'rgba(40, 60, 133, 0.1)' }
          }}
        >
          <ArrowBack />
        </IconButton>

        {/* Logo Section */}
        <MotionBox
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          sx={{ 
            mb: 4, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={brandLogo}
            alt="iPrescribe Logo"
            sx={{ 
              height: '50px',
              width: 'auto',
            }}
          />
        </MotionBox>

        {/* Header */}
        <MotionBox
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          sx={{ mb: 4 }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              fontSize: '20px', 
              mb: 1, 
              color: '#1A202C',
              textAlign: 'left'
            }}
          >
            Login to iPrescribe Admin
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#718096', 
              textAlign: 'left',
              fontSize: '14px'
            }}
          >
            Provide the required details to login.
          </Typography>
        </MotionBox>

        {/* Error Alert - Only show if there's an error */}
        {loginMutation.isError && (
          <MotionBox
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                borderRadius: '12px',
                alignItems: 'center'
              }}
            >
              {loginMutation.error?.message || 'Invalid credentials. Please try again.'}
            </Alert>
          </MotionBox>
        )}

        {/* Login Form */}
        <Box 
          component="form" 
          onSubmit={handleLogin} 
          sx={{ textAlign: 'left' }}
        >
          {/* Email Field */}
          <MotionBox
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Typography 
              sx={{ 
                mb: 1.5, 
                fontWeight: 600, 
                color: '#4A5568', 
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              Email Address
              <Box component="span" sx={{ color: '#E53E3E' }}>*</Box>
            </Typography>
            <TextField
              fullWidth 
              placeholder="+e.g.daming@aabweekend.edu.com"
              variant="outlined"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              disabled={loginMutation.isPending}
              sx={{ 
                mb: 3, 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '12px',
                  bgcolor: '#F7FAFC',
                  '&:hover': {
                    bgcolor: '#EDF2F7'
                  }
                },
                '& .MuiOutlinedInput-input': {
                  py: 1.5,
                }
              }}
            />
          </MotionBox>

          {/* Password Field */}
          <MotionBox
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Typography 
              sx={{ 
                mb: 1.5, 
                fontWeight: 600, 
                color: '#4A5568', 
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              Password
              <Box component="span" sx={{ color: '#E53E3E' }}>*</Box>
            </Typography>
            <TextField
              fullWidth 
              type={showPassword ? 'text' : 'password'}
              placeholder=""
              variant="outlined"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              disabled={loginMutation.isPending}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={() => setShowPassword(!showPassword)} 
                      edge="end"
                      sx={{ color: '#718096' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 4, 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '12px',
                  bgcolor: '#F7FAFC',
                  '&:hover': {
                    bgcolor: '#EDF2F7'
                  }
                },
                '& .MuiOutlinedInput-input': {
                  py: 1.5,
                }
              }}
            />
          </MotionBox>

          {/* Login Button */}
          <MotionBox
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button 
              fullWidth 
              type="submit" 
              variant="contained" 
              disabled={loginMutation.isPending}
              sx={{ 
                bgcolor: '#283C85', 
                py: 1.8, 
                borderRadius: '12px',
                fontSize: '16px', 
                fontWeight: 600, 
                textTransform: 'none',
                '&:hover': { 
                  bgcolor: '#1e2d63',
                },
              }}
            >
              {loginMutation.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Login'
              )}
            </Button>
          </MotionBox>
        </Box>
      </MotionPaper>
    </MotionBox>
  );
};