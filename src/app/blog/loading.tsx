export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Latest Articles</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="animate-pulse bg-gray-100 rounded-lg p-6 h-48"
          />
        ))}
      </div>
    </div>
  );
} 