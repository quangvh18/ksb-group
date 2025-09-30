'use client';

import Image from 'next/image';

export default function KSBGroupSection() {
  return (
    <section className="ksb-summary py-20 bg-gray-50">
      <div className="container mx-auto px-5 w-[1250px] lg:w-[1250px] md:w-[950px]">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 uppercase tracking-wide">
            KSB Group
          </h2>
          <div className="flex space-x-2">
            <button className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-6 pb-4" style={{width: 'max-content'}}>
            {/* F&B Card */}
            <div className="relative bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-[300px] flex-shrink-0 overflow-hidden group hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-all duration-700 ease-out">
              <div 
                className="h-80 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">F&B</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Thực phẩm & Đồ uống<br/>
                    Chuyên nhập khẩu và phân phối các sản phẩm thực phẩm chất lượng cao từ Hàn Quốc, Đài Loan, Pháp...
                  </p>
                </div>
                <div className="absolute bottom-4 left-4">
                  <button className="w-10 h-10 bg-[#c9184a] rounded-lg flex items-center justify-center hover:bg-[#a0153a] transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Hóa - Mỹ phẩm Card */}
            <div className="relative bg-white rounded-[0rem_3rem_0rem_3rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-[300px] flex-shrink-0 overflow-hidden group hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-all duration-700 ease-out">
              <div 
                className="h-80 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">HÓA - MỸ PHẨM</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Chăm sóc sức khỏe & Làm đẹp<br/>
                    Dòng sản phẩm Biofresh từ Bulgaria, các sản phẩm chăm sóc da và tóc cao cấp...
                  </p>
                </div>
                <div className="absolute bottom-4 left-4">
                  <button className="w-10 h-10 bg-[#c9184a] rounded-lg flex items-center justify-center hover:bg-[#a0153a] transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Sản xuất - Phân phối Card */}
            <div className="relative bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-[300px] flex-shrink-0 overflow-hidden group hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-all duration-700 ease-out">
              <div 
                className="h-80 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">SẢN XUẤT</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Sản xuất & Phân phối<br/>
                    Hệ thống sản xuất hiện đại, mạng lưới phân phối rộng khắp 63 tỉnh thành Việt Nam...
                  </p>
                </div>
                <div className="absolute bottom-4 left-4">
                  <button className="w-10 h-10 bg-[#c9184a] rounded-lg flex items-center justify-center hover:bg-[#a0153a] transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Hàng tiêu dùng Card */}
            <div className="relative bg-white rounded-[0rem_3rem_0rem_3rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-[300px] flex-shrink-0 overflow-hidden group hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-all duration-700 ease-out">
              <div 
                className="h-80 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">TIÊU DÙNG</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Hàng tiêu dùng nhập khẩu<br/>
                    Choco Samjin, Boring Oat Milk và nhiều thương hiệu quốc tế khác...
                  </p>
                </div>
                <div className="absolute bottom-4 left-4">
                  <button className="w-10 h-10 bg-[#c9184a] rounded-lg flex items-center justify-center hover:bg-[#a0153a] transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Thêm các card mới để có thể cuộn */}
            {/* Logistics & Vận chuyển Card */}
            <div className="relative bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-[300px] flex-shrink-0 overflow-hidden group hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-all duration-700 ease-out">
              <div 
                className="h-80 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">LOGISTICS</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Vận chuyển & Phân phối<br/>
                    Hệ thống logistics hiện đại, đảm bảo giao hàng nhanh chóng và an toàn...
                  </p>
                </div>
                <div className="absolute bottom-4 left-4">
                  <button className="w-10 h-10 bg-[#c9184a] rounded-lg flex items-center justify-center hover:bg-[#a0153a] transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Công nghệ & Đổi mới Card */}
            <div className="relative bg-white rounded-[0rem_3rem_0rem_3rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-[300px] flex-shrink-0 overflow-hidden group hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-all duration-700 ease-out">
              <div 
                className="h-80 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">CÔNG NGHỆ</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Đổi mới & Sáng tạo<br/>
                    Ứng dụng công nghệ tiên tiến trong quản lý và phát triển sản phẩm...
                  </p>
                </div>
                <div className="absolute bottom-4 left-4">
                  <button className="w-10 h-10 bg-[#c9184a] rounded-lg flex items-center justify-center hover:bg-[#a0153a] transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Sứ mệnh: Kết nối giá trị – Lan tỏa niềm tin
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Tạo nên những dòng chảy thương mại hiệu quả, góp phần thúc đẩy kinh tế nội địa và nâng tầm hàng tiêu dùng Việt trên thị trường khu vực.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
