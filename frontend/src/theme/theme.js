import { createTheme } from "@mui/material/styles";

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: "#00C853",
      },

      secondary: {
        main: "#3B82F6",
      },

      background: {
        default: mode === "dark" ? "#0D1117" : "#F5F7FA",
        paper: mode === "dark" ? "#161B22" : "#FFFFFF",
      },

      text: {
        primary: mode === "dark" ? "#F8FAFC" : "#111827",
        secondary: mode === "dark" ? "#94A3B8" : "#4B5563",
      },

      success: {
        main: "#22C55E",
      },

      warning: {
        main: "#F59E0B",
      },

      error: {
        main: "#EF4444",
      },
    },

    typography: {
      fontFamily: "'Inter', 'Segoe UI', sans-serif",

      h4: {
        fontWeight: 700,
      },

      h5: {
        fontWeight: 600,
      },

      h6: {
        fontWeight: 600,
      },

      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },

    shape: {
      borderRadius: 12,
    },

    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow:
              mode === "dark"
                ? "0 4px 20px rgba(0,0,0,0.35)"
                : "0 4px 12px rgba(0,0,0,0.08)",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "none",
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
    },
  });

export default getTheme;