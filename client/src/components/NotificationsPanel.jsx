import { useEffect, useState } from "react"
import { Bell, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function getDueDate(startDate, type) {
  if (!startDate) return ""
  const date = new Date(startDate)
  switch (type?.toLowerCase()) {
    case "basic":
      date.setMonth(date.getMonth() + 1)
      break
    case "silver":
      date.setMonth(date.getMonth() + 3)
      break
    case "gold":
      date.setMonth(date.getMonth() + 6)
      break
    case "platinum":
      date.setFullYear(date.getFullYear() + 1)
      break
    default:
      return ""
  }
  return date
}

function getDaysLeft(expiryDate) {
  if (!expiryDate) return ""
  const now = new Date()
  const diff = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24))
  if (diff < 0) return "Expired"
  if (diff === 0) return "Expires today"
  return `${diff} day${diff > 1 ? "s" : ""} left`
}

export function NotificationsPanel() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/members`
        )
        if (!response.ok) throw new Error("Failed to fetch members")
        const data = await response.json()
        setMembers(data)
      } catch (error) {
        console.error("Error fetching members:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMembers()
  }, [])

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <span className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            All Members
          </span>
          <Badge className="bg-blue-500 text-white">
            {members.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-slate-500">Loading...</div>
          ) : members.length === 0 ? (
            <div className="text-center text-slate-500">
              No members found
            </div>
          ) : (
            members.map(member => {
              const expiryDate = getDueDate(member.membershipStartDate, member.membershipType)
              return (
                <div
                  key={member._id}
                  className="flex items-start space-x-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-slate-800 dark:text-slate-200 truncate">
                        {member.name}
                      </h4>
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        {member.membershipType || "Package"}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Expires on:{" "}
                      {expiryDate ? expiryDate.toLocaleDateString() : "N/A"}{" "}
                      <span className="ml-2 font-semibold">
                        {getDaysLeft(expiryDate)}
                      </span>
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
