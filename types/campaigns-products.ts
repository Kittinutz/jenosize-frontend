import { Campaign } from './campaign'
import { Product } from './product'

export interface CampaignsProducts {
  id: string
  campaignId: string
  productId: string
  createdAt: Date
  updatedAt: Date
  campaign: Campaign
  product: Product
}

export interface CreateCampaignsProductsInput {
  campaignId: string
  productId: string
}
