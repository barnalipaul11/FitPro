import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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



const enrollmentSchema = z.object({
  month: z.coerce.number().min(1, "Month is required"),
  marketing_campaign: z.coerce.number().min(1, "Marketing is required"),
  enrollments_lag1: z.coerce.number().min(1, "New enrollment is required"),
})

export function EnrollmentForm({ open, onOpenChange }) {
  const form = useForm({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      month: "",
      marketing_campaign: "",
      enrollments_lag1: "",
    },
  })

  const onSubmit = async (data) => {
    try {
      await fetch(`${import.meta.env.VITE_ML_API_BASE_URL}/enrollment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((response) => {
        if (!response.ok) { 
            throw new Error("Network response was not ok")
        }
        return response.json()
        }).then((result) => {
            console.log("Prediction result:", result)
            // Handle the prediction result as needed
            // For example, you could display it in a toast or update the UI        
            alert(`Prediction: ${result.predicted_enrollment
}`)
            // You can also handle the result further, like updating state or showing a message

        }).catch((error) => {
            console.error("Error fetching prediction:", error)
        });
      // Reset form and close dialog after successful submission
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Enrollment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter month (1-12)" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marketing_campaign"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marketing Campaign (YES(1)/ NO(0)) (ID)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter marketing source ID" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enrollments_lag1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Enrollments</FormLabel>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter number of new enrollments"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4">
              Prediction
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}