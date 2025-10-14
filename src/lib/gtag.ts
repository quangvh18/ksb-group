// Google Analytics utility functions

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Log page view
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Log specific events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track outbound links
export const trackOutboundLink = (url: string, label?: string) => {
  event({
    action: 'click',
    category: 'outbound',
    label: label || url,
  });
};

// Track downloads
export const trackDownload = (fileName: string) => {
  event({
    action: 'download',
    category: 'engagement',
    label: fileName,
  });
};

// Track form submissions
export const trackFormSubmit = (formName: string) => {
  event({
    action: 'submit',
    category: 'form',
    label: formName,
  });
};

// Track video plays
export const trackVideoPlay = (videoTitle: string) => {
  event({
    action: 'play',
    category: 'video',
    label: videoTitle,
  });
};

// Track search
export const trackSearch = (searchTerm: string) => {
  event({
    action: 'search',
    category: 'engagement',
    label: searchTerm,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location?: string) => {
  event({
    action: 'click',
    category: 'button',
    label: `${buttonName}${location ? ` - ${location}` : ''}`,
  });
};

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  event({
    action: 'scroll',
    category: 'engagement',
    label: `${percentage}%`,
    value: percentage,
  });
};

