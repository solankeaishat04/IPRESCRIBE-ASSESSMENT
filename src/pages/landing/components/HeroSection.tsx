import { Box, Typography, Button, Stack, Link } from "@mui/material";
import Grid from "@mui/material/Grid"; 
import PlayStoreBadge from "../../../assets/icons/IPRESCRIBEplaystore.svg";
import AppStoreBadge from "../../../assets/icons/IPRESCRIBEic_twotone-apple.svg"
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

const MotionBox = motion(Box);

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #D4DDFF 100%)",
        width: "100%",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 8 },
        overflow: "hidden",
      }}
    >
      <Grid
        container
        alignItems="center"
        sx={{
          width: "100%",
          maxWidth: "1212px",
          margin: "0 auto",
          minHeight: "90vh",
        }}
      >
        {/* LEFT CONTENT - TEXT SECTION */}
        <Grid size={{ xs: 12, md: 6 }}>
          <MotionBox
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              staggerChildren: 0.2,
              delayChildren: 0.3
            }}
          >
            {/* READY TO EXPLORE PILL */}
            <MotionBox
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 12,
                delay: 0.4
              }}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1,
                mb: 3,
                borderRadius: "999px",
                backgroundColor: "#EEF2FF",
              }}
            >
              {/* Avatar placeholder */}
              <Box sx={{ display: "flex", gap: "-6px" }}>
                <img src="/src/assets/icons/ipriscribeIcon 1.svg" alt="" />
              </Box>

              <Typography fontSize={14} color="#424242">
                Ready to explore iPrescribe?
              </Typography>
<Link
  component={RouterLink}
  to="/login"
  underline="none"
  sx={{
    fontWeight: 600,
    fontSize: 14,
    color: "#283C85",
    cursor: 'pointer'
  }}
>
  Join Waitlist →
</Link>
            </MotionBox>

            {/* MAIN HEADING */}
            <Typography
              component={motion.div}
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.5
              }}
              sx={{
                fontFamily: "Onest",
                fontWeight: 500,
                fontSize: { xs: "40px", md: "64px" },
                lineHeight: "72px",
                letterSpacing: "-4%",
                width: { md: "544px" },
                mb: 2,
              }}
            >
              Your Bridge <br />
              Between Care & <br />
              Convenience
            </Typography>

            {/* SUBTEXT */}
            <Typography
              component={motion.div}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 12,
                delay: 0.6
              }}
              sx={{
                color: "#6B7280",
                maxWidth: "480px",
                mb: 4,
              }}
            >
              Schedule consultations, send or receive e-prescriptions, and manage
              medications from one secure platform.
            </Typography>

            {/* STORE BUTTONS */}
            <Stack direction="row" spacing={2} mt={4}>
              {/* GOOGLE PLAY */}
              <Button
                component={motion.button}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: false }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  delay: 0.7
                }}
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  borderRadius: "12px",
                  px: 2.5,
                  py: 1.2,
                  minWidth: "170px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                <Box
                  component="img"
                  src={PlayStoreBadge}
                  alt="Google Play"
                  sx={{ height: "26px" }}
                />
                <Box sx={{ textAlign: "left" }}>
                  <Typography sx={{ fontSize: "10px", color: "#FFFFFF", lineHeight: 1, opacity: 0.8 }}>
                    Coming soon 
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", lineHeight: 1.2 }}>
                    Google Play
                  </Typography>
                </Box>
              </Button>

              {/* APP STORE */}
              <Button
                component={motion.button}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: false }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  delay: 0.8
                }}
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  borderRadius: "12px",
                  px: 2.5,
                  py: 1.2,
                  minWidth: "170px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                <Box
                  component="img"
                  src={AppStoreBadge}
                  alt="App Store"
                  sx={{ height: "26px" }}
                />
                <Box sx={{ textAlign: "left" }}>
                  <Typography sx={{ fontSize: "10px", color: "#FFFFFF", lineHeight: 1, opacity: 0.8 }}>
                    Coming soon 
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", lineHeight: 1.2 }}>
                    App Store
                  </Typography>
                </Box>
              </Button>
            </Stack>
          </MotionBox>
        </Grid>

        {/* RIGHT CONTENT - IMAGE SECTION */}
        <Grid size={{ xs: 12, md: 6 }}>
          <MotionBox
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut", 
              delay: 0.2 
            }}
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              component="img"
              src="/src/assets/images/iprescribe1.svg"
              alt="iPrescribe App"
              sx={{
                width: "100%",
                maxWidth: "550px",
                height: "auto",
                objectFit: "contain",
                opacity: 1,
                display: "block",
              }}
            />
          </MotionBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;