import Navbar from "../../components/layout/Navbar";
import HeroSection from "./components/HeroSection";
// import WaitlistSection from "./components/WaitlistSection";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

const LandingPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1440px",
        margin: "0 auto",
        position: "relative",
        overflow: "hidden", // Prevent horizontal overflow
      }}
    >
      {/* NAVBAR */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: "9px",
          position: "relative",
          zIndex: 1000, // Ensure navbar is above other content
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1212px",
            height: "72px",
            px: "10px",
            pl: "1px",
          }}
        >
          <Navbar />
        </Box>
      </Box>

      {/* HERO SECTION - Remove any max-width from HeroSection itself */}
      <Box sx={{ width: "100%", position: "relative" }}>
        <HeroSection />
      </Box>

      {/* OTHER SECTIONS
      <WaitlistSection /> */}
      <Footer />
    </Box>
  );
};

export default LandingPage;