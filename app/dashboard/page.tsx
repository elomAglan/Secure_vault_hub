'use client'

import { useEffect, useMemo, useState } from 'react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Users, Activity, LogIn, FolderKanban, RefreshCw } from 'lucide-react'

import { dashboardService, DashboardStats } from '@/app/services/dashboardService'
import { appToast } from '@/lib/toast'

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadStats = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await dashboardService.getStats()
      setStats(data)
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Erreur lors du chargement du dashboard'
      setError(message)
      appToast.error('Chargement echoue', message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadStats()
  }, [])

  const statCards = useMemo(() => {
    if (!stats) return []

    return [
      {
        label: 'Total Users',
        value: stats.totalUsers.toLocaleString(),
        icon: Users,
        color: 'text-blue-500',
      },
      {
        label: 'Active Sessions',
        value: stats.activeSessions.toLocaleString(),
        icon: Activity,
        color: 'text-green-500',
      },
      {
        label: 'Total Logins',
        value: stats.totalLogins.toLocaleString(),
        icon: LogIn,
        color: 'text-purple-500',
      },
      {
        label: 'Total Projects',
        value: stats.totalProjects.toLocaleString(),
        icon: FolderKanban,
        color: 'text-orange-500',
      },
    ]
  }, [stats])

  const recentLoginActivity = useMemo(() => {
    if (!stats?.loginActivity?.length) return []

    return [...stats.loginActivity]
      .slice(-5)
      .reverse()
      .map((item, index) => ({
        id: `${item.date}-${index}`,
        date: item.date,
        logins: item.logins,
      }))
  }, [stats])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-foreground/60">Welcome back! Here&apos;s your authentication analytics.</p>
        </div>
        <Button variant="outline" onClick={() => void loadStats()} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {(isLoading ? Array.from({ length: 4 }) : statCards).map((stat: any, idx) => {
          if (isLoading) {
            return (
              <Card key={`loading-${idx}`} className="border border-border p-6 animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-1/2 mb-3" />
                <div className="h-7 bg-slate-100 rounded w-2/3" />
              </Card>
            )
          }

          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/60">{stat.label}</p>
                  <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border border-border p-6">
          <h2 className="mb-4 font-semibold">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats?.userGrowth ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--foreground)" />
              <YAxis stroke="var(--foreground)" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ fill: 'var(--primary)', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="border border-border p-6">
          <h2 className="mb-4 font-semibold">Login Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.loginActivity ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" stroke="var(--foreground)" />
              <YAxis stroke="var(--foreground)" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="logins"
                fill="var(--primary)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="border border-border p-6">
        <h2 className="mb-4 font-semibold">Recent Login Activity</h2>
        <div className="space-y-4">
          {!isLoading && recentLoginActivity.length === 0 && (
            <p className="text-sm text-foreground/60">No recent activity</p>
          )}

          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="h-12 rounded bg-slate-100 animate-pulse" />
              ))}
            </div>
          )}

          {!isLoading && recentLoginActivity.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between border-b border-border pb-4 last:border-0"
            >
              <div className="flex-1">
                <p className="font-medium text-sm">login.activity</p>
                <p className="text-xs text-foreground/60 mt-1">{item.logins} login(s)</p>
                <p className="text-xs text-foreground/40 mt-1">{item.date}</p>
              </div>
              <Badge variant="outline">system</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
