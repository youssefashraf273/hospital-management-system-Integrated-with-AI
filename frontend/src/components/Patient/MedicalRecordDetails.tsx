import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, FileText, User } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { MedicalRecords } from "@/types";

export default function MedicalRecordDetails({
  medicalRecord,
}: {
  medicalRecord?: MedicalRecords;
}) {
  const navigate = useNavigate();
  const [record, setRecord] = useState<MedicalRecords | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Find the medical record in our dummy data

    if (medicalRecord) {
      setRecord(medicalRecord);
    } else {
      setError("Medical record not found");
    }

    setLoading(false);
  }, [medicalRecord]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !record) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-red-100 p-3">
            <FileText className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="mt-4 text-lg font-medium">Medical Record Not Found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The medical record you're looking for doesn't exist or you don't have
            permission to view it.
          </p>
          <Button className="mt-4" onClick={() => navigate("/patient/medical-records")}>
            Back to Medical Records
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/patient/medical-records")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Medical Records
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <span>{record["Diagnose"]}</span>
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{format(new Date(record["Diagnosed at"]), "MMMM d, yyyy")}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Doctor Information</h3>
            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-md">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">Dr. {record["Doctor"]}</p>
                {/* <p className="text-sm text-gray-500">{record.doctor_speciality}</p> */}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Symptoms</h3>
            <p className="p-4 bg-gray-50 rounded-md">{record["Symptoms"]}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Prescribed Medication</h3>
            <p className="p-4 bg-gray-50 rounded-md whitespace-pre-line">
              {record["Prescribed medication"]}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Doctor's Notes</h3>
            <p className="p-4 bg-gray-50 rounded-md whitespace-pre-line">
              {record["Additional notes"]}
            </p>
          </div>

          <div className="text-sm text-gray-500 pt-4 border-t">
            <p>
              <span className="font-medium">Record created:</span>{" "}
              {format(new Date(record["Diagnosed at"]), "MMMM d, yyyy 'at' h:mm a")}
            </p>
            {/* {record.updated_at && record.updated_at !== record["Diagnosed at"] && (
              <p>
                <span className="font-medium">Last updated:</span>{" "}
                {format(new Date(record.updated_at), "MMMM d, yyyy 'at' h:mm a")}
              </p>
            )} */}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
