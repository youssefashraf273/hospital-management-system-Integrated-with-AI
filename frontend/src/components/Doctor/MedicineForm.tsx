import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pill, DollarSign, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Medicine } from "@/types";

const medicineSchema = z.object({
  name: z.string().min(1, "Medicine name is required"),
  quantity: z.coerce.number().int().min(0, "Quantity must be a positive number"),
  price: z.coerce.number().min(1, "Price must be a positive number"),
});

export type MedicineFormData = z.infer<typeof medicineSchema>;

interface MedicineFormProps {
  initialData?: Medicine;
  isLoading?: boolean;
  onSubmit: (data: MedicineFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

export default function MedicineForm({
  initialData,
  isLoading,
  onSubmit,
  onCancel,
  submitLabel = "Submit",
}: MedicineFormProps) {
  const form = useForm<MedicineFormData>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      name: initialData?.medicine_name || "",
      quantity: initialData?.medicine_quantity || 0,
      price: initialData?.medicine_price || 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6 pt-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medicine Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Pill className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter medicine name"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Package className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type="number" className="pl-10" placeholder="0" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>Number of units in stock</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        step="1"
                        className="pl-10"
                        placeholder="0.00"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Price per unit in USD</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                {submitLabel}...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
