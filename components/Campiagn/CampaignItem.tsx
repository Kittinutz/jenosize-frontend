import { Campaign } from '@/types'

interface CampaignItemProps {
  campaign: Campaign
}

export default function CampaignItem({ campaign }: CampaignItemProps) {
  return (
    <div
      key={campaign.id}
      className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition group-hover:-translate-y-0.5 group-hover:shadow-md"
    >
      <h2 className="text-xl font-semibold mb-2">{campaign.name}</h2>
      <p className="text-gray-600 mb-1">
        Start Date: {new Date(campaign.startDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-1">
        End Date: {new Date(campaign.endDate).toLocaleDateString()}
      </p>
    </div>
  )
}
