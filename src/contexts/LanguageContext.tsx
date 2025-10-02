'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  vi: {
    // Header
    'nav.home': 'Trang chủ',
    'nav.about': 'Về chúng tôi',
    'nav.ecosystem': 'Hệ sinh thái',
    'nav.news': 'Tin tức',
    'nav.careers': 'Tuyển dụng',
    'nav.partners': 'Đối tác',
    'nav.contact': 'Liên hệ',
    
    // Footer
    'footer.company': 'CÔNG TY CỔ PHẦN TẬP ĐOÀN KSB',
    'footer.address': 'Địa chỉ',
    'footer.factory': 'Nhà máy',
    'footer.phone': 'Điện thoại',
    'footer.email': 'Email & Website',
    'footer.copyright': 'KSB Group. Tất cả quyền được bảo lưu',
    
    // Homepage - Banner
    'banner.title': 'KSB Group',
    'banner.subtitle': 'Dẫn đầu xu hướng, kiến tạo tương lai',
    'banner.description': 'Hệ sinh thái đa ngành với các lĩnh vực hoạt động chủ lực: Hóa - Mỹ phẩm, Sản xuất kẹo, Nhập khẩu & phân phối thực phẩm, hàng tiêu dùng.',
    
    // Homepage - Features
    'features.title': 'KSB Group – Hệ sinh thái kinh doanh đa ngành, vươn tầm dẫn đầu',
    'features.description': 'Xuất phát từ nền tảng vững trãi của Công ty TNHH XNK Thiên Thuận Phát, KSB Group đã không ngừng mở rộng và phát triển trong suốt hơn một thập kỷ qua. Chúng tôi tự hào sở hữu hệ sinh thái đa ngành gồm F&B, hóa - mỹ phẩm, sản xuất – phân phối thực phẩm và hàng tiêu dùng nhập khẩu, với mạng lưới hoạt động phủ rộng trên toàn quốc.',
    'features.quality.title': 'Chất lượng hàng đầu',
    'features.quality.desc': 'Cam kết mang đến sản phẩm và dịch vụ chất lượng cao nhất',
    'features.innovation.title': 'Đổi mới sáng tạo',
    'features.innovation.desc': 'Không ngừng nghiên cứu và phát triển công nghệ tiên tiến',
    'features.trust.title': 'Đáng tin cậy',
    'features.trust.desc': 'Xây dựng niềm tin với khách hàng và đối tác qua nhiều năm',
    
    // Services
    'services.title': 'Dịch vụ của chúng tôi',
    'services.description': 'Hóa - mỹ phẩm; Sản xuất kẹo; Nhập khẩu & phân phối thực phẩm, hàng tiêu dùng',
    'services.cosmetics.title': 'Hóa - Mỹ phẩm',
    'services.cosmetics.summary': 'Phát triển và phân phối các thương hiệu mỹ phẩm thiên nhiên cao cấp từ châu Âu.',
    'services.cosmetics.bullet1': 'Biofresh – thương hiệu mỹ phẩm thiên nhiên đến từ Bulgaria với dấu ấn khác biệt trên thị trường Việt Nam.',
    'services.cosmetics.bullet2': 'Sản phẩm chăm sóc da, chăm sóc cá nhân từ nguyên liệu thiên nhiên, an toàn và hiệu quả.',
    'services.cosmetics.bullet3': 'Phân phối đa kênh: hệ thống bán lẻ, siêu thị và thương mại điện tử.',
    'services.candy.title': 'Sản xuất kẹo',
    'services.candy.summary': 'Sản xuất và phát triển các dòng kẹo chất lượng cao với công nghệ hiện đại.',
    'services.candy.bullet1': 'Sản xuất kẹo với công nghệ tiên tiến, đảm bảo chất lượng và an toàn thực phẩm.',
    'services.candy.bullet2': 'Đa dạng sản phẩm: kẹo cứng, kẹo mềm, kẹo dẻo với nhiều hương vị độc đáo.',
    'services.candy.bullet3': 'Kiểm soát chất lượng nghiêm ngặt từ nguyên liệu đầu vào đến sản phẩm hoàn thiện.',
    'services.import.title': 'Nhập khẩu & phân phối thực phẩm, hàng tiêu dùng',
    'services.import.summary': 'Nhập khẩu và phân phối thực phẩm, hàng tiêu dùng chất lượng cao từ các thương hiệu quốc tế.',
    'services.import.bullet1': 'Nhập khẩu độc quyền các thương hiệu quốc tế như Choco Samjin (Hàn Quốc), sữa yến mạch Boring (New Zealand).',
    'services.import.bullet2': 'Phân phối đa dạng hàng tiêu dùng: thực phẩm, đồ uống, sản phẩm chăm sóc sức khỏe.',
    'services.import.bullet3': 'Hệ thống phân phối rộng khắp toàn quốc, đảm bảo nguồn gốc xuất xứ và chất lượng.',
    
    // News
    'news.title': 'Tin tức & Sự kiện',
    'news.description': 'Cập nhật những tin tức mới nhất về hoạt động và phát triển của KSB Group',
    'news.readMore': 'Đọc thêm',
    'news.viewAll': 'Xem tất cả tin tức',
    'news.latest': 'Tin tức mới nhất',
    
    // About Page
    'about.title': 'Về chúng tôi',
    'about.description': 'Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững.',
    'about.intro.title': 'Tập đoàn KSB - Nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững',
    'about.intro.content': 'Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh, kế thừa và phát triển từ tâm huyết của Công ty TNHH XNK Thiên Thuận Phát. Với hơn một thập kỷ miệt mài gieo trồng giá trị, chúng tôi đã vun đắp một hệ sinh thái kinh doanh bền vững, với những ngành nghề đa dạng trong các lĩnh vực khác nhau, vươn mình trở thành biểu tượng của sự uy tín và chất lượng.',
    'about.company.title': 'Sứ mệnh, Giá trị cốt lõi và Tầm nhìn',
    'about.company.content1': 'Từ nền tảng vững chắc của hoạt động buôn bán, bán lẻ và nhập khẩu độc quyền, KSB GROUP đã kiên cường kiến tạo vị thế dẫn đầu, đồng thời định hình một chuẩn mực mới trong ngành sản xuất bánh kẹo.',
    'about.company.content2': 'KSB đã chạm tới mọi miền đất nước, mở rộng tầm ảnh hưởng mạnh mẽ với hệ thống chi nhánh và cơ sở vật chất chiến lược trải dài. Chúng tôi không chỉ là đối tác nhập khẩu được tin cậy, mà còn là người kiến tạo nên những chuỗi giá trị vượt trội.',
    'about.company.content3': 'KSB cam kết không ngừng vươn xa, kiến tạo giá trị và khẳng định vững chắc vị thế quyền lực của một tập đoàn hàng đầu trên bản đồ kinh tế Việt Nam.',
    'about.vision.title': 'Tầm nhìn',
    'about.vision.subtitle': 'Tập đoàn đa quốc gia hàng đầu trong lĩnh vực sản xuất và phân phối',
    'about.vision.content': 'Trở thành tập đoàn đa quốc gia hàng đầu trong lĩnh vực sản xuất và phân phối các sản phẩm xanh, kết hợp nhập khẩu tinh hoa thế giới và xuất khẩu sản phẩm lành mạnh, góp phần nâng cao giá trị kinh tế và sức khỏe cho nhân loại.',
    'about.mission.title': 'Sứ mệnh',
    'about.mission.subtitle': 'Mang đến sản phẩm chất lượng cao, sáng tạo và bền vững',
    'about.mission.content': 'Chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng cao, sáng tạo và bền vững, được sản xuất và phân phối một cách chuyên nghiệp, góp phần xây dựng một giá trị thực về sức khỏe và kinh tế cho nhân loại.',
    'about.values.title': 'Giá trị cốt lõi',
    'about.values.subtitle': 'Kỉ luật, sáng tạo, bứt phá',
    'about.values.content': 'KSB GROUP phát triển dựa trên 3 giá trị cốt lõi: Kỉ luật, sáng tạo, bứt phá. Chúng tôi đề cao tính kỷ luật để đảm bảo sự chuyên nghiệp và hiệu quả; nuôi dưỡng tinh thần sáng tạo để không ngừng đổi mới, thích ứng với thị trường; và khát khao bứt phá để vươn xa, chinh phục những cột mốc lớn hơn mỗi ngày.',
    'about.ecosystem.title': 'Hệ sinh thái',
    'about.ecosystem.subtitle': 'Đa dạng lĩnh vực hoạt động',
    'about.ecosystem.content': 'KSB GROUP hoạt động đa dạng trong các lĩnh vực: Hóa - Mỹ phẩm, Xuất nhập khẩu thực phẩm & hàng tiêu dùng, và Thực phẩm đông lạnh. Với hệ thống chi nhánh và cơ sở vật chất chiến lược trải dài, chúng tôi kiến tạo nên những chuỗi giá trị vượt trội.',
    
    // Organization Chart
    'org.title': 'Sơ đồ tổ chức',
    'org.ceo': 'TỔNG GIÁM ĐỐC',
    'org.marketing.director': 'GIÁM ĐỐC MARKETING',
    'org.marketing.department': 'PHÒNG MARKETING',
    'org.customer.care': 'CHĂM SÓC KHÁCH HÀNG',
    'org.international.director': 'GIÁM ĐỐC KD QUỐC TẾ',
    'org.international.department': 'PHÒNG KD QUỐC TẾ',
    'org.production.director': 'GIÁM ĐỐC SẢN XUẤT',
    'org.production.department': 'PHÒNG SẢN XUẤT',
    'org.packaging.workshop': 'XƯỞNG ĐÓNG GÓI',
    'org.warehouse': 'KHO',
    'org.finance.director': 'GIÁM ĐỐC TÀI CHÍNH',
    'org.finance.department': 'PHÒNG TÀI CHÍNH',
    'org.accounting.department': 'PHÒNG KẾ TOÁN',
    'org.hr.director': 'GIÁM ĐỐC NHÂN SỰ',
    'org.hr.department': 'PHÒNG NHÂN SỰ',
    'org.admin.department': 'PHÒNG HÀNH CHÍNH',
    'org.operations.director': 'GIÁM ĐỐC ĐIỀU HÀNH',
    'org.north.director': 'GĐKD MIỀN BẮC',
    'org.central.director': 'GĐKD MIỀN TRUNG',
    'org.south.director': 'GĐKD MIỀN NAM',
    'org.asm': 'ASM',
    'org.sales': 'SALES',
    'org.npp': 'NPP',
    // Additional org chart items
    'org.north.region': 'VP. BẮC',
    'org.central.region': 'VP. TRUNG', 
    'org.south.region': 'VP. NAM',
    'org.hr.dept': 'P. NHÂN SỰ',
    'org.technical.dept': 'P. KỸ THUẬT',
    'org.accounting.dept': 'P. KẾ TOÁN',
    'org.warehouse.dept': 'KHO',
    'org.general.dept': 'P. TỔNG HỢP',
    
    // Contact Page
    'contact.title': 'Liên hệ',
    'contact.description': 'Liên hệ với chúng tôi để được tư vấn và hỗ trợ',
    'contact.form.name': 'Họ và tên',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Số điện thoại',
    'contact.form.message': 'Tin nhắn',
    'contact.form.submit': 'Gửi tin nhắn',
    'contact.info.title': 'Thông tin liên hệ',
    
    // Careers Page
    'careers.title': 'Tuyển dụng',
    'careers.description': 'Tham gia đội ngũ KSB Group - Nơi phát triển sự nghiệp của bạn',
    'careers.apply': 'Ứng tuyển ngay',
    'careers.viewDetails': 'Xem chi tiết',
    
    // Partners Page
    'partners.title': 'Đối tác',
    'partners.description': 'Những đối tác chiến lược của KSB Group trên toàn thế giới',
    
    // Ecosystem Page
    'ecosystem.title': 'Hệ sinh thái',
    'ecosystem.description': 'Khám phá hệ sinh thái đa ngành của KSB Group',
    
    // Common
    'common.readMore': 'Đọc thêm',
    'common.viewAll': 'Xem tất cả',
    'common.learnMore': 'Tìm hiểu thêm',
    'common.contact': 'Liên hệ',
    'common.loading': 'Đang tải...',
    'language.switch': 'Chuyển sang tiếng Anh',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.ecosystem': 'Ecosystem',
    'nav.news': 'News',
    'nav.careers': 'Careers',
    'nav.partners': 'Partners',
    'nav.contact': 'Contact',
    
    // Footer
    'footer.company': 'KSB GROUP JOINT STOCK COMPANY',
    'footer.address': 'Address',
    'footer.factory': 'Factory',
    'footer.phone': 'Phone',
    'footer.email': 'Email & Website',
    'footer.copyright': 'KSB Group. All rights reserved',
    
    // Homepage - Banner
    'banner.title': 'KSB Group',
    'banner.subtitle': 'Leading Trends, Building the Future',
    'banner.description': 'Multi-industry ecosystem with core business areas: Chemicals - Cosmetics, Candy Manufacturing, Import & Distribution of Food and Consumer Goods.',
    
    // Homepage - Features
    'features.title': 'KSB Group – Multi-industry Business Ecosystem, Aspiring to Lead',
    'features.description': 'Starting from the solid foundation of Thien Thuan Phat Import-Export Co., Ltd., KSB Group has continuously expanded and developed over more than a decade. We proudly own a multi-industry ecosystem including F&B, chemicals - cosmetics, food production - distribution and imported consumer goods, with an operational network covering the entire country.',
    'features.quality.title': 'Premium Quality',
    'features.quality.desc': 'Committed to delivering the highest quality products and services',
    'features.innovation.title': 'Innovation',
    'features.innovation.desc': 'Continuously researching and developing advanced technologies',
    'features.trust.title': 'Trustworthy',
    'features.trust.desc': 'Building trust with customers and partners over many years',
    
    // Services
    'services.title': 'Our Services',
    'services.description': 'Chemicals - Cosmetics; Candy Manufacturing; Import & Distribution of Food, Consumer Goods',
    'services.cosmetics.title': 'Chemicals - Cosmetics',
    'services.cosmetics.summary': 'Developing and distributing premium natural cosmetic brands from Europe.',
    'services.cosmetics.bullet1': 'Biofresh – natural cosmetic brand from Bulgaria with distinctive mark in Vietnamese market.',
    'services.cosmetics.bullet2': 'Skincare and personal care products from natural ingredients, safe and effective.',
    'services.cosmetics.bullet3': 'Multi-channel distribution: retail systems, supermarkets and e-commerce.',
    'services.candy.title': 'Candy Manufacturing',
    'services.candy.summary': 'Manufacturing and developing high-quality candy products with modern technology.',
    'services.candy.bullet1': 'Candy manufacturing with advanced technology, ensuring quality and food safety.',
    'services.candy.bullet2': 'Diverse products: hard candy, soft candy, gummy candy with unique flavors.',
    'services.candy.bullet3': 'Strict quality control from raw materials to finished products.',
    'services.import.title': 'Import & Distribution of Food, Consumer Goods',
    'services.import.summary': 'Importing and distributing high-quality food and consumer goods from international brands.',
    'services.import.bullet1': 'Exclusive import of international brands like Choco Samjin (Korea), Boring oat milk (New Zealand).',
    'services.import.bullet2': 'Distributing diverse consumer goods: food, beverages, health care products.',
    'services.import.bullet3': 'Nationwide distribution system, ensuring origin and quality.',
    
    // News
    'news.title': 'News & Events',
    'news.description': 'Stay updated with the latest news about KSB Group activities and developments',
    'news.readMore': 'Read more',
    'news.viewAll': 'View all news',
    'news.latest': 'Latest News',
    
    // About Page
    'about.title': 'About Us',
    'about.description': 'KSB Group proudly creates a solid foundation with a sustainable business ecosystem.',
    'about.intro.title': 'KSB Group - Solid Foundation with Sustainable Business Ecosystem',
    'about.intro.content': 'KSB Group proudly creates a solid foundation, inheriting and developing from the dedication of Thien Thuan Phat Import-Export Co., Ltd. With more than a decade of diligent value cultivation, we have nurtured a sustainable business ecosystem, with diverse industries in various fields, rising to become a symbol of prestige and quality.',
    'about.company.title': 'Mission, Core Values and Vision',
    'about.company.content1': 'From the solid foundation of trading, retail and exclusive import activities, KSB GROUP has persistently created a leading position, while defining a new standard in the candy manufacturing industry.',
    'about.company.content2': 'KSB has reached every region of the country, expanding its strong influence with a strategic system of branches and facilities spread across. We are not only a trusted import partner, but also a creator of superior value chains.',
    'about.company.content3': 'KSB is committed to continuously reaching far, creating value and firmly asserting the powerful position of a leading corporation on Vietnam economic map.',
    'about.vision.title': 'Vision',
    'about.vision.subtitle': 'Leading multinational corporation in production and distribution',
    'about.vision.content': 'To become a leading multinational corporation in the field of production and distribution of green products, combining world-class imports and healthy product exports, contributing to enhancing economic value and health for humanity.',
    'about.mission.title': 'Mission',
    'about.mission.subtitle': 'Delivering high-quality, innovative and sustainable products',
    'about.mission.content': 'We are committed to providing customers with high-quality, innovative and sustainable products, professionally manufactured and distributed, contributing to building real value for human health and economy.',
    'about.values.title': 'Core Values',
    'about.values.subtitle': 'Discipline, creativity, breakthrough',
    'about.values.content': 'KSB GROUP develops based on 3 core values: Discipline, creativity, breakthrough. We uphold discipline to ensure professionalism and efficiency; nurture creativity to continuously innovate and adapt to the market; and aspire to breakthrough to reach far, conquering bigger milestones every day.',
    'about.ecosystem.title': 'Ecosystem',
    'about.ecosystem.subtitle': 'Diverse business activities',
    'about.ecosystem.content': 'KSB GROUP operates diversely in various fields: Chemicals - Cosmetics, Food & Consumer Goods Import & Export, and Frozen Food. With a strategic system of branches and facilities spread across, we create superior value chains.',
    
    // Organization Chart
    'org.title': 'Organization Chart',
    'org.ceo': 'CHIEF EXECUTIVE OFFICER',
    'org.marketing.director': 'MARKETING DIRECTOR',
    'org.marketing.department': 'MARKETING DEPARTMENT',
    'org.customer.care': 'CUSTOMER CARE',
    'org.international.director': 'INTERNATIONAL BUSINESS DIRECTOR',
    'org.international.department': 'INTERNATIONAL BUSINESS DEPARTMENT',
    'org.production.director': 'PRODUCTION DIRECTOR',
    'org.production.department': 'PRODUCTION DEPARTMENT',
    'org.packaging.workshop': 'PACKAGING WORKSHOP',
    'org.warehouse': 'WAREHOUSE',
    'org.finance.director': 'FINANCE DIRECTOR',
    'org.finance.department': 'FINANCE DEPARTMENT',
    'org.accounting.department': 'ACCOUNTING DEPARTMENT',
    'org.hr.director': 'HUMAN RESOURCES DIRECTOR',
    'org.hr.department': 'HUMAN RESOURCES DEPARTMENT',
    'org.admin.department': 'ADMINISTRATION DEPARTMENT',
    'org.operations.director': 'OPERATIONS DIRECTOR',
    'org.north.director': 'NORTHERN REGION BUSINESS DIRECTOR',
    'org.central.director': 'CENTRAL REGION BUSINESS DIRECTOR',
    'org.south.director': 'SOUTHERN REGION BUSINESS DIRECTOR',
    'org.asm': 'ASM',
    'org.sales': 'SALES',
    'org.npp': 'NPP',
    // Additional org chart items
    'org.north.region': 'NORTHERN REGION',
    'org.central.region': 'CENTRAL REGION',
    'org.south.region': 'SOUTHERN REGION',
    'org.hr.dept': 'HR DEPT',
    'org.technical.dept': 'TECHNICAL DEPT',
    'org.accounting.dept': 'ACCOUNTING DEPT',
    'org.warehouse.dept': 'WAREHOUSE',
    'org.general.dept': 'GENERAL DEPT',
    
    // Contact Page
    'contact.title': 'Contact',
    'contact.description': 'Contact us for consultation and support',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone Number',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.info.title': 'Contact Information',
    
    // Careers Page
    'careers.title': 'Careers',
    'careers.description': 'Join KSB Group team - Where your career develops',
    'careers.apply': 'Apply Now',
    'careers.viewDetails': 'View Details',
    
    // Partners Page
    'partners.title': 'Partners',
    'partners.description': 'KSB Group strategic partners worldwide',
    
    // Ecosystem Page
    'ecosystem.title': 'Ecosystem',
    'ecosystem.description': 'Explore KSB Group multi-industry ecosystem',
    
    // Common
    'common.readMore': 'Read more',
    'common.viewAll': 'View all',
    'common.learnMore': 'Learn more',
    'common.contact': 'Contact',
    'common.loading': 'Loading...',
    'language.switch': 'Switch to Vietnamese',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('vi');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'vi' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
