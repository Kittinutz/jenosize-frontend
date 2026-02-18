'use client'
import { PlatformEnum } from '@/types'
import { useFieldArray, useForm, SubmitHandler } from 'react-hook-form'
import Button from '../Actions/Button'
import MarketPlaceSearch from '../MarketPlace/MarketPlaceSearch'
import { SearchProduct } from '@/types/product'
import { useEffect, useState } from 'react'
import MarketPlaceSearchItemCard from '../MarketPlace/SearchProductCard'
import { createProduct, CreateProductRequest } from '@/services'
import { useRouter } from 'next/navigation'
export type MarketPlaceProductCreate = {
  title: string
  price: string
  image_url: string
  url: string
  platform: PlatformEnum
}

export type CreateProduct = {
  title: string
  price: string
  imageUrl: string
  marketProduct: MarketPlaceProductCreate[]
}
export default function ProductCreateForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<CreateProduct>({
    defaultValues: {
      title: '',
      price: '',
      imageUrl: '',
      marketProduct: [
        {
          platform: PlatformEnum.SHOPEE,
        },
        {
          platform: PlatformEnum.LAZADA,
        },
      ],
    },
  })
  const { replace } = useFieldArray({
    control,
    name: 'marketProduct',
  })
  const [productMarkePlace, setProductMarkePlace] = useState<{
    [PlatformEnum.LAZADA]?: SearchProduct | null
    [PlatformEnum.SHOPEE]?: SearchProduct | null
  }>({
    SHOPEE: null,
    LAZADA: null,
  })
  const onSubmit: SubmitHandler<CreateProduct> = async (data) => {
    try {
      const createdProduct = await createProduct(data as CreateProductRequest)
      console.log('Created product:', createdProduct)
      router.push(`/`) // Navigate to the new post page
    } catch (error) {
      console.error('Create product error:', error)
    }
  }
  const handleMarkeSearchSuccess = (data: SearchProduct) => {
    setProductMarkePlace((prev) => ({
      ...prev,
      [data.platform]: data,
    }))
  }
  const handleSelectProduct = (product: SearchProduct) => () => {
    setValue('title', product.productTitle)
    setValue('price', product.price)
    setValue('imageUrl', product.productImage)
  }
  useEffect(() => {
    async function handleReplaceMarketPlaceProduct() {
      const marketProduct = Object.entries(productMarkePlace)
        .filter(([platform, product]) => product !== null)
        .map(([platform, product]) => ({
          title: product?.productTitle || '',
          price: product?.price || '',
          image_url: product?.productImage || '',
          url: product?.url || '',
          platform: platform as PlatformEnum,
        }))
      console.log(marketProduct)
      replace(marketProduct)
    }
    handleReplaceMarketPlaceProduct()
  }, [replace, productMarkePlace])

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Shopee product</h2>
            <span className="text-xs text-gray-500">Search source</span>
          </div>
          <MarketPlaceSearch
            onSuccess={handleMarkeSearchSuccess}
            platform={PlatformEnum.SHOPEE}
          />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Lazada product</h2>
            <span className="text-xs text-gray-500">Search source</span>
          </div>
          <MarketPlaceSearch
            onSuccess={handleMarkeSearchSuccess}
            platform={PlatformEnum.LAZADA}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Selected products</h3>
          <span className="text-xs text-gray-500">
            Click a card to autofill
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(productMarkePlace).map(
            ([platform, product]) =>
              product && (
                <MarketPlaceSearchItemCard
                  key={platform}
                  product={product}
                  handleSelectProduct={handleSelectProduct}
                  platform={platform}
                />
              ),
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Product details</h3>
          <span className="text-xs text-gray-500">All fields required</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              placeholder="Product title"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && (
              <span className="text-xs text-red-600">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              placeholder="0.00"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              {...register('price', { required: 'Price is required' })}
            />
            {errors.price && (
              <span className="text-xs text-red-600">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="imageUrl"
            className="text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            id="imageUrl"
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            {...register('imageUrl', { required: 'Image URL is required' })}
          />
          {errors.imageUrl && (
            <span className="text-xs text-red-600">
              {errors.imageUrl.message}
            </span>
          )}
        </div>

        <div className="pt-2">
          <Button type="submit">Create Product</Button>
        </div>
      </form>
    </div>
  )
}
