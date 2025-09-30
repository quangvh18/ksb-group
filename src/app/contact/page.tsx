'use client';

import { useState } from "react";
import PageHeader from "../../components/PageHeader";

export default function ContactPage() {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Liên hệ", isActive: true }
  ];
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const subjects = [
    "Phản hồi khách hàng về sản phẩm",
    "Đối tác cung ứng", 
    "Đối tác phân phối"
  ];

  return (
    <div>
      <PageHeader 
        title="Liên hệ"
        description="Liên hệ với KSB Group để được tư vấn và hỗ trợ tốt nhất"
        breadcrumbItems={breadcrumbItems}
      />
      <main>
        {/* Contact Information Section */}
        <div className="bg-white py-16" data-aos="fade-up">
          <div className="container mx-auto px-5 max-w-[1250px] lg:max-w-[1250px] md:max-w-[950px]">
            <div className="text-center space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight" data-aos="fade-up" data-aos-delay="100">
                Thông tin liên hệ
              </h2>
              
              <p className="text-lg text-black leading-relaxed max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                KSB Group luôn sẵn sàng lắng nghe và hỗ trợ khách hàng. Hãy liên hệ với chúng tôi để được tư vấn và giải đáp mọi thắc mắc.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Cards Section */}
        <div className="bg-white py-16" data-aos="fade-up">
          <div className="container mx-auto px-5 max-w-[1250px] lg:max-w-[1250px] md:max-w-[950px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Contact Card 1 - Address */}
              <div className="w-full flex" data-aos="zoom-in" data-aos-delay="100">
                <div className="bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] hover:scale-105 cursor-pointer relative group">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-20 rounded-bl-full"></div>
                  
                  <div className="px-6 pt-6 pb-0 bg-white text-gray-800 border-b border-gray-200 flex-shrink-0 h-[160px] flex flex-col justify-center relative">
                    {/* Icon */}
                    <div className="absolute top-4 right-4 w-8 h-8 text-black transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-[#c9184a] text-center transition-all duration-300 group-hover:text-[#a0153a] group-hover:scale-110">
                      Địa chỉ
                    </h3>
                    <h5 className="text-sm font-medium text-black leading-relaxed h-[60px] flex items-center transition-all duration-300 group-hover:text-gray-700">
                      Trụ sở chính
                    </h5>
                  </div>
                  <div className="px-6 py-6 flex-1 flex flex-col justify-start bg-white">
                    <p className="text-sm leading-relaxed text-black text-left transition-all duration-300 group-hover:text-gray-800">
                      Tầng 4, căn V10-A01, KĐT Terra An Hưng, phố Nguyễn Thanh Bình, Phường La Khê, Quận Hà Đông, Thành phố Hà Nội, Việt Nam
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Card 2 - Phone */}
              <div className="w-full flex" data-aos="zoom-in" data-aos-delay="200">
                <div className="bg-white rounded-[0rem_3rem_0rem_3rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] hover:scale-105 cursor-pointer relative group">
                  {/* Decorative corner */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-white opacity-20 rounded-br-full"></div>
                  
                  <div className="px-6 pt-6 pb-0 bg-white text-gray-800 border-b border-gray-200 flex-shrink-0 h-[160px] flex flex-col justify-center relative">
                    {/* Icon */}
                    <div className="absolute top-4 right-4 w-8 h-8 text-black transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-[#c9184a] text-center transition-all duration-300 group-hover:text-[#a0153a] group-hover:scale-110">
                      Điện thoại
                    </h3>
                    <h5 className="text-sm font-medium text-black leading-relaxed h-[60px] flex items-center transition-all duration-300 group-hover:text-gray-700">
                      Hotline hỗ trợ
                    </h5>
                  </div>
                  <div className="px-6 py-6 flex-1 flex flex-col justify-start bg-white">
                    <p className="text-sm leading-relaxed text-black text-left transition-all duration-300 group-hover:text-gray-800">
                      <strong>Hotline:</strong> 19001181<br/>
                      <strong>Giờ làm việc:</strong> 8:00 - 17:30 (T2-T6)
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Card 3 - Email */}
              <div className="w-full flex" data-aos="zoom-in" data-aos-delay="300">
                <div className="bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full flex flex-col overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] hover:scale-105 cursor-pointer relative group">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-20 rounded-bl-full"></div>
                  
                  <div className="px-6 pt-6 pb-0 bg-white text-gray-800 border-b border-gray-200 flex-shrink-0 h-[160px] flex flex-col justify-center relative">
                    {/* Icon */}
                    <div className="absolute top-4 right-4 w-8 h-8 text-black transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-[#c9184a] text-center transition-all duration-300 group-hover:text-[#a0153a] group-hover:scale-110">
                      Email
                    </h3>
                    <h5 className="text-sm font-medium text-black leading-relaxed h-[60px] flex items-center transition-all duration-300 group-hover:text-gray-700">
                      Liên hệ trực tiếp
                    </h5>
                  </div>
                  <div className="px-6 py-6 flex-1 flex flex-col justify-start bg-white">
                    <p className="text-sm leading-relaxed text-black text-left transition-all duration-300 group-hover:text-gray-800">
                      <strong>Email chung:</strong> info@ksbgroup.vn<br/>
                      <strong>Hỗ trợ:</strong> support@ksbgroup.vn
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white py-16" data-aos="fade-up">
          <div className="container mx-auto px-5 max-w-[1250px] lg:max-w-[1250px] md:max-w-[950px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Contact Form - Left Side */}
              <div className="space-y-8 order-2 lg:order-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight" data-aos="fade-left" data-aos-delay="100">
                  Gửi yêu cầu liên hệ
                </h2>
                
                <p className="text-lg text-black leading-relaxed" data-aos="fade-left" data-aos-delay="200">
                  Điền thông tin vào form bên dưới để gửi yêu cầu liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                </p>
                
                <form method="POST" action="#" acceptCharset="UTF-8" className="space-y-6" data-aos="fade-left" data-aos-delay="300">
                  {/* Custom Select Dropdown */}
                  <div className="relative z-10">
                    <label className="block text-base font-semibold text-gray-700 mb-3">Loại yêu cầu *</label>
                    <div className="relative flex items-center">
                      <input 
                        type="text" 
                        name="subject" 
                        id="select-form" 
                        placeholder="Chọn nội dung"
                        value={selectedSubject}
                        readOnly
                        onClick={() => setShowOptions(!showOptions)}
                        className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 cursor-pointer bg-white transition-all duration-300 hover:border-gray-300 text-base"
                      />
                      <div className="absolute right-4 text-gray-500 pointer-events-none">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                    {showOptions && (
                      <ul className="absolute top-full left-0 right-0 bg-white border-2 border-gray-200 rounded-xl mt-2 shadow-2xl z-[9999] overflow-hidden">
                        {subjects.map((subject, index) => (
                          <li 
                            key={index}
                            className="px-4 py-4 hover:bg-orange-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-200 hover:text-orange-600 text-base"
                            onClick={() => {
                              setSelectedSubject(subject);
                              setShowOptions(false);
                            }}
                          >
                            {subject}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base font-semibold text-gray-700 mb-3">Họ và tên *</label>
                      <input 
                        type="text" 
                        placeholder="Nhập họ và tên" 
                        name="name" 
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all duration-300 hover:border-gray-300 text-base"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-base font-semibold text-gray-700 mb-3">Số điện thoại *</label>
                      <input 
                        type="tel" 
                        placeholder="Nhập số điện thoại" 
                        name="phone" 
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all duration-300 hover:border-gray-300 text-base"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-3">Email *</label>
                    <input 
                      type="email" 
                      placeholder="Nhập địa chỉ email" 
                      name="email" 
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all duration-300 hover:border-gray-300 text-base"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-3">Nội dung liên hệ *</label>
                    <textarea 
                      placeholder="Mô tả chi tiết yêu cầu của bạn..." 
                      name="content" 
                      rows={4}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all duration-300 hover:border-gray-300 resize-none text-base"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-center">
                    <button 
                      className="text-white text-xl font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-2xl transform hover:-translate-y-1"
                      type="submit"
                      style={{
                        border: 'none',
                        borderRadius: '12px',
                        background: 'linear-gradient(130deg, rgba(217, 37, 31, 1) 0%, rgba(233, 128, 30, 1) 100%)',
                        height: '60px',
                        minWidth: '220px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 25px rgba(217, 37, 31, 0.3)'
                      }}
                    >
                      <span className="mr-3">GỬI YÊU CẦU</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <div className="contact-message contact-success-message mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 hidden">
                      <div className="flex items-center justify-center text-lg">
                        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        Cảm ơn bạn! Yêu cầu của bạn đã được gửi thành công.
                      </div>
                    </div>
                    <div className="contact-message contact-error-message mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 hidden">
                      <div className="flex items-center justify-center text-lg">
                        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                        Đã xảy ra lỗi. Vui lòng thử lại sau.
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              
              {/* Map Section - Right Side */}
              <div className="order-1 lg:order-2" data-aos="fade-right" data-aos-delay="400">
                <div className="relative">
                  {/* Shadow div with same size and leaf style */}
                  <div className="absolute top-0 left-0 w-full h-full bg-[#e5989b] rounded-[3rem_0rem_3rem_0rem] transform translate-x-8 translate-y-8 z-0"></div>
                  
                  {/* Map with right and bottom offset */}
                  <div className="w-full h-[500px] bg-gray-200 rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] cursor-pointer relative z-10 overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d931.3695155271137!2d105.75554155645507!3d20.97346546758961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453005de9eab7%3A0x9050a578a1b5975e!2zVGhlIFRlcnJhIEFuIEjGsG5nIC0gVOG7kSBI4buvdSwgSMOgIMSQw7RuZw!5e0!3m2!1svi!2sus!4v1759060096856!5m2!1svi!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="KSB Group - Tầng 4, căn V10-A01, KĐT Terra An Hưng"
                    ></iframe>
                  </div>
                  
                  {/* Pink tint overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f4acb7]/10 to-transparent rounded-[3rem_0rem_3rem_0rem] z-20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
