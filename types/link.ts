import { Campaign } from './campaign'
import { MarketPlaceProduct } from './marketplace-product'

export interface Link {
  id: string
  urlId: string
  url: string
  createdAt: Date
  updatedAt: Date
  campaignId: string
  marketPlaceProductId: string
  campaign: Campaign
  marketPlaceProduct?: MarketPlaceProduct | null
}

export interface CreateLinkInput {
  urlId: string
  url: string
  campaignId: string
  marketPlaceProductId: string
}

export interface UpdateLinkInput {
  url?: string
  campaignId?: string
  marketPlaceProductId?: string
}
