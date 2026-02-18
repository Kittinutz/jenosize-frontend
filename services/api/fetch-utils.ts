/**
 * Fetch Utils
 * Wrapper around fetch API with error handling and logging
 */

import { API_CONFIG, getApiUrl } from './client'
import { handleApiError } from './error-handler'

export interface FetchOptions extends RequestInit {
  timeout?: number
}

/**
 * Wrapper around fetch with error handling and timeout
 */
export const apiFetch = async <T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> => {
  const { timeout = 30000, ...fetchOptions } = options

  const url = getApiUrl(path)
  const headers = {
    ...API_CONFIG.HEADERS,
    ...fetchOptions.headers,
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    })

    if (!response.ok) {
      await handleApiError(response)
    }

    const data = await response.json()
    return data as T
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`)
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

/**
 * Get request
 */
export const apiGet = async <T>(
  path: string,
  options?: FetchOptions,
): Promise<T> => {
  return apiFetch<T>(path, {
    ...options,
    method: 'GET',
  })
}

/**
 * Post request
 */
export const apiPost = async <T>(
  path: string,
  body?: unknown,
  options?: FetchOptions,
): Promise<T> => {
  return apiFetch<T>(path, {
    ...options,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  })
}

/**
 * Patch request
 */
export const apiPatch = async <T>(
  path: string,
  body?: unknown,
  options?: FetchOptions,
): Promise<T> => {
  return apiFetch<T>(path, {
    ...options,
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined,
  })
}

/**
 * Delete request
 */
export const apiDelete = async <T>(
  path: string,
  options?: FetchOptions,
): Promise<T> => {
  return apiFetch<T>(path, {
    ...options,
    method: 'DELETE',
  })
}
