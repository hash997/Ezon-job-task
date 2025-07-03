'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ProductImage } from '@/types/product';

interface ProductImagesProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductImages({ images, productName }: ProductImagesProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const imageBaseUrl = 'https://ik.imagekit.io/a01bjbmceb/Prods/';
  
  // Find the main image or use the first one
  const mainImageIndex = images && images.length > 0 && images.findIndex(img => img.isMain) !== -1 
    ? images.findIndex(img => img.isMain) 
    : 0;
  
  // Set the main image as the initial image and check for mobile viewport
  useEffect(() => {
    if (images && images.length > 0) {
      setCurrentImageIndex(mainImageIndex);
    }
    
    // Check if viewport is mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [images, mainImageIndex]);

  const handlePrevImage = () => {
    if (images && images.length > 0) {
      setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
      setIsLoading(true);
    }
  };

  const handleNextImage = () => {
    if (images && images.length > 0) {
      setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      setIsLoading(true);
    }
  };
  
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsLoading(true);
  };

  if (!images || images.length === 0) {
    return (
      <div className="h-72 sm:h-80 md:h-96 bg-gray-200 flex items-center justify-center rounded-lg">
        <span className="text-gray-500">لا توجد صورة متاحة</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image container */}
      <div className="relative w-full h-72 sm:h-80 md:h-96 bg-gray-50 rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <svg className="w-10 h-10 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        
        <Image
          src={`${imageBaseUrl}${images[currentImageIndex].imageUrl}`}
          alt={`${productName} - Image ${currentImageIndex + 1}`}
          fill
          className="object-contain transition-opacity duration-300"
          style={{ opacity: isLoading ? 0 : 1 }}
          onLoad={() => setIsLoading(false)}
          priority
        />
        
        {/* Navigation arrows - larger on desktop, smaller on mobile */}
        <button 
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 sm:p-2 shadow-md hover:bg-white/90 transition-all z-20"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        
        <button 
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 sm:p-2 shadow-md hover:bg-white/90 transition-all z-20"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        
        {/* Image indicators for mobile */}
        {isMobile && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentImageIndex ? 'bg-blue-500 scale-110' : 'bg-gray-300'}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Thumbnails for desktop */}
      {!isMobile && images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative flex-shrink-0 h-16 w-16 border-2 rounded-md overflow-hidden transition-all ${index === currentImageIndex ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={`${imageBaseUrl}${image.imageUrl}`}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Custom CSS for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}