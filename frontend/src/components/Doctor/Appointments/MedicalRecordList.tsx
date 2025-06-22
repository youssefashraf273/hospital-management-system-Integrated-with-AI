"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FilePlus, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import MedicalRecordForm from "./MedicalRecordForm";
import { MedicalRecords } from "@/types";

interface MedicalRecordsListProps {
  medicalRecords: MedicalRecords[];
  patientId: string;
  appointmentId: string;
  doctorName: string;
}
export default function MedicalRecordsList({
  medicalRecords,
  patientId,
  appointmentId,
  doctorName,
}: MedicalRecordsListProps) {
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (recordId: string) => {
    setRecordToDelete(recordId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {};

  const handleAddRecord = () => {
    setIsAddingRecord(true);
    setEditingRecord(null);
  };

  const handleEditRecord = (record: any) => {
    setEditingRecord(record);
    setIsAddingRecord(false);
  };

  const handleFormClose = () => {
    setIsAddingRecord(false);
    setEditingRecord(null);
  };

  if (isAddingRecord) {
    return (
      <MedicalRecordForm
        patientId={patientId}
        appointmentId={appointmentId}
        onClose={handleFormClose}
      />
    );
  }

  if (editingRecord) {
    return (
      <MedicalRecordForm
        patientId={patientId}
        appointmentId={appointmentId}
        record={editingRecord}
        onClose={handleFormClose}
      />
    );
  }

  if (medicalRecords.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-gray-100 p-3">
            <FileText className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No medical records found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add a new medical record for this patient.
          </p>
          <Button
            onClick={handleAddRecord}
            className="mt-4 bg-teal-600 hover:bg-teal-700"
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Add Medical Record
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          Showing {medicalRecords.length} medical record
          {medicalRecords.length !== 1 ? "s" : ""}
        </div>
        <Button onClick={handleAddRecord} className="bg-teal-600 hover:bg-teal-700">
          <FilePlus className="mr-2 h-4 w-4" />
          Add Medical Record
        </Button>
      </div>

      <div className="space-y-4">
        {medicalRecords.map((record) => (
          <Card key={record["Record id"]}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-teal-600" />
                  {format(record["Diagnosed at"], "MMMM d, yyyy")}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditRecord(record)}
                  >
                    <span className="sr-only">Edit</span>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteClick(record["Record id"])}
                  >
                    <span className="sr-only">Delete</span>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {record["Diagnose"] && (
                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">Diagnosis</h4>
                  <p>{record["Diagnose"]}</p>
                </div>
              )}

              {record["Prescribed medication"] && (
                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">Prescription</h4>
                  <p>{record["Prescribed medication"]}</p>
                </div>
              )}

              {record["Additional notes"] && (
                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">Notes</h4>
                  <p className="text-gray-700">{record["Additional notes"]}</p>
                </div>
              )}

              {doctorName && (
                <div className="text-sm text-gray-500 pt-2">
                  Recorded by: {doctorName}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this record?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the medical
              record from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? (
                <>
                  <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
