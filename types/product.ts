import { url } from 'inspector'
import { CampaignsProducts } from './campaigns-products'
import { MarketPlaceProduct } from './marketplace-product'
import { PlatformEnum } from './enums'

export interface Product {
  id: string
  title: string
  image_url: string
  price: number
  createdAt: Date
  updatedAt: Date
  campaignsProducts?: CampaignsProducts[]
  marketPlaceProducts?: MarketPlaceProduct[]
}
type MarketPlaceProductCreate = {
  title: string
  price: string
  image_url: string
  url: string
  platform: PlatformEnum
}
export interface CreateProductInput {
  title: string
  imageUrl: string
  price: number | string
  marketPlaceProducts?: MarketPlaceProductCreate[]
}

export interface UpdateProductInput {
  title?: string
  image_url?: string
  price?: number
}

export interface SearchProduct {
  productTitle: string
  productImage: string
  platform: string
  price: string
  url: string
}
