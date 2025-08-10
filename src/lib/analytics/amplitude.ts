/**
 * Amplitude Integration
 * 
 * This module provides integration with Amplitude for user behavior analytics
 * and conversion tracking.
 */

import { AnalyticsContextType } from './analytics-types';

/**
 * Amplitude instance interface defining all available methods
 */
interface AmplitudeInstance {
  init: (
    apiKey: string,
    userId?: string | null,
    options?: Record<string, unknown>,
    callback?: () => void
  ) => void;
  logEvent: (
    eventType: string,
    eventProperties?: Record<string, unknown>,
    callback?: () => void
  ) => void;
  setUserId: (userId: string | null) => void;
  setUserProperties: (userProperties: Record<string, unknown>) => void;
  revenue: (revenueObj: Record<string, unknown>) => void;
  identify: (identify: unknown) => void;
  regenerateDeviceId: () => void;
}

/**
 * Initialize Amplitude with the provided API key
 * @param apiKey - Amplitude API key
 * @param userId - Optional user ID
 * @param config - Optional configuration
 */
const init = (apiKey: string, userId?: string, config?: Record<string, unknown>) => {
  if (!window.amplitude) {
    console.warn('Amplitude not loaded');
    return;
  }

  try {
    // Get the default instance
    const amplitudeInstance = window.amplitude.getInstance() as AmplitudeInstance;

    // Configure Amplitude
    const amplitudeConfig = {
      // Disable tracking of device-specific information for LGPD compliance
      trackingOptions: {
        ipAddress: false,
        deviceManufacturer: false,
        deviceModel: false,
        dma: false,
        osName: false,
        osVersion: false,
        platform: false,
        language: false,
        carrier: false,
      },
      // Include additional configuration if provided
      ...config,
    };

    // Initialize Amplitude with the API key and configuration
    amplitudeInstance.init(apiKey, userId || null, amplitudeConfig);

    // Generate a new device ID to avoid tracking the same user across different sessions
    // This is for LGPD compliance
    amplitudeInstance.regenerateDeviceId();

    console.log('Amplitude initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Amplitude:', error);
  }
};

/**
 * Log an event to Amplitude
 * @param eventName - Name of the event
 * @param eventProperties - Optional event properties
 */
const logEvent = (eventName: string, eventProperties?: Record<string, unknown>) => {
  if (!window.amplitude) {
    console.warn('Amplitude not loaded');
    return;
  }

  try {
    const amplitudeInstance = window.amplitude.getInstance() as AmplitudeInstance;
    amplitudeInstance.logEvent(eventName, eventProperties);
    console.log(`Amplitude event logged: ${eventName}`, eventProperties);
  } catch (error) {
    console.error(`Failed to log Amplitude event ${eventName}:`, error);
  }
};

/**
 * Track a page view in Amplitude
 * @param pageName - Name of the page
 * @param pageProperties - Optional page properties
 */
const trackPageView = (pageName: string, pageProperties?: Record<string, unknown>) => {
  logEvent('page_view', {
    page_name: pageName,
    page_url: window.location.href,
    page_path: window.location.pathname,
    ...pageProperties,
  });
};

/**
 * Track a conversion event in Amplitude
 * @param conversionName - Name of the conversion
 * @param conversionProperties - Optional conversion properties
 */
const trackConversion = (conversionName: string, conversionProperties?: Record<string, unknown>) => {
  logEvent('conversion', {
    conversion_name: conversionName,
    ...conversionProperties,
  });
};

/**
 * Set the user ID for Amplitude
 * @param userId - User ID to set
 */
const setUserId = (userId: string | null) => {
  if (!window.amplitude) {
    console.warn('Amplitude not loaded');
    return;
  }

  try {
    const amplitudeInstance = window.amplitude.getInstance() as AmplitudeInstance;
    amplitudeInstance.setUserId(userId);
    console.log(`Amplitude user ID set: ${userId}`);
  } catch (error) {
    console.error('Failed to set Amplitude user ID:', error);
  }
};

/**
 * Set user properties in Amplitude
 * @param properties - User properties to set
 */
const setUserProperties = (properties: Record<string, unknown>) => {
  if (!window.amplitude) {
    console.warn('Amplitude not loaded');
    return;
  }

  try {
    const amplitudeInstance = window.amplitude.getInstance() as AmplitudeInstance;
    amplitudeInstance.setUserProperties(properties);
    console.log('Amplitude user properties set:', properties);
  } catch (error) {
    console.error('Failed to set Amplitude user properties:', error);
  }
};

// Create a complete Amplitude service with all methods
const amplitudeService: Pick<AnalyticsContextType, 'trackEvent' | 'trackConversion' | 'trackPageView' | 'setUserId' | 'setUserProperties'> & {
  init: typeof init;
} = {
  init,
  trackEvent: logEvent, // Map to the expected interface name
  trackConversion,
  trackPageView,
  setUserId,
  setUserProperties,
};

// Export the Amplitude service
export const amplitude = amplitudeService;

// Export individual functions for direct use
export { init, logEvent, trackPageView, trackConversion, setUserId, setUserProperties };
