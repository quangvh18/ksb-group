/**
 * GOOGLE ANALYTICS TRACKING EXAMPLES
 * 
 * File này chứa các ví dụ về cách sử dụng Google Analytics tracking
 * trong các components của dự án KSB Group
 */

'use client';

import * as gtag from '@/lib/gtag';
import { useState } from 'react';

// ==================== EXAMPLE 1: Track Button Clicks ====================

export function ContactButton() {
  const handleClick = () => {
    // Track button click với location context
    gtag.trackButtonClick('Contact Us', 'Homepage Header');

    // Sau đó thực hiện action
    window.location.href = '/contact';
  };

  return (
    <button onClick={handleClick} className="bg-red-600 text-white px-6 py-2 rounded">
      Liên hệ ngay
    </button>
  );
}

// ==================== EXAMPLE 2: Track Form Submissions ====================

export function ContactForm() {
  const [formData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Track form submission
      gtag.trackFormSubmit('Contact Form - Homepage');

      // Submit form logic here
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Track successful submission
        gtag.event({
          action: 'form_submit_success',
          category: 'contact',
          label: 'Contact Form - Homepage'
        });
      }
    } catch {
      // Track errors
      gtag.event({
        action: 'form_submit_error',
        category: 'contact',
        label: 'Contact Form - Homepage'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}

// ==================== EXAMPLE 3: Track Downloads ====================

export function DownloadBrochure() {
  const handleDownload = (fileName: string) => {
    // Track download event
    gtag.trackDownload(fileName);

    // Trigger download
    const link = document.createElement('a');
    link.href = `/downloads/${fileName}`;
    link.download = fileName;
    link.click();
  };

  return (
    <button onClick={() => handleDownload('KSB-Company-Profile.pdf')}>
      Tải brochure
    </button>
  );
}

// ==================== EXAMPLE 4: Track Outbound Links ====================

export function PartnerLink({ url, name }: { url: string; name: string }) {
  const handleClick = () => {
    // Track outbound link click
    gtag.trackOutboundLink(url, `Partner: ${name}`);
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {name}
    </a>
  );
}

// ==================== EXAMPLE 5: Track Video Interactions ====================

export function VideoPlayer() {
  const handlePlay = () => {
    gtag.trackVideoPlay('KSB Group Introduction Video');
  };

  const handlePause = () => {
    gtag.event({
      action: 'pause',
      category: 'video',
      label: 'KSB Group Introduction Video'
    });
  };

  const handleEnded = () => {
    gtag.event({
      action: 'complete',
      category: 'video',
      label: 'KSB Group Introduction Video'
    });
  };

  return (
    <video
      controls
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
    >
      <source src="/videos/homepage-video.mp4" type="video/mp4" />
    </video>
  );
}

// ==================== EXAMPLE 6: Track Search ====================

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      // Track search query
      gtag.trackSearch(searchTerm);

      // Perform search
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Tìm kiếm..."
      />
      <button type="submit">Tìm</button>
    </form>
  );
}

// ==================== EXAMPLE 7: Track Scroll Depth ====================

export function ScrollDepthTracker() {
  const [trackedDepths, setTrackedDepths] = useState<number[]>([]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

    // Track at 25%, 50%, 75%, 100%
    const milestones = [25, 50, 75, 100];

    milestones.forEach(milestone => {
      if (scrollPercentage >= milestone && !trackedDepths.includes(milestone)) {
        gtag.trackScrollDepth(milestone);
        setTrackedDepths(prev => [...prev, milestone]);
      }
    });
  };

  // Attach scroll listener
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }

  return null; // This is a tracking-only component
}

// ==================== EXAMPLE 8: Track Product/Category Views ====================

export function ProductCard({ productName, category }: { productName: string; category: string }) {
  const handleView = () => {
    gtag.event({
      action: 'view_item',
      category: 'product',
      label: `${category} - ${productName}`
    });
  };

  const handleAddToCart = () => {
    gtag.event({
      action: 'add_to_cart',
      category: 'ecommerce',
      label: productName,
      value: 1
    });
  };

  return (
    <div onClick={handleView}>
      <h3>{productName}</h3>
      <button onClick={handleAddToCart}>Thêm vào giỏ</button>
    </div>
  );
}

