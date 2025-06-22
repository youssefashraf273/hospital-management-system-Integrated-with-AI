import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import MedicalRecordForm from "@/components/Doctor/Appointments/MedicalRecordForm";
import { toast } from "sonner";

export default function UpdateMedicalRecordPage() {
  const { recordId, patientId } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recordId) return;

    const fetchRecord = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/doctor/medicalrecords/${patientId}`,
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to load record");

        console.log("sss", data, recordId);
        console.log(data["Medical Records"]);
        setRecord(
          data["Medical Records"].find(
            (r: any) => String(r["Record id"]) === String(recordId)
          )
        );
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [recordId]);

  if (loading) return <div className="p-4">Loading...</div>;

  if (!record) return <div className="p-4 text-red-500">Record not found</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
          <Link to={`/doctor/patients/${patientId}/medical-records`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Medical Record</h1>
      </div>

      <MedicalRecordForm
        patientId={patientId!}
        record={record}
        onClose={() => navigate(`/doctor/patients/${patientId}/medical-records`)}
      />
    </div>
  );
}
