# 🏢 KSB Group - Corporate Website

> Tập đoàn KSB - Hệ sinh thái kinh doanh đa ngành với các lĩnh vực: Hóa - Mỹ phẩm (Biofresh), Sản xuất & Phân phối thực phẩm, Thực phẩm đông lạnh.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.1-blue?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Setup Google Analytics (optional but recommended)
npm run setup:analytics

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📊 Google Analytics & Search Console

This project includes **complete Google Analytics 4 and Search Console integration**.

### Quick Setup (5 minutes)

```bash
# Run automated setup script
npm run setup:analytics
```

### Documentation

- **[📄 Quick Start Guide](./ANALYTICS_QUICK_START.md)** - Setup in 5 minutes
- **[📄 Complete Setup Guide](./GOOGLE_ANALYTICS_SETUP.md)** - Detailed instructions
- **[📄 Analytics README](./README_ANALYTICS.md)** - Full documentation

### Features

✅ Auto page view tracking  
✅ Custom event tracking  
✅ Search Console integration  
✅ Privacy compliant (GDPR ready)  
✅ TypeScript support  
✅ 15+ code examples included

## 🏗️ Project Structure

```
ksb-group/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # Về chúng tôi
│   │   ├── ecosystem/          # Hệ sinh thái
│   │   ├── partners/           # Đối tác
│   │   ├── contact/            # Liên hệ
│   │   ├── news/               # Tin tức
│   │   └── careers/            # Tuyển dụng
│   ├── components/             # React components
│   ├── lib/                    # Utilities & helpers
│   │   └── gtag.ts            # Google Analytics utilities
│   ├── hooks/                  # Custom React hooks
│   ├── contexts/               # React contexts
│   └── services/               # API services
├── public/                     # Static assets
├── scripts/                    # Build & setup scripts
└── docs/                       # Documentation (*.md files)
```

## 🎨 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animation:** AOS (Animate On Scroll)
- **HTTP Client:** Axios
- **Analytics:** Google Analytics 4
- **SEO:** Google Search Console

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server (with Turbopack)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Analytics Setup
npm run setup:analytics  # Setup Google Analytics & Search Console
```

## 📱 Features

### Core Features
- 🏠 **Homepage** - Video background, interactive map, business ecosystem
- 📖 **About** - Company history, mission/vision, organization chart
- 🌐 **Ecosystem** - Product categories (Food, Cosmetics, Frozen)
- 🤝 **Partners** - Strategic partners showcase
- 📰 **News** - News & articles with dynamic routing
- 💼 **Careers** - Job listings with search & filter
- 📞 **Contact** - Contact form with API integration

### Technical Features
- ✅ **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Performance** - Image optimization, code splitting
- ✅ **Accessibility** - WCAG compliant
- ✅ **Analytics** - GA4 tracking & Search Console
- ✅ **i18n Ready** - Multi-language support (Vi/En)
- ✅ **PWA Ready** - Manifest & service worker support

## 🌐 Deployment

### Environment Variables

Create `.env.local` file:

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# API
NEXT_PUBLIC_API_URL=https://admin.ksbgroup.vn/api
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/ksb-group)

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

### Deploy to Netlify

```bash
npm run build
# Upload 'out' or '.next' folder to Netlify
```

## 📚 Documentation

- [📄 Analytics Quick Start](./ANALYTICS_QUICK_START.md)
- [📄 Google Analytics Setup](./GOOGLE_ANALYTICS_SETUP.md)
- [📄 Environment Setup](./ENV_SETUP_INSTRUCTIONS.md)
- [📄 SEO Optimization](./SEO_OPTIMIZATION_GUIDE.md)
- [📄 Analytics Summary](./ANALYTICS_IMPLEMENTATION_SUMMARY.md)
- [📄 Analytics README](./README_ANALYTICS.md)

## 🔗 Useful Links

### Development
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Analytics & SEO
- [Google Analytics](https://analytics.google.com/)
- [Google Search Console](https://search.google.com/search-console)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)

## 🤝 Contributing

1. Clone the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

Private - © 2025 KSB Group. All rights reserved.

## 👥 Team

Built with ❤️ by the KSB Group development team

---

**🚀 Ready to start?** Run `npm run setup:analytics` then `npm run dev`!
