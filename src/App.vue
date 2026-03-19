<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import { useThemeStore } from '@/stores'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <div class="app">
    <AppHeader />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* CSS Variables for Theming */
:root {
  --theme-primary: #667eea;
  --theme-primary-light: #764ba2;
  --theme-primary-dark: #5a67d8;
  --theme-background: #f8fafc;
  --theme-surface: #ffffff;
  --theme-text: #1e293b;
  --theme-text-secondary: #64748b;
  --theme-border: rgba(0, 0, 0, 0.06);
  --theme-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Global Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--theme-text);
  background: var(--theme-background);
  transition: color 0.3s ease, background-color 0.3s ease;
}

/* App Layout */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Cesium Widget Overrides */
.cesium-viewer-bottom {
  display: none !important;
}

.cesium-widget-credits {
  display: none !important;
}
</style>
