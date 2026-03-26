"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  AlertCircle, Activity, Star, ClipboardCheck, PieChart, Key, FileText,
  PenTool, CalendarDays, BookOpen, MessageSquare, Wallet, AlertTriangle,
  Package, Heart, Award, ShieldCheck, Bell, Briefcase, TrendingUp,
  FileBarChart, Users, Library, Clock, LogOut, LayoutDashboard, ChevronRight
} from "lucide-react"
import type { AuthUser } from "@/lib/auth"
import { getAllowedModules } from "@/lib/roles"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] })
const sourceSans = Source_Sans_3({ subsets: ["latin"], weight: ["300", "400", "600"] })

const DOCK_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard",       id: "dashboard" },
  { icon: Users,           label: "Students",        id: "students" },
  { icon: ClipboardCheck,  label: "Attendance",      id: "attendance" },
  { icon: Award,           label: "Marks",           id: "marks" },
  { icon: Library,         label: "Subjects",        id: "subjects" },
  { icon: Clock,           label: "Timetable",       id: "timetable" },
  { icon: Activity,        label: "Analytics",       id: "analytics" },
  { icon: Wallet,          label: "Finance",         id: "finance" },
  { icon: Package,         label: "Inventory",       id: "inventory" },
  { icon: Briefcase,       label: "Placements",      id: "placements" },
  { icon: Heart,           label: "Leaves",          id: "leaves" },
  { icon: CalendarDays,    label: "Events",          id: "events" },
  { icon: FileText,        label: "Documents",       id: "documents" },
  { icon: MessageSquare,   label: "Feedback",        id: "feedback" },
  { icon: AlertTriangle,   label: "Grievances",      id: "grievances" },
  { icon: Bell,            label: "Notices",         id: "notices" },
  { icon: AlertCircle,     label: "Alerts",          id: "alerts" },
  { icon: Star,            label: "Appraisal",       id: "appraisal" },
  { icon: PieChart,        label: "Att. Analysis",   id: "attendance-analysis" },
  { icon: Key,             label: "Change Password", id: "change-password" },
  { icon: PenTool,         label: "Editor",          id: "editor" },
  { icon: BookOpen,        label: "Examination",     id: "examination" },
  { icon: ShieldCheck,     label: "NAAC",            id: "naac" },
  { icon: TrendingUp,      label: "Promotion",       id: "promotion" },
  { icon: FileBarChart,    label: "Reports",         id: "reports" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [currentTime, setTime] = useState('')
  const [currentDate, setDate] = useState('')
  const [allowedModules, setAllowedModules] = useState<string[]>([])
  const [userName, setUserName] = useState('')
  const [userRole, setUserRole] = useState('')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('excelsior_user')
    if (!stored) { router.push('/login'); return }
    const user = JSON.parse(stored) as AuthUser
    setAllowedModules(getAllowedModules(user.type, user.type === 'staff' ? user.data.role : ''))
    setUserName(user.data.name || '')
    setUserRole(user.type === 'staff' ? user.data.role : 'STUDENT')

    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }))
      setDate(now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }))
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('excelsior_user')
    router.push('/login')
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    const container = document.getElementById('scroll-container')
    if (el && container) container.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
    setSidebarOpen(false)
  }

  const visibleDockItems = DOCK_ITEMS.filter(item => allowedModules.includes(item.id))

  const roleBadgeStyle = userRole === 'HOD'
    ? { bg: '#f5f3ff', color: '#7c3aed', border: '#ddd6fe' }
    : userRole === 'FACULTY'
    ? { bg: '#f0f9ff', color: '#0369a1', border: '#bae6fd' }
    : { bg: '#f0fdfa', color: '#0f766e', border: '#99f6e4' }

  return (
    <div className={`h-screen w-full flex flex-col overflow-hidden ${sourceSans.className}`}
      style={{ background: '#f1ede8' }}>

      {/* ── TOP NAVBAR ── */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 h-[64px] border-b z-30 relative"
        style={{ background: '#0a1628', borderColor: '#1e2d4a' }}>

        {/* Left — Logo + title */}
        <div className="flex items-center gap-3">
          <img src="/licet-logo.png" alt="LICET" className="w-8 h-8 object-contain" />
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className={`text-white font-bold text-base tracking-wide ${playfair.className}`}>Excelsior</span>
              <span className="text-[10px] px-2 py-0.5 rounded font-semibold tracking-widest uppercase"
                style={{ background: '#c9a84c22', color: '#c9a84c', border: '1px solid #c9a84c44' }}>
                ERP
              </span>
            </div>
            <p className="text-[10px] tracking-widest uppercase" style={{ color: '#64748b' }}>LICET — Dept. of CSE</p>
          </div>
        </div>

        {/* Centre — Date & Time */}
        <div className="hidden md:flex flex-col items-center">
          <span className="text-white font-semibold text-sm tracking-wide">{currentTime}</span>
          <span className="text-[10px] tracking-wide" style={{ color: '#64748b' }}>{currentDate}</span>
        </div>

        {/* Right — User info + logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-white text-sm font-semibold leading-tight">{userName}</span>
            <span className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded mt-0.5"
              style={{ background: roleBadgeStyle.bg, color: roleBadgeStyle.color, border: `1px solid ${roleBadgeStyle.border}` }}>
              {userRole}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ background: '#c9a84c', color: '#0a1628' }}>
            {userName.charAt(0) || '?'}
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all hover:brightness-90"
            style={{ background: '#1e2d4a', color: '#94a3b8', border: '1px solid #2d3f5c' }}
            title="Sign out">
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* ── BODY (sidebar + content) ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT SIDEBAR NAVIGATION ── */}
        <aside
          className="flex-shrink-0 flex flex-col overflow-hidden transition-all duration-300 border-r z-20"
          style={{
            width: sidebarOpen ? '220px' : '60px',
            background: '#fff',
            borderColor: '#e2d9cf'
          }}>

          {/* Collapse toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center justify-center h-11 w-full border-b transition-colors hover:brightness-95 flex-shrink-0"
            style={{ borderColor: '#e2d9cf', background: '#faf7f4' }}>
            <motion.div animate={{ rotate: sidebarOpen ? 0 : 180 }} transition={{ duration: 0.2 }}>
              <ChevronRight className="w-4 h-4" style={{ color: '#64748b' }} />
            </motion.div>
          </button>

          {/* Nav items */}
          <div className="flex-1 overflow-y-auto py-2" style={{ scrollbarWidth: 'none' }}>
            {visibleDockItems.map(({ icon: Icon, label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative w-full flex items-center gap-3 px-3.5 py-2.5 transition-all group"
                style={{
                  color: hoveredId === id ? '#0a1628' : '#64748b',
                  background: hoveredId === id ? '#f1ede8' : 'transparent',
                }}>

                {/* Gold left accent on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r transition-all"
                  style={{ background: hoveredId === id ? '#c9a84c' : 'transparent' }} />

                <Icon className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="text-xs font-semibold tracking-wide whitespace-nowrap overflow-hidden"
                    style={{ color: hoveredId === id ? '#0a1628' : '#64748b' }}>
                    {label}
                  </span>
                )}

                {/* Tooltip when collapsed */}
                {!sidebarOpen && hoveredId === id && (
                  <div className="absolute left-[56px] top-1/2 -translate-y-1/2 z-50 pointer-events-none">
                    <div className="px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap text-xs font-semibold"
                      style={{ background: '#0a1628', color: '#fff', border: '1px solid #c9a84c44' }}>
                      {label}
                    </div>
                    <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-0 h-0"
                      style={{ borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderRight: '4px solid #0a1628' }} />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Bottom — LICET branding */}
          <div className="flex-shrink-0 p-3 border-t" style={{ borderColor: '#e2d9cf' }}>
            {sidebarOpen ? (
              <div className="flex items-center gap-2">
                <img src="/licet-logo.png" alt="LICET" className="w-6 h-6 object-contain opacity-60" />
                <div>
                  <p className="text-[9px] font-bold tracking-widest uppercase" style={{ color: '#94a3b8' }}>LICET</p>
                  <p className="text-[8px]" style={{ color: '#cbd5e1' }}>est. 2009</p>
                </div>
              </div>
            ) : (
              <img src="/licet-logo.png" alt="LICET" className="w-6 h-6 object-contain opacity-40 mx-auto" />
            )}
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {/* Gold top accent bar */}
          <div className="h-[3px] flex-shrink-0" style={{
            background: 'linear-gradient(90deg, #c9a84c 0%, #f0d080 50%, #c9a84c 100%)'
          }} />

          <div id="scroll-container"
            className="flex-1 overflow-y-auto"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#c9a84c44 transparent'
            }}>
            {children}
          </div>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        #scroll-container::-webkit-scrollbar { width: 5px; }
        #scroll-container::-webkit-scrollbar-track { background: transparent; }
        #scroll-container::-webkit-scrollbar-thumb { background: #c9a84c55; border-radius: 10px; }
        #scroll-container::-webkit-scrollbar-thumb:hover { background: #c9a84c; }
      `}} />
    </div>
  )
}
