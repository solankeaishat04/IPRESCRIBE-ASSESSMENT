// components/tables/PatientsTable.tsx
import React, { useMemo, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Avatar,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import {
  MoreVert,
  Phone,
  Email,
  LocationOn,
  Devices,
  CalendarToday,
} from '@mui/icons-material';

interface Patient {
  id: number;
  user_id: number;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  gender: string | null;
  phone: string | null;
  patient_id: string;
  email: string | null;
  parent_id: string;
  dob: string;
  address1: string | null;
  address2: string | null;
  state: string | null;
  lga: string | null;
  attended_to: number;
  primary_account: number;
  created_at: string;
  status: string;
  last_seen: string;
  user: {
    id: number;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    dob: string;
    phone: string | null;
    state: string | null;
    lga: string | null;
    address1: string | null;
    address2: string | null;
    devices: Array<{
      platform: string;
      device_name: string;
    }>;
  };
}

interface PatientsTableProps {
  data: Patient[];
  searchQuery: string;
  statusFilter: string;
}

export const PatientsTable: React.FC<PatientsTableProps> = ({
  data,
  searchQuery,
  statusFilter,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  // Format date with time
  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'Never';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  // Get patient name
  const getPatientName = (patient: Patient) => {
    if (patient.first_name || patient.last_name) {
      return `${patient.first_name || ''} ${patient.last_name || ''}`.trim();
    }
    return patient.email || patient.patient_id || `Patient ${patient.id}`;
  };

  // Get patient email
  const getPatientEmail = (patient: Patient) => {
    return patient.email || patient.user?.email || 'No email';
  };

  // Get patient phone
  const getPatientPhone = (patient: Patient) => {
    return patient.phone || patient.user?.phone || 'No phone';
  };

  // Get patient location
  const getPatientLocation = (patient: Patient) => {
    return patient.state || patient.user?.state || 'Unknown';
  };

  // Get device type
  const getPatientDevice = (patient: Patient) => {
    const devices = patient.user?.devices || [];
    if (devices.length > 0) {
      return devices[0].device_name || devices[0].platform || 'Unknown';
    }
    return 'Unknown';
  };

  // Filter data based on search and status
  const filteredData = useMemo(() => {
    return data.filter((patient) => {
      const patientName = getPatientName(patient).toLowerCase();
      const patientEmail = getPatientEmail(patient).toLowerCase();
      const patientPhone = getPatientPhone(patient);
      const patientLocation = getPatientLocation(patient).toLowerCase();
      
      const matchesSearch = 
        patientName.includes(searchQuery.toLowerCase()) ||
        patientEmail.includes(searchQuery.toLowerCase()) ||
        (patientPhone && patientPhone.includes(searchQuery)) ||
        patientLocation.includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' || patient.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'active': return { bg: '#DCFCE7', color: '#166534' };
      case 'pending': return { bg: '#FEF9C3', color: '#854D0E' };
      case 'inactive': return { bg: '#FEE2E2', color: '#991B1B' };
      default: return { bg: '#F3F4F6', color: '#374151' };
    }
  };

  const getAvatarColor = (name: string) => {
    if (!name) return theme.palette.primary.main;
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      '#10B981',
      '#F59E0B',
      '#8B5CF6',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (isMobile) {
    return (
      <Box>
        {paginatedData.map((patient) => {
          const patientName = getPatientName(patient);
          const avatarColor = getAvatarColor(patientName);
          const initials = patientName ? patientName.charAt(0).toUpperCase() : '?';
          
          return (
            <Paper
              key={patient.id}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: '12px',
                border: '1px solid',
                borderColor: 'divider',
              }}
              elevation={0}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ mb: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Avatar sx={{ bgcolor: avatarColor, width: 40, height: 40 }}>
                    {initials}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {patientName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {getPatientEmail(patient)}
                    </Typography>
                  </Box>
                </Stack>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Stack>

              {/* Fixed Grid usage - removed "container" from items */}
            <Grid container spacing={1} sx={{ mb: 2 }}>
  <Grid size={{ xs: 12, sm: 6 }}>
    <Stack direction="row" alignItems="center" spacing={1}>
      <Phone fontSize="small" sx={{ color: 'text.secondary' }} />
      <Typography variant="caption">{getPatientPhone(patient)}</Typography>
    </Stack>
  </Grid>

  <Grid size={{ xs: 12, sm: 6 }}>
    <Stack direction="row" alignItems="center" spacing={1}>
      <LocationOn fontSize="small" sx={{ color: 'text.secondary' }} />
      <Typography variant="caption">{getPatientLocation(patient)}</Typography>
    </Stack>
  </Grid>

  <Grid size={{ xs: 12, sm: 6 }}>
    <Stack direction="row" alignItems="center" spacing={1}>
      <Devices fontSize="small" sx={{ color: 'text.secondary' }} />
      <Typography variant="caption">{getPatientDevice(patient)}</Typography>
    </Stack>
  </Grid>

  <Grid size={{ xs: 12, sm: 6 }}>
    <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
      <Chip
        label={patient.status}
        size="small"
        sx={{
          bgcolor: getStatusColor(patient.status).bg,
          color: getStatusColor(patient.status).color,
          fontWeight: 600,
          fontSize: '10px',
          height: '20px',
          textTransform: 'capitalize',
        }}
      />
    </Box>
  </Grid>
</Grid>


              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <CalendarToday fontSize="small" sx={{ color: 'text.secondary' }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {formatDate(patient.created_at)}
                  </Typography>
                </Stack>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Last: {formatDateTime(patient.last_seen)}
                </Typography>
              </Stack>
            </Paper>
          );
        })}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ 
            borderTop: '1px solid', 
            borderColor: 'divider',
            mt: 2 
          }}
        />
      </Box>
    );
  }

  // Desktop/Tablet view
  return (
    <>
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Table sx={{ minWidth: isTablet ? 800 : 'auto' }}>
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              {[
                { id: 'signup', label: 'Sign Up Date', width: '120px' },
                { id: 'name', label: 'Patient Name', width: '200px' },
                { id: 'email', label: 'Email Address', width: '200px' },
                { id: 'phone', label: 'Phone Number', width: '150px' },
                { id: 'lastSeen', label: 'Last Seen', width: '150px' },
                { id: 'location', label: 'Location', width: '120px' },
                { id: 'device', label: 'Device', width: '100px' },
                { id: 'status', label: 'Status', width: '100px' },
                { id: 'actions', label: 'Actions', width: '80px' },
              ].map((column) => (
                <TableCell 
                  key={column.id}
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: '12px', 
                    color: 'text.secondary', 
                    py: 2,
                    width: column.width,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((patient) => {
              const patientName = getPatientName(patient);
              const avatarColor = getAvatarColor(patientName);
              const initials = patientName ? patientName.charAt(0).toUpperCase() : '?';
              
              return (
                <TableRow key={patient.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ minWidth: 120 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {formatDate(patient.created_at)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell sx={{ minWidth: 200 }}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar sx={{ bgcolor: avatarColor, width: 32, height: 32 }}>
                        {initials}
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {patientName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {patient.patient_id}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  
                  <TableCell sx={{ minWidth: 200 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Email fontSize="small" sx={{ color: 'text.secondary', flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {getPatientEmail(patient)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell sx={{ minWidth: 150 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Phone fontSize="small" sx={{ color: 'text.secondary', flexShrink: 0 }} />
                      <Typography variant="body2">
                        {getPatientPhone(patient)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell sx={{ minWidth: 150 }}>
                    <Typography variant="body2">
                      {formatDateTime(patient.last_seen)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell sx={{ minWidth: 120 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <LocationOn fontSize="small" sx={{ color: 'text.secondary', flexShrink: 0 }} />
                      <Typography variant="body2">
                        {getPatientLocation(patient)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell sx={{ minWidth: 100 }}>
                    <Chip
                      label={getPatientDevice(patient)}
                      size="small"
                      variant="outlined"
                      sx={{ 
                        fontWeight: 500, 
                        textTransform: 'capitalize',
                        maxWidth: '100px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    />
                  </TableCell>
                  
                  <TableCell sx={{ minWidth: 100 }}>
                    <Chip
                      label={patient.status}
                      size="small"
                      sx={{
                        bgcolor: getStatusColor(patient.status).bg,
                        color: getStatusColor(patient.status).color,
                        fontWeight: 600,
                        fontSize: '11px',
                        height: '24px',
                        textTransform: 'capitalize',
                        minWidth: '80px'
                      }}
                    />
                  </TableCell>
                  
                  <TableCell sx={{ minWidth: 80 }}>
                    <IconButton size="small">
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ 
          borderTop: '1px solid', 
          borderColor: 'divider',
          mt: 2
        }}
      />
    </>
  );
};