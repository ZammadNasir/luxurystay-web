import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Login from "../../views/Login";

export default function MainLayout() {
  return (
    <Box>
      <Login />
      <CssBaseline />
      <Header />

      <Outlet />
    </Box>
  );
}
