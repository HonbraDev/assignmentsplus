import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { useMemo } from "react";

import type { Theme } from "@mui/material";

interface ThemeSwitcherProps {
  theme: Theme;
  children: any;
}

function ThemeSwitcher(props: ThemeSwitcherProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        ...props.theme,
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

export default ThemeSwitcher;
