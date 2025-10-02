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
    'footer.address.detail': 'Tầng 4, căn V10-A01, KĐT Terra An Hưng Phố Nguyễn Thanh Bình, Phường Dương Nội, TP Hà Nội, Việt Nam',
    'footer.factory': 'Nhà máy',
    'footer.factory.detail': 'Xã Phú Cường, Huyện Chí Linh, Tỉnh Hải Dương, Việt Nam',
    'footer.phone': 'Điện thoại',
    'footer.phone.detail': 'Hotline: 19001181',
    'footer.phone.hours': 'Giờ làm việc: 8:00 - 17:30 (T2-T6)',
    'footer.email': 'Email & Website',
    'footer.email.detail': 'Email: info@ksbgroup.vn',
    'footer.email.general': 'Email chung: info@ksbgroup.vn',
    'footer.email.support': 'Hỗ trợ: support@ksbgroup.vn',
    'footer.website.detail': 'Website: www.ksbgroup.vn',
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
    'contact.form.name.placeholder': 'Nhập họ và tên',
    'contact.form.email': 'Email',
    'contact.form.email.placeholder': 'Nhập email của bạn',
    'contact.form.phone': 'Số điện thoại',
    'contact.form.phone.placeholder': 'Nhập số điện thoại',
    'contact.form.subject': 'Chủ đề',
    'contact.form.subject.placeholder': 'Chọn chủ đề liên hệ',
    'contact.form.message': 'Tin nhắn',
    'contact.form.message.placeholder': 'Nhập nội dung tin nhắn của bạn...',
    'contact.form.submit': 'Gửi tin nhắn',
    'contact.form.submitting': 'Đang gửi...',
    'contact.info.title': 'Thông tin liên hệ',
    'contact.success': 'Gửi tin nhắn thành công!',
    'contact.error': 'Có lỗi xảy ra. Vui lòng thử lại sau.',
    'contact.form.character.count': 'ký tự',
    'contact.form.content.limit': 'Nội dung không được vượt quá 255 ký tự',
    
    // Careers Page
    'careers.title': 'Tuyển dụng',
    'careers.description': 'Tham gia đội ngũ KSB Group - Nơi phát triển sự nghiệp của bạn',
    'careers.apply': 'Ứng tuyển ngay',
    'careers.viewDetails': 'Xem chi tiết',
    'careers.banner.title': 'Tham gia cùng chúng tôi',
    'careers.banner.subtitle': 'KSB GROUP sáng tạo nét văn hóa nhằm đóng góp vào cuộc sống thêm sức khỏe, niềm vui và tiện lợi. Nếu điều này nói lên đúng những gì bạn đang cần tìm cho công việc của mình, vậy bạn còn chần chừ gì không tham gia cùng chúng tôi?',
    'careers.banner.description': 'KSB luôn rộng cửa chào đón những tài năng ở mọi nơi. Chúng tôi tin rằng mỗi cá nhân đều có thể đóng góp giá trị độc đáo cho sự phát triển của tập đoàn.',
    'careers.culture.title': 'Văn hóa làm việc tại KSB GROUP',
    'careers.culture.subtitle': 'Tại KSB GROUP, chúng tôi tin rằng con người là tài sản giá trị nhất. Với các giá trị cốt lõi "Tử tế – Sáng tạo – Nhiệt huyết – Ước mơ lớn", chúng tôi xây dựng một môi trường làm việc truyền cảm hứng, nơi mỗi cá nhân đều có cơ hội phát triển tối đa năng lực, đồng thời tạo ra những giá trị tích cực và bền vững cho xã hội.',
    'careers.culture.innovation': 'Đổi mới sáng tạo',
    'careers.culture.innovation.desc': 'Khuyến khích tư duy sáng tạo và ứng dụng công nghệ tiên tiến',
    'careers.culture.teamwork': 'Tinh thần đồng đội',
    'careers.culture.teamwork.desc': 'Hợp tác chặt chẽ, hỗ trợ lẫn nhau để đạt mục tiêu chung',
    'careers.culture.development': 'Phát triển bản thân',
    'careers.culture.development.desc': 'Cơ hội học hỏi và phát triển kỹ năng không ngừng',
    'careers.culture.balance': 'Cân bằng cuộc sống',
    'careers.culture.balance.desc': 'Môi trường làm việc linh hoạt, quan tâm đến sức khỏe nhân viên',
    
    // Vision Section
    'careers.vision.title': 'Tầm nhìn về con người',
    'careers.vision.subtitle': 'Tại KSB GROUP, chúng tôi tin rằng con người là tài sản giá trị nhất. Với các giá trị cốt lõi "Tử tế – Sáng tạo – Nhiệt huyết – Ước mơ lớn", chúng tôi xây dựng một môi trường làm việc truyền cảm hứng.',
    'careers.vision.ecosystem.title': 'Kiến tạo hệ sinh thái',
    'careers.vision.ecosystem.content': 'Chúng tôi xây dựng một môi trường làm việc truyền cảm hứng, nơi mỗi cá nhân đều có cơ hội phát triển tối đa năng lực, đồng thời tạo ra những giá trị tích cực và bền vững cho xã hội.',
    'careers.vision.dreams.title': 'Chắp cánh ước mơ lớn',
    'careers.vision.dreams.content': 'Chúng tôi trân trọng sự đa dạng trong đội ngũ, đề cao tinh thần chủ động và tinh thần doanh chủ, để cùng nhau hiện thực hóa mục tiêu đưa các tinh hoa toàn cầu đến gần hơn với người tiêu dùng Việt.',
    
    // Core Values Cards
    'careers.values.shareholders.title': 'Với Cổ đông',
    'careers.values.shareholders.subtitle': 'Minh bạch và bền vững',
    'careers.values.shareholders.content': 'Minh bạch, trung thực và luôn hướng đến giá trị phát triển bền vững',
    'careers.values.customers.title': 'Với Khách hàng',
    'careers.values.customers.subtitle': 'Chất lượng và sáng tạo',
    'careers.values.customers.content': 'Sản phẩm – dịch vụ chất lượng cao, sáng tạo và phù hợp với nhu cầu thực tiễn',
    'careers.values.partners.title': 'Với Đối tác',
    'careers.values.partners.subtitle': 'Hợp tác và tôn trọng',
    'careers.values.partners.content': 'Tinh thần hợp tác, tôn trọng lẫn nhau và cùng tạo giá trị bền vững',
    'careers.values.internal.title': 'Nội bộ',
    'careers.values.internal.subtitle': 'Bứt phá và sáng tạo',
    'careers.values.internal.content': 'Tinh thần bứt phá, sáng tạo, kỷ luật, hợp tác và hiệu quả',
    'careers.positions.title': 'Vị trí đang tuyển dụng',
    'careers.positions.subtitle': 'Tìm kiếm cơ hội phù hợp với kỹ năng và đam mê của bạn',
    'careers.contact.title': 'Ứng tuyển ngay',
    'careers.contact.subtitle': 'Phòng nhân sự công ty',
    'careers.viewJobs': 'XEM TUYỂN DỤNG',
    
    // Partners Page
    'partners.title': 'Đối tác',
    'partners.description': 'Những đối tác chiến lược của KSB Group trên toàn thế giới',
    'partners.intro.title': 'Đối tác chiến lược toàn cầu',
    'partners.intro.description': 'KSB GROUP tự hào là đối tác chiến lược của nhiều thương hiệu uy tín đến từ Hàn Quốc, châu Âu và các quốc gia phát triển khác. Mạng lưới đối tác quốc tế rộng khắp giúp chúng tôi không ngừng nâng cao chất lượng sản phẩm, dịch vụ và mang lại giá trị bền vững cho cộng đồng người tiêu dùng Việt.',
    'partners.interactive.title': 'Tại sao nên hợp tác cùng KSB Group?',
    'partners.interactive.subtitle': 'Khám phá những lợi thế cạnh tranh và cơ hội phát triển bền vững khi trở thành đối tác của KSB Group',
    'partners.growth.title': 'Tăng trưởng ổn định, bền vững',
    'partners.growth.description': 'Với tốc độ tăng trưởng ổn định qua nhiều năm, KSB Group đã chứng minh được năng lực và tiềm năng phát triển bền vững. Chúng tôi cam kết mang lại lợi ích lâu dài cho tất cả các đối tác.',
    'partners.operations.title': 'Quy mô vận hành toàn diện',
    'partners.operations.description': 'Hệ thống vận hành quy mô lớn với mạng lưới phân phối rộng khắp toàn quốc, đảm bảo hiệu quả cao trong việc đưa sản phẩm đến tay người tiêu dùng.',
    'partners.ecosystem.title': 'Hệ sinh thái đa ngành, đa thương hiệu',
    'partners.ecosystem.description': 'Hệ sinh thái kinh doanh đa dạng từ F&B, hóa mỹ phẩm đến sản xuất và phân phối, tạo ra nhiều cơ hội hợp tác và phát triển chéo.',
    'partners.strategic.title': 'Các đối tác chiến lược',
    'partners.strategic.subtitle': 'Mạng lưới đối tác quốc tế rộng khắp giúp chúng tôi không ngừng nâng cao chất lượng sản phẩm, dịch vụ và mang lại giá trị bền vững cho cộng đồng người tiêu dùng Việt.',
    'partners.opportunities.title': 'Cơ hội hợp tác',
    'partners.opportunities.subtitle': 'KSB GROUP sẵn sàng đồng hành cùng các đối tác trong và ngoài nước để kiến tạo hệ sinh thái phát triển bền vững và mở rộng quy mô toàn diện.',
    'partners.global.title': 'Nhà sản xuất & thương hiệu toàn cầu',
    'partners.global.description': 'Muốn phát triển tại thị trường Việt Nam',
    'partners.domestic.title': 'Doanh nghiệp nội địa',
    'partners.domestic.description': 'Mong muốn đồng hành về sản phẩm, công nghệ, chuỗi cung ứng',
    'partners.franchise.title': 'Đối tác nhượng quyền',
    'partners.franchise.description': 'Trong các lĩnh vực F&B, mỹ phẩm, tiêu dùng nhanh',
    'partners.contact.title': 'Liên hệ hợp tác',
    'partners.contact.department': 'Phòng Phát triển Đối tác – KSB GROUP',
    'partners.contact.button': 'Liên hệ ngay',
    'careers.contact.button': 'Gửi ứng tuyển',
    'careers.contact.address': 'Tầng 4, căn V10-A01, KĐT Terra An Hưng Phố Nguyễn Thanh Bình, Phường Dương Nội, TP Hà Nội, Việt Nam',
    'careers.contact.phone': '(028) 3828 2581',
    'careers.contact.email': 'hr@ksbgroup.vn',
    
    // Partners Interactive Details
    'partners.revenue2022': 'Doanh thu 2022',
    'partners.revenue2022.desc': '604 tỷ VNĐ - Nền tảng vững chắc, khởi đầu cho hành trình phát triển bền vững',
    'partners.revenue2023': 'Doanh thu 2023', 
    'partners.revenue2023.desc': '710 tỷ VNĐ (+17,5%) - Tăng trưởng ấn tượng, khẳng định vị thế trong thị trường',
    'partners.revenue2024': 'Doanh thu 2024',
    'partners.revenue2024.desc': '850 tỷ VNĐ (+19,7%) - Duy trì tốc độ phát triển mạnh mẽ qua từng năm',
    'partners.branches': 'Hệ thống chi nhánh',
    'partners.branches.desc': '3 chi nhánh chiến lược tại Hà Nội, Hải Dương và TP. Hồ Chí Minh',
    'partners.infrastructure': 'Cơ sở hạ tầng logistics',
    'partners.infrastructure.desc': '12.000m² kho hàng tiêu chuẩn, 15 phương tiện vận tải chủ động giao hàng toàn quốc',
    'partners.distribution': 'Mạng lưới phân phối',
    'partners.distribution.desc': '85 nhà phân phối cấp 1 trải dài 63 tỉnh thành, phủ kín hệ thống siêu thị lớn và chuỗi cửa hàng tiện lợi',
    'partners.fnb': 'F&B',
    'partners.fnb.desc': 'Bonchon, Trung Nguyên Legend Cafe - Thương hiệu F&B hàng đầu, tạo trải nghiệm ẩm thực đẳng cấp',
    'partners.cosmetics.title': 'Mỹ phẩm & chăm sóc cá nhân',
    'partners.cosmetics.desc': 'Biofresh và các dòng mỹ phẩm nhập khẩu cao cấp từ châu Âu, đáp ứng nhu cầu làm đẹp hiện đại',
    'partners.food.title': 'Sản xuất - phân phối thực phẩm',
    'partners.food.desc': 'Choco Samjin, Ecobin, Bách Mộc An, KangNam - Mô hình đa ngành tối ưu nguồn lực, chủ động chuỗi cung ứng',
    
    // Ecosystem Page
    'ecosystem.title': 'Hệ sinh thái',
    'ecosystem.description': 'Khám phá hệ sinh thái đa dạng của KSB Group với các thương hiệu, dịch vụ và giải pháp toàn diện',
    'ecosystem.brands.title': 'Các thương hiệu',
    'ecosystem.brands.subtitle': 'Danh mục thương hiệu đa dạng trong hệ sinh thái KSB Group',
    'ecosystem.services.title': 'Dịch vụ',
    'ecosystem.services.subtitle': 'Các dịch vụ chuyên nghiệp và giải pháp toàn diện',
    'ecosystem.solutions.title': 'Giải pháp',
    'ecosystem.solutions.subtitle': 'Giải pháp tối ưu cho từng ngành nghề và lĩnh vực',
    
    // News Page
    'news.title': 'Tin tức',
    'news.description': 'Cập nhật tin tức mới nhất về KSB Group và ngành thực phẩm',
    'news.latest': 'Tin tức mới nhất',
    'news.readMore': 'Đọc thêm',
    'news.backToNews': 'Quay lại tin tức',
    'news.relatedNews': 'Tin tức liên quan',
    'news.noNews': 'Không có tin tức nào',
    'news.loadMore': 'Tải thêm',
    'news.category.all': 'Tất cả',
    'news.category.company': 'Tin công ty',
    'news.category.industry': 'Tin ngành',
    'news.category.events': 'Sự kiện',
    
    // Job Listings
    'jobs.title': 'Vị trí đang tuyển dụng',
    'jobs.subtitle': 'Tìm kiếm cơ hội nghề nghiệp phù hợp với bạn',
    'jobs.search.title': 'Tìm kiếm việc làm',
    'jobs.search.subtitle': 'Khám phá cơ hội nghề nghiệp phù hợp với bạn',
    'jobs.search.placeholder': 'Tìm kiếm vị trí...',
    'jobs.search.position': 'Tên vị trí',
    'jobs.search.workArea': 'Khu vực làm việc',
    'jobs.search.button': 'Tìm kiếm',
    'jobs.search.reset': 'Đặt lại',
    'jobs.searching': 'Đang tìm...',
    'jobs.location.all': 'Tất cả khu vực',
    'jobs.location.placeholder': 'Chọn nơi làm việc',
    'jobs.location.hanoi': 'Hà Nội',
    'jobs.location.haiduong': 'Hải Dương',
    'jobs.location.haiphong': 'Hải Phòng',
    'jobs.location.danang': 'Đà Nẵng',
    'jobs.location.hcm': 'TP HCM',
    'jobs.apply': 'Ứng tuyển',
    'jobs.viewDetails': 'Xem chi tiết',
    'jobs.noJobs': 'Không có vị trí nào phù hợp',
    'jobs.loading': 'Đang tải...',
    'jobs.error': 'Có lỗi xảy ra khi tải dữ liệu',
    
    // Job Card Labels
    'jobs.card.position': 'Vị trí',
    'jobs.card.workArea': 'Khu vực làm việc',
    'jobs.card.description': 'Mô tả công việc',
    
    // Common
    'common.loading': 'Đang tải...',
    'common.error': 'Có lỗi xảy ra',
    'common.retry': 'Thử lại',
    'common.close': 'Đóng',
    'common.save': 'Lưu',
    'common.cancel': 'Hủy',
    'common.confirm': 'Xác nhận',
    'common.yes': 'Có',
    'common.no': 'Không',
    
    // Common
    'common.readMore': 'Đọc thêm',
    'common.viewAll': 'Xem tất cả',
    'common.learnMore': 'Tìm hiểu thêm',
    
    // Page Metadata
    'meta.home.title': 'KSB Group - Dẫn đầu xu hướng, kiến tạo tương lai',
    'meta.home.description': 'Hệ sinh thái đa ngành với các lĩnh vực hoạt động chủ lực: Hóa - Mỹ phẩm, Sản xuất kẹo, Nhập khẩu & phân phối thực phẩm, hàng tiêu dùng.',
    'meta.about.title': 'Về chúng tôi - KSB Group',
    'meta.about.description': 'Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững.',
    'meta.news.title': 'Tin tức - KSB Group',
    'meta.news.description': 'Cập nhật tin tức mới nhất về KSB Group và ngành thực phẩm',
    'meta.careers.title': 'Tuyển dụng - KSB Group',
    'meta.careers.description': 'Tham gia đội ngũ KSB Group - Nơi phát triển sự nghiệp của bạn',
    'meta.partners.title': 'Đối tác - KSB Group',
    'meta.partners.description': 'Những đối tác chiến lược của KSB Group trên toàn thế giới',
    'meta.contact.title': 'Liên hệ - KSB Group',
    'meta.contact.description': 'Liên hệ với KSB Group để được tư vấn và hỗ trợ tốt nhất',
    'meta.ecosystem.title': 'Hệ sinh thái - KSB Group',
    'meta.ecosystem.description': 'Khám phá hệ sinh thái đa dạng của KSB Group với các thương hiệu, dịch vụ và giải pháp toàn diện',
    'common.contact': 'Liên hệ',
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
    'footer.address.detail': 'Floor 4, V10-A01, Terra An Hung New Urban Area, Nguyen Thanh Binh Street, Duong Noi Ward, Hanoi, Vietnam',
    'footer.factory': 'Factory',
    'footer.factory.detail': 'Phu Cuong Commune, Chi Linh District, Hai Duong Province, Vietnam',
    'footer.phone': 'Phone',
    'footer.phone.detail': 'Hotline: 19001181',
    'footer.phone.hours': 'Working hours: 8:00 - 17:30 (Mon-Fri)',
    'footer.email': 'Email & Website',
    'footer.email.detail': 'Email: info@ksbgroup.vn',
    'footer.email.general': 'General email: info@ksbgroup.vn',
    'footer.email.support': 'Support: support@ksbgroup.vn',
    'footer.website.detail': 'Website: www.ksbgroup.vn',
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
    
    // News (moved to News Page section)
    
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
    'contact.form.name.placeholder': 'Enter your full name',
    'contact.form.email': 'Email',
    'contact.form.email.placeholder': 'Enter your email',
    'contact.form.phone': 'Phone Number',
    'contact.form.phone.placeholder': 'Enter your phone number',
    'contact.form.subject': 'Subject',
    'contact.form.subject.placeholder': 'Select contact subject',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Enter your message content...',
    'contact.form.submit': 'Send Message',
    'contact.form.submitting': 'Sending...',
    'contact.info.title': 'Contact Information',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'An error occurred. Please try again later.',
    'contact.form.character.count': 'characters',
    'contact.form.content.limit': 'Content must not exceed 255 characters',
    
    // Careers Page
    'careers.title': 'Careers',
    'careers.description': 'Join KSB Group team - Where your career develops',
    'careers.apply': 'Apply Now',
    'careers.viewDetails': 'View Details',
    'careers.banner.title': 'Join Our Team',
    'careers.banner.subtitle': 'KSB GROUP creates a culture aimed at contributing to life with more health, joy and convenience. If this speaks to exactly what you are looking for in your work, then what are you waiting for to join us?',
    'careers.banner.description': 'KSB always welcomes talents from everywhere. We believe that each individual can contribute unique value to the development of the group.',
    'careers.culture.title': 'Work Culture at KSB GROUP',
    'careers.culture.subtitle': 'At KSB GROUP, we believe that people are our most valuable asset. With our core values "Kindness - Creativity - Passion - Big Dreams", we build an inspiring work environment where every individual has the opportunity to maximize their potential while creating positive and sustainable values for society.',
    'careers.culture.innovation': 'Innovation',
    'careers.culture.innovation.desc': 'Encouraging creative thinking and applying advanced technology',
    'careers.culture.teamwork': 'Teamwork Spirit',
    'careers.culture.teamwork.desc': 'Close collaboration, mutual support to achieve common goals',
    'careers.culture.development': 'Personal Development',
    'careers.culture.development.desc': 'Opportunities for continuous learning and skill development',
    'careers.culture.balance': 'Work-Life Balance',
    'careers.culture.balance.desc': 'Flexible work environment, caring for employee health',
    
    // Vision Section
    'careers.vision.title': 'Our Vision for People',
    'careers.vision.subtitle': 'At KSB GROUP, we believe that people are our most valuable asset. With our core values "Kindness - Creativity - Passion - Big Dreams", we build an inspiring work environment.',
    'careers.vision.ecosystem.title': 'Building an Ecosystem',
    'careers.vision.ecosystem.content': 'We create an inspiring work environment where every individual has the opportunity to maximize their potential, while generating positive and sustainable values for society.',
    'careers.vision.dreams.title': 'Empowering Big Dreams',
    'careers.vision.dreams.content': 'We value diversity in our team, promote proactive spirit and entrepreneurship, to together realize the goal of bringing global excellence closer to Vietnamese consumers.',
    
    // Core Values Cards
    'careers.values.shareholders.title': 'To Shareholders',
    'careers.values.shareholders.subtitle': 'Transparent and sustainable',
    'careers.values.shareholders.content': 'Transparent, honest and always oriented towards sustainable development values',
    'careers.values.customers.title': 'To Customers',
    'careers.values.customers.subtitle': 'Quality and innovation',
    'careers.values.customers.content': 'High-quality products and services, creative and suitable for practical needs',
    'careers.values.partners.title': 'To Partners',
    'careers.values.partners.subtitle': 'Cooperation and respect',
    'careers.values.partners.content': 'Spirit of cooperation, mutual respect and creating sustainable values together',
    'careers.values.internal.title': 'Internal',
    'careers.values.internal.subtitle': 'Breakthrough and innovation',
    'careers.values.internal.content': 'Spirit of breakthrough, creativity, discipline, cooperation and efficiency',
    'careers.positions.title': 'Open Positions',
    'careers.positions.subtitle': 'Find opportunities that match your skills and passion',
    'careers.contact.title': 'Apply Now',
    'careers.contact.subtitle': 'Human Resources Department',
    'careers.viewJobs': 'VIEW JOBS',
    
    // Partners Page
    'partners.title': 'Partners',
    'partners.description': 'KSB Group strategic partners worldwide',
    'partners.intro.title': 'Global Strategic Partners',
    'partners.intro.description': 'KSB GROUP is proud to be a strategic partner of many prestigious brands from South Korea, Europe and other developed countries. Our extensive international partner network helps us continuously improve product and service quality and bring sustainable value to the Vietnamese consumer community.',
    'partners.interactive.title': 'Why Partner with KSB Group?',
    'partners.interactive.subtitle': 'Discover competitive advantages and sustainable development opportunities when becoming a partner of KSB Group',
    'partners.growth.title': 'Stable, Sustainable Growth',
    'partners.growth.description': 'With stable growth over many years, KSB Group has proven its capacity and potential for sustainable development. We are committed to bringing long-term benefits to all partners.',
    'partners.operations.title': 'Comprehensive Operating Scale',
    'partners.operations.description': 'Large-scale operating system with nationwide distribution network, ensuring high efficiency in delivering products to consumers.',
    'partners.ecosystem.title': 'Multi-industry, Multi-brand Ecosystem',
    'partners.ecosystem.description': 'Diverse business ecosystem from F&B, cosmetics to manufacturing and distribution, creating multiple cooperation and cross-development opportunities.',
    'partners.strategic.title': 'Strategic Partners',
    'partners.strategic.subtitle': 'Our extensive international partner network helps us continuously improve product and service quality and bring sustainable value to the Vietnamese consumer community.',
    'partners.opportunities.title': 'Partnership Opportunities',
    'partners.opportunities.subtitle': 'KSB GROUP is ready to accompany domestic and international partners to create a sustainable development ecosystem and comprehensive scale expansion.',
    'partners.global.title': 'Global Manufacturers & Brands',
    'partners.global.description': 'Want to develop in the Vietnamese market',
    'partners.domestic.title': 'Domestic Enterprises',
    'partners.domestic.description': 'Desire to collaborate on products, technology, supply chain',
    'partners.franchise.title': 'Franchise Partners',
    'partners.franchise.description': 'In F&B, cosmetics, fast-moving consumer goods sectors',
    'partners.contact.title': 'Partnership Contact',
    'partners.contact.department': 'Partner Development Department – KSB GROUP',
    'partners.contact.button': 'Contact Now',
    'careers.contact.button': 'Submit Application',
    'careers.contact.address': 'Floor 4, V10-A01, Terra An Hung New Urban Area, Nguyen Thanh Binh Street, Duong Noi Ward, Hanoi, Vietnam',
    'careers.contact.phone': '(028) 3828 2581',
    'careers.contact.email': 'hr@ksbgroup.vn',
    
    // Partners Interactive Details
    'partners.revenue2022': 'Revenue 2022',
    'partners.revenue2022.desc': '604 billion VND - Solid foundation, starting the sustainable development journey',
    'partners.revenue2023': 'Revenue 2023',
    'partners.revenue2023.desc': '710 billion VND (+17.5%) - Impressive growth, affirming market position',
    'partners.revenue2024': 'Revenue 2024',
    'partners.revenue2024.desc': '850 billion VND (+19.7%) - Maintaining strong development momentum year by year',
    'partners.branches': 'Branch System',
    'partners.branches.desc': '3 strategic branches in Hanoi, Hai Duong and Ho Chi Minh City',
    'partners.infrastructure': 'Logistics Infrastructure',
    'partners.infrastructure.desc': '12,000m² standard warehouse, 15 active transport vehicles for nationwide delivery',
    'partners.distribution': 'Distribution Network',
    'partners.distribution.desc': '85 tier-1 distributors across 63 provinces, covering major supermarket systems and convenience store chains',
    'partners.fnb': 'F&B',
    'partners.fnb.desc': 'Bonchon, Trung Nguyen Legend Cafe - Leading F&B brands, creating premium culinary experiences',
    'partners.cosmetics.title': 'Cosmetics & Personal Care',
    'partners.cosmetics.desc': 'Biofresh and premium imported cosmetic lines from Europe, meeting modern beauty needs',
    'partners.food.title': 'Food Production - Distribution',
    'partners.food.desc': 'Choco Samjin, Ecobin, Bach Moc An, KangNam - Multi-industry model optimizing resources, proactive supply chain',
    
    // Ecosystem Page
    'ecosystem.title': 'Ecosystem',
    'ecosystem.description': 'Explore KSB Group diverse ecosystem with comprehensive brands, services and solutions',
    'ecosystem.brands.title': 'Brands',
    'ecosystem.brands.subtitle': 'Diverse brand portfolio within KSB Group ecosystem',
    'ecosystem.services.title': 'Services',
    'ecosystem.services.subtitle': 'Professional services and comprehensive solutions',
    'ecosystem.solutions.title': 'Solutions',
    'ecosystem.solutions.subtitle': 'Optimal solutions for every industry and field',
    
    // News Page
    'news.title': 'News',
    'news.description': 'Latest updates about KSB Group and food industry',
    'news.latest': 'Latest News',
    'news.readMore': 'Read More',
    'news.backToNews': 'Back to News',
    'news.relatedNews': 'Related News',
    'news.noNews': 'No news available',
    'news.loadMore': 'Load More',
    'news.category.all': 'All',
    'news.category.company': 'Company News',
    'news.category.industry': 'Industry News',
    'news.category.events': 'Events',
    
    // Job Listings
    'jobs.title': 'Open Positions',
    'jobs.subtitle': 'Find career opportunities that match you',
    'jobs.search.title': 'Job Search',
    'jobs.search.subtitle': 'Discover career opportunities that match you',
    'jobs.search.placeholder': 'Search positions...',
    'jobs.search.position': 'Position Name',
    'jobs.search.workArea': 'Work Area',
    'jobs.search.button': 'Search',
    'jobs.search.reset': 'Reset',
    'jobs.searching': 'Searching...',
    'jobs.location.all': 'All Areas',
    'jobs.location.placeholder': 'Select work location',
    'jobs.location.hanoi': 'Hanoi',
    'jobs.location.haiduong': 'Hai Duong',
    'jobs.location.haiphong': 'Hai Phong',
    'jobs.location.danang': 'Da Nang',
    'jobs.location.hcm': 'Ho Chi Minh City',
    'jobs.apply': 'Apply',
    'jobs.viewDetails': 'View Details',
    'jobs.noJobs': 'No matching positions found',
    'jobs.loading': 'Loading...',
    'jobs.error': 'Error loading data',
    
    // Job Card Labels
    'jobs.card.position': 'Position',
    'jobs.card.workArea': 'Work Area',
    'jobs.card.description': 'Job Description',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Retry',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
    
    // Common
    'common.readMore': 'Read more',
    'common.viewAll': 'View all',
    'common.learnMore': 'Learn more',
    
    // Page Metadata
    'meta.home.title': 'KSB Group - Leading Trends, Building the Future',
    'meta.home.description': 'Multi-industry ecosystem with core business areas: Chemicals - Cosmetics, Candy Manufacturing, Import & Distribution of Food and Consumer Goods.',
    'meta.about.title': 'About Us - KSB Group',
    'meta.about.description': 'KSB Group proudly builds a strong foundation with a sustainable business ecosystem.',
    'meta.news.title': 'News - KSB Group',
    'meta.news.description': 'Latest updates about KSB Group and food industry',
    'meta.careers.title': 'Careers - KSB Group',
    'meta.careers.description': 'Join KSB Group team - Where your career develops',
    'meta.partners.title': 'Partners - KSB Group',
    'meta.partners.description': 'KSB Group strategic partners worldwide',
    'meta.contact.title': 'Contact - KSB Group',
    'meta.contact.description': 'Contact KSB Group for the best consultation and support',
    'meta.ecosystem.title': 'Ecosystem - KSB Group',
    'meta.ecosystem.description': 'Explore KSB Group diverse ecosystem with comprehensive brands, services and solutions',
    'common.contact': 'Contact',
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
