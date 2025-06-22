import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Calendar, FileText, User } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

// Mock data based on the provided database schema
const dummyLabTests = [
  {
    id: "1",
    test_name: "Complete Blood Count (CBC)",
    test_description:
      "Measures several components and features of your blood including red and white blood cells, platelets, hemoglobin, and hematocrit.",
    test_category: "Hematology",
    test_reference_range:
      "WBC: 4.5-11.0 x10^9/L, RBC: 4.5-5.9 x10^12/L, Hemoglobin: 13.5-17.5 g/dL",
    test_value: "WBC: 7.5 x10^9/L, RBC: 5.2 x10^12/L, Hemoglobin: 14.2 g/dL",
    advices: "Your results are within normal range. Continue with regular check-ups.",
    doctor_id: "d1",
    user_id: "p1",
    created_at: "2025-05-05T10:30:00",
    updated_at: "2025-05-05T14:20:00",
    medical_record_id: null,
    // Additional fields for UI display
    doctor_name: "Jane Wilson",
    doctor_speciality: "Cardiology",
    is_abnormal: false,
    // Parsed results for table display
    parsed_results: [
      {
        name: "White Blood Cell Count",
        value: "7.5",
        unit: "x10^9/L",
        normal_range: "4.5-11.0",
        is_abnormal: false,
      },
      {
        name: "Red Blood Cell Count",
        value: "5.2",
        unit: "x10^12/L",
        normal_range: "4.5-5.9",
        is_abnormal: false,
      },
      {
        name: "Hemoglobin",
        value: "14.2",
        unit: "g/dL",
        normal_range: "13.5-17.5",
        is_abnormal: false,
      },
    ],
  },
  {
    id: "2",
    test_name: "Lipid Panel",
    test_description:
      "Measures the amount of cholesterol and triglycerides in your blood to assess risk of heart disease.",
    test_category: "Chemistry",
    test_reference_range:
      "Total Cholesterol: <200 mg/dL, LDL: <130 mg/dL, HDL: >40 mg/dL, Triglycerides: <150 mg/dL",
    test_value:
      "Total Cholesterol: 240 mg/dL, LDL: 155 mg/dL, HDL: 45 mg/dL, Triglycerides: 180 mg/dL",
    advices:
      "Your cholesterol levels are elevated. Consider dietary changes, increased exercise, and follow-up with your doctor.",
    doctor_id: "d1",
    user_id: "p1",
    created_at: "2025-04-20T09:15:00",
    updated_at: "2025-04-20T11:30:00",
    medical_record_id: "3",
    doctor_name: "Jane Wilson",
    doctor_speciality: "Cardiology",
    is_abnormal: true,
    parsed_results: [
      {
        name: "Total Cholesterol",
        value: "240",
        unit: "mg/dL",
        normal_range: "<200",
        is_abnormal: true,
      },
      {
        name: "LDL Cholesterol",
        value: "155",
        unit: "mg/dL",
        normal_range: "<130",
        is_abnormal: true,
      },
      {
        name: "HDL Cholesterol",
        value: "45",
        unit: "mg/dL",
        normal_range: ">40",
        is_abnormal: false,
      },
      {
        name: "Triglycerides",
        value: "180",
        unit: "mg/dL",
        normal_range: "<150",
        is_abnormal: true,
      },
    ],
  },
  {
    id: "3",
    test_name: "Comprehensive Metabolic Panel",
    test_description:
      "Measures the levels of 14 different substances in your blood to provide information about your body's chemical balance and metabolism.",
    test_category: "Chemistry",
    test_reference_range:
      "Glucose: 70-99 mg/dL, Calcium: 8.5-10.5 mg/dL, Sodium: 135-145 mmol/L",
    test_value: "Glucose: 95 mg/dL, Calcium: 9.5 mg/dL, Sodium: 140 mmol/L",
    advices:
      "All values are within normal range. Continue with your current health regimen.",
    doctor_id: "d2",
    user_id: "p1",
    created_at: "2025-03-15T14:45:00",
    updated_at: "2025-03-15T16:30:00",
    medical_record_id: null,
    doctor_name: "Michael Brown",
    doctor_speciality: "Internal Medicine",
    is_abnormal: false,
    parsed_results: [
      {
        name: "Glucose",
        value: "95",
        unit: "mg/dL",
        normal_range: "70-99",
        is_abnormal: false,
      },
      {
        name: "Calcium",
        value: "9.5",
        unit: "mg/dL",
        normal_range: "8.5-10.5",
        is_abnormal: false,
      },
      {
        name: "Sodium",
        value: "140",
        unit: "mmol/L",
        normal_range: "135-145",
        is_abnormal: false,
      },
    ],
  },
  {
    id: "4",
    test_name: "Thyroid Function Test",
    test_description:
      "Measures how well your thyroid gland is working by checking thyroid hormone levels in your blood.",
    test_category: "Endocrinology",
    test_reference_range:
      "TSH: 0.4-4.0 mIU/L, Free T4: 0.8-1.8 ng/dL, Free T3: 2.3-4.2 pg/mL",
    test_value: "TSH: 5.5 mIU/L, Free T4: 0.8 ng/dL, Free T3: 2.8 pg/mL",
    advices:
      "Your TSH is elevated, suggesting possible hypothyroidism. Follow up with an endocrinologist for further evaluation.",
    doctor_id: "d3",
    user_id: "p1",
    created_at: "2025-02-10T11:00:00",
    updated_at: "2025-02-10T13:15:00",
    medical_record_id: "5",
    doctor_name: "Sarah Williams",
    doctor_speciality: "Endocrinology",
    is_abnormal: true,
    parsed_results: [
      {
        name: "TSH",
        value: "5.5",
        unit: "mIU/L",
        normal_range: "0.4-4.0",
        is_abnormal: true,
      },
      {
        name: "Free T4",
        value: "0.8",
        unit: "ng/dL",
        normal_range: "0.8-1.8",
        is_abnormal: false,
      },
      {
        name: "Free T3",
        value: "2.8",
        unit: "pg/mL",
        normal_range: "2.3-4.2",
        is_abnormal: false,
      },
    ],
  },
  {
    id: "5",
    test_name: "Urinalysis",
    test_description:
      "Analyzes the content of your urine to detect and manage a wide range of disorders.",
    test_category: "Urology",
    test_reference_range:
      "Color: Yellow, Clarity: Clear, pH: 4.5-8.0, Specific Gravity: 1.005-1.030",
    test_value: "Color: Yellow, Clarity: Clear, pH: 6.0, Specific Gravity: 1.020",
    advices: "Your urinalysis results are normal. No further action needed at this time.",
    doctor_id: "d2",
    user_id: "p1",
    created_at: "2024-12-05T13:30:00",
    updated_at: "2024-12-05T15:45:00",
    medical_record_id: null,
    doctor_name: "Michael Brown",
    doctor_speciality: "Internal Medicine",
    is_abnormal: false,
    parsed_results: [
      {
        name: "Color",
        value: "Yellow",
        unit: "",
        normal_range: "Yellow",
        is_abnormal: false,
      },
      {
        name: "Clarity",
        value: "Clear",
        unit: "",
        normal_range: "Clear",
        is_abnormal: false,
      },
      { name: "pH", value: "6.0", unit: "", normal_range: "4.5-8.0", is_abnormal: false },
      {
        name: "Specific Gravity",
        value: "1.020",
        unit: "",
        normal_range: "1.005-1.030",
        is_abnormal: false,
      },
    ],
  },
];

