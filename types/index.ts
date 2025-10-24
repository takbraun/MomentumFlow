export interface Project {
  id: string
  user_id: string
  name: string
  mission: string
  cover_color: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  project_id: string
  user_id: string
  title: string
  description?: string
  type: 'signal' | 'noise'
  status: 'pending' | 'in_progress' | 'completed'
  date: string
  completed_at?: string
  impact_score?: number
  created_at: string
  updated_at: string
}

export interface Reflection {
  id: string
  user_id: string
  project_id?: string
  date: string
  mood?: number
  insights: string
  noise_items: string[]
  signal_completed: number
  noise_count: number
  created_at: string
}

export interface Analytics {
  project_id: string
  date: string
  signal_count: number
  noise_count: number
  signal_ratio: number
  tasks_completed: number
  total_tasks: number
}

export interface DailyFlow {
  id: string
  user_id: string
  project_id: string
  date: string
  signal_tasks: string[]
  status: 'planning' | 'executing' | 'reflecting' | 'completed'
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  created_at: string
}
