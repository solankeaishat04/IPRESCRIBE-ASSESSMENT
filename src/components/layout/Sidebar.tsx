// components/layout/Sidebar.tsx

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Store as StoreIcon,
  AccountBalanceWallet as PaymentIcon,
  Settings as SettingsIcon,
  AdminPanelSettings as SecurityIcon,
  History as HistoryIcon,
  Description as ArticleIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

const drawerWidth = 280;

const menuGroups = [
  {
    title: 'Main Menu',
    items: [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
      { text: 'User Management', icon: <PeopleIcon />, path: '/dashboard/users' },
      { text: 'Consult. & Presp.', icon: <AssignmentIcon />, path: '/dashboard/consultations' },
      { text: 'Pharm. & Orders Mgt.', icon: <StoreIcon />, path: '/dashboard/orders' },
      { text: 'Payments', icon: <PaymentIcon />, path: '/dashboard/payments' },
    ],
  },
  {
    title: 'Admin Menu',
    items: [
      { text: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings' },
      { text: 'Roles & Permissions', icon: <SecurityIcon />, path: '/dashboard/roles' },
      { text: 'Activity Log', icon: <HistoryIcon />, path: '/dashboard/activity' },
      { text: 'Blog / Health Tips', icon: <ArticleIcon />, path: '/dashboard/blog' },
      { text: 'Notifications Mgt.', icon: <NotificationsIcon />, path: '/dashboard/notifications' },
      { text: 'Website Updates', icon: <LanguageIcon />, path: '/dashboard/updates' },
    ],
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box
      sx={{
        width: collapsed ? 80 : drawerWidth,
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #283C85 0%, #090E1F 100%)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
      }}
    >
      {/* Logo & Toggle */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {!collapsed && (
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '18px' }}>
            iPrescribe
          </Typography>
        )}
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{ color: '#FFFFFF', ml: collapsed ? 0 : 'auto' }}
        >
          {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      {/* Menu Groups */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 2 }}>
        {menuGroups.map((group, groupIndex) => (
          <Box key={group.title} sx={{ mb: 4 }}>
            {!collapsed && (
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontSize: '11px',
                  display: 'block',
                  mb: 2,
                  pl: 2,
                }}
              >
                {group.title}
              </Typography>
            )}
            <List disablePadding>
              {group.items.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: groupIndex * 0.1 + index * 0.05 }}
                  >
                    <ListItem disablePadding sx={{ mb: 1 }}>
                      <ListItemButton
                        component={Link}
                        to={item.path}
                        sx={{
                          borderRadius: '12px',
                          backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                          color: isActive ? '#283C85' : '#FFFFFF',
                          '&:hover': {
                            backgroundColor: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)',
                          },
                          py: 1.5,
                          px: 2,
                          justifyContent: collapsed ? 'center' : 'flex-start',
                          minHeight: 48,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: 'inherit',
                            minWidth: collapsed ? 'auto' : 40,
                            justifyContent: 'center',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        {!collapsed && (
                          <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{
                              fontSize: '14px',
                              fontWeight: isActive ? 600 : 400,
                            }}
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                  </motion.div>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1200 }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </>
    );
  }

  return drawerContent;
};