import { useState } from "react"
import {
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  MapPin,
  Calendar,
  Edit,
  Trash2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EquipmentForm } from "@/components/forms/EquipmentForm"
// import { useToast } from "@/hooks/use-toast"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"

const equipment = [
  {
    id: 1,
    name: "Treadmill Pro X1",
    category: "Cardio",
    status: "Good",
    lastMaintenance: "2024-05-15",
    nextMaintenance: "2024-07-15",
    location: "Floor 1 - Zone A"
  },
  {
    id: 2,
    name: "Bench Press Station",
    category: "Strength",
    status: "Needs Maintenance",
    lastMaintenance: "2024-04-10",
    nextMaintenance: "2024-06-20",
    location: "Floor 1 - Zone B"
  },
  {
    id: 3,
    name: "Rowing Machine Elite",
    category: "Cardio",
    status: "Good",
    lastMaintenance: "2024-06-01",
    nextMaintenance: "2024-08-01",
    location: "Floor 2 - Zone A"
  },
  {
    id: 4,
    name: "Cable Cross Machine",
    category: "Strength",
    status: "Under Repair",
    lastMaintenance: "2024-03-20",
    nextMaintenance: "2024-06-25",
    location: "Floor 1 - Zone C"
  },
  {
    id: 5,
    name: "Elliptical Trainer",
    category: "Cardio",
    status: "Good",
    lastMaintenance: "2024-05-28",
    nextMaintenance: "2024-07-28",
    location: "Floor 2 - Zone B"
  },
  {
    id: 6,
    name: "Leg Press Machine",
    category: "Strength",
    status: "Good",
    lastMaintenance: "2024-06-10",
    nextMaintenance: "2024-08-10",
    location: "Floor 1 - Zone A"
  },
  {
    id: 7,
    name: "Stationary Bike",
    category: "Cardio",
    status: "Needs Maintenance",
    lastMaintenance: "2024-04-25",
    nextMaintenance: "2024-06-25",
    location: "Floor 2 - Zone C"
  },
  {
    id: 8,
    name: "Dumbbells Set",
    category: "Strength",
    status: "Good",
    lastMaintenance: "2024-05-20",
    nextMaintenance: "2024-07-20",
    location: "Floor 1 - Zone B"
  },
  {
    id: 9,
    name: "Pull-up Bar",
    category: "Strength",
    status: "Under Repair",
    lastMaintenance: "2024-03-15",
    nextMaintenance: "2024-06-15",
    location: "Floor 2 - Zone A"
  },
  {
    id: 10,
    name: "Spin Bike",
    category: "Cardio",
    status: "Good",
    lastMaintenance: "2024-06-05",
    nextMaintenance: "2024-08-05",
    location: "Floor 1 - Zone C"
  }
]

export function EquipmentTracking() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  //const { toast } = useToast()

  const handleEdit = equipmentId => {
    console.log("Editing equipment:", equipmentId)
    // toast({
    //   title: "Edit Equipment",
    //   description: "Edit functionality will be implemented here"
    // })
  }

  const handleDelete = (equipmentId, equipmentName) => {
    console.log("Deleting equipment:", equipmentId)
    // toast({
    //   title: "Delete Equipment",
    //   description: `${equipmentName} has been deleted successfully`,
    //   variant: "destructive"
    // })
  }

  const getStatusIcon = status => {
    switch (status) {
      case "Good":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "Needs Maintenance":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "Under Repair":
        return <Settings className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = status => {
    const variants = {
      Good:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200",
      "Needs Maintenance":
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200",
      "Under Repair":
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200"
    }
    return variants[status] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const filteredEquipment = equipment.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredEquipment.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEquipment = filteredEquipment.slice(startIndex, endIndex)

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, start + maxVisiblePages - 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }

    return pages
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
          Equipment Tracking
        </h2>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
        >
          Add Equipment
        </Button>
      </div>

      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Equipment Overview
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search equipment..."
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentEquipment.map(item => (
              <Card
                key={item.id}
                className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow relative"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        {item.name}
                      </CardTitle>
                      <Badge variant="outline" className="font-medium">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge
                        className={`${getStatusBadge(
                          item.status
                        )} flex items-center gap-1.5 px-2.5 py-1`}
                      >
                        {getStatusIcon(item.status)}
                        <span className="text-xs font-medium">
                          {item.status}
                        </span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>Last: {item.lastMaintenance}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>Next: {item.nextMaintenance}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id, item.name)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredEquipment.length)} of{" "}
                {filteredEquipment.length} equipment
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        currentPage > 1 && handlePageChange(currentPage - 1)
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {generatePageNumbers().map(page => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => handlePageChange(page)}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        currentPage < totalPages &&
                        handlePageChange(currentPage + 1)
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      <EquipmentForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  )
}
