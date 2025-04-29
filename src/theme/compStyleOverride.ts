export default function componentStyleOverrides(theme: any) {
  return {
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: "#fff",
          background: theme.palette.primary.main,
          padding: 8,
        },
        title: {
          fontSize: 28,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        marginTop: 16,
        root: {
          padding: "24px",
        },
      },
    },
  };
}