// ==================== EXAMPLE 9: Track Navigation ====================

export function NavigationMenu() {
  const handleNavClick = (menuItem: string) => {
    gtag.event({
      action: 'navigation_click',
      category: 'navigation',
      label: menuItem
    });
  };

  return (
    <nav>
      <a href="/about" onClick={() => handleNavClick('About')}>Về chúng tôi</a>
      <a href="/ecosystem" onClick={() => handleNavClick('Ecosystem')}>Hệ sinh thái</a>
      <a href="/partners" onClick={() => handleNavClick('Partners')}>Đối tác</a>
      <a href="/contact" onClick={() => handleNavClick('Contact')}>Liên hệ</a>
    </nav>
  );
}

// ==================== EXAMPLE 10: Track Social Shares ====================

export function SocialShareButtons({ articleTitle }: { articleTitle: string }) {
  const handleShare = (platform: string) => {
    gtag.event({
      action: 'share',
      category: 'social',
      label: `${platform} - ${articleTitle}`
    });
  };

  return (
    <div>
      <button onClick={() => handleShare('Facebook')}>
        Share on Facebook
      </button>
      <button onClick={() => handleShare('Twitter')}>
        Share on Twitter
      </button>
      <button onClick={() => handleShare('LinkedIn')}>
        Share on LinkedIn
      </button>
    </div>
  );
}

// ==================== EXAMPLE 11: Track Phone/Email Clicks ====================

export function ContactInfo() {
  const handlePhoneClick = () => {
    gtag.event({
      action: 'click',
      category: 'contact',
      label: 'Phone Number - Header'
    });
  };

  const handleEmailClick = () => {
    gtag.event({
      action: 'click',
      category: 'contact',
      label: 'Email - Footer'
    });
  };

  return (
    <div>
      <a href="tel:+84241234567" onClick={handlePhoneClick}>
        +84 24 1234 5678
      </a>
      <a href="mailto:info@ksbgroup.vn" onClick={handleEmailClick}>
        info@ksbgroup.vn
      </a>
    </div>
  );
}

// ==================== EXAMPLE 12: Track Tab/Accordion Interactions ====================

export function TabComponent() {
  const handleTabClick = (tabName: string) => {
    gtag.event({
      action: 'tab_click',
      category: 'interaction',
      label: tabName
    });
  };

  return (
    <div>
      <button onClick={() => handleTabClick('Thực phẩm')}>Thực phẩm</button>
      <button onClick={() => handleTabClick('Mỹ phẩm')}>Mỹ phẩm</button>
    </div>
  );
}

// ==================== EXAMPLE 13: Track Errors ====================

export function ErrorBoundaryTracking() {
  // const trackError = (error: Error, errorInfo: unknown) => {
  //   gtag.event({
  //     action: 'error',
  //     category: 'javascript',
  //     label: `${error.message} - ${error.stack?.substring(0, 100)}`
  //   });
  // };

  return null;
}

// ==================== EXAMPLE 14: Track Language Changes ====================

export function LanguageSwitcher() {
  const handleLanguageChange = (language: string) => {
    gtag.event({
      action: 'language_change',
      category: 'settings',
      label: language
    });

    // Change language logic
    localStorage.setItem('language', language);
  };

  return (
    <div>
      <button onClick={() => handleLanguageChange('vi')}>Tiếng Việt</button>
      <button onClick={() => handleLanguageChange('en')}>English</button>
    </div>
  );
}

// ==================== EXAMPLE 15: Track Filter Usage ====================

export function ProductFilter() {
  const handleFilterChange = (filterType: string, filterValue: string) => {
    gtag.event({
      action: 'filter_change',
      category: 'product',
      label: `${filterType}: ${filterValue}`
    });
  };

  return (
    <div>
      <select onChange={(e) => handleFilterChange('Category', e.target.value)}>
        <option value="all">Tất cả</option>
        <option value="food">Thực phẩm</option>
        <option value="cosmetics">Mỹ phẩm</option>
      </select>
    </div>
  );
}

