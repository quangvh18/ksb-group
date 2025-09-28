import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức - KSB Group",
  description: "Cập nhật tin tức mới nhất về KSB Group và ngành thực phẩm",
};

export default function NewsPage() {
  return (
    <div>
      <main className="pt-[70px]">
        <div className="container mx-auto px-5 max-w-[1250px] lg:max-w-[1250px] md:max-w-[950px] w-full">
          <section className="py-16">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-800 mb-4">Tin tức</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cập nhật những tin tức mới nhất về KSB Group và ngành thực phẩm
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">15/01/2025</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">KSB Group mở rộng thị trường</h3>
                  <p className="text-gray-600">KSB Group công bố kế hoạch mở rộng thị trường ra các tỉnh thành mới...</p>
                </div>
              </article>
              
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">10/01/2025</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Sản phẩm mới ra mắt</h3>
                  <p className="text-gray-600">KSB Group ra mắt dòng sản phẩm mới với công nghệ tiên tiến...</p>
                </div>
              </article>
              
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">05/01/2025</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Giải thưởng chất lượng</h3>
                  <p className="text-gray-600">KSB Group nhận giải thưởng chất lượng sản phẩm năm 2024...</p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
