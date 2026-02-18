import ProductCampaignItem from '@/components/Product/ProductCampaignItem'
import { getCampaignById, Product } from '@/services'

export default async function Campaign({ params }: { params: { id: string } }) {
  const { id } = await params
  const campaign = await getCampaignById(id)
  const products = campaign.campaignsProducts
    ? campaign.campaignsProducts.flatMap((cp) => cp.product)
    : []

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Campaign Details</h1>
      <div className="row">
        <div className="border rounded p-4 mb-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">{campaign.name}</h2>
          <p className="text-gray-600 mb-1">
            Start Date: {new Date(campaign.startDate).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-1">
            End Date: {new Date(campaign.endDate).toLocaleDateString()}
          </p>
          <p>{campaign.UTMSource}</p>
          <p>{campaign.UTMMedium}</p>
          <p>{campaign.UTMCampaign}</p>
        </div>
      </div>
      <div className="row">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
          {products.map((product) => (
            <ProductCampaignItem
              key={product.id}
              productId={product.id}
              campaignId={campaign.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
