'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
import { Users, Activity, LogIn, AlertTriangle } from 'lucide-react'
import {
  mockDashboardStats,
  mockUserGrowthData,
  mockLoginActivityData,
  mockActivityLogs,
} from '@/lib/mock-data'

export default function DashboardPage() {
  const stats = [
    {
      label: 'Total Users',
      value: mockDashboardStats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-500',
    },
    {
      label: 'Active Sessions',
      value: mockDashboardStats.activeSessions.toLocaleString(),
      icon: Activity,
      color: 'text-green-500',
    },
    {
      label: 'Total Logins',
      value: mockDashboardStats.totalLogins.toLocaleString(),
      icon: LogIn,
      color: 'text-purple-500',
    },
    {
      label: 'Error Rate',
      value: `${mockDashboardStats.errorRate.toFixed(2)}%`,
      icon: AlertTriangle,
      color: 'text-orange-500',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-foreground/60">Welcome back! Here's your authentication analytics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
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

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border border-border p-6">
          <h2 className="mb-4 font-semibold">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockUserGrowthData}>
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
            <BarChart data={mockLoginActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="time" stroke="var(--foreground)" />
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

      {/* Recent Activity */}
      <Card className="border border-border p-6">
        <h2 className="mb-4 font-semibold">Recent Activity</h2>
        <div className="space-y-4">
          {mockActivityLogs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="flex items-start justify-between border-b border-border pb-4 last:border-0"
            >
              <div className="flex-1">
                <p className="font-medium text-sm">{log.action}</p>
                <p className="text-xs text-foreground/60 mt-1">{log.details}</p>
                <p className="text-xs text-foreground/40 mt-1">
                  {log.timestamp.toLocaleTimeString()}
                </p>
              </div>
              <Badge variant="outline">{log.userName}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
