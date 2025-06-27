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
  current_month: z.coerce.number().min(1, "Month is required"),
  marketing_campaign: z.coerce.number().min(0, "Marketing is required"),
  current_enrollment: z.coerce.number().min(1, "New enrollment is required"),
  months_to_predict: z.coerce.number().min(1, "Predict month is required")
})

export function EnrollmentForm({ open, onOpenChange, onPrediction }) {
  const form = useForm({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      current_month: "",
      marketing_campaign: "",
      current_enrollment: "",
      months_to_predict: "",
    },
  })

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_ML_API_BASE_URL}/enrollment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
     
      // Pass both input and prediction to parent
      if (onPrediction) {
        onPrediction({
          ...data,
          predicted_enrollment: result.predicted_new_enrollment,
        });
      }

      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forecasting New Customer</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="current_month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Month</FormLabel>
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
                  <FormLabel>Marketing Campaign</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter marketing source ID" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="current_enrollment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Enrollment</FormLabel>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter number of new enrollments"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="months_to_predict"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month To Predict</FormLabel>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter months to predict (1-12)"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4 w-full">
              Prediction
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}