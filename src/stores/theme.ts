import { defineStore } from 'pinia'

export type ThemeType = 'light' | 'dark'

export interface ThemeState {
  currentTheme: ThemeType
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    currentTheme: 'light'
  }),

  getters: {
    isDark: (state) => state.currentTheme === 'dark',
    isLight: (state) => state.currentTheme === 'light'
  },

  actions: {
    setTheme(theme: ThemeType) {
      this.currentTheme = theme
      this.applyTheme(theme)
    },

    toggleTheme() {
      const newTheme = this.currentTheme === 'light' ? 'dark' : 'light'
      this.setTheme(newTheme)
    },

    applyTheme(theme: ThemeType) {
      const root = document.documentElement
      if (theme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    },

    initTheme() {
      const savedTheme = localStorage.getItem('app-theme') as ThemeType | null
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
      
      this.setTheme(initialTheme)
    }
  }
})
