import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Về chúng tôi - KSB Group",
  description: "Tìm hiểu về KSB Group - Công ty cổ phần tập đoàn KSB",
};

export default function AboutPage() {
  return (
    <div>
      <main className="pt-[70px]">
        <div className="container mx-auto px-5 max-w-[1250px] lg:max-w-[1250px] md:max-w-[950px] w-full">
          <section className="py-16">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-800 mb-4">Về chúng tôi</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                KSB Group - Công ty cổ phần tập đoàn KSB với hơn 20 năm kinh nghiệm trong lĩnh vực thực phẩm và đồ uống
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Tầm nhìn & Sứ mệnh</h2>
                <p className="text-gray-600 mb-4">
                  Chúng tôi cam kết mang đến những sản phẩm chất lượng cao, an toàn và bổ dưỡng cho người tiêu dùng Việt Nam.
                </p>
                <p className="text-gray-600">
                  Với tầm nhìn trở thành tập đoàn thực phẩm hàng đầu Việt Nam, KSB Group không ngừng phát triển và đổi mới.
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-8 border border-red-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Thông tin công ty</h3>
                <ul className="space-y-3 text-gray-600">
                  <li><strong>Tên công ty:</strong> Công ty cổ phần tập đoàn KSB</li>
                  <li><strong>Thành lập:</strong> 2003</li>
                  <li><strong>Trụ sở:</strong> Hà Nội, Việt Nam</li>
                  <li><strong>Nhà máy:</strong> Hải Phòng, Việt Nam</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
