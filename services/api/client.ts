/**
 * API Client Configuration
 * Central configuration for API base URL and default headers
 */

export const API_CONFIG = {
  BASE_URL: process.env.BACKEND_URL,
  HEADERS: {
    'Content-Type': 'application/json',
  },
} as const

export const getApiUrl = (path: string): string => {
  return `${API_CONFIG.BASE_URL}${path}`
}
