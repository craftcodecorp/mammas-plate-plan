import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { initializeGoogleAnalytics, trackGAEvent, trackGAPageView } from './google-analytics';
import { initializeHotjar, trackHotjarEvent as trackHotjarEvent, trackPageView as trackHotjarPageView } from './hotjar';
import { amplitude, init as initAmplitude, logEvent as logAmplitudeEvent, setUserProperties as setAmplitudeUserProperties, trackPageView as trackAmplitudePageView } from './amplitude';
import { 
  initFirebaseAnalytics, 
  trackFirebaseEvent, 
  trackFirebaseConversion, 
  setFirebaseUserId 
} from './firebase-analytics';
import type { AnalyticsContextType, AnalyticsProviderConfig } from './analytics-types';

// Create context
const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

// Define provider props
interface AnalyticsProviderProps {
  children: React.ReactNode;
  config?: AnalyticsProviderConfig;
}

const defaultConfig: AnalyticsProviderConfig = {
  hotjarSiteId: import.meta.env.VITE_HOTJAR_SITE_ID,
  googleAnalyticsId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  amplitudeApiKey: import.meta.env.VITE_AMPLITUDE_API_KEY,
  firebaseEnabled: import.meta.env.VITE_FIREBASE_ENABLED === 'true',
  enablePageTracking: true
};

/**
 * Analytics Provider Component
 * 
 * @param children - React children
 * @param config - Analytics configuration
 */
const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children, config = defaultConfig }) => {
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize analytics services
  const initializeAnalytics = async () => {
    try {
      const promises = [];

      // Initialize Google Analytics if ID is provided
      if (config.googleAnalyticsId) {
        promises.push(initializeGoogleAnalytics(config.googleAnalyticsId));
      }

      // Initialize Hotjar if site ID is provided
      if (config.hotjarSiteId) {
        promises.push(initializeHotjar(config.hotjarSiteId));
      }

      // Initialize Amplitude if API key is provided
      if (config.amplitudeApiKey) {
        promises.push(initAmplitude(config.amplitudeApiKey));
      }

      // Initialize Firebase Analytics if enabled
      if (config.firebaseEnabled) {
        promises.push(initFirebaseAnalytics());
      }

      await Promise.all(promises);
      setIsInitialized(true);
      console.log('All analytics services initialized successfully');
    } catch (error) {
      console.error('Failed to initialize analytics services:', error);
    }
  };

  // Initialize analytics on mount
  useEffect(() => {
    initializeAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track page views when location changes
  useEffect(() => {
    if (config.enablePageTracking && isInitialized) {
      const currentPath = location.pathname + location.search;
      trackPageView(currentPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, config.enablePageTracking, isInitialized]);

  // Track an event across all analytics platforms
  const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => {
    if (!isInitialized) {
      console.warn('Analytics not initialized. Event not tracked:', eventName);
      return;
    }

    try {
      // Track in Google Analytics
      if (config.googleAnalyticsId) {
        trackGAEvent(eventName, eventData);
      }

      // Track in Amplitude
      if (config.amplitudeApiKey) {
        logAmplitudeEvent(eventName, eventData);
      }

      // Track in Firebase Analytics
      if (config.firebaseEnabled) {
        trackFirebaseEvent(eventName, eventData);
      }

      // Log for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] Event: ${eventName}`, eventData);
      }
    } catch (error) {
      console.error(`Error tracking event ${eventName}:`, error);
    }
  };

  // Track a conversion event (e.g., sign up, purchase)
  const trackConversion = (conversionName: string, conversionData?: Record<string, unknown>) => {
    if (!isInitialized) {
      console.warn('Analytics not initialized. Conversion not tracked:', conversionName);
      return;
    }

    try {
      // Add conversion flag to the event data
      const eventData = {
        ...conversionData,
        is_conversion: true,
        conversion_name: conversionName,
        timestamp: new Date().toISOString()
      };

      // Track in Google Analytics as an event with conversion flag
      if (config.googleAnalyticsId) {
        trackGAEvent(conversionName, eventData);
      }

      // Track in Amplitude
      if (config.amplitudeApiKey) {
        amplitude.trackConversion(conversionName, conversionData);
      }

      // Track in Firebase Analytics
      if (config.firebaseEnabled) {
        trackFirebaseConversion(conversionName, conversionData);
      }

      // If user_id is provided, set it across platforms
      if (conversionData?.user_id) {
        setUserId(conversionData.user_id as string);
      }

      // Log for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] Conversion: ${conversionName}`, conversionData);
      }
    } catch (error) {
      console.error(`Error tracking conversion ${conversionName}:`, error);
    }
  };

  // Track page view across all analytics platforms
  const trackPageView = (path: string, title?: string) => {
    if (!isInitialized) {
      console.warn('Analytics not initialized. Page view not tracked:', path);
      return;
    }

    try {
      // Track in Google Analytics
      if (config.googleAnalyticsId) {
        trackGAPageView(path, title);
      }

      // Track in Hotjar
      if (config.hotjarSiteId) {
        trackHotjarPageView(path);
      }

      // Track in Firebase Analytics as an event
      if (config.firebaseEnabled) {
        trackFirebaseEvent('page_view', {
          page_path: path,
          page_title: title || document.title
        });
      }

      // Track in Amplitude as an event
      if (config.amplitudeApiKey) {
        trackAmplitudePageView(path, {
          page_title: title || document.title
        });
      }

      // Log for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] Page view: ${path}`);
      }
    } catch (error) {
      console.error(`Error tracking page view ${path}:`, error);
    }
  };

  // Set user ID across all analytics platforms
  const setUserId = (userId: string) => {
    if (!isInitialized) {
      console.warn('Analytics not initialized. User ID not set:', userId);
      return;
    }

    try {
      // Set in Firebase Analytics
      if (config.firebaseEnabled) {
        setFirebaseUserId(userId);
      }

      // Set in Amplitude
      if (config.amplitudeApiKey) {
        amplitude.setUserId(userId);
      }

      // Log for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] User ID set: ${userId}`);
      }
    } catch (error) {
      console.error(`Error setting user ID ${userId}:`, error);
    }
  };

  // Set user properties across all analytics platforms
  const setUserProperties = (properties: Record<string, unknown>) => {
    if (!isInitialized) {
      console.warn('Analytics not initialized. User properties not set');
      return;
    }

    try {
      // Set in Amplitude
      if (config.amplitudeApiKey) {
        setAmplitudeUserProperties(properties);
      }
      
      // Track event with user properties for other platforms
      trackEvent('set_user_properties', properties);

      // Log for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] User properties set:`, properties);
      }
    } catch (error) {
      console.error(`Error setting user properties:`, error);
    }
  };

  return (
    <AnalyticsContext.Provider value={{
      trackEvent,
      trackConversion,
      trackPageView,
      setUserId,
      setUserProperties,
      isInitialized
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Export named exports only
export { AnalyticsProvider };

// Export the context for the hook file to use
export { AnalyticsContext };
