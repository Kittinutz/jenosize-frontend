/**
 * API Response Types
 * Types for responses from all API endpoints
 * Imports domain types from @/types directory
 */

import type {
  Product,
  CreateProductInput,
  UpdateProductInput,
  Campaign,
  CreateCampaignInput,
  UpdateCampaignInput,
  MarketPlaceProduct,
} from '@/types'
import { SearchProduct } from '@/types/product'

// Generic API wrappers
export interface ApiResponse<T> {
  data: T
  statusCode: number
  message?: string
}

export interface ApiErrorResponse {
  statusCode: number
  message: string
  error?: string
}

// Re-export domain types for API usage
export type { Product, CreateProductInput, UpdateProductInput } from '@/types'
export type {
  Campaign,
  CreateCampaignInput,
  UpdateCampaignInput,
} from '@/types'
export type { MarketPlaceProduct } from '@/types'
export type { CampaignsProducts } from '@/types'
export type { Link } from '@/types'
export type { PlatformEnum } from '@/types'

// API-specific response type aliases
export type ProductResponse = Product
export type SearchProductResponse = SearchProduct
export type CreateProductRequest = CreateProductInput
export type UpdateProductRequest = UpdateProductInput

export type CampaignResponse = Campaign
export type CreateCampaignRequest = CreateCampaignInput
export type UpdateCampaignRequest = UpdateCampaignInput

export type MarketplaceProductResponse = MarketPlaceProduct

export interface CampaignProductResponse {
  campaignId: string
  productId: string
  product: Product
}
