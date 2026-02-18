import { getProductByIdIncludeCampaign } from '@/services/product'
import Image from 'next/image'
import Link from 'next/link'

export default async function ProductCampaignItem({
  productId,
  campaignId,
}: {
  productId: string
  campaignId: string
}) {
  const product = await getProductByIdIncludeCampaign(productId, campaignId)
  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/go`
  const primaryImage = product.marketPlaceProducts?.[0]?.image_url
  return (
    <div
      key={product.id}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-xs text-gray-500">Product ID</p>
          <p className="text-xs text-gray-400 break-all">{product.id}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Base price</p>
          <p className="text-xl font-bold text-emerald-600">
            ฿{product.price.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="relative w-full h-80 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={primaryImage || 'image.jpg'}
            alt={product.title}
            className="h-full w-full object-cover"
            objectFit="cover"
            fill
          />
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Marketplace
          </p>
          <span className="text-xs text-gray-400">
            {product.marketPlaceProducts?.length || 0} sources
          </span>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {product.marketPlaceProducts?.map((mp) => (
            <Link
              key={mp.id}
              href={`${backendUrl}/${mp.links?.[0]?.urlId}`}
              target="_blank"
            >
              <div
                className={`rounded-md border border-gray-200 bg-[var(--${mp.platform.toLowerCase()})] p-3`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">
                    {mp.platform}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    ฿{mp.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
