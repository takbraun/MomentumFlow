'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, TrendingUp, Target, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AnalyticsPage() {
  const params = useParams()
  const router = useRouter()
  const [analyticsData, setAnalyticsData] = useState({
    weeklyRatio: 78,
    totalSignal: 42,
    totalNoise: 12,
    avgDailySignal: 3.2,
    streak: 12,
    bestDay: 'Monday',
    improvement: '+15%',
  })

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/projects/${params.projectId}`}
            className="inline-flex items-center gap-2 text-spotify-lightgray hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Project
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-spotify-lightgray">
            Track your Signal vs Noise ratio and momentum over time
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="text-signal" size={24} />
                  <span className="text-xs text-signal bg-signal/20 px-2 py-1 rounded-full">
                    {analyticsData.improvement}
                  </span>
                </div>
                <p className="text-3xl font-bold text-white mb-1">
                  {analyticsData.weeklyRatio}%
                </p>
                <p className="text-sm text-spotify-lightgray">Signal Ratio</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <Target className="text-signal mb-2" size={24} />
                <p className="text-3xl font-bold text-white mb-1">
                  {analyticsData.totalSignal}
                </p>
                <p className="text-sm text-spotify-lightgray">Total Signal Tasks</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <Zap className="text-signal mb-2" size={24} />
                <p className="text-3xl font-bold text-white mb-1">
                  {analyticsData.streak}
                </p>
                <p className="text-sm text-spotify-lightgray">Day Streak</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="mb-2 text-spotify-lightgray">📊</div>
                <p className="text-3xl font-bold text-white mb-1">
                  {analyticsData.avgDailySignal}
                </p>
                <p className="text-sm text-spotify-lightgray">Avg Daily Signal</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                  (day, index) => {
                    const signalCount = Math.floor(Math.random() * 5) + 1
                    const noiseCount = Math.floor(Math.random() * 3)
                    const total = signalCount + noiseCount
                    const signalPercent = (signalCount / total) * 100

                    return (
                      <div key={day}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white font-medium">{day}</span>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-signal">{signalCount} Signal</span>
                            <span className="text-noise">{noiseCount} Noise</span>
                          </div>
                        </div>
                        <div className="w-full bg-spotify-gray rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${signalPercent}%` }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="h-full bg-signal"
                          />
                        </div>
                      </div>
                    )
                  }
                )}
              </div>
            </CardContent>
          </Card>

          {/* Signal vs Noise Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Signal vs Noise Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {/* Noise (background) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="20"
                      strokeDasharray={`${
                        ((analyticsData.totalNoise / (analyticsData.totalSignal + analyticsData.totalNoise)) * 251.2)
                      } 251.2`}
                      strokeDashoffset="0"
                    />
                    {/* Signal (foreground) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#1DB954"
                      strokeWidth="20"
                      strokeDasharray={`${
                        ((analyticsData.totalSignal / (analyticsData.totalSignal + analyticsData.totalNoise)) * 251.2)
                      } 251.2`}
                      strokeDashoffset={`-${
                        ((analyticsData.totalNoise / (analyticsData.totalSignal + analyticsData.totalNoise)) * 251.2)
                      }`}
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-signal/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-signal" />
                    <span className="text-white font-medium">Signal Tasks</span>
                  </div>
                  <span className="text-signal font-bold">{analyticsData.totalSignal}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-noise/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-noise" />
                    <span className="text-white font-medium">Noise Logged</span>
                  </div>
                  <span className="text-noise font-bold">{analyticsData.totalNoise}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Insights & Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-spotify-gray rounded-lg">
                  <p className="text-spotify-lightgray text-sm mb-2">Best Performance</p>
                  <p className="text-2xl font-bold text-white mb-1">
                    {analyticsData.bestDay}
                  </p>
                  <p className="text-xs text-signal">Highest Signal ratio</p>
                </div>

                <div className="p-4 bg-spotify-gray rounded-lg">
                  <p className="text-spotify-lightgray text-sm mb-2">Compound Effect</p>
                  <p className="text-2xl font-bold text-white mb-1">
                    {analyticsData.totalSignal}
                  </p>
                  <p className="text-xs text-signal">Signal tasks completed</p>
                </div>

                <div className="p-4 bg-spotify-gray rounded-lg">
                  <p className="text-spotify-lightgray text-sm mb-2">Focus Improvement</p>
                  <p className="text-2xl font-bold text-signal mb-1">
                    {analyticsData.improvement}
                  </p>
                  <p className="text-xs text-spotify-lightgray">vs last week</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-signal/10 border border-signal/20 rounded-lg">
                <h4 className="text-signal font-semibold mb-2">🎯 AI Insight (Coming Soon)</h4>
                <p className="text-sm text-white">
                  Your Signal ratio improved by 15% this week. You&apos;re most productive on Mondays.
                  Consider scheduling your most important tasks early in the week.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
