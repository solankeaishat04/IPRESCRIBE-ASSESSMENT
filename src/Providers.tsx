"use client"; // if using Next.js App Router, optional in React

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom"; // Router at top level
import { AuthProvider } from "./contexts/AuthContext";
import { UIProvider } from "./contexts/UIContext";
import AppRoutes from "./routes/AppRoutes";

// Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#283C85",
    },
    secondary: {
      main: "#D4DDFF",
    },
  },
  typography: {
    fontFamily: '"Onest", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "12px",
        },
      },
    },
  },
});

const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <UIProvider>
            <Router>
              <AppRoutes />
            </Router>
          </UIProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
