import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchShopId, fetchProductDetails } from "@/actions/productActions";
import ProductImages from "@/components/ProductImages";
import ProductPrice from "@/components/ProductPrice";
import RatingStars from "@/components/RatingStars";
import ProductOptions from "@/components/ProductOptions";
import ProductActions from "@/components/ProductActions";
import RelatedProducts from "@/components/RelatedProducts";
import Link from "next/link";

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

  // Get the base URL for the Referer header
  const baseUrl = process.env.NEXT_PUBLIC_DEFAULT_REFERER || "http://localhost:3000";

  // Fetch the shop ID
  let shopId: number | null = null;
  try {
    shopId = await fetchShopId(baseUrl);
    console.log("shopid -> ", shopId);
  } catch (error) {
    console.error("Failed to fetch shop ID:", error);
  }

  if (!shopId) {
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

  // Fetch product details
  let product;
  try {
    product = await fetchProductDetails(productId, shopId);
    console.log("product -> ", product);
  } catch (error) {
    console.error("Failed to fetch product details:", error);
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

          {product.options && product.options.length > 0 && (
            <div className="mb-6">
              <ProductOptions options={product.options} />
            </div>
          )}

          <ProductActions />

          {/* Quick info */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                <span className="text-sm">شحن سريع (2-4 أيام عمل)</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <span className="text-sm">دفع آمن</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                  />
                </svg>
                <span className="text-sm">إرجاع مجاني خلال 14 يوم</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
                <span className="text-sm">ضمان جودة المنتج</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          تفاصيل المنتج
        </h2>
        <div className="product-description prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
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
