import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ThemeName = 'default' | 'ocean' | 'sunset' | 'forest' | 'lavender'

export interface ThemeColors {
  name: ThemeName
  label: string
  primary: string
  primaryLight: string
  primaryDark: string
  secondary: string
  accent: string
  background: string
  backgroundSecondary: string
  surface: string
  text: string
  textSecondary: string
  border: string
  shadow: string
}

export const themes: Record<ThemeName, ThemeColors> = {
  default: {
    name: 'default',
    label: '默认紫蓝',
    primary: '#667eea',
    primaryLight: '#8b9cf5',
    primaryDark: '#4c63d2',
    secondary: '#764ba2',
    accent: '#f093fb',
    background: '#f8fafc',
    backgroundSecondary: '#e2e8f0',
    surface: '#ffffff',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    shadow: 'rgba(0, 0, 0, 0.06)'
  },
  ocean: {
    name: 'ocean',
    label: '海洋蓝',
    primary: '#0ea5e9',
    primaryLight: '#38bdf8',
    primaryDark: '#0284c7',
    secondary: '#06b6d4',
    accent: '#22d3ee',
    background: '#f0f9ff',
    backgroundSecondary: '#e0f2fe',
    surface: '#ffffff',
    text: '#0c4a6e',
    textSecondary: '#0369a1',
    border: '#bae6fd',
    shadow: 'rgba(14, 165, 233, 0.1)'
  },
  sunset: {
    name: 'sunset',
    label: '日落橙',
    primary: '#f97316',
    primaryLight: '#fb923c',
    primaryDark: '#ea580c',
    secondary: '#ef4444',
    accent: '#fbbf24',
    background: '#fffbeb',
    backgroundSecondary: '#fef3c7',
    surface: '#ffffff',
    text: '#78350f',
    textSecondary: '#92400e',
    border: '#fde68a',
    shadow: 'rgba(249, 115, 22, 0.1)'
  },
  forest: {
    name: 'forest',
    label: '森林绿',
    primary: '#22c55e',
    primaryLight: '#4ade80',
    primaryDark: '#16a34a',
    secondary: '#14b8a6',
    accent: '#84cc16',
    background: '#f0fdf4',
    backgroundSecondary: '#dcfce7',
    surface: '#ffffff',
    text: '#14532d',
    textSecondary: '#166534',
    border: '#bbf7d0',
    shadow: 'rgba(34, 197, 94, 0.1)'
  },
  lavender: {
    name: 'lavender',
    label: '薰衣草',
    primary: '#a855f7',
    primaryLight: '#c084fc',
    primaryDark: '#9333ea',
    secondary: '#ec4899',
    accent: '#f472b6',
    background: '#faf5ff',
    backgroundSecondary: '#f3e8ff',
    surface: '#ffffff',
    text: '#581c87',
    textSecondary: '#7e22ce',
    border: '#e9d5ff',
    shadow: 'rgba(168, 85, 247, 0.1)'
  }
}

const STORAGE_KEY = 'cesium-app-theme'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<ThemeName>((localStorage.getItem(STORAGE_KEY) as ThemeName) || 'default')

  const themeColors = ref<ThemeColors>(themes[currentTheme.value])

  const setTheme = (themeName: ThemeName) => {
    if (themes[themeName]) {
      currentTheme.value = themeName
      themeColors.value = themes[themeName]
      localStorage.setItem(STORAGE_KEY, themeName)
      applyThemeToDom(themes[themeName])
    }
  }

  const applyThemeToDom = (theme: ThemeColors) => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', theme.primary)
    root.style.setProperty('--color-primary-light', theme.primaryLight)
    root.style.setProperty('--color-primary-dark', theme.primaryDark)
    root.style.setProperty('--color-secondary', theme.secondary)
    root.style.setProperty('--color-accent', theme.accent)
    root.style.setProperty('--color-background', theme.background)
    root.style.setProperty('--color-background-secondary', theme.backgroundSecondary)
    root.style.setProperty('--color-surface', theme.surface)
    root.style.setProperty('--color-text', theme.text)
    root.style.setProperty('--color-text-secondary', theme.textSecondary)
    root.style.setProperty('--color-border', theme.border)
    root.style.setProperty('--color-shadow', theme.shadow)
  }

  const initTheme = () => {
    applyThemeToDom(themeColors.value)
  }

  watch(currentTheme, (newTheme) => {
    themeColors.value = themes[newTheme]
  })

  return {
    currentTheme,
    themeColors,
    themes,
    setTheme,
    initTheme
  }
})
