/**
 * Combines class names conditionally
 * Similar to clsx but simplified
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ")
}
