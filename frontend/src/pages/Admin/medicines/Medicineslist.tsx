"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Edit, Pill, PlusCircle, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useMedicines } from "@/hooks/useMedicines";

const ITEMS_PER_PAGE = 5;

export default function MedicinesList() {
  const navigate = useNavigate();
  const { data: medicines = [], isLoading } = useMedicines();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(medicines.length / ITEMS_PER_PAGE);
  const currentData = medicines.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDeleteClick = (id: number) => {
    setMedicineToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!medicineToDelete) return;
    setIsDeleting(true);
    try {
      // await deleteMedicine(medicineToDelete)
    } catch (error) {
      // handle error
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setMedicineToDelete(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (!isLoading && medicines.length === 0) {
    return (
      <Card className="rounded-lg border shadow-sm p-8 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mb-4">
          <Pill className="h-6 w-6 text-teal-600" />
        </div>
        <h3 className="text-lg font-medium mb-2">No medicines found</h3>
        <p className="text-gray-500 mb-6">
          Get started by adding a new medicine to the inventory.
        </p>
        <Button asChild className="bg-teal-600 hover:bg-teal-700">
          <Link to="/medicines/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Medicine
          </Link>
        </Button>
      </Card>
    );
  }

  return (
    <>
      <Card className="p-4 rounded-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medicine Name</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((medicine) => (
              <TableRow key={medicine.id}>
                <TableCell className="font-medium">{medicine.medicine_name}</TableCell>
                <TableCell className="text-right">{medicine.medicine_quantity}</TableCell>
                <TableCell className="text-right">
                  {formatPrice(medicine.medicine_price)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild className="h-8 w-8 p-0">
                      <Link to={`/medicines/${medicine.id}/edit`}>
                        <span className="sr-only">Edit</span>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      onClick={() => handleDeleteClick(medicine.id)}
                    >
                      <span className="sr-only">Delete</span>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        )}
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this medicine?
            </AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
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
