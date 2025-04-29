import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import AppRoute from "./router";
import theme from "./theme/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      <CssBaseline />
      <AppRoute />
    </ThemeProvider>
  );
}
