import { Bell, AlertTriangle, Clock, DollarSign, Wrench } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const notifications = [
  {
    id: 1,
    type: "subscription",
    title: "Membership Expiring Soon",
    message: "5 members have subscriptions expiring in the next 7 days",
    time: "2 hours ago",
    icon: Clock,
    priority: "high"
  },
  {
    id: 2,
    type: "maintenance",
    title: "Equipment Maintenance Due",
    message: "Bench Press Station requires scheduled maintenance",
    time: "4 hours ago",
    icon: Wrench,
    priority: "medium"
  },
  {
    id: 3,
    type: "payment",
    title: "Payment Overdue",
    message: "3 members have overdue payments totaling $450",
    time: "6 hours ago",
    icon: DollarSign,
    priority: "high"
  },
  {
    id: 4,
    type: "alert",
    title: "Equipment Out of Order",
    message: "Cable Cross Machine is currently under repair",
    time: "1 day ago",
    icon: AlertTriangle,
    priority: "medium"
  }
]

export function NotificationsPanel() {
  const getPriorityColor = priority => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <span className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            
            Notifications
          </span>
          <Badge className="bg-red-500 text-white">
            {notifications.filter(n => n.priority === "high").length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className="flex items-start space-x-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <notification.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 truncate">
                    {notification.title}
                  </h4>
                  <Badge className={getPriorityColor(notification.priority)}>
                    {notification.priority}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {notification.message}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
