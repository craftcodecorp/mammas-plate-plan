import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initializeHotjar, trackPageView } from './heatmap';
import { initializeGoogleAnalytics, trackGAPageView } from './google-analytics';

// Define context type
interface AnalyticsContextType {
  trackEvent: (eventName: string, eventData?: Record<string, any>) => void;
  trackConversion: (conversionName: string, conversionData?: Record<string, any>) => void;
}

// Create context with default values
const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
  trackConversion: () => {},
});

// Analytics configuration
interface AnalyticsConfig {
  hotjarSiteId?: number;
  googleAnalyticsId?: string;
  enablePageTracking?: boolean;
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
  config: AnalyticsConfig;
}

/**
 * Analytics Provider Component
 * 
 * This component initializes and manages analytics tracking throughout the application.
 */
export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ 
  children, 
  config 
}) => {
  const location = useLocation();
  
  // Initialize analytics services
  useEffect(() => {
    // Initialize Hotjar if site ID is provided
    if (config.hotjarSiteId) {
      initializeHotjar(config.hotjarSiteId);
    }
    
    // Initialize Google Analytics if ID is provided
    if (config.googleAnalyticsId) {
      initializeGoogleAnalytics(config.googleAnalyticsId);
    }
  }, [config.hotjarSiteId, config.googleAnalyticsId]);
  
  // Track page views when location changes
  useEffect(() => {
    if (config.enablePageTracking) {
      const currentPath = location.pathname + location.search;
      
      // Track page view in Hotjar
      trackPageView(currentPath);
      
      // Track page view in Google Analytics
      trackGAPageView(currentPath);
    }
  }, [location, config.enablePageTracking]);
  
  // Track custom events across analytics platforms
  const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
    // Track in Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, eventData);
    }
    
    // Track in Hotjar
    if (window.hj) {
      window.hj('event', eventName);
    }
    
    console.log(`Event tracked: ${eventName}`, eventData);
  };
  
  // Track conversions (specialized events)
  const trackConversion = (conversionName: string, conversionData?: Record<string, any>) => {
    // Track as a regular event but with conversion flag
    trackEvent(conversionName, {
      ...conversionData,
      is_conversion: true,
    });
    
    console.log(`Conversion tracked: ${conversionName}`, conversionData);
  };
  
  // Provide analytics functions to children
  return (
    <AnalyticsContext.Provider value={{ trackEvent, trackConversion }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

/**
 * Custom hook to use analytics functions
 */
export const useAnalytics = () => useContext(AnalyticsContext);
