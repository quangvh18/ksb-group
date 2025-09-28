import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hệ sinh thái - KSB Group",
  description: "Khám phá hệ sinh thái đa dạng của KSB Group với các thương hiệu và dịch vụ",
};

export default function EcosystemPage() {
  return (
    <div>
      <main className="pt-[70px]">
        <div className="container mx-auto px-5 max-w-[1250px] lg:max-w-[1250px] md:max-w-[950px] w-full">
          <section className="py-16">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-800 mb-4">Hệ sinh thái KSB</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Khám phá hệ sinh thái đa dạng của KSB Group với các thương hiệu, dịch vụ và giải pháp toàn diện
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-red-500">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Sản xuất</h3>
                <p className="text-gray-600">Nhà máy sản xuất hiện đại với công nghệ tiên tiến</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-orange-500">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Phân phối</h3>
                <p className="text-gray-600">Mạng lưới phân phối rộng khắp toàn quốc</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-red-500">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Chất lượng</h3>
                <p className="text-gray-600">Đảm bảo chất lượng sản phẩm với tiêu chuẩn quốc tế</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
