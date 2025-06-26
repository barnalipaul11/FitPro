import { useState, useFetch, useEffect } from "react"
import {
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Edit,
  Trash2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MemberForm } from "@/components/forms/MemberForm"
import { DeletePopup } from "@/utils/deletepopup";

//import { useToast } from "@/hooks/use-toast"



export function MemberManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [members, setMembers] = useState([])
  const [editingMember, setEditingMember] = useState(null);
  const [deletePopup, setDeletePopup] = useState({ open: false, memberId: null, memberName: "" });
  //const { toast } = useToast()

  const handleEdit = memberId => {
    console.log("Editing member:", memberId)
    const member = members.find(m => m._id === memberId);
    setEditingMember(member);
    setIsFormOpen(true);
    // toast({
    //   title: "Edit Member",
    //   description: "Edit functionality will be implemented here"
    // })
  }

  const handleDelete = (memberId, memberName) => {
    setDeletePopup({ open: true, memberId, memberName });
  };

  const confirmDelete = async () => {
    const { memberId, memberName } = deletePopup;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/members/${memberId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete member");
      setMembers(prev => prev.filter(m => m._id !== memberId));
      // Optionally show toast here
    } catch (error) {
      console.error("Error deleting member:", error);
      // Optionally show toast here
    } finally {
      setDeletePopup({ open: false, memberId: null, memberName: "" });
    }
  };

  function getDueDate(startDate, type) {
    if (!startDate) return "";
    const date = new Date(startDate);
    switch (type?.toLowerCase()) {
      case "basic":
        date.setMonth(date.getMonth() + 1);
        break;
      case "silver":
        date.setMonth(date.getMonth() + 3);
        break;
      case "gold":
        date.setMonth(date.getMonth() + 6);
        break;
      case "platinum":
        date.setFullYear(date.getFullYear() + 1);
        break;
      default:
        return "";
    }
    return date.toLocaleDateString();
  }
  const getStatusIcon = status => {
    switch (status) {
      case "Active":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "Expiring Soon":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "Expired":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = status => {
    const variants = {
      Active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Expiring Soon":
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      Expired: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    }
    return variants[status] || ""
  }

   useEffect(()=>{
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/members`)
        if (!response.ok) throw new Error("Failed to fetch members")
        const data = await response.json()
        setMembers(data)
        console.log("Fetched members:", data);
        
      } catch (error) {
        console.error("Error fetching member data:", error)
        // Optionally show a toast or notification here
      }
    }
    fetchMembers()},[])
  const filteredMembers = members.filter(
    member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
          Member Management
        </h2>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
        >
          Add New Member
        </Button>
      </div>

      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Members Overview
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search members..."
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
                    Member
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Subscription
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Due Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Contact
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map(member => (
                  <tr
                    key={member._id} // <-- use _id here
                    className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
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
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="font-medium">
                        {member.membershipType}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(member.status)}
                        <Badge className={getStatusBadge(member.status)}>
                          {member.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      {getDueDate(member.membershipStartDate, member.membershipType)}
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      {member.phone}
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
                          onClick={() => handleDelete(member._id, member.name)}
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

      <MemberForm
        key={editingMember ? editingMember._id : "new"}
        open={isFormOpen}
        onOpenChange={open => {
          setIsFormOpen(open);
          if (!open) setEditingMember(null);
        }}
        initialValues={editingMember}
      />

      <DeletePopup
        open={deletePopup.open}
        title="Delete Member"
        message={`Are you sure you want to delete ${deletePopup.memberName}?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeletePopup({ open: false, memberId: null, memberName: "" })}
      />
    </div>
  )
}
