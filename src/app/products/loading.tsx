// app/products/loading.tsx

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full min-h-[200px]">
      {/* You can style this as you wish, add spinner, skeleton, etc */}
      <span className="text-gray-500 text-lg">Loading products...</span>
    </div>
  );
}
