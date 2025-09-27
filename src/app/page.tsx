import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <main className="pt-[70px]">
        <div className="container mx-auto px-5 w-[1250px] lg:w-[1250px] md:w-[950px]">
          {/* News & Community Section */}
          <section className="synew">
            <div className="row -mx-[15px] flex flex-wrap">
              <div className="w-1/2 md:w-1/2 sm:w-full px-[15px]" data-aos="fade-up" data-aos-duration="1000">
                <div className="text-left">
                      <h1 className="main_section_tit text-[#8f8f8f] text-[5.2em] mt-[50px] font-bold leading-tight">
                    Tin tức <span>&amp;</span><br />
                    Cộng đồng
                  </h1>
                  <p className="main_section_sub text-[1.29em] text-[#828282] mb-[40px]">
                    Khám phá những tin tức mới nhất và thay đổi của KSB Group.
                  </p>
                </div>
              </div>
            </div>

            <div className="row -mx-[15px] flex flex-wrap">
              <div className="w-full px-[15px]">
                <ul className="main_news_list relative">
                  <li className="float-right w-[calc(45%-20px)] absolute top-[-230px] z-[2] right-0" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="200">
                    <a 
                      className="news_img float-left w-full min-h-[200px] lg:min-h-[430px] bg-cover bg-center bg-no-repeat rounded-[50px_0px_50px_0px] lg:rounded-[100px_0px_100px_0px] lg:w-[calc(100%-52px)]" 
                      style={{backgroundImage: "url('/images/news-1.jpg')"}}
                      href="#"
                    ></a>
                    <div className="news_text p-5 lg:bg-[#006b11] lg:w-[calc(100%-40px)] lg:float-right lg:p-[390px_40px_30px] lg:min-h-[500px] lg:absolute lg:top-[56px] lg:z-[-1] lg:right-0 lg:rounded-[0px_100px_0px_100px]">
                      <div className="news_tit">
                        <h3 className="text-xl lg:text-white lg:leading-[1.35em] min-h-[53px] mb-0 mt-0">
                          <a href="#" className="hover:!text-[#68ad94] lg:hover:!text-white transition-colors duration-200">KSB Group, Ngày chống sa sút trí tuệ lần thứ 18...</a>
                        </h3>
                      </div>
                      <div className="news_detail">
                        <a href="#" className="text-[#68ad94] lg:text-[#a7e7b1] text-[1.2em] float-right lg:mt-5">Xem thêm →</a>
                      </div>
                    </div>
          </li>
                  
                  <li className="float-left w-[calc(27.5%-20px)] mr-5" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                    <a 
                      className="news_img float-left w-full min-h-[200px] bg-cover bg-center bg-no-repeat rounded-[50px_0px_50px_0px]" 
                      style={{backgroundImage: "url('/images/news-2.jpg')"}}
                      href="#"
                    ></a>
                    <div className="news_text px-0 py-5 inline-block w-full">
                      <div className="news_tit">
                        <h3 className="text-xl min-h-[53px] mb-0 mt-0">
                          <a href="#" className="text-[#333] hover:!text-[#68ad94] transition-colors duration-200">KSB Group, Xuất khẩu 'Sữa đậu nành' sang Singapore...</a>
                        </h3>
                      </div>
                      <div className="news_detail">
                        <a href="#" className="text-[#68ad94] text-[1.2em] float-right">Xem thêm →</a>
                      </div>
                    </div>
          </li>
                  
                  <li className="float-left w-[calc(27.5%-20px)] mr-5" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                    <a 
                      className="news_img float-left w-full min-h-[200px] bg-cover bg-center bg-no-repeat rounded-[50px_0px_50px_0px]" 
                      style={{backgroundImage: "url('/images/news-3.jpg')"}}
                      href="#"
                    ></a>
                    <div className="news_text px-0 py-5 inline-block w-full">
                      <div className="news_tit">
                        <h3 className="text-xl min-h-[53px] mb-0 mt-0">
                          <a href="#" className="text-[#333] hover:!text-[#68ad94] transition-colors duration-200">KSB Group, Giải thưởng Thương hiệu của năm 2025...</a>
                        </h3>
                      </div>
                      <div className="news_detail">
                        <a href="#" className="text-[#68ad94] text-[1.2em] float-right">Xem thêm →</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

              {/* Quick Menu Section */}
          <section className="syqmenu mt-20" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
            <div className="row big_qmenu -mx-[15px] flex flex-wrap mb-8">
              <div className="w-2/3 md:w-2/3 sm:w-full px-[15px]" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="400">
                <div className="qmenu_card symall_card bg-[#f1f1f1] rounded-[100px_0px_100px_0px] min-h-[360px] pt-[70px] pl-[30px] relative">
                  <div className="symall_card_cont">
                    <Image 
                      src="/images/symall-logo-big.png" 
                      alt="KSB Mall" 
                      width={200}
                      height={80}
                      priority={true}
                      className="mb-4" 
                    />
                    <div className="btn_symall mt-[50px]">
                      <a href="https://36mall.co.kr/main/index.php" target="_blank" className="border border-[#80ac9c] leading-[59px] text-[#80ac9c] text-[20px] min-w-[220px] rounded-[30px] p-[6px] no-underline inline-block text-center hover:bg-[#006b11] hover:text-white transition-colors">
                        KSB Mall ngay →
                      </a>
                    </div>
                    <div className="symall_pc_img absolute w-[550px] h-[384px] bg-no-repeat bg-[url('/images/symall-pc.png')] float-right right-0 top-[-24px] block"></div>
                  </div>
                </div>
              </div>
              <div className="w-1/3 md:w-1/3 sm:w-full px-[15px]" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="600">
                <div className="qmenu_card sysecret_card bg-[#f1f1f1] rounded-[0px_100px_0px_100px] bg-cover p-[40px_20px] text-center" style={{backgroundImage: "url('/images/secret-bg.png')"}}>
                  <div className="sysecret_card_cont">
                    <div className="sysecret_icon mb-6 p-5 rounded-[100px] border-2 border-white w-[103px] h-[103px] inline-block">
            <Image
                        src="/images/secret-icon.png" 
                        alt="KSB Secret" 
                        width={60}
                        height={60}
                        priority={true}
                      />
                    </div>
                    <div className="sysecret_tit mb-4">
                      <h3 className="text-2xl font-bold text-white">KSB Bí quyết</h3>
                    </div>
                    <div className="sysecret_sub">
                      <p className="mb-4 text-white leading-tight whitespace-nowrap">
                        Bí quyết nấu ăn chỉ dành cho thành viên KSB Group!<br />
                        Khám phá công thức KSB Bí quyết.
                      </p>
                      <a href="https://36mall.co.kr/board/list.php?bdId=sahmyook" className="inline-block rounded-[20px] p-[5px_20px] text-white border border-white no-underline hover:underline transition-colors duration-200">
                        Xem thêm →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="small_qmenu mt-[50px] mb-12 pb-12 -mx-[15px] flex flex-nowrap" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="800">
              <div className="w-1/6 px-[10px] mb-4 relative flex-shrink-0">
                <a className="qmenu_card icon_card group block bg-[#f1f1f1] rounded-[50px_0px_50px_0px] min-h-[120px] p-4 text-center hover:bg-white hover:shadow-lg transition-all duration-300 no-underline" href="#">
                  <div className="qmenu_icon w-full h-[140px] mb-2 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                      <svg className="w-16 h-16 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mt-[10px] mb-[5px] group-hover:text-black transition-colors duration-300">Triết lý</h3>
                </a>
              </div>
              <div className="w-1/6 px-[10px] mb-4 relative flex-shrink-0">
                <a className="qmenu_card icon_card group block bg-[#f1f1f1] rounded-[0px_50px_0px_50px] min-h-[120px] p-4 text-center hover:bg-white hover:shadow-lg transition-all duration-300 no-underline" href="#">
                  <div className="qmenu_icon w-full h-[140px] mb-2 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                      <svg className="w-16 h-16 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mt-[10px] mb-[5px] group-hover:text-black transition-colors duration-300">Lịch sử</h3>
                </a>
              </div>
              <div className="w-1/6 px-[10px] mb-4 relative flex-shrink-0">
                <a className="qmenu_card icon_card group block bg-[#f1f1f1] rounded-[50px_0px_50px_0px] min-h-[120px] p-4 text-center hover:bg-white hover:shadow-lg transition-all duration-300 no-underline" href="#">
                  <div className="qmenu_icon w-full h-[140px] mb-2 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                      <svg className="w-16 h-16 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mt-[10px] mb-[5px] group-hover:text-black transition-colors duration-300">Chứng nhận</h3>
                </a>
              </div>
              <div className="w-1/6 px-[10px] mb-4 relative flex-shrink-0">
                <a className="qmenu_card icon_card group block bg-[#f1f1f1] rounded-[0px_50px_0px_50px] min-h-[120px] p-4 text-center hover:bg-white hover:shadow-lg transition-all duration-300 no-underline" href="#">
                  <div className="qmenu_icon w-full h-[140px] mb-2 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                      <svg className="w-16 h-16 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mt-[10px] mb-[5px] group-hover:text-black transition-colors duration-300">Thành tích</h3>
                </a>
              </div>
              <div className="w-1/6 px-[10px] mb-4 relative flex-shrink-0">
                <a className="qmenu_card icon_card group block bg-[#f1f1f1] rounded-[50px_0px_50px_0px] min-h-[120px] p-4 text-center hover:bg-white hover:shadow-lg transition-all duration-300 no-underline" href="#">
                  <div className="qmenu_icon w-full h-[140px] mb-2 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                      <svg className="w-16 h-16 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mt-[10px] mb-[5px] group-hover:text-black transition-colors duration-300">Xã hội</h3>
                </a>
              </div>
              <div className="w-1/6 px-[10px] mb-4 relative flex-shrink-0">
                <a className="qmenu_card icon_card group block bg-[#f1f1f1] rounded-[0px_50px_0px_50px] min-h-[120px] p-4 text-center hover:bg-white hover:shadow-lg transition-all duration-300 no-underline" href="#">
                  <div className="qmenu_icon w-full h-[140px] mb-2 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-transparent group-hover:bg-[#f0ffbe] flex items-center justify-center transition-all duration-300">
                      <svg className="w-16 h-16 text-[#9a9a9a] group-hover:text-[#0b5739] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-[#9a9a9a] text-[20px] block text-center font-semibold mt-[10px] mb-[5px] group-hover:text-black transition-colors duration-300">Cơ sở</h3>
                </a>
              </div>
            </div>
          </section>
        </div>
        
        {/* Brand Section */}
        <div className="box-brand relative bg-gray-50 py-16" data-aos="fade-up" data-aos-duration="1200">
          <span className="brand-img-2 absolute top-10 right-10 w-20 h-20 opacity-20">
            <img src="https://cjfoods.com.vn/themes/nest/images/home-ver1/brand-img-2.svg" alt="" className="w-full h-full" />
          </span>
          <span className="brand-img-3 absolute bottom-10 left-10 w-16 h-16 opacity-20">
            <img src="https://cjfoods.com.vn/themes/nest/images/home-ver1/brand-img-3.svg" alt="" className="w-full h-full" />
          </span>
          <div className="container relative mx-auto px-5 w-[1400px] lg:w-[1200px] md:w-[900px]">
            <span className="brand-img-1 absolute top-0 left-0 w-24 h-24 opacity-20">
              <img src="https://cjfoods.com.vn/themes/nest/images/home-ver1/brand-img-1.svg" alt="" className="w-full h-full" />
            </span>
            <div className="text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
              <img className="logo-session mx-auto mb-4 w-32 h-auto" src="https://cjfoods.com.vn/themes/nest/images/cjfoods-logo.svg" alt="KSB Group" />
              <h2 className="text-6xl lg:text-7xl font-bold text-gray-800 mb-4">Thương hiệu tự hào</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-12" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="100">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <img src="https://cjfoods.com.vn/storage/2024-new-bibigo/website-new-bibigo-social-media-avarta-1.png" alt="Bibigo" className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Bibigo</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="200">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <img src="https://cjfoods.com.vn/storage/logo-brand/cj-logo-cautre.png" alt="Cầu Tre" className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Cầu Tre</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="300">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <img src="https://cjfoods.com.vn/storage/logo-brand/cj-logo-ohya.png" alt="Ohya" className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Ohya</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="400">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <img src="https://cjfoods.com.vn/storage/logo-brand/cj-logo-innerb.png" alt="Innerb" className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Innerb</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="500">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <img src="https://cjfoods.com.vn/storage/logo-brand/cj-logo-xedap.png" alt="Xe đạp" className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Xe đạp</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="600">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <img src="https://cjfoods.com.vn/storage/logo-brand/cj-logo-beksul-1.png" alt="Beksul" className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Beksul</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="700">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <img src="https://cjfoods.com.vn/storage/logo-brand/cj-logo-hetbahn.png" alt="Hetbahn" className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Hetbahn</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="800">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <img src="https://cjfoods.com.vn/storage/logo-brand/cj-logo-dasida.png" alt="Dasida" className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">Dasida</div>
                </a>
              </div>
              <div className="item text-center" data-aos="flip-up" data-aos-duration="800" data-aos-delay="900">
                <a href="#" className="block hover:scale-105 transition-transform duration-300">
                  <img src="https://cjfoods.com.vn/storage/logo-brand/logo-haechandle.png" alt="HAECHANDLE" className="w-40 h-40 mx-auto object-contain" />
                  <div className="name text-base font-medium text-gray-700 mt-3">HAECHANDLE</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
