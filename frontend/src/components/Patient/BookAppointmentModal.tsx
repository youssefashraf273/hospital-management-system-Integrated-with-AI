import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { authAxios } from "@/lib/authAxios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Doctor } from "@/types";

import CardScanner from "./cardScanner";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";

// import "react-datepicker/dist/react-datepicker.css";
// import { forwardRef } from "react";
// const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
//   <Input onClick={onClick} ref={ref} value={value} readOnly className="cursor-pointer" />
// ));
// CustomInput.displayName = "CustomInput";

const appointmentFormSchema = z.object({
  time: z
    .string({ required_error: "Please enter a time" })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Time must be in 24-hour format (HH:MM)",
    }),

  reason: z
    .string()
    .min(5, "Reason must be at least 5 characters")
    .max(500, "Reason must be less than 500 characters"),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

export default function BookAppointmentModal({
  isOpen,
  onClose,
  doctor,
}: BookAppointmentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      time: "",
      reason: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        time: "",
        reason: "",
      });
    }
  }, [isOpen, doctor, form]);

  const onSubmit = async (data: AppointmentFormValues): Promise<number | null> => {
    setIsSubmitting(true);
    try {
      const res = await authAxios.post(`/appointments/book/${doctor?.["Doctor id"]}`, {
        doctor_id: doctor?.["Doctor id"],
        reason: data.reason,
        time: data.time,
      });

      toast.success("Appointment booked successfully!");
      return res.data["Your number is "] ?? null; // ensure your backend returns this
    } catch (err: unknown) {
      const axiosError = err as AxiosError<Record<string, string[]>>;
      const serverErrors = axiosError?.response?.data;

      if (serverErrors) {
        Object.keys(serverErrors).forEach((field) => {
          form.setError(field as keyof AppointmentFormValues, {
            type: "server",
            message: serverErrors[field][0],
          });
        });
        toast.error("Please make sure all fields are filled.");
      } else {
        toast.error("An unexpected error occurred.");
      }
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const [appointmentId, setAppointmentId] = useState<number | null>(null);

  const handleProcessPayment = async () => {
    if (!appointmentId) {
      toast.error("Appointment not found.");
      return;
    }

    setIsProcessing(true);

    try {
      const res = await authAxios.post(`/processPayment`, {
        id: appointmentId,
        card_holder_name: paymentInfo.cardHolder,
        card_number: paymentInfo.cardNumber,
        card_expire_date: paymentInfo.expiryDate,
        card_cvv: paymentInfo.cvv,
        transaction_amount: 200, // You can set dynamically based on logic
        simulate_success: true,
      });

      toast.success(res.data.message || "Payment processed successfully!");
      navigate("/patient/appointments");
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      toast.error(
        axiosError.response?.data?.message || "Payment failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBookAppointment = async () => {
    if (!time || !reason) {
      toast.error("Please fill in all required fields");
      return;
    }

    const result = await onSubmit({ time, reason });
    if (result) {
      setAppointmentId(result);
      setShowPayment(true);
    }
  };

  const handleScanCard = () => {
    setIsScanning(true);
  };

  const handleCardScanned = (cardData) => {
    setIsScanning(false);
    setPaymentInfo({
      cardNumber: cardData.cardNumber || "",
      cardHolder: cardData.cardHolder || "",
      expiryDate: cardData.expiryDate || "",
      cvv: "",
    });
  };

  // const handleProcessPayment = async () => {
  //   setIsProcessing(true);
  //   onSubmit();
  //   // Simulate payment processing
  //   await new Promise((resolve) => setTimeout(resolve, 3000));

  //   setIsProcessing(false);
  //   navigate("/patient/appointments");
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book Appointment with Dr. {doctor?.Name}</DialogTitle>
            <DialogDescription>
              Select a date and time for your appointment with Dr.{doctor?.Name},
              pharmacists specialist.
            </DialogDescription>
          </DialogHeader>

          {!showPayment ? (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time (24-hour format)</Label>
                <Input
                  id="time"
                  placeholder="HH:MM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Textarea
                  id="reason"
                  placeholder="Please briefly describe the reason for your appointment"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleBookAppointment}>Book Appointment</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="flex gap-2">
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentInfo.cardNumber}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                    }
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleScanCard}
                    title="Scan card with camera"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardHolder">Card Holder Name</Label>
                <Input
                  id="cardHolder"
                  placeholder="John Doe"
                  value={paymentInfo.cardHolder}
                  onChange={(e) =>
                    setPaymentInfo({ ...paymentInfo, cardHolder: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={paymentInfo.expiryDate}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    type="password"
                    value={paymentInfo.cvv}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowPayment(false)}>
                  Back
                </Button>
                <Button onClick={handleProcessPayment} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Pay & Confirm"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {isScanning && (
        <Dialog open={isScanning} onOpenChange={setIsScanning}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Scan Your Credit Card</DialogTitle>
              <DialogDescription>
                Position your card within the frame and hold steady.
              </DialogDescription>
            </DialogHeader>
            <CardScanner onCardScanned={handleCardScanned} />
            <Button variant="outline" onClick={() => setIsScanning(false)}>
              Cancel
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
