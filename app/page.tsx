import CampaignItem from '@/components/Campiagn/CampaignItem'
import ProductItems from '@/components/Product/ProductItems'
import { getAllCampaigns, getAllProducts } from '@/services'
import Link from 'next/link'

export default async function Home() {
  const [campaigns, products] = await Promise.all([
    getAllCampaigns(),
    getAllProducts(),
  ])

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 rounded-2xl border border-amber-200/60 bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-700/70">
                Marketplace Hub
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
                Campaigns and Products
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Track campaigns, compare marketplace listings, and create
                products faster.
              </p>
            </div>
            <Link
              href="/product/create"
              className="inline-flex items-center justify-center rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-amber-200 transition hover:bg-amber-700"
            >
              Create Product +
            </Link>
          </div>
        </div>

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              Campaign List
            </h2>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
              {campaigns.length} campaigns
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.map((campaign) => (
              <Link
                key={campaign.id}
                href={`/campaign/${campaign.id}`}
                className="group"
              >
                <CampaignItem campaign={campaign} />
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              Product List
            </h2>
            <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-800">
              {products.length} products
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <ProductItems product={product} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
