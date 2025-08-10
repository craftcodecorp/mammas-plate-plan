/**
 * Analytics Types
 * 
 * This file contains type definitions for the analytics system.
 */

/**
 * Analytics Provider Configuration
 */
export interface AnalyticsProviderConfig {
  /** Hotjar Site ID */
  hotjarSiteId?: string;
  /** Google Analytics Measurement ID */
  googleAnalyticsId?: string;
  /** Amplitude API Key */
  amplitudeApiKey?: string;
  /** Whether Firebase Analytics is enabled */
  firebaseEnabled?: boolean;
  /** Whether to enable automatic page view tracking */
  enablePageTracking?: boolean;
}

/**
 * Analytics Context Type
 */
export interface AnalyticsContextType {
  /** Whether analytics has been initialized */
  isInitialized: boolean;
  
  /**
   * Track an event across all analytics platforms
   * @param eventName - Name of the event to track
   * @param eventProperties - Properties to include with the event
   */
  trackEvent: (eventName: string, eventProperties?: Record<string, unknown>) => void;
  
  /**
   * Track a conversion event across all analytics platforms
   * @param conversionName - Name of the conversion to track
   * @param conversionProperties - Properties to include with the conversion
   */
  trackConversion: (conversionName: string, conversionProperties?: Record<string, unknown>) => void;
  
  /**
   * Track a page view across all analytics platforms
   * @param path - Path of the page to track
   */
  trackPageView: (path: string) => void;
  
  /**
   * Set user ID across all analytics platforms
   * @param userId - User ID to set
   */
  setUserId: (userId: string) => void;
  
  /**
   * Set user properties across all analytics platforms
   * @param properties - User properties to set
   */
  setUserProperties: (properties: Record<string, unknown>) => void;
}
