/**
 * Google Analytics Utility
 * 
 * This module provides functionality for tracking user interactions
 * using Google Analytics 4.
 */

// Define the gtag function and other analytics globals
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    hj?: (command: string, ...args: unknown[]) => void;
    _hjSettings?: {
      hjid: number;
      hjsv: number;
    };
  }
}

/**
 * Initialize Google Analytics with your measurement ID
 * @param measurementId - Your Google Analytics 4 measurement ID (G-XXXXXXXX)
 */
export const initializeGoogleAnalytics = (measurementId: string): void => {
  // Skip initialization if GA is already loaded
  if (window.gtag) return;
  
  // Create data layer array if it doesn't exist
  window.dataLayer = window.dataLayer || [];
  
  // Define gtag function - this is the standard implementation from Google
  const gtag = function() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  
  // Assign the gtag function to window
  // We need to use type assertion here because the standard gtag implementation
  // uses the arguments object which doesn't match our TypeScript definition
  window.gtag = gtag as unknown as (...args: unknown[]) => void;
  
  // Set the timestamp
  window.gtag('js', new Date());
  
  // Configure your Google Analytics property
  window.gtag('config', measurementId, {
    send_page_view: false, // We'll handle page views manually for SPAs
  });
  
  // Add Google Analytics script to the page
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  
  console.log('Google Analytics initialized with measurement ID:', measurementId);
};

/**
 * Track a page view in Google Analytics
 * @param path - The path to track as a page view
 * @param title - Optional page title
 */
export const trackGAPageView = (path: string, title?: string): void => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
    console.log('Google Analytics page view tracked:', path);
  }
};

/**
 * Track a custom event in Google Analytics
 * @param eventName - Name of the event to track
 * @param eventParams - Additional parameters for the event
 */
export const trackGAEvent = (eventName: string, eventParams?: Record<string, unknown>): void => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log('Google Analytics event tracked:', eventName, eventParams);
  }
};

/**
 * Set user properties in Google Analytics
 * @param properties - User properties to set
 */
export const setUserProperties = (properties: Record<string, unknown>): void => {
  if (window.gtag) {
    window.gtag('set', 'user_properties', properties);
    console.log('Google Analytics user properties set:', properties);
  }
};

/**
 * Track an ecommerce purchase in Google Analytics
 * @param transactionData - Transaction data
 */
export const trackPurchase = (transactionData: {
  transaction_id: string;
  value: number;
  currency: string;
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>;
}): void => {
  if (window.gtag) {
    window.gtag('event', 'purchase', transactionData);
    console.log('Google Analytics purchase tracked:', transactionData);
  }
};
