import CampaignCreateForm from '@/components/Campaign/CampaignCreateForm'

export default async function CreateCampaignPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-blue-700/70 mb-2">
          Create New
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Campaign
        </h1>
        <p className="mt-2 text-gray-600">
          Create a new campaign to track your marketplace promotions
        </p>
      </div>

      <div className="max-w-2xl">
        <CampaignCreateForm campaignId={id} />
      </div>
    </div>
  )
}
