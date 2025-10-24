# momentumflow

**Signal vs Noise Productivity Web App**

Transform overwhelm into structured momentum. Focus on what truly matters.

![momentumflow](https://img.shields.io/badge/version-1.0.0--MVP-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

## 🎯 Overview

momentumflow is a productivity web app inspired by Steven Bartlett's *Signal vs Noise* framework. It helps professionals launching their own business cut through digital noise and focus on the 3-5 daily actions that generate compounding results.

### Key Features

- **📚 Projects (Albums)**: Create projects with mission statements and visual covers
- **🎯 Daily Signal Selector**: Identify 3-5 critical tasks using guided tests
- **⚡ Execution Board**: Track and complete Signal tasks with focus
- **📝 Reflection & Noise Tracker**: Journal insights and log distractions
- **📊 Analytics Dashboard**: Visualize Signal vs Noise ratio over time
- **🎨 Spotify-Inspired UI**: Dark mode with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- (Optional) Supabase account for Phase 1 features

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/MomentumFlow.git
cd MomentumFlow

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### MVP Mode (Current)

The MVP version uses **localStorage** for data persistence, so no backend setup is required. You can start using the app immediately!

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript |
| **Styling** | TailwindCSS, ShadCN UI components |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Data (MVP)** | localStorage |
| **Data (Phase 1)** | Supabase (PostgreSQL) |
| **Deployment** | Vercel |

## 📁 Project Structure

```
MomentumFlow/
├── app/                        # Next.js app directory
│   ├── page.tsx               # Home dashboard (Library View)
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Global styles
│   ├── projects/
│   │   ├── new/               # New project form
│   │   └── [id]/              # Project detail page
│   ├── daily-flow/
│   │   └── [projectId]/       # Daily Flow (3-step process)
│   └── analytics/
│       └── [projectId]/       # Analytics dashboard
├── components/                 # React components
│   ├── ui/                    # Base UI components (Button, Card, etc.)
│   ├── ProjectCard.tsx        # Project card component
│   └── SignalRatioChart.tsx   # Signal ratio visualization
├── lib/                       # Utilities and helpers
│   ├── utils.ts              # Utility functions
│   └── supabase.ts           # Supabase client (Phase 1)
├── types/                     # TypeScript type definitions
│   └── index.ts              # Main types (Project, Task, etc.)
├── supabase/                  # Database schema
│   └── schema.sql            # SQL schema for Supabase
└── public/                    # Static assets
```

## 🎨 Design System

### Colors (Spotify-Inspired)

- **Signal Green**: `#1DB954` - For completed tasks and positive metrics
- **Noise Red**: `#EF4444` - For distractions and warnings
- **Spotify Black**: `#191414` - Primary background
- **Spotify Gray**: `#282828` - Secondary background
- **Light Gray**: `#B3B3B3` - Text and borders

### Typography

- Font Family: System fonts (font-sans)
- Headings: Bold weights
- Body: Regular weight with good line height

## 🎯 Core Concepts

### Signal vs Noise Framework

**Signal Tasks** are the 3-5 critical actions that:
- ✅ Pass the **Mission Test**: Directly advance your project mission
- ✅ Pass the **Impact Test**: Create measurable results
- ✅ Pass the **Timing Test**: Are the right actions for right now

**Noise** includes:
- ❌ Distractions that feel productive but don&apos;t move the needle
- ❌ Busy work that keeps you occupied without creating value
- ❌ Actions that fail the three tests above

### Daily Flow Process

1. **Planning** (Morning): Identify 3-5 Signal tasks for the day
2. **Execution** (During Day): Focus on completing Signal tasks
3. **Reflection** (Evening): Log insights, mood, and noise distractions

## 📊 Features in Detail

### 1. Home Dashboard
- View all projects as album-style cards
- Quick stats: Today&apos;s Signal, Weekly Ratio, Current Streak
- Create new projects with one click

### 2. Project Pages
- Mission statement display
- Signal vs Noise ratio chart
- Recent activity feed
- Quick actions: Start Daily Flow, View Analytics

### 3. Daily Flow
- **Step 1**: Add 3-5 Signal tasks with guided tests
- **Step 2**: Mark tasks complete with satisfying animations
- **Step 3**: Reflect on the day and log noise items
- **Step 4**: Celebrate completion and view progress

### 4. Analytics Dashboard
- Weekly Signal vs Noise breakdown
- Distribution charts
- Key metrics: Signal Ratio, Total Tasks, Streak
- Insights and patterns (AI-powered in Phase 1)

## 🔮 Roadmap

### MVP (Q4 2025) ✅
- [x] Projects with mission statements
- [x] Daily Flow (Planning, Execution, Reflection)
- [x] Analytics dashboard
- [x] localStorage persistence
- [x] Spotify-inspired dark UI

### Phase 1 (Q1 2026)
- [ ] Supabase integration
- [ ] User authentication (OAuth)
- [ ] AI Mentor with LangChain
- [ ] Payment integration (Stripe)
- [ ] Cloud sync across devices

### Phase 2 (Q2 2026)
- [ ] Mobile app (React Native or PWA)
- [ ] Team view and collaboration
- [ ] Multi-language support (Spanish)
- [ ] Calendar integration

### Phase 3 (Q4 2026)
- [ ] Smart notifications
- [ ] API for integrations
- [ ] Advanced analytics
- [ ] Custom themes

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Environment Variables

For Phase 1 Supabase integration, create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

See `.env.example` for reference.

## 🗄️ Database Setup (Phase 1)

When ready to upgrade from localStorage to Supabase:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor
3. Copy your project URL and anon key to `.env.local`
4. Update components to use Supabase instead of localStorage

The schema includes:
- Projects table
- Tasks table with Signal/Noise classification
- Reflections table
- Daily flows tracking
- Row Level Security (RLS) policies

## 🎨 Customization

### Adding New Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  'your-color': '#HEXCODE',
}
```

### Creating New Components

Use the ShadCN style with `cn()` utility:

```typescript
import { cn } from "@/lib/utils"

export function YourComponent({ className }: Props) {
  return (
    <div className={cn("base-classes", className)}>
      ...
    </div>
  )
}
```

## 📖 Usage Guide

### Creating Your First Project

1. Click "New Project" on the home page
2. Enter a project name (e.g., "Launch My Business")
3. Write your mission statement
4. Choose a cover color
5. Click "Create Project"

### Running Your Daily Flow

1. Open a project and click "Start My Day"
2. Add 3-5 Signal tasks using the guided tests
3. Complete tasks during the day
4. Reflect in the evening (mood, insights, noise)
5. View your momentum building!

### Tracking Progress

- View Signal vs Noise ratio on project pages
- Check Analytics dashboard for trends
- Monitor your streak on the home page

## 🤝 Contributing

Contributions are welcome! This is an MVP, so there&apos;s lots of room for improvement.

Areas for contribution:
- UI/UX improvements
- Additional analytics visualizations
- Mobile responsiveness enhancements
- Performance optimizations
- Bug fixes

## 📄 License

This project is licensed under the MIT License.

## 👏 Acknowledgments

- **Steven Bartlett** - For the Signal vs Noise framework
- **Spotify** - For design inspiration
- **Next.js Team** - For the amazing framework
- **Vercel** - For seamless deployment

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check the documentation in `/docs` (coming soon)
- Join our Discord community (coming soon)

---

Built with ❤️ by the momentumflow team

**Remember**: Focus on Signal. Build Momentum. Create Impact.