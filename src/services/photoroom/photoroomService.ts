import { type ApiResponse, createApiClient } from "@/services/api/client"
import { createFormData } from "@/utils/formData"

// Types
export interface PhotoroomErrorResponse {
  detail: string
  status_code: number
  type: string
}

export interface BackgroundRemovalOptions {
  format?: "png" | "jpg" | "webp"
  channels?: "rgba" | "alpha"
  bg_color?: string
  size?: "preview" | "medium" | "hd" | "full"
  crop?: boolean
  despill?: boolean
}

// Configuration
const API_KEY = import.meta.env.VITE_PHOTOROOM_API_KEY || ""

if (!API_KEY) {
  console.warn("Photoroom API key not found in environment variables")
}

// Create API client instance
const apiClient = createApiClient({
  baseURL: "https://sdk.photoroom.com/v1",
  headers: {
    "x-api-key": API_KEY,
    Accept: "image/png, application/json",
  },
})

// API function
export async function removeBackground(
  file: File,
  options: BackgroundRemovalOptions = {},
): Promise<ApiResponse<Blob>> {
  const formData = createFormData({ image_file: file, ...options })

  return await apiClient.post<Blob>("/segment", formData)
}
