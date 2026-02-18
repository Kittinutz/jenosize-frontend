/**
 * Campaign Service
 * Handles all campaign-related API calls
 */

import { apiGet, ClickStats7dResponse } from './api'

const DASHBOARD_ENDPOINT = {
  BASE: '/dashboard/clicks/stats-7d',
} as const

/**
 * Get all campaigns
 */
export const getAll7DaysState = async (): Promise<ClickStats7dResponse> => {
  return apiGet<ClickStats7dResponse>(DASHBOARD_ENDPOINT.BASE)
}

export const campaignService = {
  getAll7DaysState,
}
