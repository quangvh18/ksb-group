import { Building2, TrendingUp, Award } from "lucide-react";

const AboutContent = () => {
  return (
    <section className="relative py-20 md:py-28 bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-white to-gray-100" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-16 text-center" data-aos="fade-up">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#bb252d]/10 to-orange-500/10 p-4" data-aos="zoom-in" data-aos-delay="200">
              <Building2 className="h-10 w-10 text-[#bb252d]" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl" data-aos="fade-up" data-aos-delay="300">
              Giới Thiệu Tập Đoàn KSB
            </h2>
            <div className="mx-auto h-1 w-24 bg-gradient-to-r from-transparent via-[#bb252d] to-transparent" data-aos="fade-up" data-aos-delay="400" />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1 - Foundation */}
            <div className="group relative" data-aos="fade-up" data-aos-delay="100">
              {/* Leaf shape background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-emerald-300 rounded-[3rem_0rem_3rem_0rem] transform rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              
              <div className="relative bg-white rounded-[3rem_0rem_3rem_0rem] p-8 shadow-lg group-hover:shadow-xl transition-all duration-500 border border-green-300/70">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                    <TrendingUp className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Nền Tảng Vững Mạnh</h3>
                </div>
                <p className="text-base leading-relaxed text-gray-700">
                  Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh, kế thừa và phát triển từ tâm huyết của Công ty TNHH XNK Thiên Thuận Phát. Với hơn một thập kỷ miệt mài gieo trồng giá trị, chúng tôi đã vun đắp một hệ sinh thái kinh doanh bền vững.
                </p>
              </div>
            </div>

            {/* Card 2 - Expansion */}
            <div className="group relative" data-aos="fade-up" data-aos-delay="200">
              {/* Leaf shape background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-[0rem_3rem_0rem_3rem] transform -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              
              <div className="relative bg-white rounded-[0rem_3rem_0rem_3rem] p-8 shadow-lg group-hover:shadow-xl transition-all duration-500 border border-blue-300/70">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                    <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Mở Rộng Toàn Quốc</h3>
                </div>
                <p className="text-base leading-relaxed text-gray-700">
                  KSB đã chạm tới mọi miền đất nước, mở rộng tầm ảnh hưởng mạnh mẽ với hệ thống chi nhánh và cơ sở vật chất chiến lược trải dài. Chúng tôi không chỉ là đối tác nhập khẩu được tin cậy.
                </p>
              </div>
            </div>

            {/* Card 3 - Commitment - Featured */}
            <div className="group relative lg:col-span-1" data-aos="fade-up" data-aos-delay="300">
              {/* Leaf shape background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#bb252d]/20 to-orange-500/30 rounded-[3rem_0rem_3rem_0rem] transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-[#bb252d] to-orange-500 rounded-[3rem_0rem_3rem_0rem] p-8 shadow-lg group-hover:shadow-xl transition-all duration-500">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <Award className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Cam Kết Của Chúng Tôi</h3>
                </div>
                <p className="text-base font-semibold leading-relaxed text-white">
                  KSB cam kết không ngừng vươn xa, kiến tạo giá trị và khẳng định vững chắc vị thế quyền lực của một tập đoàn hàng đầu trên bản đồ kinh tế Việt Nam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
