import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function useGoogleAnalytics(): void {
  const location = useLocation();

  useEffect(() => {
    // Get the measurement ID from environment variable
    const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
    
    // Skip if no measurement ID or not a valid GA4 ID
    if (!measurementId || !measurementId.startsWith('G-') || measurementId.includes('your-google-analytics-id-here')) {
      return;
    }

    // Initialize gtag.js if not already done
    if (!window.dataLayer) {
      // Load gtag.js script dynamically
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]): void {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', measurementId);
    }

    // Send page_view event on initial load and route changes
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);
}