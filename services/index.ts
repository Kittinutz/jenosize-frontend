/**
 * Services - Main exports
 * Central exports for all API services
 */

// API utilities
export * from './api'

// Services
export {
  productService,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from './product'
export {
  campaignService,
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} from './campaign'
