'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import { PlusCircle } from 'lucide-react'

export default function Home() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    // Load projects from localStorage (MVP approach)
    const savedProjects = localStorage.getItem('projects')
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            momentum<span className="text-signal">flow</span>
          </h1>
          <p className="text-spotify-lightgray text-lg">
            Your Signal. Your Focus. Your Growth.
          </p>
        </header>

        {/* Projects Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Your Projects</h2>
            <Link
              href="/projects/new"
              className="flex items-center gap-2 px-4 py-2 bg-signal hover:bg-signal-glow rounded-full text-spotify-black font-semibold transition-all"
            >
              <PlusCircle size={20} />
              New Project
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* Empty State */}
            {projects.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <div className="w-32 h-32 rounded-full bg-spotify-gray flex items-center justify-center mb-6">
                  <PlusCircle size={48} className="text-spotify-lightgray" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Start Your First Project
                </h3>
                <p className="text-spotify-lightgray mb-6 max-w-md">
                  Create a project to define your mission and start tracking your Signal vs Noise ratio.
                </p>
                <Link
                  href="/projects/new"
                  className="px-6 py-3 bg-signal hover:bg-signal-glow rounded-full text-spotify-black font-semibold transition-all"
                >
                  Create Project
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Quick Stats */}
        {projects.length > 0 && (
          <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-effect rounded-2xl p-6">
              <p className="text-spotify-lightgray text-sm mb-2">Today&apos;s Signal</p>
              <p className="text-4xl font-bold text-signal">3/5</p>
              <p className="text-spotify-lightgray text-xs mt-2">Tasks completed</p>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <p className="text-spotify-lightgray text-sm mb-2">Weekly Ratio</p>
              <p className="text-4xl font-bold text-white">78%</p>
              <p className="text-spotify-lightgray text-xs mt-2">Signal focus</p>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <p className="text-spotify-lightgray text-sm mb-2">Current Streak</p>
              <p className="text-4xl font-bold text-white">12</p>
              <p className="text-spotify-lightgray text-xs mt-2">Days of momentum</p>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
