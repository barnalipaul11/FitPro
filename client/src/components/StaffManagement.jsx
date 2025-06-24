import { useEffect, useState } from "react"
import { Search, Filter, Clock, DollarSign, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StaffForm } from "@/components/forms/StaffForm"
//import { useToast } from "@/hooks/use-toast"

export function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [staff, setStaff] = useState([]) // <-- move staff to state
  //const { toast } = useToast()

  const getStatusBadge = status => {
    const variants = {
      Active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "On Leave":
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      Inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    }
    return variants[status] || ""
  }

  const handleEdit = staffId => {
    console.log("Editing staff:", staffId)
    // toast({
    //   title: "Edit Staff",
    //   description: "Edit functionality will be implemented here"
    // })
  }

  const handleDelete = (staffId, staffName) => {
    console.log("Deleting staff:", staffId)
    // toast({
    //   title: "Delete Staff",
    //   description: `${staffName} has been deleted successfully`,
    //   variant: "destructive"
    // })
  }
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/staff") // Adjust URL if needed
        if (!response.ok) throw new Error("Failed to fetch staff")
        const data = await response.json()
        setStaff(data) // set state with fetched staff
      } catch (error) {
        console.error("Error fetching staff data:", error)
        // Optionally show a toast or notification here
      }
    }
    fetchStaff()
  }, [])

  const filteredStaff = staff.filter(
    member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
          Staff Management
        </h2>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
        >
          Add New Staff
        </Button>
      </div>

      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Staff Overview
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Staff Member
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Shift
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Salary
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map(member => (
                  <tr
                    key={member._id} // <-- use _id here
                    className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {member.name
                              .split(" ")
                              .map(n => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-slate-800 dark:text-slate-200">
                            {member.name}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {member.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="font-medium">
                        {member.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span>
                          {member.shift?.start} - {member.shift?.end}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-semibold">{member.salary}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusBadge(member.status)}>
                        {member.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(member._id)} // <-- use _id here
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(member._id, member.name)} // <-- use _id here
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <StaffForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  )
}
