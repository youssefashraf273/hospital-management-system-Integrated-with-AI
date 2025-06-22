"use client";

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
import { ArrowLeft, Calendar } from "lucide-react";
import { format } from "date-fns";
import { MedicalRecords } from "@/types";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";

const medicalRecordSchema = z.object({
  diagnosis: z.string().min(1, "Diagnosis is required"),
  symptoms: z.string().min(1, "Symptoms are required"),
  prescribed_medication: z.string().min(1, "Prescription is required"),
  notes: z.string().min(1, "Notes are required"),
});

type MedicalRecordFormValues = z.infer<typeof medicalRecordSchema>;

interface MedicalRecordFormProps {
  patientId: string;
  appointmentId?: string;
  record?: MedicalRecords;
  onClose: () => void;
}

export default function MedicalRecordForm({
  patientId,
  appointmentId,
  record,
  onClose,
}: MedicalRecordFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!record;

  const form = useForm<MedicalRecordFormValues>({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: {
      diagnosis: record ? record["Diagnose"] : "",
      symptoms: record ? record["Symptoms"] : "",
      prescribed_medication: record ? record["Prescribed medication"] : "",
      notes: record ? record["Additional notes"] : "",
    },
  });

  const onSubmit = async (data: MedicalRecordFormValues) => {
    setIsSubmitting(true);

    try {
      const url = isEditing
        ? `${import.meta.env.VITE_API_BASE_URL}/updateMedicalRecord/${
            record["Record id"]
          }`
        : `${import.meta.env.VITE_API_BASE_URL}/addMedicalRecord/${patientId}`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save medical record");
      }

      queryClient.invalidateQueries({ queryKey: ["patientMedicalRecords"] });
      toast.success(result.message || "Success!");
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
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <CardTitle>
            {isEditing ? "Edit Medical Record" : "Add Medical Record"}
          </CardTitle>
        </div>
        {isEditing && record["Diagnosed at"] && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>
              Created on {format(new Date(record["Diagnosed at"]), "MMMM d, yyyy")}
            </span>
          </div>
        )}
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {["diagnosis", "symptoms", "prescribed_medication", "notes"].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof MedicalRecordFormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name.replace(/_/g, " ")}</FormLabel>
                    <FormControl>
                      {field.name === "notes" ||
                      field.name === "prescribed_medication" ? (
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
              {isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Saving..."
                : isEditing
                ? "Update Record"
                : "Save Record"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
