'use client';

export default function Error() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Error Loading Posts</h2>
      <p className="text-gray-600">
        There was an error loading the blog posts. Please try again later.
      </p>
    </div>
  );
} 