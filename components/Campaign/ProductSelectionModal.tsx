'use client'
import { Product } from '@/types'
import { useEffect, useState } from 'react'
import { getAllProducts } from '@/services'
import Image from 'next/image'

interface ProductSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProductIds: string[]
  onSelect: (productIds: string[]) => void
}

export default function ProductSelectionModal({
  isOpen,
  onClose,
  selectedProductIds,
  onSelect,
}: ProductSelectionModalProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [localSelected, setLocalSelected] = useState<string[]>(selectedProductIds)

  useEffect(() => {
    setLocalSelected(selectedProductIds)
  }, [selectedProductIds])

  useEffect(() => {
    if (isOpen) {
      const fetchProducts = async () => {
        try {
          setLoading(true)
          const data = await getAllProducts()
          setProducts(data)
        } catch (error) {
          console.error('Failed to fetch products:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchProducts()
    }
  }, [isOpen])

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleProduct = (productId: string) => {
    setLocalSelected((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    )
  }

  const handleConfirm = () => {
    onSelect(localSelected)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Select Products
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Choose products to include in this campaign
          </p>
        </div>

        <div className="border-b border-gray-200 px-6 py-3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="max-h-96 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 h-8 w-8" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found</p>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50 transition"
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSelected.includes(product.id)}
                      onChange={() => toggleProduct(product.id)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {product.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        Base price: ฿{product.price.toLocaleString()}
                      </p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 flex items-center justify-between px-6 py-4">
          <p className="text-sm text-gray-600">
            {localSelected.length} of {products.length} selected
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
