'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Plus, Check, X } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

type FlowStep = 'planning' | 'executing' | 'reflecting' | 'completed'

interface Task {
  id: string
  title: string
  completed: boolean
}

export default function DailyFlowPage() {
  const params = useParams()
  const router = useRouter()
  const [step, setStep] = useState<FlowStep>('planning')
  const [signalTasks, setSignalTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [reflection, setReflection] = useState({
    insights: '',
    noise_items: [''],
    mood: 3,
  })

  const addTask = () => {
    if (newTask.trim() && signalTasks.length < 5) {
      setSignalTasks([
        ...signalTasks,
        { id: Date.now().toString(), title: newTask, completed: false },
      ])
      setNewTask('')
    }
  }

  const removeTask = (id: string) => {
    setSignalTasks(signalTasks.filter((t) => t.id !== id))
  }

  const toggleTask = (id: string) => {
    setSignalTasks(
      signalTasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const addNoiseItem = () => {
    setReflection({
      ...reflection,
      noise_items: [...reflection.noise_items, ''],
    })
  }

  const updateNoiseItem = (index: number, value: string) => {
    const newNoiseItems = [...reflection.noise_items]
    newNoiseItems[index] = value
    setReflection({ ...reflection, noise_items: newNoiseItems })
  }

  const completeDailyFlow = () => {
    // Save to localStorage for MVP
    const dailyFlow = {
      projectId: params.projectId,
      date: new Date().toISOString().split('T')[0],
      signalTasks,
      reflection,
    }

    const flows = JSON.parse(localStorage.getItem('dailyFlows') || '[]')
    flows.push(dailyFlow)
    localStorage.setItem('dailyFlows', JSON.stringify(flows))

    setStep('completed')
  }

  const completedCount = signalTasks.filter((t) => t.completed).length

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
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
            Daily Flow
          </h1>
          <p className="text-spotify-lightgray">
            {step === 'planning' && 'Identify your 3-5 Signal tasks for today'}
            {step === 'executing' && 'Focus on completing your Signal tasks'}
            {step === 'reflecting' && 'Reflect on your day and log distractions'}
            {step === 'completed' && 'Great work! Your momentum is building.'}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {['planning', 'executing', 'reflecting', 'completed'].map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === s
                    ? 'bg-signal text-spotify-black'
                    : i < ['planning', 'executing', 'reflecting', 'completed'].indexOf(step)
                    ? 'bg-signal/50 text-white'
                    : 'bg-spotify-gray text-spotify-lightgray'
                }`}
              >
                {i + 1}
              </div>
              {i < 3 && (
                <div
                  className={`w-12 h-1 mx-2 ${
                    i < ['planning', 'executing', 'reflecting', 'completed'].indexOf(step)
                      ? 'bg-signal/50'
                      : 'bg-spotify-gray'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Planning */}
          {step === 'planning' && (
            <motion.div
              key="planning"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Signal Task Identification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {signalTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 p-3 bg-spotify-gray rounded-lg"
                      >
                        <div className="w-2 h-2 rounded-full bg-signal" />
                        <span className="flex-1 text-white">{task.title}</span>
                        <button
                          onClick={() => removeTask(task.id)}
                          className="text-spotify-lightgray hover:text-noise transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {signalTasks.length < 5 && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter a Signal task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTask()}
                      />
                      <Button onClick={addTask} size="icon">
                        <Plus size={20} />
                      </Button>
                    </div>
                  )}

                  <div className="bg-signal/10 border border-signal/20 rounded-lg p-4">
                    <h4 className="text-signal font-semibold mb-2">Signal Task Tests</h4>
                    <ul className="space-y-2 text-sm text-spotify-lightgray">
                      <li>✓ Mission Test: Does it advance my project mission?</li>
                      <li>✓ Impact Test: Will it create measurable results?</li>
                      <li>✓ Timing Test: Is now the right time for this?</li>
                    </ul>
                  </div>

                  <Button
                    onClick={() => setStep('executing')}
                    disabled={signalTasks.length < 3}
                    className="w-full"
                  >
                    {signalTasks.length < 3
                      ? `Add ${3 - signalTasks.length} more tasks (minimum 3)`
                      : 'Start Execution'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Executing */}
          {step === 'executing' && (
            <motion.div
              key="executing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Focus Execution</CardTitle>
                  <div className="text-3xl font-bold text-white mt-4">
                    {completedCount}/{signalTasks.length} Completed
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {signalTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                          task.completed
                            ? 'bg-signal/20 border border-signal/50'
                            : 'bg-spotify-gray hover:bg-spotify-gray/80'
                        }`}
                        onClick={() => toggleTask(task.id)}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            task.completed
                              ? 'bg-signal border-signal'
                              : 'border-spotify-lightgray'
                          }`}
                        >
                          {task.completed && <Check size={16} className="text-spotify-black" />}
                        </div>
                        <span
                          className={`flex-1 ${
                            task.completed
                              ? 'text-white line-through'
                              : 'text-white font-medium'
                          }`}
                        >
                          {task.title}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" onClick={() => setStep('planning')}>
                      Back
                    </Button>
                    <Button onClick={() => setStep('reflecting')} className="flex-1">
                      Continue to Reflection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Reflecting */}
          {step === 'reflecting' && (
            <motion.div
              key="reflecting"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Daily Reflection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Mood */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">
                      How do you feel about today?
                    </label>
                    <div className="flex gap-4 justify-center">
                      {[1, 2, 3, 4, 5].map((m) => (
                        <button
                          key={m}
                          onClick={() => setReflection({ ...reflection, mood: m })}
                          className={`w-12 h-12 rounded-full text-2xl transition-all ${
                            reflection.mood === m
                              ? 'bg-signal scale-110'
                              : 'bg-spotify-gray hover:bg-spotify-gray/80'
                          }`}
                        >
                          {m === 1 ? '😞' : m === 2 ? '😕' : m === 3 ? '😐' : m === 4 ? '🙂' : '😄'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Insights */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Key Insights
                    </label>
                    <Textarea
                      placeholder="What did you learn today? What worked well? What could be improved?"
                      value={reflection.insights}
                      onChange={(e) =>
                        setReflection({ ...reflection, insights: e.target.value })
                      }
                      rows={4}
                    />
                  </div>

                  {/* Noise Tracking */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Noise (Distractions)
                    </label>
                    {reflection.noise_items.map((item, index) => (
                      <Input
                        key={index}
                        placeholder="e.g., Social media scrolling, unnecessary meetings..."
                        value={item}
                        onChange={(e) => updateNoiseItem(index, e.target.value)}
                        className="mb-2"
                      />
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addNoiseItem}
                      className="w-full"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Noise Item
                    </Button>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" onClick={() => setStep('executing')}>
                      Back
                    </Button>
                    <Button onClick={completeDailyFlow} className="flex-1">
                      Complete Day
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Completed */}
          {step === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Card>
                <CardContent className="py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-24 h-24 rounded-full bg-signal mx-auto mb-6 flex items-center justify-center"
                  >
                    <Check size={48} className="text-spotify-black" />
                  </motion.div>

                  <h2 className="text-3xl font-bold text-white mb-4">
                    Momentum Built!
                  </h2>

                  <p className="text-spotify-lightgray mb-2">
                    You completed {completedCount} out of {signalTasks.length} Signal tasks
                  </p>

                  <p className="text-signal font-semibold mb-8">
                    {completedCount === signalTasks.length
                      ? 'Perfect execution! 🎯'
                      : completedCount >= signalTasks.length * 0.6
                      ? 'Great progress! Keep it up! 💪'
                      : 'Every step counts. Tomorrow is a new day! 🌱'}
                  </p>

                  <div className="flex flex-col gap-3 max-w-xs mx-auto">
                    <Button onClick={() => router.push(`/projects/${params.projectId}`)}>
                      Back to Project
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/analytics/${params.projectId}`)}
                    >
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
