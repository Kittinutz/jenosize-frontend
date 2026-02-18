/**
 * Product Service
 * Handles all product-related API calls
 */

import {
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
  ProductResponse,
  CreateProductRequest,
  UpdateProductRequest,
} from './api'

const PRODUCT_ENDPOINTS = {
  BASE: '/product',
  FIND: (id: string) => `/product/${id}`,
  FINDONE_INCLUDE_CAMPAIGN: (id: string, campaignId: string) =>
    `/product/${id}/campaign/${campaignId}`,
} as const

/**
 * Create a new product
 */
export const createProduct = async (
  data: CreateProductRequest,
): Promise<ProductResponse> => {
  return apiPost<ProductResponse>(PRODUCT_ENDPOINTS.BASE, data)
}

/**
 * Get all products
 */
export const getAllProducts = async (): Promise<ProductResponse[]> => {
  return apiGet<ProductResponse[]>(PRODUCT_ENDPOINTS.BASE)
}

/**
 * Get product by ID
 */
export const getProductById = async (id: string): Promise<ProductResponse> => {
  return apiGet<ProductResponse>(PRODUCT_ENDPOINTS.FIND(id))
}
/**
 * Get product by ID
 * Includes campaign-specific data if campaignId is provided
 */
export const getProductByIdIncludeCampaign = async (
  id: string,
  campaignId: string,
): Promise<ProductResponse> => {
  return apiGet<ProductResponse>(
    PRODUCT_ENDPOINTS.FINDONE_INCLUDE_CAMPAIGN(id, campaignId),
  )
}

/**
 * Update product by ID
 */
export const updateProduct = async (
  id: string,
  data: UpdateProductRequest,
): Promise<ProductResponse> => {
  return apiPatch<ProductResponse>(PRODUCT_ENDPOINTS.FIND(id), data)
}

/**
 * Delete product by ID
 */
export const deleteProduct = async (
  id: string,
): Promise<{ message: string }> => {
  return apiDelete<{ message: string }>(PRODUCT_ENDPOINTS.FIND(id))
}

export const productService = {
  create: createProduct,
  getAll: getAllProducts,
  getById: getProductById,
  update: updateProduct,
  delete: deleteProduct,
}
