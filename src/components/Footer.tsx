import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer-bottom py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-5 pb-8 sm:pb-10 md:pb-12 border-t border-[#cfcfcf]">
      <div className="container mx-auto max-w-full sm:max-w-full md:max-w-[900px] lg:max-w-[1200px] xl:max-w-[1400px]">
        <div className="flex flex-wrap -mx-2 sm:-mx-3 md:-mx-4">
          
          {/* Logo Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 sm:px-3 md:px-4 mb-4 sm:mb-6 md:mb-0">
            <Image 
              src="https://thienthuanphat.vn/Data/images/banner-cn/logo/fa-ksb.webp" 
              alt="KSB Group Logo"
              width={150}
              height={60}
              className="w-32 sm:w-36 md:w-40 lg:w-full h-auto"
            />
          </div>
          
          {/* Company Info Section */}
          <div className="w-full sm:w-full md:w-full lg:w-1/2 px-2 sm:px-3 md:px-4 mb-4 sm:mb-6 md:mb-6 lg:mb-0 order-3 sm:order-3 md:order-3 lg:order-2">
            <p className="text-left text-xs sm:text-sm md:text-sm leading-relaxed">
              <strong className="block mb-1 sm:mb-2">CÔNG TY CỔ PHẦN TẬP ĐOÀN KSB</strong>
              <span className="block mb-1">
                <strong>Địa chỉ:</strong> Tầng 4, căn V10-A01, KĐT Terra An Hưng Phố Nguyễn Thanh Bình, Phường Dương Nội, TP Hà Nội, Việt Nam
              </span>
              <span className="block mb-1">
                <strong>Nhà máy:</strong> Cụm công nghiệp Long Xuyên, Phường Kinh Môn, TP Hải Phòng, Việt Nam
              </span>
              <span className="block mt-2 text-[11px] sm:text-xs">
                ⓒ KSB Group. Tất cả quyền được bảo lưu
              </span>
            </p>
          </div>
          
          {/* Phone Section */}
          <div className="w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/6 px-2 sm:px-3 md:px-4 mb-4 sm:mb-6 md:mb-0 order-2 sm:order-2 md:order-2 lg:order-3">
            <dl>
              <dt className="font-bold text-xs sm:text-sm md:text-sm mb-1 sm:mb-2">Điện thoại</dt>
              <dd className="text-xs sm:text-sm md:text-sm">
                <a href="tel:19001181" className="hover:underline hover:text-blue-600">19001181</a>
              </dd>
            </dl>
          </div>
          
          {/* Email & Website Section */}
          <div className="w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/6 px-2 sm:px-3 md:px-4 mb-4 sm:mb-6 md:mb-0 order-2 sm:order-2 md:order-2 lg:order-4">
            <dl>
              <dt className="font-bold text-xs sm:text-sm md:text-sm mb-1 sm:mb-2">Email & Website</dt>
              <dd className="text-xs sm:text-sm md:text-sm">
                <a href="mailto:info@ksbgroup.vn" className="hover:underline hover:text-blue-600 block mb-0.5">
                  info@ksbgroup.vn
                </a>
                <a href="https://ksbgroup.vn" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 block">
                  ksbgroup.vn
                </a>
              </dd>
            </dl>
          </div>
          
        </div>
      </div>
    </footer>
  );
}