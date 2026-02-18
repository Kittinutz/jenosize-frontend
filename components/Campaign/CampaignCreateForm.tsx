'use client'
import { CampaignFormInput } from '@/types/campaign-form'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { createCampaign, ApiError, CreateCampaignRequest } from '@/services'
import ProductSelectionModal from './ProductSelectionModal'
import { useRouter } from 'next/navigation'

export default function CampaignCreateForm({
  campaignId,
}: {
  campaignId: string
}) {
  const router = useRouter()
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CampaignFormInput>({
    defaultValues: {
      name: '',
      UTMSource: '',
      UTMMedium: '',
      productIds: [],
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    },
  })

  const selectedProductIds = watch('productIds')

  const onSubmit: SubmitHandler<CampaignFormInput> = async (data) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)

      const payload: CreateCampaignRequest = {
        name: data.name,
        UTMSource: data.UTMSource,
        UTMMedium: data.UTMMedium,
        productIds: data.productIds,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      }

      const result = await createCampaign(payload)
      router.push(`/campaign/${result.id}`)
    } catch (error) {
      if (error instanceof ApiError) {
        setSubmitError(error.message)
      } else {
        setSubmitError('Failed to create campaign')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <ProductSelectionModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        selectedProductIds={selectedProductIds}
        onSelect={(productIds) => setValue('productIds', productIds)}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Campaign Details
          </h3>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Campaign Name
              </label>
              <input
                id="name"
                placeholder="Q1 2026 Promo"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                {...register('name', { required: 'Campaign name is required' })}
              />
              {errors.name && (
                <span className="text-xs text-red-600 mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            UTM Parameters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="UTMSource"
                className="text-sm font-medium text-gray-700"
              >
                UTM Source
              </label>
              <input
                id="UTMSource"
                placeholder="google, facebook, etc"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                {...register('UTMSource', {
                  required: 'UTM Source is required',
                })}
              />
              {errors.UTMSource && (
                <span className="text-xs text-red-600 mt-1">
                  {errors.UTMSource.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="UTMMedium"
                className="text-sm font-medium text-gray-700"
              >
                UTM Medium
              </label>
              <input
                id="UTMMedium"
                placeholder="cpc, social, email, etc"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                {...register('UTMMedium', {
                  required: 'UTM Medium is required',
                })}
              />
              {errors.UTMMedium && (
                <span className="text-xs text-red-600 mt-1">
                  {errors.UTMMedium.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Campaign Period
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                {...register('startDate', {
                  required: 'Start date is required',
                })}
              />
              {errors.startDate && (
                <span className="text-xs text-red-600 mt-1">
                  {errors.startDate.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                {...register('endDate', {
                  required: 'End date is required',
                })}
              />
              {errors.endDate && (
                <span className="text-xs text-red-600 mt-1">
                  {errors.endDate.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Select Products
          </h3>

          {selectedProductIds.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {selectedProductIds.map((productId) => (
                <span
                  key={productId}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                >
                  {productId.substring(0, 8)}...
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        'productIds',
                        selectedProductIds.filter((id) => id !== productId),
                      )
                    }
                    className="text-blue-600 hover:text-blue-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsProductModalOpen(true)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            {selectedProductIds.length === 0
              ? 'Select Products'
              : `Edit Products (${selectedProductIds.length})`}
          </button>
          {errors.productIds && (
            <span className="text-xs text-red-600 mt-1">
              {errors.productIds.message}
            </span>
          )}
        </div>

        {submitError && (
          <div className="rounded-md bg-red-50 p-3">
            <p className="text-sm text-red-800">{submitError}</p>
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Campaign'}
          </button>
        </div>
      </form>
    </>
  )
}
