import { ref, computed } from "vue";
import { defineStore } from "pinia";

export type ThemeType = "default" | "green" | "orange" | "dark";

export interface ThemeConfig {
  name: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  gradient: string;
}

export const themes: Record<ThemeType, ThemeConfig> = {
  default: {
    name: "默认蓝紫",
    primary: "#667eea",
    primaryLight: "#764ba2",
    primaryDark: "#5a67d8",
    background: "#f8fafc",
    surface: "#ffffff",
    text: "#1e293b",
    textSecondary: "#64748b",
    border: "rgba(0, 0, 0, 0.06)",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  green: {
    name: "清新绿意",
    primary: "#10b981",
    primaryLight: "#34d399",
    primaryDark: "#059669",
    background: "#f0fdf4",
    surface: "#ffffff",
    text: "#064e3b",
    textSecondary: "#059669",
    border: "rgba(16, 185, 129, 0.15)",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  },
  orange: {
    name: "暖橙活力",
    primary: "#f97316",
    primaryLight: "#fb923c",
    primaryDark: "#ea580c",
    background: "#fff7ed",
    surface: "#ffffff",
    text: "#7c2d12",
    textSecondary: "#c2410c",
    border: "rgba(249, 115, 22, 0.15)",
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
  },
  dark: {
    name: "深邃暗夜",
    primary: "#60a5fa",
    primaryLight: "#93c5fd",
    primaryDark: "#3b82f6",
    background: "#0f172a",
    surface: "#1e293b",
    text: "#f1f5f9",
    textSecondary: "#94a3b8",
    border: "rgba(148, 163, 184, 0.15)",
    gradient: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
  },
};

export const useThemeStore = defineStore("theme", () => {
  const currentTheme = ref<ThemeType>("default");
  const isDark = computed(() => currentTheme.value === "dark");

  const themeConfig = computed(() => themes[currentTheme.value as ThemeType]);

  const setTheme = (theme: ThemeType) => {
    currentTheme.value = theme;
    applyTheme(theme);
    localStorage.setItem("app-theme", theme);
  };

  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `${r}, ${g}, ${b}`;
    }
    return "102, 126, 234";
  };

  const applyTheme = (theme: ThemeType) => {
    const config = themes[theme];
    const root = document.documentElement;

    root.style.setProperty("--theme-primary", config.primary);
    root.style.setProperty("--theme-primary-light", config.primaryLight);
    root.style.setProperty("--theme-primary-dark", config.primaryDark);
    root.style.setProperty("--theme-background", config.background);
    root.style.setProperty("--theme-surface", config.surface);
    root.style.setProperty("--theme-text", config.text);
    root.style.setProperty("--theme-text-secondary", config.textSecondary);
    root.style.setProperty("--theme-border", config.border);
    root.style.setProperty("--theme-gradient", config.gradient);

    // Add RGB versions for rgba usage
    root.style.setProperty("--theme-primary-rgb", hexToRgb(config.primary));
    root.style.setProperty("--theme-surface-rgb", hexToRgb(config.surface));

    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem("app-theme") as ThemeType | null;
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
    } else {
      applyTheme("default");
    }
  };

  const toggleTheme = () => {
    const themeList: ThemeType[] = ["default", "green", "orange", "dark"];
    const currentIndex = themeList.indexOf(currentTheme.value);
    const nextIndex = (currentIndex + 1) % themeList.length;
    setTheme(themeList[nextIndex]);
  };

  return {
    currentTheme,
    themeConfig,
    isDark,
    setTheme,
    initTheme,
    toggleTheme,
  };
});
