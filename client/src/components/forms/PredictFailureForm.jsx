import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export function PredictFailureForm({ open, onOpenChange, equipment, onResult }) {

  const form = useForm({
    defaultValues: {
      running_hours: "",
      load: "",
      age: "",
      days_since_last_maintenance: "",
    },
  });
 
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_ML_API_BASE_URL}/maintenance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          days_since_last_maintenance: 40, // Example value, replace with actual logic if needed
        }),
      });
      const result = await response.json();
      onResult(result);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      onResult({ error: "Prediction failed" });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Predict Equipment Failure</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="running_hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Running Date (days)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter running days" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="load"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Load (%)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter load" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age (years)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter age" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Last Maintenance</FormLabel>
              <div className="mt-1 text-slate-700 dark:text-slate-200">
                {equipment
                  ? new Date(equipment).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">Predict</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}