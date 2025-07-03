import Image from 'next/image';
import Link from 'next/link';
import { RelatedProduct } from '@/types/product';

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const imageBaseUrl = 'https://ik.imagekit.io/a01bjbmceb/Prods/';

  if (!products || products.length === 0) {
    return null;
  }

  // Calculate discount percentage
  const calculateDiscount = (originalPrice: number | undefined, salePrice: number): number | null => {
    if (!originalPrice || originalPrice <= salePrice) return null;
    const discount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);
    return discount > 0 ? discount : null;
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-6 flex items-center rtl:font-[system-ui]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
        منتجات شبيهه
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {products.map(product => {
          const discountPercentage = calculateDiscount(product.cPrice, product.sPrice);
          
          return (
            <Link 
              href={`/product/${product.id}`} 
              key={product.id}
              className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
            >
              <div className="relative h-40 sm:h-48 bg-gray-50">
                {product.imageUrl ? (
                  <Image
                    src={`${imageBaseUrl}${product.imageUrl}`}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                )}
                
                {discountPercentage && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {discountPercentage}% خصم
                  </div>
                )}
              </div>
              
              <div className="p-3">
                <h3 className="text-sm font-medium line-clamp-2 mb-2 h-10 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                
                <div className="flex items-center gap-2">
                  <span className="font-bold text-red-600 rtl:font-[system-ui]">د.ل {product.sPrice.toLocaleString()}</span>
                  {product.cPrice && product.cPrice > product.sPrice && (
                    <span className="text-sm text-gray-500 line-through rtl:font-[system-ui]">د.ل {product.cPrice.toLocaleString()}</span>
                  )}
                </div>
                
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-blue-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    عرض التفاصيل
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}