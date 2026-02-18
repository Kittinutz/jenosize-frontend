/**
 * Campaign Service
 * Handles all campaign-related API calls
 */

import {
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
  CampaignResponse,
  CreateCampaignRequest,
  UpdateCampaignRequest,
} from './api'

const CAMPAIGN_ENDPOINTS = {
  BASE: '/campaign',
  FIND: (id: string) => `/campaign/${id}`,
} as const

/**
 * Create a new campaign
 */
export const createCampaign = async (
  data: CreateCampaignRequest,
): Promise<CampaignResponse> => {
  return apiPost<CampaignResponse>(CAMPAIGN_ENDPOINTS.BASE, data)
}

/**
 * Get all campaigns
 */
export const getAllCampaigns = async (): Promise<CampaignResponse[]> => {
  return apiGet<CampaignResponse[]>(CAMPAIGN_ENDPOINTS.BASE)
}

/**
 * Get campaign by ID
 */
export const getCampaignById = async (
  id: string,
): Promise<CampaignResponse> => {
  return apiGet<CampaignResponse>(CAMPAIGN_ENDPOINTS.FIND(id))
}

/**
 * Update campaign by ID
 */
export const updateCampaign = async (
  id: string,
  data: UpdateCampaignRequest,
): Promise<CampaignResponse> => {
  return apiPatch<CampaignResponse>(CAMPAIGN_ENDPOINTS.FIND(id), data)
}

/**
 * Delete campaign by ID
 */
export const deleteCampaign = async (
  id: string,
): Promise<{ message: string }> => {
  return apiDelete<{ message: string }>(CAMPAIGN_ENDPOINTS.FIND(id))
}

export const campaignService = {
  create: createCampaign,
  getAll: getAllCampaigns,
  getById: getCampaignById,
  update: updateCampaign,
  delete: deleteCampaign,
}
