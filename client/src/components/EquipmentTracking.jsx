import { useEffect, useState } from "react";
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
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EquipmentForm } from "@/components/forms/EquipmentForm";
import { PredictFailureForm } from "@/components/forms/PredictFailureForm";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DeletePopup } from "@/utils/deletepopup";

export function EquipmentTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [equipment, setEquipment] = useState([]);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [predictOpen, setPredictOpen] = useState(false);
  const [predictEquipment, setPredictEquipment] = useState(null);
  const [predictResult, setPredictResult] = useState(null);
  const itemsPerPage = 8;
  const [deletePopup, setDeletePopup] = useState({
    open: false,
    equipmentId: null,
    equipmentName: "",
  });
  //const { toast } = useToast()

  const handleEdit = (equipmentId) => {
    console.log("Editing equipment:", equipmentId);
    const machine = equipment.find((eq) => eq._id == equipmentId);
    setEditingEquipment(machine);
    setIsFormOpen(true);
    // toast({
    //   title: "Edit Equipment",
    //   description: "Edit functionality will be implemented here"
    // })
  };

  const handleDelete = (equipmentId, equipmentName) => {
    console.log("Deleting equipment:", equipmentId);
    setDeletePopup({ open: true, equipmentId, equipmentName });
    // toast({})
  };
  const confirmDelete = async () => {
    const { equipmentId, equipmentName } = deletePopup;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/equipment/${equipmentId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete equipment");
      setEquipment(equipment.filter((eq) => eq._id !== equipmentId));
      // toast({
      //   title: "Success",
      //   description: `${equipmentName} has been deleted successfully`
      // })
    } catch (error) {
      console.error("Error deleting equipment:", error);
      // toast({
      //   title: "Error",
      //   description: "Failed to delete equipment"
      // })
    } finally {
      setDeletePopup({ open: false, equipmentId: null, equipmentName: "" });
    }
  };

  const handlePredict = async (equipmentId) => {
    setPredictEquipment(equipmentId);
    setPredictResult(null); // Reset previous result
    setPredictOpen(true);
  };

  const submitPredictForm = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/predict-failure`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ equipmentId: predictEquipment, ...data }),
        }
      );
      if (!response.ok) throw new Error("Prediction request failed");
      const result = await response.json();
      setPredictResult(result);
      // Optionally show a toast notification here
    } catch (error) {
      console.error("Error during prediction:", error);
      setPredictResult({ error: error.message });
    }
  };

  // Show toast or popup for result
  useEffect(() => {
    if (predictResult) {
      alert(
        predictResult.error
          ? `Prediction failed: ${predictResult.error}`
          : `Prediction: ${predictResult.prediction || JSON.stringify(predictResult)}`
      );
      setPredictResult(null);
    }
  }, [predictResult]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Good":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Needs Maintenance":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "Under Repair":
        return <Settings className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      Good: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200",
      "Needs Maintenance":
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200",
      "Under Repair":
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200",
    };
    return variants[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/equipment`
        );
        if (!response.ok) throw new Error("Failed to fetch equipment");
        const data = await response.json();
        setEquipment(data); // Set the fetched equipment data
      } catch (error) {
        console.error("Error fetching equipment data:", error);
        // Optionally show a toast or notification here
      }
    };
    fetchEquipment();
  }, [isFormOpen]); // Re-fetch when the form is opened

  const filteredEquipment = equipment.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredEquipment.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEquipment = filteredEquipment.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

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
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
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
            {currentEquipment.map((item) => (
              <Card
                key={item._id} // <-- use _id here
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
                      <span>
                        Last:{" "}
                        {item.lastMaintenanceDate
                          ? new Date(item.lastMaintenanceDate).toLocaleDateString()
                          : "N/A"}
                      </span>
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
                      onClick={() => handleEdit(item._id)} // <-- use _id here
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item._id, item.name)} // <-- use _id here
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePredict(item.lastMaintenanceDate)} // <-- use _id here
                      className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Settings className="h-4 w-4" />
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

                  {generatePageNumbers().map((page) => (
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

      <EquipmentForm
        key={editingEquipment ? editingEquipment._id : "new"}
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingEquipment(null);
        }}
        initialValues={editingEquipment}
      />
      <PredictFailureForm
        open={predictOpen}
        onOpenChange={setPredictOpen}
        equipment={predictEquipment}
        onResult={setPredictResult}
      />
      <DeletePopup
        open={deletePopup.open}
        title="Delete Equipment"
        message={`Are you sure you want to delete ${deletePopup.equipmentName}?`}
        onConfirm={confirmDelete}
        onCancel={() =>
          setDeletePopup({ open: false, equipmentId: null, equipmentName: "" })
        }
      />
    </div>
  );
}
