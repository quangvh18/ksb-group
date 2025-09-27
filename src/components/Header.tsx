import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-[rgba(46,58,54,0.5)] fixed w-full top-0 z-[1000] backdrop-blur-sm">
      <div className="relative mx-auto">
         <nav className="relative w-full max-w-[1200px] mx-auto flex justify-between">
           <h2 className="absolute text-[0] leading-[0] overflow-hidden text-[30px] mt-[20px] mb-[10px]">KSB GROUP</h2>
           
           <div className="float-left flex items-center h-[70px] px-0">
             <a href="https://www.sahmyook.co.kr">
               <Image 
                 src="/images/logo-header.png" 
                 alt="KSB Group Logo" 
                 width={120}
                 height={40}
                 priority={true}
                 className="h-10 w-auto" 
               />
             </a>
           </div>
           
           <div className="mx-auto relative">
            <ul className="mb-0 text-[1.1em] p-0 m-0 list-none block">
               <li className="float-left leading-[70px] p-0 relative z-[999]">
                 <a href="#" className="no-underline block font-normal px-5 text-white">
                   Trang chủ
                 </a>
               </li>
               <li className="float-left leading-[70px] p-0 relative z-[998]">
                 <a href="#" className="no-underline block font-normal px-5 text-white">
                   Về chúng tôi
                 </a>
                <div className="hidden group-hover:block">
                  <ul className="block">
                    <li><a href="#" className="no-underline">Giới thiệu công ty</a></li>
                    <li><a href="#" className="no-underline">Lịch sử phát triển</a></li>
                    <li><a href="#" className="no-underline">Tầm nhìn - Sứ mệnh</a></li>
                    <li><a href="#" className="no-underline">Đội ngũ lãnh đạo</a></li>
                    <li><a href="#" className="no-underline">Văn hóa doanh nghiệp</a></li>
                  </ul>
                </div>
              </li>
               <li className="float-left leading-[70px] p-0 relative z-[997]">
                 <a href="#" className="no-underline block font-normal px-5 text-white">
                   Dịch vụ
                 </a>
                 <div className="hidden group-hover:block">
                   <ul className="block">
                     <li><a href="#" className="no-underline">Dịch vụ tư vấn</a></li>
                     <li><a href="#" className="no-underline">Dịch vụ thiết kế</a></li>
                     <li><a href="#" className="no-underline">Dịch vụ phát triển</a></li>
                     <li><a href="#" className="no-underline">Dịch vụ bảo trì</a></li>
                     <li><a href="#" className="no-underline">Dịch vụ hỗ trợ</a></li>
                   </ul>
                 </div>
               </li>
               <li className="float-left leading-[70px] p-0 relative z-[996]">
                 <a href="#" className="no-underline block font-normal px-5 text-white">
                   Tin tức
                 </a>
                 <div className="hidden group-hover:block">
                   <ul className="block">
                     <li><a href="#" className="no-underline">Tin tức công ty</a></li>
                     <li><a href="#" className="no-underline">Thông báo</a></li>
                     <li><a href="#" className="no-underline">Sự kiện</a></li>
                     <li><a href="#" className="no-underline">Báo chí nói về chúng tôi</a></li>
                   </ul>
                 </div>
               </li>
               <li className="float-left leading-[70px] p-0 relative z-[995]">
                 <a href="#" className="no-underline block font-normal px-5 text-white">
                   Liên hệ
                 </a>
               </li>
            </ul>
          </div>
          
          <div className="px-[10px]">
            <a href="https://www.instagram.com/sahmyook_island/" target="_blank" className="block py-[15px] px-[10px] bg-white rounded-b-[10px] no-underline">
              <Image 
                src="/images/insta-icon.png" 
                alt="Instagram" 
                width={30}
                height={30}
                className="w-[30px] h-[30px] align-middle border-0" 
              />
            </a>
          </div>
          
          <div className="bg-white h-[60px] py-[10px] px-[30px] rounded-b-[10px] shadow-[0px_3px_10px_0px_rgba(0,105,52,0.35)]">
            <a href="https://36mall.co.kr/main/index.php">
              <Image 
                src="/images/symall-logo.png" 
                alt="KSB Mall" 
                width={100}
                height={40}
              />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
