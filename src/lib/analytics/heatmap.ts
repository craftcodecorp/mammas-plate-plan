/**
 * Heatmap Tracking Utility
 * 
 * This module provides functionality for tracking user interactions
 * and generating heatmaps using Hotjar.
 */

// Type definitions are now centralized in google-analytics.ts

/**
 * Initialize Hotjar with your site ID
 * @param siteId - Your Hotjar site ID
 */
export const initializeHotjar = (siteId: number): void => {
  // Skip initialization if Hotjar is already loaded
  if (window.hj) return;
  
  // Create Hotjar settings
  window._hjSettings = { hjid: siteId, hjsv: 6 };
  
  // Add Hotjar script to the page
  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = `https://static.hotjar.com/c/hotjar-${siteId}.js?sv=${window._hjSettings.hjsv}`;
  document.head.appendChild(script);
  
  console.log('Hotjar initialized with site ID:', siteId);
};

/**
 * Trigger a virtual page view in Hotjar
 * @param url - The URL to track as a page view
 */
export const trackPageView = (url: string): void => {
  if (window.hj) {
    window.hj('stateChange', url);
    console.log('Hotjar page view tracked:', url);
  }
};

/**
 * Identify a user in Hotjar for user targeting
 * @param userId - Unique identifier for the user
 * @param userAttributes - Additional user attributes
 */
export const identifyUser = (userId: string, userAttributes?: Record<string, unknown>): void => {
  if (window.hj) {
    if (userAttributes) {
      window.hj('identify', userId, userAttributes);
    } else {
      window.hj('identify', userId);
    }
    console.log('Hotjar user identified:', userId);
  }
};

/**
 * Tag specific events or interactions for filtering in Hotjar
 * @param tags - Array of tags to apply
 */
export const tagRecording = (tags: string[]): void => {
  if (window.hj) {
    window.hj('tagRecording', tags);
    console.log('Hotjar recording tagged:', tags);
  }
};

/**
 * Mark an event in the recording timeline
 * @param eventName - Name of the event
 */
export const markEvent = (eventName: string): void => {
  if (window.hj) {
    window.hj('event', eventName);
    console.log('Hotjar event marked:', eventName);
  }
};
