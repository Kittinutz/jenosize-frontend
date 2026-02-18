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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Campaign List</h1>
      <div className="row">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
          {campaigns.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/campaign/${campaign.id}`}
            >
              <CampaignItem campaign={campaign} />
            </Link>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="grid grid-cols-2">
          <h1 className="text-3xl font-bold mb-4">Campain List</h1>
          <Link
            className="text-right"
            href="/product/create"
          >
            <p>Create Product +</p>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
          {products.map((product) => (
            <ProductItems
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
