"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { Users, ClipboardList, BookOpen, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import type { AuthUser } from "@/lib/auth"
import { getAllowedModules } from "@/lib/roles"

import { AlertsModule } from "@/components/modules/alerts-module"
import { AnalyticsModule } from "@/components/modules/analytics-module"
import { AppraisalModule } from "@/components/modules/appraisal-module"
import { AttendanceModule } from "@/components/modules/attendance-module"
import { AttendanceAnalysisModule } from "@/components/modules/attendance-analysis-module"
import { ChangePasswordModule } from "@/components/modules/change-password-module"
import { DocumentsModule } from "@/components/modules/documents-module"
import { EditorModule } from "@/components/modules/editor-module"
import { EventsModule } from "@/components/modules/events-module"
import { ExaminationModule } from "@/components/modules/examination-module"
import { FeedbackModule } from "@/components/modules/feedback-module"
import { FinanceModule } from "@/components/modules/finance-module"
import { GrievancesModule } from "@/components/modules/grievances-module"
import { InventoryModule } from "@/components/modules/inventory-module"
import { LeavesModule } from "@/components/modules/leaves-module"
import { MarksModule } from "@/components/modules/marks-module"
import { NaacModule } from "@/components/modules/naac-module"
import { NoticesModule } from "@/components/modules/notices-module"
import { PlacementsModule } from "@/components/modules/placements-module"
import { PromotionModule } from "@/components/modules/promotion-module"
import { ReportsModule } from "@/components/modules/reports-module"
import { StudentsModule } from "@/components/modules/students-module"
import { SubjectsModule } from "@/components/modules/subjects-module"
import { TimetableModule } from "@/components/modules/timetable-module"

const MODULES = [
  { id: "students", Component: StudentsModule },
  { id: "attendance", Component: AttendanceModule },
  { id: "marks", Component: MarksModule },
  { id: "subjects", Component: SubjectsModule },
  { id: "timetable", Component: TimetableModule },
  { id: "analytics", Component: AnalyticsModule },
  { id: "finance", Component: FinanceModule },
  { id: "inventory", Component: InventoryModule },
  { id: "placements", Component: PlacementsModule },
  { id: "leaves", Component: LeavesModule },
  { id: "events", Component: EventsModule },
  { id: "documents", Component: DocumentsModule },
  { id: "feedback", Component: FeedbackModule },
  { id: "grievances", Component: GrievancesModule },
  { id: "notices", Component: NoticesModule },
  { id: "alerts", Component: AlertsModule },
  { id: "appraisal", Component: AppraisalModule },
  { id: "attendance-analysis", Component: AttendanceAnalysisModule },
  { id: "change-password", Component: ChangePasswordModule },
  { id: "editor", Component: EditorModule },
  { id: "examination", Component: ExaminationModule },
  { id: "naac", Component: NaacModule },
  { id: "promotion", Component: PromotionModule },
  { id: "reports", Component: ReportsModule }
]

export default function MasterDashboard() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const [allowedModules, setAllowedModules] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('excelsior_user')
    if (stored) {
      const user = JSON.parse(stored) as AuthUser
      setAuthUser(user)
      setAllowedModules(getAllowedModules(user.type, user.type === 'staff' ? user.data.role : ''))
    }
  }, [])

  const visibleModules = MODULES.filter(m => allowedModules.includes(m.id))

  const HOD_STATS = [
    { label: 'Network Integrity', value: '100%', up: true,  icon: Users },
    { label: 'Avg Attendance',    value: '84%',  up: true,  icon: ClipboardList },
    { label: 'Active Modules',    value: allowedModules.length.toString(), up: true,  icon: BookOpen },
    { label: 'System Alerts',     value: '0',    up: false, icon: AlertTriangle },
  ]

  return (
    <div className="w-full" style={{ background: '#f1ede8' }}>

      {/* Dashboard Hero */}
      <section id="dashboard" className="p-8 md:p-10 border-b flex flex-col" style={{ borderColor: '#e2d9cf' }}>
        {/* Gold rule + label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[2px] w-8" style={{ background: '#c9a84c' }} />
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase" style={{ color: '#c9a84c' }}>
            Overview
          </span>
        </div>

        <h2 className="text-3xl font-bold mb-1" style={{ color: '#0a1628', fontFamily: 'Playfair Display, serif' }}>
          Welcome back, {authUser?.data.name?.split(' ')[0] || 'User'}
        </h2>
        <p className="text-sm mb-8" style={{ color: '#64748b' }}>
          You have access to {allowedModules.length} modules · LICET CSE Department Management System
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
          {HOD_STATS.map(({ label, value, up, icon: Icon }) => (
            <div key={label} className="rounded-xl p-5 border transition-all hover:shadow-md group"
              style={{ background: '#fff', borderColor: '#e2d9cf', boxShadow: '0 1px 4px rgba(10,22,40,0.06)' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-lg" style={{ background: '#0a162810' }}>
                  <Icon className="w-4 h-4" style={{ color: '#0a1628' }} />
                </div>
                {up
                  ? <TrendingUp className="w-4 h-4" style={{ color: '#16a34a' }} />
                  : <TrendingDown className="w-4 h-4" style={{ color: '#dc2626' }} />}
              </div>
              <p className="text-3xl font-bold mb-0.5" style={{ color: '#0a1628' }}>{value}</p>
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: '#94a3b8' }}>{label}</p>
              {/* Gold bottom accent on hover */}
              <div className="h-[2px] w-0 group-hover:w-full mt-3 rounded transition-all duration-300"
                style={{ background: '#c9a84c' }} />
            </div>
          ))}
        </div>
      </section>

      {/* Module Sections */}
      {visibleModules.map(({ id, Component }) => (
        <section key={id} id={id} className="border-b" style={{ borderColor: '#e2d9cf' }}>
          {/* Module header strip */}
          <div className="flex items-center gap-3 px-8 md:px-10 py-4 border-b"
            style={{ background: '#fff', borderColor: '#e2d9cf' }}>
            <div className="h-4 w-[3px] rounded" style={{ background: '#c9a84c' }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#0a1628' }}>
              {id.replace(/-/g, ' ')}
            </span>
          </div>
          <div className="p-6 md:p-8" style={{ background: '#f8f5f0' }}>
            <Component />
          </div>
        </section>
      ))}

      <div className="h-16" />
    </div>
  )
}
