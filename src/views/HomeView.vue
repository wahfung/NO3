<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const features = [
  {
    icon: "globe",
    title: "三维地球可视化",
    description: "基于 Cesium 引擎的高性能三维地球渲染，支持全球地形和影像数据",
  },
  {
    icon: "layers",
    title: "多图层支持",
    description: "支持多种底图切换、地形叠加，满足不同场景需求",
  },
  {
    icon: "marker",
    title: "空间标注",
    description: "支持点、线、面等空间实体的创建、编辑与管理",
  },
  {
    icon: "camera",
    title: "视角控制",
    description: "灵活的相机控制，支持飞行定位、视角切换等交互操作",
  },
];

const techStack = [
  { name: "Vue 3", color: "#42b883" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Pinia", color: "#ffd859" },
  { name: "Vue Router", color: "#42b883" },
  { name: "Cesium", color: "#6366f1" },
  { name: "Vite", color: "#646cff" },
];

const goToCesium = () => {
  router.push("/cesium");
};
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">Cesium</span> + Vue3
          <br />
          三维地球演示
        </h1>
        <p class="hero-subtitle">
          基于 Cesium 引擎构建的现代化三维地球可视化应用
          <br />
          采用 Vue3 + TypeScript + Pinia 技术栈
        </p>
        <button class="cta-btn" @click="goToCesium">
          <span>开始体验</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <h2 class="section-title">核心功能</h2>
      <div class="features-grid">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="feature-card"
        >
          <div class="feature-icon">
            <svg
              v-if="feature.icon === 'globe'"
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
              v-else-if="feature.icon === 'layers'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <svg
              v-else-if="feature.icon === 'marker'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <svg
              v-else-if="feature.icon === 'camera'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
              ></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="tech-section">
      <h2 class="section-title">技术栈</h2>
      <div class="tech-list">
        <span
          v-for="tech in techStack"
          :key="tech.name"
          class="tech-tag"
          :style="{ '--tag-color': tech.color }"
        >
          {{ tech.name }}
        </span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  min-height: calc(100vh - 64px);
  padding-top: 64px;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--theme-background) 0%,
    rgba(var(--theme-primary-rgb, 102, 126, 234), 0.1) 100%
  );
  z-index: 0;
}

.hero-bg::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -30%;
  width: 80%;
  height: 150%;
  background: radial-gradient(
    ellipse,
    rgba(var(--theme-primary-rgb, 102, 126, 234), 0.15) 0%,
    transparent 70%
  );
}

.hero-bg::after {
  content: "";
  position: absolute;
  bottom: -30%;
  left: -20%;
  width: 60%;
  height: 100%;
  background: radial-gradient(
    ellipse,
    rgba(var(--theme-primary-rgb, 102, 126, 234), 0.1) 0%,
    transparent 70%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--theme-text);
  margin-bottom: 24px;
}

.gradient-text {
  background: var(--theme-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 18px;
  color: var(--theme-text-secondary);
  line-height: 1.7;
  margin-bottom: 40px;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: var(--theme-gradient);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(var(--theme-primary-rgb, 102, 126, 234), 0.35);
}

.cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(var(--theme-primary-rgb, 102, 126, 234), 0.45);
}

.cta-btn svg {
  width: 20px;
  height: 20px;
  transition: transform 0.3s;
}

.cta-btn:hover svg {
  transform: translateX(4px);
}

/* Features Section */
.features-section {
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--theme-text);
  text-align: center;
  margin-bottom: 48px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.feature-card {
  padding: 32px 24px;
  background: var(--theme-surface);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 56px;
  height: 56px;
  background: rgba(var(--theme-primary-rgb, 102, 126, 234), 0.1);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.feature-icon svg {
  width: 28px;
  height: 28px;
  color: var(--theme-primary);
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--theme-text);
  margin-bottom: 12px;
}

.feature-desc {
  font-size: 14px;
  color: var(--theme-text-secondary);
  line-height: 1.6;
}

/* Tech Stack Section */
.tech-section {
  padding: 60px 24px 100px;
  background: var(--theme-background);
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  max-width: 600px;
  margin: 0 auto;
}

.tech-tag {
  padding: 10px 20px;
  background: var(--theme-surface);
  border: 2px solid var(--tag-color);
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  color: var(--tag-color);
  transition: all 0.2s ease;
}

.tech-tag:hover {
  background: var(--tag-color);
  color: #fff;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .section-title {
    font-size: 24px;
  }
}
</style>
