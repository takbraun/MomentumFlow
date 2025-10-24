'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const COVER_COLORS = [
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#6366F1', // Indigo
  '#14B8A6', // Teal
]

export default function NewProjectPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    mission: '',
    cover_color: COVER_COLORS[0],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // For MVP without auth, we'll use localStorage to store projects
      const projects = JSON.parse(localStorage.getItem('projects') || '[]')
      const newProject = {
        id: Date.now().toString(),
        ...formData,
        signal_ratio: 0,
        total_tasks: 0,
        completed_tasks: 0,
        created_at: new Date().toISOString(),
      }

      projects.push(newProject)
      localStorage.setItem('projects', JSON.stringify(projects))

      router.push('/')
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-spotify-lightgray hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Library
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Create New Project
          </h1>
          <p className="text-spotify-lightgray">
            Define your mission and start building momentum
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Give your project an identity and purpose
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Project Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Project Name
                </label>
                <Input
                  id="name"
                  placeholder="e.g., Launch My Business"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Mission Statement */}
              <div>
                <label htmlFor="mission" className="block text-sm font-medium text-white mb-2">
                  Mission Statement
                </label>
                <Textarea
                  id="mission"
                  placeholder="What's the purpose of this project? What impact do you want to create?"
                  value={formData.mission}
                  onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                  required
                  rows={4}
                />
                <p className="text-xs text-spotify-lightgray mt-2">
                  This will help you identify Signal tasks that align with your mission
                </p>
              </div>

              {/* Cover Color */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Cover Color
                </label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                  {COVER_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, cover_color: color })}
                      className={`w-12 h-12 rounded-lg transition-all hover:scale-110 ${
                        formData.cover_color === color
                          ? 'ring-2 ring-signal ring-offset-2 ring-offset-spotify-black'
                          : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Creating...' : 'Create Project'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/')}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Signal vs Noise Framework Info */}
        <Card className="mt-6 border-signal/20">
          <CardHeader>
            <CardTitle className="text-signal">Signal vs Noise Framework</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">What is Signal?</h4>
              <p className="text-sm text-spotify-lightgray">
                Signal tasks are the 3-5 critical actions that directly advance your mission.
                They pass the Mission Test, Impact Test, and Timing Test.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">What is Noise?</h4>
              <p className="text-sm text-spotify-lightgray">
                Noise tasks feel productive but don&apos;t create meaningful progress.
                They&apos;re distractions that keep you busy without moving the needle.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
