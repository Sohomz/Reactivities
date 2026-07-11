import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";
import { Provider } from "react-redux";
import { appStore } from "../appStore";

function App() {
  const location = useLocation();

  return (
    <Provider store={appStore}>
      <Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
        <CssBaseline />
        {location.pathname === "/" ? (
          <HomePage />
        ) : (
          <>
            <NavBar />
            <Container maxWidth="xl" sx={{ paddingTop: 8 }}>
              <Outlet />
            </Container>
          </>
        )}
      </Box>
    </Provider>
  );
}

export default App;
