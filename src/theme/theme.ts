import { createTheme } from "@mui/material/styles";
import componentStyleOverrides from "./compStyleOverride";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  // colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#11138f",
      light: "#4369a5",
      dark: "#0b2e5f",
      contrastText: "#ffffff",
    },
  },
});
theme.components = componentStyleOverrides(theme);
export default theme;
