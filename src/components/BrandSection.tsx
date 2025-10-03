import Image from 'next/image'

export default function BrandSection() {
  return (
    <div className="box-brand relative bg-gray-50 py-16" data-aos="fade-up" data-aos-duration="1200">
      <span className="brand-img-2 absolute top-10 right-10 w-20 h-20 opacity-20">
        <Image src="https://cjfoods.com.vn/themes/nest/images/home-ver1/brand-img-2.svg" alt="" width={80} height={80} className="w-full h-full" />
      </span>
      <span className="brand-img-3 absolute bottom-10 left-10 w-16 h-16 opacity-20">
        <Image src="https://cjfoods.com.vn/themes/nest/images/home-ver1/brand-img-3.svg" alt="" width={64} height={64} className="w-full h-full" />
      </span>
      <div className="container relative mx-auto px-2 md:px-5 max-w-[1300px]">
        <span className="brand-img-1 absolute top-0 left-0 w-24 h-24 opacity-20">
          <Image src="https://cjfoods.com.vn/themes/nest/images/home-ver1/brand-img-1.svg" alt="" width={96} height={96} className="w-full h-full" />
        </span>
        
        {/* Section Title */}
        <div className="text-center mb-12" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Thương hiệu đối tác
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các thương hiệu uy tín và đối tác tin cậy của chúng tôi
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-2" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="100">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/2-01.webp" alt="Thương hiệu 1" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 1</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="200">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/4.webp" alt="Thương hiệu 2" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 2</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="300">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/5-01.webp" alt="Thương hiệu 3" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 3</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="400">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/6-01.webp" alt="Thương hiệu 4" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 4</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="500">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/7-01.webp" alt="Thương hiệu 5" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 5</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="600">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/8.webp" alt="Thương hiệu 6" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 6</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="700">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/9-011.webp" alt="Thương hiệu 7" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 7</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="800">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/dongnam1.webp" alt="Thương hiệu 8" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 8</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="900">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/9-01.webp" alt="Thương hiệu 9" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 9</div>
            </a>
          </div>
          <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="1000">
            <a href="#" className="block hover:scale-105 transition-transform duration-300">
              <Image src="https://thienthuanphat.vn/Data/images/default/1-01.webp" alt="Thương hiệu 10" width={160} height={160} className="w-40 h-40 mx-auto object-contain" />
              <div className="name text-base font-medium text-gray-700 mt-3">Thương hiệu 10</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


