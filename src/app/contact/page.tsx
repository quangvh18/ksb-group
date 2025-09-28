'use client';

import { useState } from "react";

export default function ContactPage() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const subjects = [
    "Phản hồi khách hàng về sản phẩm",
    "Đối tác cung ứng", 
    "Đối tác phân phối"
  ];

  return (
    <div>
      <main className="pt-[70px]">
        {/* Contact Form Section */}
        <div 
          className="box-form relative py-16 pb-32 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://cjfoods.com.vn/themes/nest/images/contact/bg-1.png')"
          }}
        >
          <div className="container mx-auto px-5 max-w-[1250px] lg:max-w-[1250px] md:max-w-[950px] w-full relative">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-7xl lg:text-9xl font-bold text-gray-800">Liên hệ</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Google Map Section - Left Side */}
              <div className="order-2 lg:order-1" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                <div className="w-full h-[700px] bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
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
              </div>
              
              {/* Contact Form Section - Right Side */}
              <div className="order-1 lg:order-2" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400">
                <form method="POST" action="#" acceptCharset="UTF-8" className="contact-form-style contact-form w-full h-[700px] bg-white/95 backdrop-blur-md rounded-2xl p-10 shadow-2xl border border-white/20 flex flex-col justify-between">
                  {/* Form Fields Container */}
                  <div className="flex-grow">
                    {/* Custom Select Dropdown */}
                    <div className="fake-select-form relative mb-6 z-10" data-aos="fade-up" data-aos-duration="800" data-aos-delay="600">
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
                        className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 cursor-pointer bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 text-base"
                      />
                      <div className="absolute right-4 text-gray-500 pointer-events-none">
                        <svg 
                          className="w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                    {showOptions && (
                      <ul className="option-select-form absolute top-full left-0 right-0 bg-white border-2 border-gray-200 rounded-xl mt-2 shadow-2xl z-[9999] overflow-hidden">
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
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-base font-semibold text-gray-700 mb-3">Họ và tên *</label>
                      <input 
                        type="text" 
                        placeholder="Nhập họ và tên" 
                        name="name" 
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 text-base"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-base font-semibold text-gray-700 mb-3">Số điện thoại *</label>
                      <input 
                        type="tel" 
                        placeholder="Nhập số điện thoại" 
                        name="phone" 
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 text-base"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6" data-aos="fade-up" data-aos-duration="800" data-aos-delay="700">
                    <label className="block text-base font-semibold text-gray-700 mb-3">Email *</label>
                    <input 
                      type="email" 
                      placeholder="Nhập địa chỉ email" 
                      name="email" 
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 text-base"
                      required
                    />
                  </div>
                  
                    <div className="mb-8" data-aos="fade-up" data-aos-duration="800" data-aos-delay="800">
                      <label className="block text-base font-semibold text-gray-700 mb-3">Nội dung liên hệ *</label>
                      <textarea 
                        placeholder="Mô tả chi tiết yêu cầu của bạn..." 
                        name="content" 
                        rows={4}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 resize-none text-base"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Button Container */}
                  <div className="flex justify-center" data-aos="fade-up" data-aos-duration="800" data-aos-delay="900">
                    <button 
                      className="text-white text-2xl font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-2xl transform hover:-translate-y-1"
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
                  
                  <div className="form-group text-center mt-6">
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
