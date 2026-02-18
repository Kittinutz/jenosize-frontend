import { getProductByIdIncludeCampaign } from '@/services/product'
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
  return (
    <div
      key={product.id}
      className="border rounded p-4 mb-4 shadow-sm hover:shadow-md transition-shadow mx "
    >
      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
      <p className="text-gray-600 mb-1">Price: ${product.price}</p>

      <picture className="flex justify-center">
        {product.marketPlaceProducts?.map((mp) => (
          <source
            key={mp.image_url}
            srcSet={mp.image_url}
          />
        ))}
        <img
          src="image.jpg"
          alt="Description of the image"
          width="300"
          height="200"
        />
      </picture>
      <div className="grid grid-cols-2">
        {product.marketPlaceProducts?.map((mp) => (
          <div key={mp.id}>
            <p>{mp.platform}</p>
            <p>price: ฿ {mp.price.toLocaleString()}</p>
            <Link
              href={`${backendUrl}/${mp.links?.[0]?.urlId}`}
              target="_blank"
              className="text-blue-500 underline"
            >
              Visit Marketplace Link
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
