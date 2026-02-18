import { Campaign } from '@/types'

interface CampaignItemProps {
  campaign: Campaign
}

export default function CampaignItem({ campaign }: CampaignItemProps) {
  const getProductsFromCampaign = (campaign: Campaign) => {
    const campaignsProducts = campaign.campaignsProducts || []
    return campaignsProducts.map((cp) => cp.product)
  }
  const getProductsMarkeplaces = (campaign: Campaign) => {
    const campaignsProducts = campaign.campaignsProducts || []
    return campaignsProducts
      .flatMap((cp) => cp.product)
      .flatMap((product) => product.marketPlaceProducts)
  }
  return (
    <div
      key={campaign.id}
      className="border rounded p-4 mb-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <h2 className="text-xl font-semibold mb-2">{campaign.name}</h2>
      <p className="text-gray-600 mb-1">
        Start Date: {new Date(campaign.startDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-1">
        End Date: {new Date(campaign.endDate).toLocaleDateString()}
      </p>
      <p>Number of Products {getProductsFromCampaign(campaign).length}</p>
      <p>Number of Marketplaces {getProductsMarkeplaces(campaign).length}</p>
    </div>
  )
}
