import ProductCampaignItem from '@/components/Product/ProductCampaignItem'
import { getCampaignById, Product } from '@/services'

export default async function Campaign({ params }: { params: { id: string } }) {
  const { id } = await params
  const campaign = await getCampaignById(id)
  const products = campaign.campaignsProducts
    ? campaign.campaignsProducts.flatMap((cp) => cp.product)
    : []

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-700/70 mb-2">
            Campaign Overview
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {campaign.name}
          </h1>
        </div>

        <div className="rounded-2xl border border-blue-200/60 bg-white/80 p-6 shadow-sm backdrop-blur mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Start Date
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(campaign.startDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                End Date
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(campaign.endDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Duration
              </p>
              <p className="text-lg font-semibold text-blue-600">
                {Math.ceil(
                  (new Date(campaign.endDate).getTime() -
                    new Date(campaign.startDate).getTime()) /
                    (1000 * 60 * 60 * 24),
                )}{' '}
                days
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-3">
              UTM Parameters
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-lg bg-blue-50 px-3 py-2">
                <p className="text-xs text-gray-600">Source</p>
                <p className="text-sm font-semibold text-gray-900">
                  {campaign.UTMSource}
                </p>
              </div>
              <div className="rounded-lg bg-indigo-50 px-3 py-2">
                <p className="text-xs text-gray-600">Medium</p>
                <p className="text-sm font-semibold text-gray-900">
                  {campaign.UTMMedium}
                </p>
              </div>
              <div className="rounded-lg bg-purple-50 px-3 py-2">
                <p className="text-xs text-gray-600">Campaign</p>
                <p className="text-sm font-semibold text-gray-900">
                  {campaign.UTMCampaign}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Products
            </h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
              {products.length} products
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
    </div>
  )
}
