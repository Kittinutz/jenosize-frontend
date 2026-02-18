import { CampaignsProducts } from './campaigns-products'
import { Link } from './link'

export interface Campaign {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  startDate: Date
  endDate: Date
  UTMSource: string
  UTMMedium: string
  UTMCampaign: string
  campaignsProducts?: CampaignsProducts[]
  links?: Link[]
}

export interface CreateCampaignInput {
  name: string
  startDate: Date
  endDate: Date
  UTMSource: string
  UTMMedium: string
  UTMCampaign: string
}

export interface UpdateCampaignInput {
  name?: string
  startDate?: Date
  endDate?: Date
  UTMSource?: string
  UTMMedium?: string
  UTMCampaign?: string
}
