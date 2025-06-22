import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function PatientAppointmentsListSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r bg-gray-50">
                <div className="flex flex-col items-center md:items-start">
                  <Skeleton className="h-6 w-36 mb-1" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>

              <div className="p-6 col-span-1 md:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between p-4 bg-gray-50">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-40" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
