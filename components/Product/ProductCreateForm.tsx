'use client'
import { PlatformEnum } from '@/types'
import { useFieldArray, useForm, SubmitHandler } from 'react-hook-form'
import Button from '../Actions/Button'
import MarketPlaceSearch from '../MarketPlace/MarketPlaceSearch'
import { SearchProduct } from '@/types/product'
import { useEffect, useState } from 'react'
import MarketPlaceSearchItemCard from '../MarketPlace/SearchProductCard'
type MarketPlaceProductCreate = {
  title: string
  price: string
  image_url: string
  url: string
  platform: PlatformEnum
}

type CreateProduct = {
  title: string
  price: string
  imageUrl: string
  marketProduct: MarketPlaceProductCreate[]
}
export default function ProductCreateForm() {
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
  const { fields, append, remove, replace } = useFieldArray({
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
  const onSubmit: SubmitHandler<CreateProduct> = (data) =>
    console.log(JSON.stringify(data))
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
  console.log({
    errors,
  })
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Shopee product</h2>
        <MarketPlaceSearch
          onSuccess={handleMarkeSearchSuccess}
          platform={PlatformEnum.SHOPEE}
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Lazada product</h2>
        <MarketPlaceSearch
          onSuccess={handleMarkeSearchSuccess}
          platform={PlatformEnum.LAZADA}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            placeholder="Product title"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            placeholder="0.00"
            {...register('price', { required: 'Price is required' })}
          />
          {errors.price && <span>{errors.price.message}</span>}
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            placeholder="https://example.com/image.jpg"
            {...register('imageUrl', { required: 'Image URL is required' })}
          />
          {errors.imageUrl && <span>{errors.imageUrl.message}</span>}
        </div>
        <Button type="submit">Create Product</Button>
      </form>
    </div>
  )
}
