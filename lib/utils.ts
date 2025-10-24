import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function calculateSignalRatio(signalCount: number, noiseCount: number): number {
  const total = signalCount + noiseCount
  if (total === 0) return 0
  return Math.round((signalCount / total) * 100)
}

export function getSignalColor(ratio: number): string {
  if (ratio >= 80) return 'text-signal'
  if (ratio >= 60) return 'text-yellow-500'
  return 'text-noise'
}
