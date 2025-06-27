import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"
import { EnrollmentForm } from "./forms/EnrollmentForm"
import { Button } from "@/components/ui/button"
const revenueData = [
  { month: "Jan", revenue: 35000, members: 2200 },
  { month: "Feb", revenue: 38000, members: 2350 },
  { month: "Mar", revenue: 42000, members: 2500 },
  { month: "Apr", revenue: 41000, members: 2450 },
  { month: "May", revenue: 45000, members: 2650 },
  { month: "Jun", revenue: 48000, members: 2800 }
]

const membershipData = [
  { type: "Basic", count: 1200, percentage: 42 },
  { type: "Premium", count: 980, percentage: 35 },
  { type: "VIP", count: 667, percentage: 23 }
]

export function Analytics({ onOpenEnrollment }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
        Analytics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="month"
                  className="text-slate-600 dark:text-slate-400"
                />
                <YAxis className="text-slate-600 dark:text-slate-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    color: "white"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="url(#gradient1)"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
                />
                <defs>
                  <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" style={{ stopColor: "#8b5cf6" }} />
                    <stop offset="100%" style={{ stopColor: "#3b82f6" }} />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Membership Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={membershipData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="type"
                  className="text-slate-600 dark:text-slate-400"
                />
                <YAxis className="text-slate-600 dark:text-slate-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    color: "white"
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="url(#gradient2)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient
                    id="gradient2"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" style={{ stopColor: "#8b5cf6" }} />
                    <stop offset="100%" style={{ stopColor: "#3b82f6" }} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <div>
          <EnrollmentForm />
        </div>
      </div>
      <Button onClick={onOpenEnrollment}>Predict Enrollment Forecast</Button>
    </div>
  )
}
