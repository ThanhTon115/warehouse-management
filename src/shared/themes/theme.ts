import { ThemeState } from "./types";

export function getDefaultTheme(value: { dark?: boolean }): ThemeState {
  return {
    dark: value.dark ?? false,
    meta: {
      title: "Storage",
      description: "Storage Portal",
    },
    logo: {
      default: "/img/logo.svg",
    },
    colors: {
      primary: "#6B7CE8",
      primaryBold: "#695ebd",
      secondary: "#8D8D94",
      accent: "#9c27b0",
      positive: "#21ba45",
      negative: "#c10015",
      info: "#31ccec",
      warning: "#f2c037",
      light: "#ffffff",
      "light-page": "#ffffff",
      dark: "#1d1d1d",
      "dark-page": "#121212",
    },
    textColors: {
      light: "#121212",
      dark: "#ffffff",
      "light-field": "rgba(0, 0, 0, 0.87)",
      "light-label": "rgba(0, 0, 0, 0.6)",
      "dark-field": "#ffffff",
      "dark-label": "#ffffff",
    },
    font: {
      size: 14,
    },
  };
}