export default function MyLabTestDetails({ testId }: { testId: string }) {
  const navigate = useNavigate();
  const [labTest, setLabTest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Find the lab test in our dummy data
    const test = dummyLabTests.find((test) => test.id === testId);

    if (test) {
      setLabTest(test);
    } else {
      setError("Lab test not found");
    }

    setLoading(false);
  }, [testId]);

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

  if (error || !labTest) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-red-100 p-3">
            <FileText className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="mt-4 text-lg font-medium">Lab Test Not Found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The lab test you're looking for doesn't exist or you don't have permission to
            view it.
          </p>
          <Button className="mt-4" onClick={() => navigate("/patient/lab-tests")}>
            Back to Lab Tests
          </Button>
        </CardContent>
      </Card>
    );
  }

  const abnormalCount = labTest.parsed_results.filter(
    (result: any) => result.is_abnormal
  ).length;

  return (
    <>
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/patient/lab-tests")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Lab Tests
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <span>{labTest.test_name}</span>
                {labTest.is_abnormal && (
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                    Abnormal
                  </Badge>
                )}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{format(new Date(labTest.created_at), "MMMM d, yyyy")}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-1">Test Category</h4>
              <p>{labTest.test_category}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-1">Ordered By</h4>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <p>Dr. {labTest.doctor_name}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-1">Medical Record</h4>
              <p>
                {labTest.medical_record_id
                  ? `#${labTest.medical_record_id}`
                  : "Not linked to a record"}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm text-gray-500 mb-1">Test Description</h4>
            <p className="text-gray-900">{labTest.test_description}</p>
          </div>

          {labTest.is_abnormal && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
              <p className="font-medium">Abnormal Results</p>
              <p className="text-sm mt-1">
                This test contains {abnormalCount} result{abnormalCount !== 1 ? "s" : ""}{" "}
                outside the normal range. Please consult with your healthcare provider to
                discuss these results.
              </p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-medium mb-3">Test Results</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Normal Range</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {labTest.parsed_results.map((result: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{result.name}</TableCell>
                    <TableCell>
                      {result.value} {result.unit}
                    </TableCell>
                    <TableCell>{result.normal_range}</TableCell>
                    <TableCell>
                      {result.is_abnormal ? (
                        <Badge
                          variant="outline"
                          className="bg-amber-100 text-amber-800 hover:bg-amber-100"
                        >
                          Abnormal
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 hover:bg-green-100"
                        >
                          Normal
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-800">
            <p className="font-medium">Doctor's Advice</p>
            <p className="text-sm mt-1">{labTest.advices}</p>
          </div>

          <div className="text-sm text-gray-500 pt-4 border-t">
            <p className="font-medium mb-2">Note:</p>
            <p>
              These results are for informational purposes only and should be reviewed
              with your healthcare provider. Reference ranges may vary between
              laboratories and based on individual factors.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
