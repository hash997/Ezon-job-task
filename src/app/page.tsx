import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-3xl font-bold mb-6">مرحبًا بك في متجر Ezone</h1>

        <p className="text-lg mb-8">يمكنك استعراض تفاصيل المنتج من خلال النقر على الزر أدناه</p>

        <Link
          href="/product/5516"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
        >
          عرض تفاصيل المنتج
        </Link>
      </div>
    </div>
  );
}
