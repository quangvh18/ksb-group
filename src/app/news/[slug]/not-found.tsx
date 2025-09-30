import Link from "next/link";
import PageHeader from "../../../components/PageHeader";

export default function NewsNotFound() {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "/news" },
    { label: "Không tìm thấy", isActive: true }
  ];

  return (
    <div>
      <PageHeader 
        title="Bài viết không tìm thấy"
        description="Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa."
        breadcrumbItems={breadcrumbItems}
      />
      
      <main>
        <div className="bg-white py-16">
          <div className="container mx-auto px-5 max-w-4xl text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">📰</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Bài viết không tìm thấy
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Xin lỗi, bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/news"
                className="inline-flex items-center px-6 py-3 bg-[#c9184a] text-white font-medium rounded-lg hover:bg-[#a0153a] transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Quay lại danh sách tin tức
              </Link>
              
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
