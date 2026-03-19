import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CameraPosition, MarkerEntity, CesiumViewerState } from '@/types/cesium'

export const useCesiumStore = defineStore('cesium', () => {
  // State
  const isLoading = ref<boolean>(true)
  const isInitialized = ref<boolean>(false)
  const currentPosition = ref<CameraPosition | null>(null)
  const markers = ref<MarkerEntity[]>([])
  const errorMessage = ref<string | null>(null)

  // Getters
  const markerCount = computed(() => markers.value.length)
  const hasError = computed(() => errorMessage.value !== null)
  const viewerState = computed<CesiumViewerState>(() => ({
    isLoading: isLoading.value,
    isInitialized: isInitialized.value,
    currentPosition: currentPosition.value,
    markers: markers.value,
    errorMessage: errorMessage.value
  }))

  // Actions
  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  function setInitialized(initialized: boolean) {
    isInitialized.value = initialized
    if (initialized) {
      isLoading.value = false
    }
  }

  function updateCameraPosition(position: CameraPosition) {
    currentPosition.value = position
  }

  function addMarker(marker: MarkerEntity) {
    const exists = markers.value.find(m => m.id === marker.id)
    if (!exists) {
      markers.value.push(marker)
    }
  }

  function removeMarker(markerId: string) {
    const index = markers.value.findIndex(m => m.id === markerId)
    if (index > -1) {
      markers.value.splice(index, 1)
    }
  }

  function clearMarkers() {
    markers.value = []
  }

  function setError(message: string | null) {
    errorMessage.value = message
  }

  function clearError() {
    errorMessage.value = null
  }

  function resetState() {
    isLoading.value = true
    isInitialized.value = false
    currentPosition.value = null
    markers.value = []
    errorMessage.value = null
  }

  return {
    // State
    isLoading,
    isInitialized,
    currentPosition,
    markers,
    errorMessage,
    // Getters
    markerCount,
    hasError,
    viewerState,
    // Actions
    setLoading,
    setInitialized,
    updateCameraPosition,
    addMarker,
    removeMarker,
    clearMarkers,
    setError,
    clearError,
    resetState
  }
})
