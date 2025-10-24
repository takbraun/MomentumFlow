'use client'

import { motion } from 'framer-motion'

interface SignalRatioChartProps {
  ratio: number
}

export function SignalRatioChart({ ratio }: SignalRatioChartProps) {
  const circumference = 2 * Math.PI * 80
  const strokeDashoffset = circumference - (ratio / 100) * circumference

  const getColor = (value: number) => {
    if (value >= 80) return '#1DB954'
    if (value >= 60) return '#F59E0B'
    return '#EF4444'
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="#282828"
            strokeWidth="16"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="96"
            cy="96"
            r="80"
            stroke={getColor(ratio)}
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-5xl font-bold text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {ratio}%
          </motion.span>
          <span className="text-sm text-spotify-lightgray mt-1">Signal</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-signal" />
          <span className="text-sm text-spotify-lightgray">Signal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-noise" />
          <span className="text-sm text-spotify-lightgray">Noise</span>
        </div>
      </div>
    </div>
  )
}
