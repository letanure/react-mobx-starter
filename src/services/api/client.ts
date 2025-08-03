export interface ApiResponse<T, E = unknown> {
  error: boolean
  data: T | E
}

interface ApiClientConfig {
  baseURL: string
  headers?: HeadersInit
}

export function createApiClient(config: ApiClientConfig) {
  async function post<TResponse, TError = unknown>(
    endpoint: string,
    requestData?: unknown,
  ): Promise<ApiResponse<TResponse, TError>> {
    try {
      const isFormData = requestData instanceof FormData

      const response = await fetch(`${config.baseURL}${endpoint}`, {
        method: "POST",
        headers: {
          ...config.headers,
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
        },
        body: isFormData ? requestData : JSON.stringify(requestData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP ${response.status}`,
          statusCode: response.status,
        }))
        return {
          error: true,
          data: errorData as TError,
        }
      }

      // Handle blob responses (like images)
      const contentType = response.headers.get("content-type")
      if (contentType && !contentType.includes("application/json")) {
        const blob = await response.blob()
        return {
          error: false,
          data: blob as TResponse,
        }
      }

      // Handle JSON responses
      const responseData = await response.json()
      return { error: false, data: responseData }
    } catch (error) {
      return {
        error: true,
        data: {
          message: error instanceof Error ? error.message : "Network error",
          code: "NETWORK_ERROR",
        } as TError,
      }
    }
  }

  return { post }
}
