export interface CameraPosition {
  longitude: number
  latitude: number
  height: number
}

export interface MarkerEntity {
  id: string
  name: string
  position: CameraPosition
  description?: string
}

export interface CesiumViewerState {
  isLoading: boolean
  isInitialized: boolean
  currentPosition: CameraPosition | null
  markers: MarkerEntity[]
  errorMessage: string | null
}
