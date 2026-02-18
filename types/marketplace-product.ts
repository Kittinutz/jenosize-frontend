import { PlatformEnum } from './enums'
import { Product } from './product'
import { Link } from './link'

export interface MarketPlaceProduct {
  id: string
  title: string
  image_url: string
  price: number
  url: string
  platform: PlatformEnum
  productId?: string | null
  product?: Product | null
  createdAt: Date
  updatedAt: Date
  links?: Link[]
}

export interface CreateMarketPlaceProductInput {
  title: string
  image_url: string
  price: number
  url: string
  platform: PlatformEnum
  productId?: string | null
}

export interface UpdateMarketPlaceProductInput {
  title?: string
  image_url?: string
  price?: number
  url?: string
  platform?: PlatformEnum
  productId?: string | null
}
