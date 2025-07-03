export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images Skeleton */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <div className="relative">
            <div className="h-72 sm:h-80 md:h-96 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-300 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 justify-center md:justify-start">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 w-16 flex-shrink-0 bg-gray-200 animate-pulse rounded-md"></div>
            ))}
          </div>
        </div>
        
        {/* Product Details Skeleton */}
        <div className="md:w-1/2">
          <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4 mb-4"></div>
          
          <div className="flex items-center mb-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-5 w-5 bg-gray-200 animate-pulse rounded-full"></div>
              ))}
            </div>
            <div className="h-5 w-24 bg-gray-200 animate-pulse rounded ml-2"></div>
          </div>
          
          <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3 mb-6"></div>
          
          <div className="space-y-4 mb-6">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4 mb-2">
              <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 bg-gray-200 animate-pulse rounded-full">
                  <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
                </div>
              ))}
            </div>
            
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4 mb-2 mt-4">
              <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 bg-gray-200 animate-pulse rounded-full"></div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
            <div className="h-12 bg-gray-200 animate-pulse rounded-md sm:flex-1"></div>
            <div className="h-12 bg-gray-200 animate-pulse rounded-md sm:flex-1"></div>
          </div>
        </div>
      </div>
      
      {/* Product Description Skeleton */}
      <div className="mt-12">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
        </div>
      </div>
      
      {/* Related Products Skeleton */}
      <div className="mt-12">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
                </div>
              </div>
              <div className="p-3">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}