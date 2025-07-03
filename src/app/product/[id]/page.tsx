import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

import { fetchShopId, fetchProductDetails } from "@/actions/productActions";
import ProductImages from "@/components/ProductImages";
import ProductPrice from "@/components/ProductPrice";
import RatingStars from "@/components/RatingStars";
import ProductOptions from "@/components/ProductOptions";
import ProductActions from "@/components/ProductActions";
import RelatedProducts from "@/components/RelatedProducts";

// Define the props for the page component
interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    return notFound();
  }

  // Get the referer header from the incoming request
  const headersList = await headers();
  const refererUrl = headersList.get("referer");

  // Ensure we have a referer URL to proceed
  if (!refererUrl) {
    console.error("No referer URL available");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 mx-auto text-red-500 mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <p className="text-xl font-medium">خطأ في تحديد المصدر</p>
          <p className="text-gray-600 mt-2 mb-4">لم يتم العثور على عنوان المصدر</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // Use the referer to fetch the shop ID
  let shopId;
  try {
    shopId = await fetchShopId(refererUrl);
  } catch (error) {
    console.error("Error fetching shop ID:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 mx-auto text-red-500 mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <p className="text-xl font-medium">فشل في الحصول على معرف المتجر</p>
          <p className="text-gray-600 mt-2 mb-4">يرجى المحاولة مرة أخرى لاحقاً</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // Use the shop ID to fetch product details
  let product;
  try {
    product = await fetchProductDetails(productId, shopId);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 mx-auto text-red-500 mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <p className="text-xl font-medium">فشل في الحصول على تفاصيل المنتج</p>
          <p className="text-gray-600 mt-2 mb-4">يرجى المحاولة مرة أخرى لاحقاً</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Breadcrumb navigation */}
      <nav className="mb-6 text-sm hidden sm:block">
        <ol className="flex items-center space-x-2 rtl:space-x-reverse">
          <li>
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              الرئيسية
            </Link>
          </li>
          <li className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mx-1 rtl:rotate-180"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
        {/* Product Images */}
        <div className="md:w-1/2">
          <Suspense fallback={<div className="h-72 sm:h-80 md:h-96 bg-gray-200 animate-pulse rounded-lg"></div>}>
            <ProductImages images={product.images} productName={product.name} />
          </Suspense>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">{product.name}</h1>

          <div className="mb-4">
            <RatingStars />
          </div>

          <div className="mb-6">
            <ProductPrice salePrice={product.sPrice} comparePrice={product.cPrice} />
          </div>

          <div className="mb-6">
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Product Options */}
          {product.options && product.options.length > 0 && (
            <div className="mb-6">
              <ProductOptions options={product.options} />
            </div>
          )}

          {/* Product Actions */}
          <div className="mb-6">
            <ProductActions />
          </div>
        </div>
      </div>

      {/* Related Products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="mt-12">
          <RelatedProducts products={product.relatedProducts} />
        </div>
      )}
    </div>
  );
}
