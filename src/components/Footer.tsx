import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer-bottom py-[30px] px-0 pb-[40px] border-t border-[#cfcfcf]">
      <div className="container mx-auto px-5 w-[1400px] lg:w-[1200px] md:w-[900px]">
        <div className="row -mx-[15px] flex flex-wrap">
          <div className="w-1/6 lg:w-1/6 md:w-1/4 sm:w-1/3 px-[15px]">
            <Image 
              src="/images/logo-footer.png" 
              alt="KSB Group Logo"
              width={150}
              height={60}
              className="w-full h-auto"
            />
          </div>
          <div className="w-1/2 lg:w-1/2 md:w-1/2 sm:w-2/3 px-[15px]">
            <p className="text-left text-sm leading-relaxed">
              <strong>CÔNG TY CỔ PHẦN TẬP ĐOÀN KSB</strong><br />
              Địa chỉ: Căn V10-A01, khu đô thị mới An Hưng, phố Nguyễn Thanh Bình, Phường La Khê, Quận Hà Đông, Thành phố Hà Nội, Việt Nam<br />
              Nhà máy: Cụm công nghiệp Long Xuyên, Phường Kinh Môn, TP Hải Phòng, Việt Nam<br />
              <span>ⓒ KSB Group. Tất cả quyền được bảo lưu</span>
            </p>
          </div>
          <div className="w-1/6 lg:w-1/6 md:w-1/4 sm:w-1/2 px-[15px]">
            <dl>
              <dt className="font-bold text-sm mb-1">Điện thoại</dt>
              <dd className="text-sm">0911 009 665</dd>
            </dl>
          </div>
          <div className="w-1/6 lg:w-1/6 md:w-1/4 sm:w-1/2 px-[15px]">
            <dl>
              <dt className="font-bold text-sm mb-1">Email & Website</dt>
              <dd className="text-sm">
                <a href="mailto:info@ksbgroup.vn" className="hover:underline">info@ksbgroup.vn</a><br />
                <a href="https://ksbgroup.vn" className="hover:underline">ksbgroup.vn</a>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </footer>
  );
}
