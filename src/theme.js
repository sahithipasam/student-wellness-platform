import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0f766e",        // Calm wellness green (navbar, buttons, highlights)
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#14532d",        // Deep forest green (for accents)
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f7f5",     // Soft background tone
      paper: "#ffffff",       // Card backgrounds
    },
    text: {
      primary: "#1f2937",     // Deep neutral gray
      secondary: "#4b5563",   // Muted gray text
    },
  },
  shape: {
    borderRadius: 10,         // Smooth rounded corners for cards/buttons
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h3: {
      fontWeight: 700,
      color: "#0f766e",
    },
    h4: {
      fontWeight: 700,
      color: "#0f766e",
    },
    h5: {
      fontWeight: 600,
      color: "#0f766e",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 8,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;
