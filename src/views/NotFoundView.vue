<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="not-found-view">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="error-title">页面未找到</h1>
      <p class="error-desc">抱歉，您访问的页面不存在或已被移除</p>
      <div class="action-btns">
        <button class="btn primary" @click="goHome">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          返回首页
        </button>
        <button class="btn secondary" @click="goBack">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          返回上页
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-view {
  min-height: calc(100vh - 64px);
  padding-top: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--theme-background) 0%, rgba(var(--theme-primary-rgb, 102, 126, 234), 0.1) 100%);
}

.not-found-content {
  text-align: center;
  padding: 40px 24px;
}

.error-code {
  font-size: 120px;
  font-weight: 800;
  background: var(--theme-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 16px;
}

.error-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--theme-text);
  margin-bottom: 12px;
}

.error-desc {
  font-size: 16px;
  color: var(--theme-text-secondary);
  margin-bottom: 32px;
}

.action-btns {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn svg {
  width: 18px;
  height: 18px;
}

.btn.primary {
  background: var(--theme-gradient);
  color: #fff;
  box-shadow: 0 4px 14px rgba(var(--theme-primary-rgb, 102, 126, 234), 0.35);
}

.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--theme-primary-rgb, 102, 126, 234), 0.45);
}

.btn.secondary {
  background: var(--theme-surface);
  color: var(--theme-text-secondary);
  border: 1px solid var(--theme-border);
}

.btn.secondary:hover {
  background: var(--theme-background);
  color: var(--theme-text);
}

@media (max-width: 480px) {
  .error-code {
    font-size: 80px;
  }

  .error-title {
    font-size: 22px;
  }

  .action-btns {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
