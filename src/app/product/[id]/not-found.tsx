import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">المنتج غير موجود</h1>
        <p className="text-lg mb-8 text-gray-700">عذراً، لم نتمكن من العثور على المنتج الذي تبحث عنه.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors w-full"
          >
            العودة إلى الصفحة الرئيسية
          </Link>
          
          <Link 
            href="/product/5516" 
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors w-full"
          >
            عرض منتج متاح
          </Link>
        </div>
      </div>
    </div>
  );
}