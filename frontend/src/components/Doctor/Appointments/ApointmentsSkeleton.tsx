export default function MedicalRecordsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-9 w-36 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-6 space-y-4">
          <div className="flex justify-between">
            <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
