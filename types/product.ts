import { url } from 'inspector'
import { CampaignsProducts } from './campaigns-products'
import { MarketPlaceProduct } from './marketplace-product'

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

export interface CreateProductInput {
  title: string
  image_url: string
  price: number
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
