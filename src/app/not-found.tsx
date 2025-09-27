import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-8">Trang không tìm thấy</h2>
      <p className="text-gray-500 mb-8">Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
      <Link 
        href="/" 
        className="bg-[#006b11] text-white px-6 py-3 rounded-lg hover:bg-[#005a0f] transition-colors"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
