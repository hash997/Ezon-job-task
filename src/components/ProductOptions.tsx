"use client";

import { useState, useEffect } from "react";
import { ProductOption } from "@/types/product";

interface ProductOptionsProps {
  options: ProductOption[];
}

export default function ProductOptions({ options }: ProductOptionsProps) {
  // Create a state object to track selected variant for each option
  const [selectedVariants, setSelectedVariants] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Initialize selected variants with first option of each type
  useEffect(() => {
    if (options && options.length > 0) {
      const initialSelections: Record<number, number> = {};
      options.forEach((option) => {
        if (option.variants && option.variants.length > 0) {
          initialSelections[option.id] = option.variants[0].id;
        }
      });
      setSelectedVariants(initialSelections);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [options]);

  const handleVariantSelect = (optionId: number, variantId: number) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [optionId]: variantId,
    }));
  };

  if (!options || options.length === 0) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-10 h-10 rounded-full bg-gray-200"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {options.map((option) => (
        <div key={option.id} className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base sm:text-lg font-medium rtl:font-[system-ui]">{option.name}</h3>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {option.variants.map((variant) => {
              const isSelected = selectedVariants[option.id] === variant.id;

              // If this is a color option (has colorCode)
              if (variant.colorCode) {
                return (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantSelect(option.id, variant.id)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 relative ${
                      isSelected ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-200"
                    } transition-all duration-200 hover:scale-110`}
                    style={{ backgroundColor: variant.colorCode }}
                    title={variant.name}
                    aria-label={`Select color: ${variant.name}`}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-4 h-4 drop-shadow-md"
                        >
                          <path
                            fillRule="evenodd"
                            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              }

              // For other options like size
              return (
                <button
                  key={variant.id}
                  onClick={() => handleVariantSelect(option.id, variant.id)}
                  className={`min-w-8 h-8 sm:min-w-10 sm:h-10 px-3 rounded-full border text-sm ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white font-medium"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  } transition-all duration-200`}
                  aria-label={`Select ${option.name}: ${variant.value}`}
                >
                  {variant.value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="pt-2 text-xs text-gray-500">* يرجى اختيار الخيارات المناسبة للمنتج</div>
    </div>
  );
}
