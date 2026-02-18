import CampaignItem from '@/components/Campiagn/CampaignItem'
import ProductItems from '@/components/Product/ProductItems'
import { Campaign, getAllCampaigns, getAllProducts, Product } from '@/services'

import Link from 'next/link'

export default async function Home() {
  let campaigns: Campaign[] = []
  let products: Product[] = []
  try {
    const [campaignsData = [], productsData = []] = await Promise.all([
      getAllCampaigns(),
      getAllProducts(),
    ])
    campaigns = [...campaignsData]
    products = [...productsData]
  } catch (e) {
    console.error('Failed to fetch campaigns or products:', e)
  }

  if (!campaigns || !products) {
    return (
      <div>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-10 overflow-hidden rounded-3xl border border-amber-200/60 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.16),transparent_50%)] p-8 shadow-[0_20px_60px_-40px_rgba(251,191,36,0.8)]">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-amber-800/70">
                  Marketplace Hub
                </p>
                <h1 className="mt-3 text-3xl md:text-5xl font-semibold text-gray-900">
                  Campaigns and Products
                </h1>
                <p className="mt-3 text-sm md:text-base text-gray-600">
                  Track campaigns, compare marketplace listings, and create
                  products faster.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-amber-900/80">
                  <span className="rounded-full border border-amber-200/70 bg-white/70 px-3 py-1">
                    Fast comparisons
                  </span>
                  <span className="rounded-full border border-amber-200/70 bg-white/70 px-3 py-1">
                    Campaign visibility
                  </span>
                  <span className="rounded-full border border-amber-200/70 bg-white/70 px-3 py-1">
                    Marketplace-ready
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/product/create"
                  className="inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-200/70 transition hover:-translate-y-0.5 hover:bg-gray-800"
                >
                  Create Product +
                </Link>
                <Link
                  href="/campaign/create"
                  className="inline-flex items-center justify-center rounded-full border border-amber-300 bg-white/80 px-5 py-2.5 text-sm font-semibold text-amber-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Create Campaign +
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-full border border-amber-300 bg-white/80 px-5 py-2.5 text-sm font-semibold text-amber-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  View Dashboard +
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10 overflow-hidden rounded-3xl border border-amber-200/60 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.16),transparent_50%)] p-8 shadow-[0_20px_60px_-40px_rgba(251,191,36,0.8)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-amber-800/70">
                Marketplace Hub
              </p>
              <h1 className="mt-3 text-3xl md:text-5xl font-semibold text-gray-900">
                Campaigns and Products
              </h1>
              <p className="mt-3 text-sm md:text-base text-gray-600">
                Track campaigns, compare marketplace listings, and create
                products faster.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-amber-900/80">
                <span className="rounded-full border border-amber-200/70 bg-white/70 px-3 py-1">
                  Fast comparisons
                </span>
                <span className="rounded-full border border-amber-200/70 bg-white/70 px-3 py-1">
                  Campaign visibility
                </span>
                <span className="rounded-full border border-amber-200/70 bg-white/70 px-3 py-1">
                  Marketplace-ready
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/product/create"
                className="inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-200/70 transition hover:-translate-y-0.5 hover:bg-gray-800"
              >
                Create Product +
              </Link>
              <Link
                href="/campaign/create"
                className="inline-flex items-center justify-center rounded-full border border-amber-300 bg-white/80 px-5 py-2.5 text-sm font-semibold text-amber-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Create Campaign +
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-amber-300 bg-white/80 px-5 py-2.5 text-sm font-semibold text-amber-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                View Dashboard +
              </Link>
            </div>
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
