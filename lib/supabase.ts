import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for common operations
export async function getProjects(userId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getProject(projectId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single()

  if (error) throw error
  return data
}

export async function createProject(project: {
  user_id: string
  name: string
  mission: string
  cover_color: string
}) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getTasks(projectId: string, date?: string) {
  let query = supabase
    .from('tasks')
    .select('*')
    .eq('project_id', projectId)

  if (date) {
    query = query.eq('date', date)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createTask(task: {
  project_id: string
  user_id: string
  title: string
  description?: string
  type: 'signal' | 'noise'
  date: string
}) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ ...task, status: 'pending' }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateTaskStatus(taskId: string, status: 'pending' | 'in_progress' | 'completed') {
  const updates: any = { status }

  if (status === 'completed') {
    updates.completed_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', taskId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createReflection(reflection: {
  user_id: string
  project_id?: string
  date: string
  mood?: number
  insights: string
  noise_items: string[]
  signal_completed: number
  noise_count: number
}) {
  const { data, error } = await supabase
    .from('reflections')
    .insert([reflection])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getAnalytics(projectId: string, startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('project_id', projectId)
    .gte('date', startDate)
    .lte('date', endDate)

  if (error) throw error

  // Calculate analytics from tasks
  const analytics = data.reduce((acc: any, task: any) => {
    const date = task.date
    if (!acc[date]) {
      acc[date] = {
        signal_count: 0,
        noise_count: 0,
        tasks_completed: 0,
        total_tasks: 0,
      }
    }

    acc[date].total_tasks++
    if (task.status === 'completed') {
      acc[date].tasks_completed++
    }

    if (task.type === 'signal') {
      acc[date].signal_count++
    } else {
      acc[date].noise_count++
    }

    return acc
  }, {})

  return Object.entries(analytics).map(([date, stats]: [string, any]) => ({
    project_id: projectId,
    date,
    ...stats,
    signal_ratio: Math.round((stats.signal_count / (stats.signal_count + stats.noise_count)) * 100) || 0,
  }))
}
