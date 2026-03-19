<script setup lang="ts">
const projectInfo = {
  name: 'Cesium Vue3 Demo',
  version: '1.0.0',
  description: '基于 Vue3 + Cesium 构建的三维地球可视化演示项目'
}

const dependencies = [
  { name: 'Vue', version: '3.5.x', description: '渐进式 JavaScript 框架' },
  { name: 'Pinia', version: '2.2.x', description: 'Vue 官方状态管理库' },
  { name: 'Vue Router', version: '4.4.x', description: 'Vue 官方路由管理器' },
  { name: 'Cesium', version: '1.123.x', description: '开源三维地球引擎' },
  { name: 'TypeScript', version: '5.6.x', description: 'JavaScript 超集类型系统' },
  { name: 'Vite', version: '6.0.x', description: '下一代前端构建工具' }
]
</script>

<template>
  <div class="about-view">
    <div class="about-container">
      <!-- Header -->
      <header class="about-header">
        <div class="project-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>
        <h1 class="project-name">{{ projectInfo.name }}</h1>
        <span class="version-badge">v{{ projectInfo.version }}</span>
        <p class="project-desc">{{ projectInfo.description }}</p>
      </header>

      <!-- Dependencies -->
      <section class="deps-section">
        <h2 class="section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          项目依赖
        </h2>

        <div class="deps-grid">
          <div v-for="dep in dependencies" :key="dep.name" class="dep-card">
            <div class="dep-header">
              <span class="dep-name">{{ dep.name }}</span>
              <span class="dep-version">{{ dep.version }}</span>
            </div>
            <p class="dep-desc">{{ dep.description }}</p>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="features-section">
        <h2 class="section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          项目特性
        </h2>

        <ul class="feature-list">
          <li>
            <span class="check-icon">✓</span>
            <span>Vue 3 Composition API + TypeScript 类型安全</span>
          </li>
          <li>
            <span class="check-icon">✓</span>
            <span>Pinia 响应式状态管理</span>
          </li>
          <li>
            <span class="check-icon">✓</span>
            <span>Vue Router 路由懒加载</span>
          </li>
          <li>
            <span class="check-icon">✓</span>
            <span>Cesium 三维地球渲染引擎</span>
          </li>
          <li>
            <span class="check-icon">✓</span>
            <span>响应式布局，适配移动端</span>
          </li>
          <li>
            <span class="check-icon">✓</span>
            <span>Docker 容器化部署</span>
          </li>
        </ul>
      </section>

      <!-- Footer -->
      <footer class="about-footer">
        <p>Built with Vue 3 + Cesium</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  min-height: calc(100vh - 64px);
  padding: 88px 24px 48px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.about-container {
  max-width: 800px;
  margin: 0 auto;
}

/* Header */
.about-header {
  text-align: center;
  margin-bottom: 48px;
}

.project-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.project-icon svg {
  width: 44px;
  height: 44px;
  color: #fff;
}

.project-name {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
}

.version-badge {
  display: inline-block;
  padding: 6px 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 16px;
}

.project-desc {
  font-size: 16px;
  color: #64748b;
  max-width: 500px;
  margin: 0 auto;
}

/* Section Title */
.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 24px;
}

.section-title svg {
  width: 24px;
  height: 24px;
  color: #667eea;
}

/* Dependencies */
.deps-section {
  margin-bottom: 48px;
}

.deps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.dep-card {
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

.dep-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.dep-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.dep-name {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.dep-version {
  font-size: 12px;
  padding: 4px 10px;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 12px;
  font-family: 'SF Mono', 'Monaco', monospace;
}

.dep-desc {
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
}

/* Features */
.features-section {
  margin-bottom: 48px;
}

.feature-list {
  list-style: none;
  padding: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
  color: #334155;
}

.feature-list li:last-child {
  border-bottom: none;
}

.check-icon {
  width: 22px;
  height: 22px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
}

/* Footer */
.about-footer {
  text-align: center;
  padding-top: 32px;
  border-top: 1px solid #e2e8f0;
}

.about-footer p {
  font-size: 13px;
  color: #94a3b8;
}

@media (max-width: 768px) {
  .project-name {
    font-size: 24px;
  }

  .project-icon {
    width: 64px;
    height: 64px;
  }

  .project-icon svg {
    width: 36px;
    height: 36px;
  }
}
</style>
