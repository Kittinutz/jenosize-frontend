/**
 * Product Service
 * Handles all product-related API calls
 */

import { apiGet, ProductResponse, SearchProductResponse } from './api'

const PRODUCT_ENDPOINTS = {
  BASE: '/search-product',
} as const

/**
 * Get product search results
 */
export const getProductSearch = async (
  url: string,
): Promise<SearchProductResponse> => {
  return apiGet<SearchProductResponse>(
    PRODUCT_ENDPOINTS.BASE + `?url=${encodeURIComponent(url)}`,
  )
}

export const productService = {
  getProductSearch,
}
