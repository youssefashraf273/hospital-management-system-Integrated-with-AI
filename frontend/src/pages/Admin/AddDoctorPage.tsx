"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useCreateDoctor } from "@/hooks/useDoctors";
import { toast } from "sonner";
import { AxiosError } from "axios";

const doctorFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z.string().min(6, "Password must be at least 6 characters"),
    speciality: z.string().min(1, "Speciality is required"),
    phone: z
      .string()
      .min(11, "Phone number must be 11 digits")
      .max(11, "Phone number must be 11 digits"),
    from: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, "Time must be HH:mm:ss"),
    to: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, "Time must be HH:mm:ss"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export type DoctorFormData = z.infer<typeof doctorFormSchema>;

export default function AddDoctorForm() {
  const form = useForm<DoctorFormData>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      speciality: "",
      phone: "",
      from: "09:00:00",
      to: "17:00:00",
    },
  });

  const { mutateAsync: createDoctor, isPending } = useCreateDoctor();

  const onSubmit = async (data: DoctorFormData) => {
    try {
      await createDoctor(data);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<Record<string, string[]>>;
      const serverErrors = axiosError?.response?.data;

      if (serverErrors) {
        Object.keys(serverErrors).forEach((field) => {
          form.setError(field as keyof DoctorFormData, {
            type: "server",
            message: serverErrors[field][0],
          });
        });
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <Card className="w-full mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Add New Doctor</CardTitle>
        <CardDescription>
          Create a new doctor profile with their personal and professional details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. Jane Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="doctor@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormDescription>Must be at least 6 characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormDescription>Must match the password</FormDescription>
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
                      <Input placeholder="12345678901" {...field} />
                    </FormControl>
                    <FormDescription>11 digits required</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="speciality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speciality</FormLabel>
                  <FormControl>
                    <Input placeholder="Cardiology, Pediatrics, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Working Hours (From)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="time" step="1" className="pl-8" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Working Hours (To)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="time" step="1" className="pl-8" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    Creating...
                  </span>
                ) : (
                  "Create Doctor Profile"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
