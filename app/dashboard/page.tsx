'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { getAll7DaysState } from '@/services'
import type { ClickStats7dResponse } from '@/services/api/types'

export default function DashboardPage() {
  const [statsData, setStatsData] = useState<ClickStats7dResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const data = await getAll7DaysState()
        setStatsData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stats')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-600">Error: {error}</p>
      </div>
    )
  }

  if (!statsData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-500">No data available</p>
      </div>
    )
  }

  // Transform byMarketplace data for chart
  const marketplaceChartData = statsData.dates.map((date) => {
    const dayData: { [key: string]: number | string } = { date }
    statsData.byMarketplace
      .filter((item) => item.date === date)
      .forEach((item) => {
        dayData[item.platform] = item.count
      })
    return dayData
  })

  // Transform byProduct data for chart
  const productChartData = statsData.dates.map((date) => {
    const dayData: { [key: string]: number | string } = { date }
    statsData.byProduct
      .filter((item) => item.date === date)
      .forEach((item) => {
        dayData[item.productTitle] = item.count
      })
    return dayData
  })

  // Transform byCampaign data for chart
  const campaignChartData = statsData.dates.map((date) => {
    const dayData: { [key: string]: number | string } = { date }
    statsData.byCampaign
      .filter((item) => item.date === date)
      .forEach((item) => {
        dayData[item.campaignName] = item.count
      })
    return dayData
  })

  // Get unique products and campaigns for chart colors
  const products = [
    ...new Set(statsData.byProduct.map((item) => item.productTitle)),
  ]
  const campaigns = [
    ...new Set(statsData.byCampaign.map((item) => item.campaignName)),
  ]

  // Get unique platforms for marketplace chart colors
  const platforms = [
    ...new Set(statsData.byMarketplace.map((item) => item.platform)),
  ]
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-lg text-slate-600">7-Day Performance Analytics</p>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded mt-4"></div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-8">
        {/* Marketplace Stats */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">
              📱 Stats by Marketplace
            </h2>
          </div>
          <div className="p-6">
            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <BarChart
                data={marketplaceChartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="square"
                />
                {platforms.map((platform, idx) => (
                  <Bar
                    key={platform}
                    dataKey={platform}
                    fill={colors[idx % colors.length]}
                    name={platform}
                    radius={[8, 8, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Stats */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">
              🛍️ Stats by Product
            </h2>
          </div>
          <div className="p-6">
            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <BarChart
                data={productChartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="square"
                />
                {products.map((product, idx) => (
                  <Bar
                    key={product}
                    dataKey={product}
                    fill={colors[idx % colors.length]}
                    name={product}
                    radius={[8, 8, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign Stats */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">
              🎯 Stats by Campaign
            </h2>
          </div>
          <div className="p-6">
            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <BarChart
                data={campaignChartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="square"
                />
                {campaigns.map((campaign, idx) => (
                  <Bar
                    key={campaign}
                    dataKey={campaign}
                    fill={colors[idx % colors.length]}
                    name={campaign}
                    radius={[8, 8, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
