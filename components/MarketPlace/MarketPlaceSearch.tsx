'use client'

import { getProductSearch } from '@/services/search-product'
import React, { useState } from 'react'
import Button from '../Actions/Button'
import { SearchProduct } from '@/types/product'
import { styleText } from 'util'
import { PlatformEnum } from '@/types'
import { platform } from 'os'

interface MarketPlaceSearchProps {
  // You can add props here if needed in the future
  platform: PlatformEnum.LAZADA | PlatformEnum.SHOPEE
  onSuccess?: (data: SearchProduct) => void
}
export default function MarketPlaceSearch({
  onSuccess,
  platform,
}: MarketPlaceSearchProps) {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    if (!value.includes(platform.toLocaleLowerCase())) {
      setError('Please enter a marketplace URL')
      return
    }
    setLoading(true)
    setSearchTerm(e.target.value)
    try {
      const data = await getProductSearch(e.target.value)
      if (onSuccess) {
        onSuccess(data)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }
  const inputRef = React.useRef<HTMLInputElement>(null)
  return (
    <div className="mb-4">
      <div className="grid grid-cols-2 items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by marketplace name Lazada or shopee"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handleSearch}
        />
        <Button
          onClick={() =>
            handleSearch({
              target: { value: searchTerm },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        >
          {!loading ? (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Retry
            </div>
          ) : (
            <svg
              aria-label="Loading"
              className="size-6 animate-spin"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
              />
            </svg>
          )}
        </Button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}
