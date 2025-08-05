/**
 * Feature Flags Configuration
 *
 * This file contains feature toggles that control app behavior.
 * Feature flags are useful for:
 * - A/B testing new features
 * - Gradual rollouts
 * - Quick feature disabling without code changes
 * - Environment-specific features
 *
 * Examples of what to add here:
 * - UI feature toggles (dark mode, new layouts)
 * - Experimental functionality
 * - Third-party integrations
 * - Performance optimizations
 * - Debug/development features
 *
 * Usage: import { features } from '@/config/features'
 */
export const features = {
  enableDarkMode: true,
}
