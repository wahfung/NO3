<script setup lang="ts">
import { ref } from 'vue'
import CesiumViewer from '@/components/CesiumViewer.vue'
import LocationPanel from '@/components/LocationPanel.vue'
import { useCesiumStore } from '@/stores/cesium'
import type { MarkerEntity } from '@/types/cesium'

const cesiumStore = useCesiumStore()
const cesiumViewerRef = ref<InstanceType<typeof CesiumViewer> | null>(null)
const flyToLocation = ref<{ longitude: number; latitude: number; height?: number } | undefined>()
const showToast = ref(false)
const toastMessage = ref('')

const handleFlyTo = (location: { longitude: number; latitude: number; height: number }) => {
  flyToLocation.value = location
}

const handleAddMarker = (location: { name: string; longitude: number; latitude: number; height: number }) => {
  if (!cesiumViewerRef.value) return

  const marker: MarkerEntity = {
    id: `marker-${Date.now()}`,
    name: location.name,
    position: {
      longitude: location.longitude,
      latitude: location.latitude,
      height: 0
    },
    description: `${location.name} - 经度: ${location.longitude.toFixed(4)}, 纬度: ${location.latitude.toFixed(4)}`
  }

  cesiumViewerRef.value.addMarker(marker)
  showNotification(`已添加标记: ${location.name}`)
}

const handleViewerReady = () => {
  showNotification('Cesium 地球加载完成')
}

const handleCameraChange = (position: { longitude: number; latitude: number; height: number }) => {
  cesiumStore.updateCameraPosition(position)
}

const handleMapClick = (position: { longitude: number; latitude: number }) => {
  cesiumStore.updateCameraPosition({
    longitude: position.longitude,
    latitude: position.latitude,
    height: 0
  })
}

const clearAllMarkers = () => {
  if (!cesiumViewerRef.value) return
  cesiumViewerRef.value.clearAllMarkers()
  showNotification('已清除所有标记')
}

const showNotification = (message: string) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2500)
}
</script>

<template>
  <div class="cesium-view">
    <!-- Status Bar -->
    <div class="status-bar">
      <div class="status-item">
        <span class="status-label">标记数量</span>
        <span class="status-value">{{ cesiumStore.markerCount }}</span>
      </div>
      <div v-if="cesiumStore.currentPosition" class="status-item">
        <span class="status-label">经度</span>
        <span class="status-value">{{ cesiumStore.currentPosition.longitude.toFixed(4) }}°</span>
      </div>
      <div v-if="cesiumStore.currentPosition" class="status-item">
        <span class="status-label">纬度</span>
        <span class="status-value">{{ cesiumStore.currentPosition.latitude.toFixed(4) }}°</span>
      </div>
      <div v-if="cesiumStore.currentPosition" class="status-item">
        <span class="status-label">高度</span>
        <span class="status-value">{{ (cesiumStore.currentPosition.height / 1000).toFixed(1) }} km</span>
      </div>
      <button v-if="cesiumStore.markerCount > 0" class="clear-btn" @click="clearAllMarkers">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
        清除标记
      </button>
    </div>

    <!-- Map Container -->
    <div class="map-container">
      <CesiumViewer
        ref="cesiumViewerRef"
        :fly-to-location="flyToLocation"
        @viewer-ready="handleViewerReady"
        @camera-change="handleCameraChange"
        @click="handleMapClick"
      />

      <LocationPanel @fly-to="handleFlyTo" @add-marker="handleAddMarker" />
    </div>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="showToast" class="toast">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        {{ toastMessage }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.cesium-view {
  height: calc(100vh - 64px);
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  background: #f1f5f9;
}

.status-bar {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 24px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-label {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
}

.status-value {
  font-size: 14px;
  color: #1e293b;
  font-weight: 600;
  font-family: 'SF Mono', 'Monaco', monospace;
}

.clear-btn {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: #fee2e2;
  border: none;
  border-radius: 8px;
  color: #dc2626;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #fecaca;
}

.clear-btn svg {
  width: 16px;
  height: 16px;
}

.map-container {
  flex: 1;
  position: relative;
  padding: 16px;
  min-height: 0;
}

.map-container > :deep(.cesium-wrapper) {
  height: 100%;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  background: #1e293b;
  color: #fff;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.toast svg {
  width: 18px;
  height: 18px;
  color: #4ade80;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

@media (max-width: 768px) {
  .status-bar {
    flex-wrap: wrap;
    gap: 12px;
    padding: 10px 16px;
  }

  .status-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  .clear-btn {
    width: 100%;
    justify-content: center;
    margin-left: 0;
    margin-top: 8px;
  }

  .map-container {
    padding: 8px;
  }
}
</style>
