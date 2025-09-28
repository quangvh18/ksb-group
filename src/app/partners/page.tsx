import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đối tác - KSB Group",
  description: "Khám phá các đối tác chiến lược của KSB Group trong ngành thực phẩm",
};

export default function PartnersPage() {
  return (
    <div>
      <main className="pt-[70px]">
        <div className="container mx-auto px-5 max-w-[1250px] lg:max-w-[1250px] md:max-w-[950px] w-full">
          <section className="py-16">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-800 mb-4">Đối tác</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                KSB Group tự hào hợp tác với các đối tác uy tín trong và ngoài nước
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Đối tác sản xuất</h3>
                <p className="text-gray-600">Các nhà máy và cơ sở sản xuất uy tín</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Đối tác phân phối</h3>
                <p className="text-gray-600">Mạng lưới phân phối rộng khắp</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Đối tác công nghệ</h3>
                <p className="text-gray-600">Công nghệ tiên tiến và đổi mới</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
