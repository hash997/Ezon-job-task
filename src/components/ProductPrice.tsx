import React from 'react';

interface ProductPriceProps {
  salePrice: number;
  comparePrice?: number;
}

export default function ProductPrice({ salePrice, comparePrice }: ProductPriceProps) {
  const hasDiscount = comparePrice && comparePrice > salePrice;
  
  // Calculate discount percentage if there's a discount
  const discountPercentage = hasDiscount
    ? Math.round(((comparePrice! - salePrice) / comparePrice!) * 100)
    : null;
  
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2">
        <span className="text-xl sm:text-2xl font-bold text-red-600 rtl:font-[system-ui]">
          د.ل {salePrice.toLocaleString()}
        </span>
        
        {hasDiscount && (
          <span className="text-base sm:text-lg text-gray-500 line-through rtl:font-[system-ui]">
            د.ل {comparePrice!.toLocaleString()}
          </span>
        )}
      </div>
      
      {discountPercentage && (
        <div className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
          خصم {discountPercentage}%
        </div>
      )}
    </div>
  );
}