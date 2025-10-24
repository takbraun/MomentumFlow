'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, TrendingUp } from 'lucide-react'

interface Project {
  id: string
  name: string
  mission: string
  cover_color: string
  signal_ratio: number
  total_tasks: number
  completed_tasks: number
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const progress = (project.completed_tasks / project.total_tasks) * 100

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative"
    >
      <Link href={`/projects/${project.id}`}>
        <div className="bg-spotify-gray rounded-lg overflow-hidden hover:bg-opacity-80 transition-all">
          {/* Album Cover */}
          <div
            className="h-48 relative flex items-center justify-center"
            style={{ backgroundColor: project.cover_color }}
          >
            <div className="absolute inset-0 gradient-overlay" />
            <div className="relative z-10 text-center p-6">
              <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                {project.name}
              </h3>
            </div>

            {/* Play Button Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute bottom-4 right-4 z-20"
            >
              <div className="w-12 h-12 rounded-full bg-signal flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Play size={24} className="text-spotify-black ml-1" fill="currentColor" />
              </div>
            </motion.div>
          </div>

          {/* Project Info */}
          <div className="p-4">
            <p className="text-spotify-lightgray text-sm mb-3 line-clamp-2 h-10">
              {project.mission}
            </p>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-spotify-lightgray mb-1">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-spotify-black rounded-full h-1.5">
                <div
                  className="bg-signal h-1.5 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Signal Ratio */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-signal" />
                <span className="text-sm text-white font-semibold">
                  {project.signal_ratio}%
                </span>
                <span className="text-xs text-spotify-lightgray">Signal</span>
              </div>
              <span className="text-xs text-spotify-lightgray">
                {project.completed_tasks}/{project.total_tasks} tasks
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
