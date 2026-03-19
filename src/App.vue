<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
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
/* CSS 变量定义 - 亮色主题 */
:root {
  --color-primary: #667eea;
  --color-primary-light: #818cf8;
  --color-primary-dark: #5b6bd6;
  --color-secondary: #764ba2;
  --color-background: #f8fafc;
  --color-surface: #ffffff;
  --color-surface-hover: #f1f5f9;
  --color-text-primary: #1e293b;
  --color-text-secondary: #64748b;
  --color-text-muted: #94a3b8;
  --color-border: rgba(0, 0, 0, 0.06);
  --color-shadow: rgba(102, 126, 234, 0.3);
  --color-overlay: rgba(255, 255, 255, 0.95);
  --color-overlay-hover: rgba(102, 126, 234, 0.08);
}

/* CSS 变量定义 - 暗色主题 */
:root.dark {
  --color-primary: #818cf8;
  --color-primary-light: #a5b4fc;
  --color-primary-dark: #6366f1;
  --color-secondary: #8b5cf6;
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-surface-hover: #334155;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --color-border: rgba(255, 255, 255, 0.06);
  --color-shadow: rgba(129, 140, 248, 0.3);
  --color-overlay: rgba(30, 41, 59, 0.95);
  --color-overlay-hover: rgba(129, 140, 248, 0.15);
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
  color: var(--color-text-primary);
  background: var(--color-background);
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

/* 暗色主题下 Cesium 容器背景 */
.dark .cesium-container {
  background: #0f172a !important;
}
</style>
