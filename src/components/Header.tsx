import Image from 'next/image'
import Link from 'next/link'

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
                 <Link href="/" className="no-underline block font-bold px-5 text-white hover:bg-[#780000] hover:text-white transition-all duration-200">
                   Trang chủ
                 </Link>
               </li>
               <li className="float-left leading-[70px] p-0 relative z-[998]">
                 <Link href="/about" className="no-underline block font-bold px-5 text-white hover:bg-[#780000] hover:text-white transition-all duration-200">
                   Về chúng tôi
                 </Link>
               </li>
               <li className="float-left leading-[70px] p-0 relative z-[997]">
                 <Link href="/ecosystem" className="no-underline block font-bold px-5 text-white hover:bg-[#780000] hover:text-white transition-all duration-200">
                   Hệ sinh thái
                 </Link>
               </li>
               <li className="float-left leading-[70px] p-0 relative z-[996]">
                 <Link href="/news" className="no-underline block font-bold px-5 text-white hover:bg-[#780000] hover:text-white transition-all duration-200">
                   Tin tức
                 </Link>
               </li>
               <li className="float-left leading-[70px] p-0 relative z-[995]">
                 <Link href="/careers" className="no-underline block font-bold px-5 text-white hover:bg-[#780000] hover:text-white transition-all duration-200">
                   Tuyển dụng
                 </Link>
               </li>
               <li className="float-left leading-[70px] p-0 relative z-[994]">
                 <Link href="/partners" className="no-underline block font-bold px-5 text-white hover:bg-[#780000] hover:text-white transition-all duration-200">
                   Đối tác
                 </Link>
               </li>
               <li className="float-left leading-[70px] p-0 relative z-[993]">
                 <Link href="/contact" className="no-underline block font-bold px-5 text-white hover:bg-[#780000] hover:text-white transition-all duration-200">
                   Liên hệ
                 </Link>
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
