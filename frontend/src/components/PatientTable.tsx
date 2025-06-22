import { Button } from "@/components/ui/button";

const patients = [
  {
    id: 1,
    name: "Adam H",
    avatar: "/placeholder.svg?height=40&width=40",
    address: "4 Shirley Ave, West Chicago, IL 60185",
    admitted: "May 18, 2021",
    discharge: "May 18, 2021",
    progress: 75,
    status: "admit",
  },
];

export default function PatientTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-3 text-left font-medium text-sm">PATIENTS</th>
            <th className="px-4 py-3 text-left font-medium text-sm">ADDRESS</th>
            <th className="px-4 py-3 text-left font-medium text-sm">ADMITTED</th>
            <th className="px-4 py-3 text-left font-medium text-sm">DISCHARGE</th>
            <th className="px-4 py-3 text-left font-medium text-sm">PROGRESS</th>
            <th className="px-4 py-3 text-left font-medium text-sm">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="border-b">
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={patient.avatar || "/placeholder.svg"}
                    alt={patient.name}
                    className="w-10 h-10 rounded-full bg-gray-200"
                  />
                  <span>{patient.name}</span>
                </div>
              </td>
              <td className="px-4 py-4 text-sm">{patient.address}</td>
              <td className="px-4 py-4 text-sm">{patient.admitted}</td>
              <td className="px-4 py-4 text-sm">{patient.discharge}</td>
              <td className="px-4 py-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-red-500 h-2.5 rounded-full"
                    style={{ width: `${patient.progress}%` }}
                  ></div>
                </div>
              </td>
              <td className="px-4 py-4">
                <Button
                  size="sm"
                  className={
                    patient.status === "admit"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-green-500 hover:bg-green-600"
                  }
                >
                  {patient.status === "admit" ? "Admit" : "Discharge"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
