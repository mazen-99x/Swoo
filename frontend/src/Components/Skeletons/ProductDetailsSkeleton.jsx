export const ProductDetailsSkeleton = () => (
  <div className="min-h-screen bg-(--white-color) dark:bg-(--dark-alt-color) animate-pulse my-6">
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-6">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
        {/* Left: Image Skeleton */}
        <div className="lg:w-2/5">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl w-full aspect-square mb-4"></div>
          <div className="hidden sm:flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"
              ></div>
            ))}
          </div>
        </div>

        {/* Right: Info Skeleton */}
        <div className="lg:w-3/5 space-y-6">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>{" "}
            {/* Brand */}
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>{" "}
            {/* Title */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>{" "}
            {/* Rating */}
          </div>
          <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>{" "}
          {/* Price Box */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
          {/* Buttons Skeleton */}
          <div className="hidden md:flex gap-4">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-32"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile Bottom Bar Skeleton */}
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 border-t flex gap-4">
      <div className="w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);
