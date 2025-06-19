import { Users, DollarSign, Dumbbell, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Active Members",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Monthly Revenue",
    value: "$45,230",
    change: "+8.2%",
    icon: DollarSign,
    color: "from-green-500 to-green-600"
  },
  {
    title: "Equipment Items",
    value: "156",
    change: "+2.1%",
    icon: Dumbbell,
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Growth Rate",
    value: "23.8%",
    change: "+5.4%",
    icon: TrendingUp,
    color: "from-orange-500 to-orange-600"
  },
]

export function StatsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {stats.map(stat => (
        <Card
          key={stat.title}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {stat.title}
            </CardTitle>
            <div
              className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}
            >
              <stat.icon className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {stat.value}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
