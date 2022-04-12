import { createTheme, useMediaQuery, ThemeProvider } from "@mui/material";
import { useMemo } from "react";

import type { Theme } from "@mui/material";

function ThemeSwitcher({
  theme: initialTheme,
  children,
}: {
  theme: Theme;
  children: any;
}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        ...initialTheme,
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ThemeSwitcher;
