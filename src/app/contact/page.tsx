'use client';

import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { getRequestTypes, submitContactRequest, RequestType, ContactRequestData } from "../../services/contactService";
import { useLanguage } from "../../contexts/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const breadcrumbItems = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.contact'), isActive: true }
  ];
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedRequestTypeId, setSelectedRequestTypeId] = useState<number | undefined>(undefined);
  const [showOptions, setShowOptions] = useState(false);
  const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    content: ''
  });

  // Load request types from API
  useEffect(() => {
    const loadRequestTypes = async () => {
      try {
        console.log('Loading request types...');
        const types = await getRequestTypes();
        console.log('Loaded request types:', types);
        setRequestTypes(types);
      } catch (error) {
        console.error('Error loading request types:', error);
      }
    };
    loadRequestTypes();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    // Validate required fields
    if (!selectedRequestTypeId) {
      setMessage({ type: 'error', text: 'Vui lòng chọn loại yêu cầu' });
      setIsLoading(false);
      return;
    }

    try {
      const contactData: ContactRequestData = {
        fullName: formData.name,
        phone: formData.phone,
        email: formData.email,
        content: formData.content,
        requestTypeId: selectedRequestTypeId
      };

      // Debug log to check data being sent
      console.log('Contact data being sent:', contactData);

      const messages = {
        contentLimitError: t('contact.form.content.limit'),
        successMessage: t('contact.success'),
        errorMessage: t('contact.error')
      };
      
      const result = await submitContactRequest(contactData, messages);
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        // Reset form
        setFormData({ name: '', phone: '', email: '', content: '' });
        setSelectedSubject('');
        setSelectedRequestTypeId(undefined);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch {
      setMessage({ type: 'error', text: t('contact.error') });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  return (
    <div className="overflow-x-hidden">
      <PageHeader 
        title={t('contact.title')}
        description={t('contact.description')}
        breadcrumbItems={breadcrumbItems}
      />
      <main>
        {/* Contact Information Section */}
        <div className="bg-white py-16" data-aos="fade-in">
          <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
            <div className="text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground leading-tight" data-aos="fade-in" data-aos-delay="100">
                {t('contact.info.title')}
              </h2>
              
              <p className="text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto" data-aos="fade-in" data-aos-delay="200">
                {t('contact.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Cards Section */}
        <div className="bg-white py-16" data-aos="fade-in">
          <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
            <div className="flex justify-center">
              <div className="w-full max-w-4xl" data-aos="fade-in" data-aos-delay="100">
                <div className="relative">
                  {/* Shadow div with same size and leaf style */}
                  <div className="absolute top-0 left-0 w-full h-full bg-[#f0f0f0] rounded-[3rem_0rem_3rem_0rem] transform translate-x-6 translate-y-6 z-0"></div>
                  
                  {/* Main contact card */}
                  <div className="bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] w-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] cursor-pointer relative z-10">
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-20 rounded-bl-full"></div>
                    
                    <div className="p-8 md:p-12">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Address Section */}
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-[#c9184a] mb-2">{t('footer.address')}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {t('footer.address.detail')}
                          </p>
                        </div>

                        {/* Phone Section */}
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-[#c9184a] mb-2">{t('footer.phone')}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {t('footer.phone.detail')}
                          </p>
                        </div>

                        {/* Email Section */}
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-[#c9184a] mb-2">Email</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {t('footer.email.general')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div id="contact-form" className="bg-white py-16" data-aos="fade-in">
          <div className="container mx-auto px-2 md:px-5 max-w-[1300px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Contact Form - Left Side */}
              <div className="space-y-8 order-2 lg:order-1">
                <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground leading-tight" data-aos="fade-in" data-aos-delay="100">
                  {t('contact.form.submit')}
                </h2>
                
                <p className="text-base text-muted-foreground leading-relaxed" data-aos="fade-in" data-aos-delay="200">
                  {t('contact.description')}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6" data-aos="fade-in" data-aos-delay="300">
                  {/* Custom Select Dropdown */}
                  <div className="relative z-10">
                    <label className="block text-base font-semibold text-gray-700 mb-3">{t('contact.form.subject')} *</label>
                    <div className="relative flex items-center">
                      <input 
                        type="text" 
                        name="subject" 
                        id="select-form" 
                        placeholder={t('contact.form.subject.placeholder')}
                        value={selectedSubject}
                        readOnly
                        onClick={() => setShowOptions(!showOptions)}
                        className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9184a] focus:border-[#c9184a] cursor-pointer bg-white transition-all duration-300 hover:border-[#c9184a] text-base"
                      />
                      <div className="absolute right-4 text-gray-500 pointer-events-none">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                    {showOptions && (
                      <ul className="absolute top-full left-0 right-0 bg-white border-2 border-gray-200 rounded-xl mt-2 shadow-2xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                        {requestTypes.map((type) => (
                          <li 
                            key={type.id}
                            className={`px-4 py-4 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-200 text-base ${
                              selectedRequestTypeId === type.id 
                                ? 'bg-[#c9184a] text-white' 
                                : 'hover:bg-red-50 hover:text-[#c9184a]'
                            }`}
                            onClick={() => {
                              setSelectedSubject(type.name);
                              setSelectedRequestTypeId(type.id);
                              setShowOptions(false);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <span>{type.name}</span>
                              {selectedRequestTypeId === type.id && (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                </svg>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base font-semibold text-gray-700 mb-3">{t('contact.form.name')} *</label>
                      <input 
                        type="text" 
                        placeholder={t('contact.form.name.placeholder')} 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9184a] focus:border-[#c9184a] bg-white transition-all duration-300 hover:border-[#c9184a] text-base"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-base font-semibold text-gray-700 mb-3">{t('contact.form.phone')} *</label>
                      <input 
                        type="tel" 
                        placeholder={t('contact.form.phone.placeholder')} 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9184a] focus:border-[#c9184a] bg-white transition-all duration-300 hover:border-[#c9184a] text-base"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-3">{t('contact.form.email')} *</label>
                    <input 
                      type="email" 
                      placeholder={t('contact.form.email.placeholder')} 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9184a] focus:border-[#c9184a] bg-white transition-all duration-300 hover:border-[#c9184a] text-base"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-3">{t('contact.form.message')} *</label>
                    <textarea 
                      placeholder={t('contact.form.message.placeholder')} 
                      name="content" 
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={4}
                      maxLength={255}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9184a] focus:border-[#c9184a] bg-white transition-all duration-300 hover:border-[#c9184a] resize-none text-base"
                      required
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {formData.content.length}/255 {t('contact.form.character.count')}
                    </div>
                  </div>
                  
                  {/* Selected Request Type Display */}
                  {selectedRequestTypeId && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-green-800 font-medium">
                          Loại yêu cầu đã chọn: <strong>{selectedSubject}</strong>
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <button 
                      type="submit"
                      disabled={isLoading || !selectedRequestTypeId}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#c9184a] hover:bg-[#a0153a] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold shadow transition-colors duration-300"
                    >
                      {isLoading ? t('contact.form.submitting') : t('contact.form.submit')}
                    </button>
                  </div>
                  
                  {message.text && (
                    <div className="text-center">
                      <div className={`mt-4 p-4 rounded-lg text-lg ${
                        message.type === 'success' 
                          ? 'bg-green-50 border border-green-200 text-green-700' 
                          : 'bg-red-50 border border-red-200 text-red-700'
                      }`}>
                        <div className="flex items-center justify-center">
                          {message.type === 'success' ? (
                            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                          )}
                          {message.text}
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
              
              {/* Map Section - Right Side */}
              <div className="order-1 lg:order-2" data-aos="fade-in" data-aos-delay="400">
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
                      title={`KSB Group - ${t('footer.address.detail')}`}
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
