/**
 * Hotjar Integration
 * 
 * This module provides integration with Hotjar for user behavior analytics
 * and heatmap tracking.
 */

/**
 * Initialize Hotjar with your site ID
 * @param siteId - Your Hotjar site ID
 * @returns Promise that resolves when Hotjar is initialized
 */
export const initializeHotjar = (siteId?: string): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      // Skip if no site ID is provided
      if (!siteId) {
        console.warn('No Hotjar site ID provided, skipping initialization');
        resolve(false);
        return;
      }

      // Skip if Hotjar is already initialized
      if (window.hj) {
        console.log('Hotjar already initialized');
        resolve(true);
        return;
      }

      // Add Hotjar script to the page
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.innerHTML = `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${parseInt(siteId, 10)},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `;
      
      document.head.appendChild(script);
      
      // Wait for Hotjar to initialize
      const timeout = setTimeout(() => {
        if (window.hj) {
          clearTimeout(timeout);
          console.log('Hotjar initialized with site ID:', siteId);
          resolve(true);
        } else {
          console.warn('Hotjar initialization timed out');
          resolve(false);
        }
      }, 2000);
    } catch (error) {
      console.error('Error initializing Hotjar:', error);
      resolve(false);
    }
  });
};

/**
 * Track a page view in Hotjar
 * @param path - Path of the page to track
 */
export const trackPageView = (path: string): void => {
  if (window.hj) {
    // Use direct function call instead of accessing q property
    window.hj('stateChange', path);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Hotjar page view tracked:', path);
    }
  }
};

/**
 * Track an event in Hotjar
 * @param eventName - Name of the event to track
 * @param eventProperties - Properties to include with the event
 */
export const trackHotjarEvent = (
  eventName: string,
  eventProperties?: Record<string, unknown>
): void => {
  if (window.hj) {
    // Use direct function call instead of accessing q property
    window.hj('event', eventName, eventProperties || {});
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Hotjar event tracked:', eventName, eventProperties);
    }
  }
};
