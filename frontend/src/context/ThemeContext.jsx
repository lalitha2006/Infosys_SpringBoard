import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import getTheme from "../theme/theme";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const toggleTheme = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);