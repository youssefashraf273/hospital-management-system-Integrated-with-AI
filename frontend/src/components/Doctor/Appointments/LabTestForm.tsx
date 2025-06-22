import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const labTestSchema = z.object({
  test_name: z.string().min(1),
  test_description: z.string().min(1),
  test_category: z.string().min(1),
  test_reference_range: z.string().min(1),
  test_value: z.string().min(1),
  advices: z.string().min(1),
});

type LabTestFormValues = z.infer<typeof labTestSchema>;

interface LabTestFormProps {
  patientId: string;
  onClose: () => void;
}

export default function LabTestForm({ patientId, onClose }: LabTestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LabTestFormValues>({
    resolver: zodResolver(labTestSchema),
    defaultValues: {
      test_name: "",
      test_description: "",
      test_category: "",
      test_reference_range: "",
      test_value: "",
      advices: "",
    },
  });

  const onSubmit = async (data: LabTestFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/addLabtests/${patientId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create lab test");
      }

      toast.success(result.message || "Lab test added successfully");
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Lab Test</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {[
              "test_name",
              "test_description",
              "test_category",
              "test_reference_range",
              "test_value",
              "advices",
            ].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof LabTestFormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name.replace(/_/g, " ")}</FormLabel>
                    <FormControl>
                      {["test_description", "advices"].includes(field.name) ? (
                        <Textarea
                          placeholder={`Enter ${field.name.replace(/_/g, " ")}`}
                          className="min-h-[100px]"
                          {...field}
                        />
                      ) : (
                        <Input
                          placeholder={`Enter ${field.name.replace(/_/g, " ")}`}
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Lab Test"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
