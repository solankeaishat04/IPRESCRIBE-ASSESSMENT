/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Email } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionTypography = motion(Typography);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSnackbar({
        open: true,
        message: "Please enter a valid email address",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Simulate random success/error for demo
      const isSuccess = Math.random() > 0.3; // 70% success rate
      
      if (isSuccess) {
        setSnackbar({
          open: true,
          message: "Successfully joined the waitlist! We'll notify you soon.",
          severity: "success",
        });
        setEmail(""); // Clear form on success
      } else {
        setSnackbar({
          open: true,
          message: "Something went wrong. Please try again later.",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Network error. Please check your connection.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        sx={{
          width: "100%",
          minHeight: { xs: "auto", md: "597px" },
          backgroundColor: "#283C85",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          py: { xs: 6, md: 0 },
        }}
      >
        {/* INNER FRAME */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1440px",
            mx: "auto",
            px: { xs: 3, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            py: { xs: 4, md: 8 },
          }}
        >
          {/* WAITLIST CONTENT */}
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            textAlign="center"
            sx={{ mb: { xs: 6, md: 0 } }}
          >
            <MotionTypography
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.1 }}
              sx={{
                fontSize: { xs: "24px", md: "40px" },
                fontWeight: 600,
                mb: 1,
              }}
            >
              Join Our Waitlist
            </MotionTypography>

            <MotionTypography
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              sx={{
                maxWidth: "520px",
                mx: "auto",
                opacity: 0.85,
                mb: 4,
                fontSize: { xs: "13px", md: "14px" },
                lineHeight: { xs: "18px", md: "20px" },
                px: { xs: 1, md: 0 },
              }}
            >
              Be the first one to know about discounts, offers and events weekly
              in your mailbox. Unsubscribe whenever you like with one click.
            </MotionTypography>

            {/* EMAIL INPUT - With exact dimensions */}
            <MotionBox
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.3
              }}
              sx={{
                width: { xs: "100%", md: "751px" },
                maxWidth: { xs: "100%", md: "751px" },
                height: { xs: "auto", md: "64px" },
                mx: "auto",
                backgroundColor: "rgba(255,255,255,0.15)",
                opacity: 1,
                display: "flex",
                alignItems: "center",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? 2 : "12px",
                pt: { xs: 3, md: "8px" },
                pr: { xs: 3, md: "8px" },
                pb: { xs: 3, md: "8px" },
                pl: { xs: 3, md: "32px" },
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "40px",
                backdropFilter: "blur(10px)",
              }}
            >
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                width: isMobile ? "100%" : "calc(100% - 136px - 409px - 12px)",
                minWidth: isMobile ? "100%" : "auto",
              }}>
                <Email sx={{ 
                  opacity: 0.8, 
                  mr: 2,
                  width: { xs: 20, md: 24 },
                  height: { xs: 20, md: 24 },
                }} />
                <TextField
                  placeholder="Enter your email"
                  variant="standard"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      color: "#fff",
                      fontFamily: "Onest",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      textAlign: "center",
                      verticalAlign: "middle",
                      "&::placeholder": {
                        color: "rgba(255,255,255,0.7)",
                        opacity: 1,
                        fontFamily: "Onest",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        textAlign: "center",
                        verticalAlign: "middle",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      width: "100%",
                    },
                  }}
                />
              </Box>

              {/* Gap between email input and submit button */}
              {!isMobile && (
                <Box sx={{ width: "409px", flexShrink: 0 }} />
              )}

              <MotionButton
                type="submit"
                disabled={loading}
                whileHover={{ 
                  scale: isMobile ? 1 : 1.05, 
                  backgroundColor: "#f0f0f0",
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: isMobile ? 0 : 10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.5 }}
                sx={{
                  backgroundColor: "#fff",
                  color: "#283C85",
                  width: { xs: "100%", md: "136px" },
                  height: { xs: "48px", md: "48px" },
                  minWidth: { xs: "100%", md: "136px" },
                  maxWidth: { xs: "100%", md: "136px" },
                  opacity: 1,
                  pr: { xs: 3, md: "38px" },
                  pl: { xs: 3, md: "38px" },
                  borderRadius: "30px",
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  fontSize: "16px",
                  "&:disabled": {
                    backgroundColor: "rgba(255,255,255,0.5)",
                    color: "rgba(40,60,133,0.5)",
                  },
                }}
              >
                {loading ? "Submitting..." : "Submit"}
              </MotionButton>
            </MotionBox>
          </Box>

          {/* FOOTER BOTTOM */}
          <MotionBox
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.6 }}
            sx={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              pt: { xs: 4, md: 6 },
              mt: { xs: 4, md: 8 },
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
              spacing={4}
            >
              {/* LOGO */}
              <MotionBox
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.7 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src="/src/assets/icons/IPRESCRIBE LOGO 18 1.svg"
                  alt="iPrescribe Logo"
                  sx={{ 
                    height: { xs: 36, md: 48 },
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                  }}
                />
              </MotionBox>

              {/* COPYRIGHT */}
              <MotionTypography
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.8 }}
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: { xs: "14px", md: "16px" },
                  fontFamily: "Onest",
                  textAlign: "center",
                  order: { xs: 2, md: 1 },
                }}
              >
                © {new Date().getFullYear()}, All Rights Reserved
              </MotionTypography>

              {/* SOCIAL ICONS */}
            <Stack 
  direction="row" 
  spacing="4px" // gap: 4px
  sx={{ 
    order: { xs: 1, md: 2 },
    mb: { xs: 2, md: 0 },
    width: { xs: "100%", md: "152px" }, // width: 152
    height: "48px", // height: 48
    justifyContent: "center",
    opacity: 1,
  }}
>
  {[
    { src: "/src/assets/icons/facebook.svg", alt: "Facebook" },
    { src: "/src/assets/icons/youtube.svg", alt: "YouTube" },
    { src: "/src/assets/icons/whatsapp.svg", alt: "WhatsApp" },
  ].map((icon, index) => (
    <IconButton
      key={index}
      component={motion.button}
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      whileHover={{ 
        scale: 1.1, 
        rotate: 5,
        backgroundColor: "#fff",
        transition: { type: "spring", stiffness: 400 }
      }}
      whileTap={{ scale: 0.9 }}
      viewport={{ once: false }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.7 + (index * 0.1)
      }}
      sx={{
        bgcolor: "#F0F4FF",
        width: "48px", // width: 48
        height: "48px", // height: 48
        minWidth: "48px",
        borderRadius: "30px", // border-radius: 30px
        opacity: 1,
        p: 0,
        "&:hover": { 
          bgcolor: "#fff",
        },
      }}
    >
      <Box
        component="img"
        src={icon.src}
        alt={icon.alt}
        sx={{ 
          width: "24px", 
          height: "24px",
          objectFit: "contain"
        }}
      />
    </IconButton>
  ))}
</Stack>
            </Stack>
          </MotionBox>
        </Box>
      </MotionBox>

      {/* Toast Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Footer;