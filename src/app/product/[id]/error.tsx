'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [errorType, setErrorType] = useState<'network' | 'api' | 'unknown'>('unknown');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Product page error:', error);
    
    // Determine error type
    if (error.message.includes('network') || error.message.includes('fetch') || error.message.includes('ECONNREFUSED')) {
      setErrorType('network');
      setErrorMessage('يبدو أن هناك مشكلة في الاتصال بالإنترنت. يرجى التحقق من اتصالك والمحاولة مرة أخرى.');
    } else if (error.message.includes('API') || error.message.includes('status code')) {
      setErrorType('api');
      setErrorMessage('حدث خطأ أثناء جلب بيانات المنتج من الخادم. يرجى المحاولة مرة أخرى لاحقاً.');
    } else {
      setErrorMessage('عذراً، حدث خطأ غير متوقع أثناء تحميل صفحة المنتج.');
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          {errorType === 'network' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L8 10l4 7v-7" />
            </svg>
          ) : errorType === 'api' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-center">حدث خطأ ما</h1>
        <p className="text-lg mb-8 text-center text-gray-700">{errorMessage}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              // Add a small delay to make the reset more noticeable
              setTimeout(() => reset(), 300);
            }}
            className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors w-full sm:w-auto"
          >
            حاول مرة أخرى
          </button>
          
          <Link 
            href="/" 
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors text-center w-full sm:w-auto"
          >
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
        
        {error.digest && (
          <p className="mt-8 text-xs text-gray-500 text-center">
            رمز الخطأ: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}