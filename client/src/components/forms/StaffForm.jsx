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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createStaff, updateStaff } from "@/api/staffApi"
import { useEffect } from "react"

const staffSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(1, "Please select a role"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  salary: z.string().min(1, "Salary is required"),
  shiftStart: z.string().min(1, "Shift start time is required"),
  shiftEnd: z.string().min(1, "Shift end time is required"),
  status: z.string().min(1, "Please select a status")
})

export function StaffForm({ open, onOpenChange, initialValues }) {
  const isEdit = !!initialValues

  const form = useForm({
    resolver: zodResolver(staffSchema),
    defaultValues: isEdit
      ? {
          name: initialValues.name || "",
          role: initialValues.role || "",
          phone: initialValues.phone || "",
          salary: initialValues.salary || "",
          shiftStart: initialValues.shift?.start || "",
          shiftEnd: initialValues.shift?.end || "",
          status: initialValues.status || ""
        }
      : {
          name: "",
          role: "",
          phone: "",
          salary: "",
          shiftStart: "",
          shiftEnd: "",
          status: ""
        }
  })

  useEffect(() => {
    if (isEdit) {
      form.reset({
        name: initialValues.name || "",
        role: initialValues.role || "",
        phone: initialValues.phone || "",
        salary: initialValues.salary || "",
        shiftStart: initialValues.shift?.start || "",
        shiftEnd: initialValues.shift?.end || "",
        status: initialValues.status || ""
      })
    } else {
      form.reset({
        name: "",
        role: "",
        phone: "",
        salary: "",
        shiftStart: "",
        shiftEnd: "",
        status: ""
      })
    }
  }, [initialValues, isEdit, form])

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateStaff(initialValues._id, data)
        // toast.success("Staff updated successfully!");
      } else {
        await createStaff(data)
        // toast.success("Staff added successfully!");
      }
      form.reset()
      onOpenChange(false)
    } catch (error) {
      // toast.error(`Error: ${error.message}`);
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Staff Member" : "Add New Staff Member"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter staff member's full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Personal Trainer">
                        Personal Trainer
                      </SelectItem>
                      <SelectItem value="Yoga Instructor">
                        Yoga Instructor
                      </SelectItem>
                      <SelectItem value="Gym Manager">Gym Manager</SelectItem>
                      <SelectItem value="Nutritionist">Nutritionist</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Receptionist">Receptionist</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Salary</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., $4,500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="shiftStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shift Start</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shiftEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shift End</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
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
                {isEdit ? "Update Staff Member" : "Add Staff Member"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
