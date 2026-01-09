import { Button, Toolbar, Box, Link } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const navItems = ["Home", "Features", "Contact us"];

const Navbar = () => {
  return (
    <MotionBox
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        width: { xs: "95%", lg: "1212px" },
        height: "72px",
        margin: "9px auto",
        borderRadius: "48px",
        display: "flex",
        alignItems: "center",
        px: "10px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
        zIndex: 1000,
      }}
    >
      <Toolbar sx={{ width: "100%", justifyContent: "space-between" }}>
        {/* LOGO */}
        <Box sx={{ flexShrink: 0, ml: 2 }}>
          <img
            src="/src/assets/icons/IPRESCRIBE LOGO 3 1.svg"
            alt="iPrescribe Logo"
            style={{
              width: "62px",
              height: "72px",
              opacity: 1,
              transform: "rotate(0deg)",
            }}
          />
        </Box>

        {/* NAVIGATION MENU - Hidden on mobile */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: "40px", // space between nav links
            flexGrow: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {navItems.map((item, index, array) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "")}`}
              underline="none"
              sx={{
                fontFamily: "Onest",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "18px",
                letterSpacing: "0%",
                color: "#424242",
                opacity: 1,
                textTransform: "none",
                "&:hover": { color: "#283C85" },
                ...(index === array.length - 1 && { mr: "60px" }), // 60px gap before button
              }}
            >
              {item}
            </Link>
          ))}

          {/* JOIN WAITLIST BUTTON */}
          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            variant="contained"
            sx={{
              width: 146,
              height: 48,
              borderRadius: "30px",
              px: "38px",
              opacity: 1,
              transform: "rotate(0deg)",
              backgroundColor: "#283C85",
              textTransform: "none",
              fontFamily: "Onest",
              fontWeight: 700,
              fontStyle: "bold",
              fontSize: "12px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
              verticalAlign: "middle",
              color: "#EEF2FF",
              "&:hover": { backgroundColor: "#283C85" },
            }}
          >
            Join Waitlist
          </MotionButton>
        </Box>
      </Toolbar>
    </MotionBox>
  );
};

export default Navbar;
