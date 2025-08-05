/**
 * Shared TypeScript types actually used in the application
 */

// API response wrapper (used in services/api.ts)
export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  status: "ok" | "error"
}
