'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {/* Payment Methods Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-4 text-right">طرق الدفع</h3>
            <div className="flex flex-wrap justify-end gap-3">
              <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">Visa</span>
              <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">Mastercard</span>
              <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">PayPal</span>
              <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">مدى</span>
              <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">STCPay</span>
              <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">Apple Pay</span>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center">
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <span>0920000000</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span>0910000000</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span>sephax.walou@gmail.com</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Logo and Brand Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-bold mb-2">ezone</h2>
              <p className="text-sm text-gray-600 mb-4">متجر إلكتروني مختص بمنتجات الهواتف وكمالياته</p>
              <div className="flex gap-4">
                <Link href="https://instagram.com" className="text-gray-600 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
                <Link href="https://facebook.com" className="text-gray-600 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="mb-4 md:mb-0">
            <span>جميع الحقوق محفوظة. {new Date().getFullYear()} ©</span>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-900">سياسة الاستبدال والاسترجاع</Link>
            <span>|</span>
            <Link href="#" className="hover:text-gray-900">نظام بطاقة</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}