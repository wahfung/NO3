<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useThemeStore, type ThemeName } from '@/stores/theme'

const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()

const navItems = [
  { path: '/', name: '首页', icon: 'home' },
  { path: '/cesium', name: '三维地图', icon: 'globe' },
  { path: '/about', name: '关于', icon: 'info' }
]

const isActive = (path: string) => route.path === path

const navigateTo = (path: string) => {
  router.push(path)
}

const currentPageTitle = computed(() => {
  const item = navItems.find((n) => n.path === route.path)
  return item?.name || 'Cesium Demo'
})

const showThemeMenu = ref(false)

const toggleThemeMenu = () => {
  showThemeMenu.value = !showThemeMenu.value
}

const selectTheme = (themeName: ThemeName) => {
  themeStore.setTheme(themeName)
  showThemeMenu.value = false
}

const themeList = computed(() => Object.values(themeStore.themes))

const closeThemeMenu = () => {
  showThemeMenu.value = false
}
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo-section">
        <div class="logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>
        <h1 class="title">Cesium Vue3 Demo</h1>
      </div>

      <nav class="nav-section">
        <button
          v-for="item in navItems"
          :key="item.path"
          class="nav-btn"
          :class="{ active: isActive(item.path) }"
          @click="navigateTo(item.path)"
        >
          <span class="nav-icon">
            <svg v-if="item.icon === 'home'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <svg v-else-if="item.icon === 'globe'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <svg v-else-if="item.icon === 'info'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </span>
          <span class="nav-text">{{ item.name }}</span>
        </button>
      </nav>

      <div class="header-actions">
        <div class="theme-selector">
          <button class="theme-btn" @click="toggleThemeMenu" @blur="closeThemeMenu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
            <span class="theme-btn-text">主题</span>
          </button>
          <Transition name="menu">
            <div v-if="showThemeMenu" class="theme-menu">
              <div class="theme-menu-header">选择主题色彩</div>
              <button
                v-for="theme in themeList"
                :key="theme.name"
                class="theme-option"
                :class="{ active: themeStore.currentTheme === theme.name }"
                @click="selectTheme(theme.name)"
              >
                <span class="theme-color" :style="{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)` }"></span>
                <span class="theme-name">{{ theme.label }}</span>
                <svg v-if="themeStore.currentTheme === theme.name" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
            </div>
          </Transition>
        </div>
      </div>

      <div class="mobile-title">{{ currentPageTitle }}</div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  z-index: 1000;
  transition: border-color 0.3s ease;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: background 0.3s ease;
}

.logo svg {
  width: 22px;
  height: 22px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-section {
  display: flex;
  gap: 8px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background: rgba(102, 126, 234, 0.08);
  color: var(--color-primary);
}

.nav-btn.active {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.nav-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-selector {
  position: relative;
}

.theme-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.theme-btn svg {
  width: 18px;
  height: 18px;
}

.theme-btn-text {
  display: none;
}

.theme-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 200px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 8px 32px var(--color-shadow);
  padding: 8px;
  z-index: 100;
}

.theme-menu-header {
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: var(--color-text);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-option:hover {
  background: var(--color-background);
}

.theme-option.active {
  background: var(--color-background);
}

.theme-color {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  flex-shrink: 0;
}

.theme-name {
  flex: 1;
  text-align: left;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: var(--color-primary);
}

.menu-enter-active,
.menu-leave-active {
  transition: all 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.mobile-title {
  display: none;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
}

@media (max-width: 768px) {
  .title {
    display: none;
  }

  .nav-text {
    display: none;
  }

  .nav-btn {
    padding: 10px;
  }

  .theme-btn-text {
    display: none;
  }

  .mobile-title {
    display: block;
  }
}
</style>
