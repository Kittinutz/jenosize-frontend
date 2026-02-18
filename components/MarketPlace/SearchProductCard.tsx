'use client'

import React, from 'react'
import Button from '../Actions/Button'
import { SearchProduct } from '@/types/product'
import Image from 'next/image'

interface MarketPlaceSearchCardProps {
  // You can add props here if needed in the future
  product: SearchProduct
  handleSelectProduct: (product: SearchProduct) =>()=> void
  platform: string
}
export default function MarketPlaceSearchCard({
  product,
  handleSelectProduct,
  platform,
}: MarketPlaceSearchCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">{platform}</h3>
      {product ? (
        <div className="space-y-3">
          <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
            <Image
              src={product.productImage}
              alt={product.productTitle}
              className="object-cover"
              fill
            />
          </div>
          <h4 className="font-medium text-gray-900 line-clamp-2">
            {product.productTitle}
          </h4>
          <p className="text-xl font-bold text-green-600">฿{product.price}</p>
          <Button onClick={handleSelectProduct(product)}>Select</Button>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          No product found for {platform}
        </p>
      )}
    </div>
  )
}
