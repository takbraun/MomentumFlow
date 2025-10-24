'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Play, TrendingUp, Calendar } from 'lucide-react'
import { SignalRatioChart } from '@/components/SignalRatioChart'
import { Project } from '@/types'

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [analytics, setAnalytics] = useState({
    signal_ratio: 75,
    weekly_tasks: 24,
    completed_tasks: 18,
    current_streak: 5,
  })

  useEffect(() => {
    // Load project from localStorage (MVP approach)
    const projects = JSON.parse(localStorage.getItem('projects') || '[]')
    const foundProject = projects.find((p: any) => p.id === params.id)

    if (foundProject) {
      setProject(foundProject)
    } else {
      router.push('/')
    }
  }, [params.id, router])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-spotify-lightgray">Loading...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-spotify-lightgray hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Library
          </Link>
        </div>

        {/* Project Hero */}
        <div
          className="rounded-2xl overflow-hidden mb-8"
          style={{ backgroundColor: project.cover_color }}
        >
          <div className="gradient-overlay p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex-1">
                <p className="text-spotify-lightgray text-sm mb-2">PROJECT</p>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  {project.name}
                </h1>
                <p className="text-lg text-white/90 max-w-2xl">
                  {project.mission}
                </p>
              </div>

              <Button
                size="lg"
                onClick={() => router.push(`/daily-flow/${project.id}`)}
                className="gap-3 h-14 px-8"
              >
                <Play size={24} fill="currentColor" />
                Start My Day
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Signal Ratio Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="text-signal" />
                  Signal vs Noise Ratio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SignalRatioChart ratio={analytics.signal_ratio} />
                <p className="text-center text-spotify-lightgray text-sm mt-4">
                  {analytics.signal_ratio >= 80
                    ? 'Excellent focus! Keep up the momentum.'
                    : analytics.signal_ratio >= 60
                    ? 'Good progress. Push for more Signal tasks.'
                    : 'Time to refocus on what truly matters.'}
                </p>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-spotify-gray rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-signal mt-2" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        Completed: Build landing page wireframes
                      </p>
                      <p className="text-spotify-lightgray text-xs mt-1">
                        Signal • 2 hours ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-spotify-gray rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-signal mt-2" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        Completed: Client discovery call
                      </p>
                      <p className="text-spotify-lightgray text-xs mt-1">
                        Signal • 5 hours ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-spotify-gray rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-noise mt-2" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        Logged Noise: Social media scrolling
                      </p>
                      <p className="text-spotify-lightgray text-xs mt-1">
                        Noise • Yesterday
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Stats */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <p className="text-spotify-lightgray text-sm mb-2">This Week</p>
                  <p className="text-5xl font-bold text-white">
                    {analytics.completed_tasks}/{analytics.weekly_tasks}
                  </p>
                  <p className="text-spotify-lightgray text-sm mt-2">Tasks Completed</p>
                </div>

                <div className="w-full bg-spotify-black rounded-full h-2 mb-6">
                  <div
                    className="bg-signal h-2 rounded-full transition-all"
                    style={{
                      width: `${(analytics.completed_tasks / analytics.weekly_tasks) * 100}%`,
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-spotify-lightgray text-sm">Signal Tasks</span>
                    <span className="text-white font-semibold">15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-spotify-lightgray text-sm">Noise Logged</span>
                    <span className="text-white font-semibold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-spotify-lightgray text-sm">Current Streak</span>
                    <span className="text-signal font-semibold">{analytics.current_streak} days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push(`/daily-flow/${project.id}`)}
                >
                  <Calendar size={16} className="mr-2" />
                  Start Daily Flow
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push(`/analytics/${project.id}`)}
                >
                  <TrendingUp size={16} className="mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
