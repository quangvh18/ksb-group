// Type definitions for Google Analytics

interface Window {
  gtag: (
    command: 'config' | 'event' | 'js' | 'set',
    targetId: string | Date,
    config?: {
      page_path?: string;
      page_title?: string;
      page_location?: string;
      event_category?: string;
      event_label?: string;
      value?: number;
      send_page_view?: boolean;
      anonymize_ip?: boolean;
      cookie_flags?: string;
      [key: string]: unknown;
    }
  ) => void;
  dataLayer: unknown[];
}

