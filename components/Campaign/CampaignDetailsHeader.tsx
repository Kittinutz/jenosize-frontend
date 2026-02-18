'use client'
import { Campaign } from '@/types'
import { deleteCampaign, ApiError } from '@/services'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface CampaignDetailsHeaderProps {
  campaign: Campaign
}

export default function CampaignDetailsHeader({
  campaign,
}: CampaignDetailsHeaderProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteCampaign(campaign.id)
      router.push('/')
    } catch (error) {
      if (error instanceof ApiError) {
        alert(`Failed to delete campaign: ${error.message}`)
      } else {
        alert('Failed to delete campaign')
      }
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  return (
    <>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-blue-700/70 mb-2">
          Campaign Overview
        </p>

        <div className="flex items-start justify-between gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 flex-1">
            {campaign.name}
          </h1>

          <div className="flex gap-2">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isDeleting}
              className="rounded-md p-2 hover:bg-red-50 text-red-600 hover:text-red-700 transition disabled:opacity-50"
              title="Delete campaign"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-6 shadow-lg max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Campaign
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete "{campaign.name}"? This action
              cannot be undone and will remove all associated data.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
