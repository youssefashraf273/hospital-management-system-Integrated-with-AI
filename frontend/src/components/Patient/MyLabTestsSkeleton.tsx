export default function PatientLabTestsListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="h-10 bg-gray-200 rounded w-full sm:w-64 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-full sm:w-64 animate-pulse"></div>
      </div>

      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-lg overflow-hidden animate-pulse">
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-1/4 ml-auto"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
