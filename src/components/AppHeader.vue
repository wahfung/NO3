<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useThemeStore, themes, type ThemeType } from "@/stores";

const route = useRoute();
const router = useRouter();
const themeStore = useThemeStore();

const navItems = [
  { path: "/", name: "首页", icon: "home" },
  { path: "/cesium", name: "三维地图", icon: "globe" },
  { path: "/about", name: "关于", icon: "info" },
];

const isActive = (path: string) => route.path === path;

const navigateTo = (path: string) => {
  router.push(path);
};

const currentPageTitle = computed(() => {
  const item = navItems.find((n) => n.path === route.path);
  return item?.name || "Cesium Demo";
});

const themeList = computed(
  () => Object.entries(themes) as [ThemeType, (typeof themes)["default"]][],
);

const switchTheme = (theme: ThemeType) => {
  themeStore.setTheme(theme);
};
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo-section">
        <div class="logo">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path
              d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
            ></path>
          </svg>
        </div>
        <h1 class="title">Cesium Vue3 Demo</h1>
      </div>

      <div class="nav-wrapper">
        <nav class="nav-section">
          <button
            v-for="item in navItems"
            :key="item.path"
            class="nav-btn"
            :class="{ active: isActive(item.path) }"
            @click="navigateTo(item.path)"
          >
            <span class="nav-icon">
              <svg
                v-if="item.icon === 'home'"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <svg
                v-else-if="item.icon === 'globe'"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path
                  d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                ></path>
              </svg>
              <svg
                v-else-if="item.icon === 'info'"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </span>
            <span class="nav-text">{{ item.name }}</span>
          </button>
        </nav>

        <!-- Theme Switcher -->
        <div class="theme-section">
          <div class="theme-dropdown">
            <button class="theme-btn" title="切换主题">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <path
                  d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                ></path>
              </svg>
            </button>
            <div class="theme-menu">
              <button
                v-for="[key, config] in themeList"
                :key="key"
                class="theme-option"
                :class="{ active: themeStore.currentTheme === key }"
                @click="switchTheme(key)"
              >
                <span
                  class="theme-dot"
                  :style="{ background: config.gradient }"
                ></span>
                <span class="theme-name">{{ config.name }}</span>
              </button>
            </div>
          </div>
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
  background: rgba(var(--theme-surface-rgb, 255, 255, 255), 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--theme-border);
  z-index: 1000;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
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
  background: var(--theme-gradient);
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
  background: var(--theme-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: background 0.3s ease;
}

.nav-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
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
  color: var(--theme-text-secondary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background: rgba(var(--theme-primary-rgb, 102, 126, 234), 0.08);
  color: var(--theme-primary);
}

.nav-btn.active {
  background: var(--theme-gradient);
  color: #fff;
  box-shadow: 0 4px 12px rgba(var(--theme-primary-rgb, 102, 126, 234), 0.3);
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

.mobile-title {
  display: none;
  font-size: 16px;
  font-weight: 600;
  color: var(--theme-text);
}

/* Theme Switcher Styles */
.theme-section {
  display: flex;
  align-items: center;
}

.theme-dropdown {
  position: relative;
}

.theme-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: var(--theme-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.theme-btn:hover {
  background: rgba(var(--theme-primary-rgb, 102, 126, 234), 0.08);
  color: var(--theme-primary);
}

.theme-btn svg {
  width: 22px;
  height: 22px;
}

.theme-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  min-width: 160px;
  background: var(--theme-surface);
  border: 1px solid var(--theme-border);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  z-index: 1001;
}

.theme-dropdown:hover .theme-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--theme-text);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-option:hover {
  background: rgba(var(--theme-primary-rgb, 102, 126, 234), 0.08);
}

.theme-option.active {
  background: rgba(var(--theme-primary-rgb, 102, 126, 234), 0.12);
}

.theme-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
}

.theme-name {
  white-space: nowrap;
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

  .mobile-title {
    display: block;
  }
}
</style>
