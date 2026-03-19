<script setup lang="ts">
import { useThemeStore } from '@/stores'

const themeStore = useThemeStore()

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<template>
  <button
    class="theme-switcher"
    :class="{ 'is-dark': themeStore.isDark }"
    @click="toggleTheme"
    :title="themeStore.isDark ? '切换到亮色模式' : '切换到暗色模式'"
  >
    <div class="theme-icon">
      <!-- 太阳图标 (亮色模式) -->
      <svg v-if="themeStore.isLight" class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <!-- 月亮图标 (暗色模式) -->
      <svg v-else class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </div>
  </button>
</template>

<style scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: rgba(102, 126, 234, 0.08);
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.theme-switcher:hover {
  background: rgba(102, 126, 234, 0.15);
  transform: scale(1.05);
}

.theme-switcher.is-dark {
  background: rgba(148, 163, 184, 0.15);
  color: #fbbf24;
}

.theme-switcher.is-dark:hover {
  background: rgba(148, 163, 184, 0.25);
}

.theme-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.theme-switcher:hover .theme-icon {
  transform: rotate(15deg);
}

.sun-icon,
.moon-icon {
  width: 100%;
  height: 100%;
}
</style>
