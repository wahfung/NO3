<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as Cesium from 'cesium'
import { useCesiumStore } from '@/stores/cesium'
import type { MarkerEntity } from '@/types/cesium'

const props = defineProps<{
  flyToLocation?: { longitude: number; latitude: number; height?: number }
}>()

const emit = defineEmits<{
  (e: 'viewer-ready', viewer: Cesium.Viewer): void
  (e: 'camera-change', position: { longitude: number; latitude: number; height: number }): void
  (e: 'click', position: { longitude: number; latitude: number }): void
}>()

const cesiumStore = useCesiumStore()
const containerRef = ref<HTMLDivElement | null>(null)
let viewer: Cesium.Viewer | null = null

const initViewer = async () => {
  if (!containerRef.value) {
    cesiumStore.setError('Cesium 容器未找到')
    return
  }

  try {
    cesiumStore.setLoading(true)
    cesiumStore.clearError()

    // 创建 Viewer，不使用默认底图
    viewer = new Cesium.Viewer(containerRef.value, {
      animation: false,
      timeline: false,
      fullscreenButton: true,
      vrButton: false,
      geocoder: false,
      homeButton: true,
      infoBox: true,
      sceneModePicker: true,
      selectionIndicator: true,
      navigationHelpButton: true,
      baseLayerPicker: false,
      // @ts-ignore - 使用空底图配置
      imageryProvider: false
    })

    // 添加 OpenStreetMap 底图
    viewer.imageryLayers.addImageryProvider(
      new Cesium.OpenStreetMapImageryProvider({
        url: 'https://tile.openstreetmap.org/'
      })
    )

    // 飞到初始位置（中国）
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 15000000),
      duration: 2
    })

    // 监听相机变化
    viewer.camera.changed.addEventListener(() => {
      if (!viewer) return
      const cartographic = viewer.camera.positionCartographic
      const position = {
        longitude: Cesium.Math.toDegrees(cartographic.longitude),
        latitude: Cesium.Math.toDegrees(cartographic.latitude),
        height: cartographic.height
      }
      cesiumStore.updateCameraPosition(position)
      emit('camera-change', position)
    })

    // 监听点击事件
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    handler.setInputAction((click: { position: Cesium.Cartesian2 }) => {
      if (!viewer) return
      const cartesian = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid)
      if (cartesian) {
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        emit('click', {
          longitude: Cesium.Math.toDegrees(cartographic.longitude),
          latitude: Cesium.Math.toDegrees(cartographic.latitude)
        })
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    cesiumStore.setInitialized(true)
    emit('viewer-ready', viewer)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Cesium 初始化失败'
    cesiumStore.setError(message)
  }
}

const flyTo = (longitude: number, latitude: number, height: number = 1000000) => {
  if (!viewer) return
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
    duration: 2
  })
}

const addMarker = (marker: MarkerEntity) => {
  if (!viewer) return

  viewer.entities.add({
    id: marker.id,
    name: marker.name,
    position: Cesium.Cartesian3.fromDegrees(
      marker.position.longitude,
      marker.position.latitude,
      marker.position.height || 0
    ),
    point: {
      pixelSize: 12,
      color: Cesium.Color.fromCssColorString('#667eea'),
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    },
    label: {
      text: marker.name,
      font: '14px sans-serif',
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -20)
    },
    description: marker.description || marker.name
  })

  cesiumStore.addMarker(marker)
}

const removeMarker = (markerId: string) => {
  if (!viewer) return
  viewer.entities.removeById(markerId)
  cesiumStore.removeMarker(markerId)
}

const clearAllMarkers = () => {
  if (!viewer) return
  viewer.entities.removeAll()
  cesiumStore.clearMarkers()
}

// 监听飞行目标变化
watch(
  () => props.flyToLocation,
  (location) => {
    if (location) {
      flyTo(location.longitude, location.latitude, location.height)
    }
  }
)

onMounted(() => {
  initViewer()
})

onUnmounted(() => {
  if (viewer) {
    viewer.destroy()
    viewer = null
  }
  cesiumStore.resetState()
})

defineExpose({
  flyTo,
  addMarker,
  removeMarker,
  clearAllMarkers,
  getViewer: () => viewer
})
</script>

<template>
  <div class="cesium-wrapper">
    <!-- Loading Overlay -->
    <div v-if="cesiumStore.isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p class="loading-text">正在加载 Cesium 三维地球...</p>
    </div>

    <!-- Error Message -->
    <div v-if="cesiumStore.hasError" class="error-overlay">
      <div class="error-content">
        <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p>{{ cesiumStore.errorMessage }}</p>
        <button class="retry-btn" @click="initViewer">重试</button>
      </div>
    </div>

    <!-- Cesium Container -->
    <div ref="containerRef" class="cesium-container"></div>
  </div>
</template>

<style scoped>
.cesium-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.cesium-container {
  width: 100%;
  height: 100%;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  z-index: 100;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  margin-top: 20px;
  color: #a0aec0;
  font-size: 14px;
}

.error-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  z-index: 100;
}

.error-content {
  text-align: center;
  color: #fff;
}

.error-icon {
  width: 48px;
  height: 48px;
  color: #fc8181;
  margin-bottom: 16px;
}

.error-content p {
  color: #a0aec0;
  margin-bottom: 20px;
}

.retry-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
</style>
