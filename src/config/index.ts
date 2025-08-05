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

// Environment detection
const isDevelopment = import.meta.env.DEV
const isProduction = import.meta.env.PROD
const isTest = import.meta.env.MODE === "test"

// Type-safe configuration object
export const config = {
  // Environment
  env: {
    isDevelopment,
    isProduction,
    isTest,
    nodeEnv: import.meta.env.MODE,
  },

  // Feature flags (only what currently exists)
  features: {
    enableDarkMode: true, // From existing features.ts
  },
} as const

// Type exports for consumers
export type Config = typeof config
export type Environment = typeof config.env
export type Features = typeof config.features
