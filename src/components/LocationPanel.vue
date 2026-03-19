<script setup lang="ts">
import { ref } from 'vue'

interface CityLocation {
  name: string
  longitude: number
  latitude: number
  height: number
}

const emit = defineEmits<{
  (e: 'fly-to', location: CityLocation): void
  (e: 'add-marker', location: CityLocation): void
}>()

const cities: CityLocation[] = [
  { name: '北京', longitude: 116.4074, latitude: 39.9042, height: 500000 },
  { name: '上海', longitude: 121.4737, latitude: 31.2304, height: 500000 },
  { name: '广州', longitude: 113.2644, latitude: 23.1291, height: 500000 },
  { name: '深圳', longitude: 114.0579, latitude: 22.5431, height: 500000 },
  { name: '香港', longitude: 114.1694, latitude: 22.3193, height: 300000 },
  { name: '东京', longitude: 139.6917, latitude: 35.6895, height: 500000 },
  { name: '纽约', longitude: -74.006, latitude: 40.7128, height: 500000 },
  { name: '伦敦', longitude: -0.1276, latitude: 51.5074, height: 500000 }
]

const selectedCity = ref<CityLocation | null>(null)
const isPanelOpen = ref(true)

const handleCityClick = (city: CityLocation) => {
  selectedCity.value = city
  emit('fly-to', city)
}

const handleAddMarker = (city: CityLocation) => {
  emit('add-marker', city)
}

const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value
}
</script>

<template>
  <div class="location-panel" :class="{ collapsed: !isPanelOpen }">
    <button class="toggle-btn" @click="togglePanel">
      <svg v-if="isPanelOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

    <div class="panel-content">
      <h3 class="panel-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        快速定位
      </h3>

      <div class="city-grid">
        <div
          v-for="city in cities"
          :key="city.name"
          class="city-card"
          :class="{ active: selectedCity?.name === city.name }"
          @click="handleCityClick(city)"
        >
          <span class="city-name">{{ city.name }}</span>
          <button class="marker-btn" @click.stop="handleAddMarker(city)" title="添加标记">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>

      <div class="panel-footer">
        <p class="hint">点击城市飞行至该位置</p>
        <p class="hint">点击 + 添加地图标记</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.location-panel {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 240px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 10;
}

.location-panel.collapsed {
  width: 48px;
}

.location-panel.collapsed .panel-content {
  opacity: 0;
  visibility: hidden;
}

.toggle-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  z-index: 1;
}

.toggle-btn:hover {
  color: var(--color-primary);
}

.toggle-btn svg {
  width: 18px;
  height: 18px;
}

.panel-content {
  padding: 16px;
  transition: all 0.3s ease;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 16px;
  transition: color 0.3s ease;
}

.panel-title svg {
  width: 18px;
  height: 18px;
  color: var(--color-primary);
  transition: color 0.3s ease;
}

.city-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.city-card {
  position: relative;
  padding: 12px 10px;
  background: var(--color-background);
  border: 1px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.city-card:hover {
  background: rgba(102, 126, 234, 0.08);
  border-color: rgba(102, 126, 234, 0.2);
}

.city-card.active {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border-color: transparent;
}

.city-card.active .city-name {
  color: #fff;
}

.city-card.active .marker-btn {
  color: rgba(255, 255, 255, 0.8);
}

.city-card.active .marker-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
}

.city-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.marker-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s;
}

.city-card:hover .marker-btn {
  opacity: 1;
}

.marker-btn:hover {
  color: var(--color-primary);
  background: rgba(102, 126, 234, 0.1);
}

.marker-btn svg {
  width: 14px;
  height: 14px;
}

.panel-footer {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
  transition: border-color 0.3s ease;
}

.hint {
  font-size: 11px;
  color: var(--color-text-secondary);
  margin: 4px 0;
  transition: color 0.3s ease;
}
</style>
