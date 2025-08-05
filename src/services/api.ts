/**
 * Simple API service demo with GET and POST examples
 */

import type { ApiResponse } from "@/types/shared"

const API_BASE = "http://localhost:3001"

/**
 * GET request example
 */
export async function getTodos(): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE}/todos`)
    const data = await response.json()
    return { data, status: "ok" }
  } catch (error) {
    return {
      data: null,
      status: "error",
      message: error instanceof Error ? error.message : "Request failed",
    }
  }
}

/**
 * POST request example
 */
export async function createTodo(text: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
    const data = await response.json()
    return { data, status: "ok" }
  } catch (error) {
    return {
      data: null,
      status: "error",
      message: error instanceof Error ? error.message : "Request failed",
    }
  }
}
