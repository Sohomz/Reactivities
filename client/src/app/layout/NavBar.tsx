import { Group } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import { NavLink } from "react-router";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Fixed the position prop conflict by standardizing to position="fixed" */}
      <AppBar
        position="fixed"
        sx={{
          backgroundImage: "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* 1. BRAND/LOGO */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Group fontSize="large" />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  "&.active": {
                    color: "#fdd835",
                    borderBottom: "2px solid #fdd835",
                    borderRadius: 0,
                  },
                  // Optional hover effect so it feels interactive
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                component={NavLink}
                to="/"
                style={{ textDecoration: "none" }}
              >
                Reactivities
              </Typography>
            </Box>

            {/* 2. NAV LINKS: Properly updated to standard MUI Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                color="inherit"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  "&.active": {
                    color: "#fdd835",
                    borderBottom: "2px solid #fdd835",
                    borderRadius: 0,
                  },
                  // Optional hover effect so it feels interactive
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                component={NavLink}
                to="/activities"
              >
                Activities
              </Button>
              <Button
                color="inherit"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  "&.active": {
                    color: "#fdd835",
                    borderBottom: "2px solid #fdd835",
                    borderRadius: 0,
                  },
                  // Optional hover effect so it feels interactive
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                component={NavLink}
                to="/createActivity"
              >
                Create Activity
              </Button>
            </Box>

            {/* 3. USER MENU PLACEHOLDER */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" sx={{ fontSize: "1.2rem", fontWeight: "bold" }} component={NavLink} to="/user">
                User Menu
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
