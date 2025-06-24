import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createEquipment, updateEquipment } from "@/api/equipmentApi"
import { useEffect } from "react"

const equipmentSchema = z.object({
  name: z.string().min(2, "Equipment name must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  location: z.string().min(1, "Location is required"),
  status: z.string().min(1, "Please select a status"),
  lastMaintenance: z.string().min(1, "Last maintenance date is required"),
  notes: z.string().optional()
})

export function EquipmentForm({ open, onOpenChange, initialValues }) {
  const isEdit = !!initialValues

  const form = useForm({
    resolver: zodResolver(equipmentSchema),
    defaultValues: isEdit
      ? {
          name: initialValues.name || "",
          category: initialValues.category || "",
          location: initialValues.location || "",
          status: initialValues.status || "",
          lastMaintenance: initialValues.lastMaintenanceDate
            ? initialValues.lastMaintenanceDate.slice(0, 10)
            : "",
          notes: initialValues.notes || ""
        }
      : {
          name: "",
          category: "",
          location: "",
          status: "",
          lastMaintenance: "",
          notes: ""
        }
  })

  useEffect(() => {
    if (isEdit) {
      form.reset({
        name: initialValues.name || "",
        category: initialValues.category || "",
        location: initialValues.location || "",
        status: initialValues.status || "",
        lastMaintenance: initialValues.lastMaintenanceDate
          ? initialValues.lastMaintenanceDate.slice(0, 10)
          : "",
        notes: initialValues.notes || ""
      })
    } else {
      form.reset({
        name: "",
        category: "",
        location: "",
        status: "",
        lastMaintenance: "",
        notes: ""
      })
    }
  }, [initialValues, isEdit, form])

  const onSubmit = async data => {
    try {
      if (isEdit) {
        await updateEquipment(initialValues._id, data)
        // Optionally show a toast: "Equipment updated successfully!"
      } else {
        await createEquipment(data)
        // Optionally show a toast: "Equipment added successfully!"
      }
      form.reset()
      onOpenChange(false)
    } catch (error) {
      // toast.error(`Error: ${error.message}`)
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Equipment" : "Add New Equipment"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Equipment Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Treadmill Pro X1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Cardio">Cardio</SelectItem>
                      <SelectItem value="Strength">Strength</SelectItem>
                      <SelectItem value="Functional">Functional</SelectItem>
                      <SelectItem value="Free Weights">Free Weights</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Floor 1 - Zone A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Needs Maintenance">
                        Needs Maintenance
                      </SelectItem>
                      <SelectItem value="Under Repair">Under Repair</SelectItem>
                      <SelectItem value="Out of Order">Out of Order</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="lastMaintenance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Maintenance</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="nextMaintenance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next Maintenance</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional notes about the equipment..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {isEdit ? "Update Equipment" : "Add Equipment"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
