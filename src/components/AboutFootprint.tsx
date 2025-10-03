import Image from "next/image";

const AboutFootprint = () => {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-6 md:mb-8 text-center" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-4 text-center">
              Dấu ấn
            </h2>
            <p className="text-muted-foreground text-base text-center">
              Hệ thống phân phối toàn quốc
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
              <p className="text-base text-muted-foreground">
                Với mạng lưới phân phối phủ khắp cả nước, KSB GROUP tự hào mang đến sản phẩm chất lượng cao 
                đến tay người tiêu dùng Việt Nam qua nhiều kênh: MT, GT, Showroom, Chuyên biệt và B2B.
              </p>
            </div>

            {/* Right Image - Larger */}
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] transition-all duration-300" data-aos="zoom-in" data-aos-delay="300">
              <Image 
                src="/images/ksb.jpg" 
                alt="Hệ thống phân phối KSB trên toàn quốc" 
                width={800}
                height={600}
                className="w-full h-auto transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFootprint;
