/**
 * Product Service
 * Handles all product-related API calls
 */

import { apiGet, SearchProductResponse } from './api'

const SEARCH_PRODUCT = {
  BASE: '/search-product',
} as const

/**
 * Get product search results
 */
export const getProductSearch = async (
  url: string,
): Promise<SearchProductResponse> => {
  return apiGet<SearchProductResponse>(
    SEARCH_PRODUCT.BASE + `?url=${encodeURIComponent(url)}`,
  )
}

export const productService = {
  getProductSearch,
}
