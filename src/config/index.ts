/**
 * Centralized application configuration with type safety
 *
 * Use this file for:
 * - Environment variables and runtime settings
 * - Feature flags and toggles
 * - Any configuration that changes per environment
 *
 * For static constants that never change, use constants/ instead
 */

const isDevelopment = import.meta.env.DEV
const isProduction = import.meta.env.PROD
const isTest = import.meta.env.MODE === "test"

export const config = {
  // Environment
  env: {
    isDevelopment,
    isProduction,
    isTest,
    nodeEnv: import.meta.env.MODE,
  },

  // Feature flags - control UI features and functionality
  features: {
    enableThemeSwitch: true, // Shows theme toggle (light/dark/system) in sidebar
    enableLanguageSwitch: true, // Shows language selector in sidebar
  },
} as const

// Type exports for consumers
export type Features = typeof config.features
