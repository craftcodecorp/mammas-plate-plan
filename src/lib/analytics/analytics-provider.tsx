import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initializeHotjar, trackPageView } from './heatmap';
import { initializeGoogleAnalytics, trackGAPageView } from './google-analytics';
import { initializeAmplitude, getExperimentVariant, trackExperimentConversion, ExperimentResult, Experiment } from './ab-testing';

// Define context type
interface AnalyticsContextType {
  trackEvent: (eventName: string, eventData?: Record<string, unknown>) => void;
  trackConversion: (conversionName: string, conversionData?: Record<string, unknown>) => void;
  getExperimentVariant: (experimentId: string, userId?: string, experimentConfig?: Experiment) => ExperimentResult;
  trackExperimentConversion: (experimentId: string, conversionEvent: string, properties?: Record<string, unknown>) => void;
}

// Create context with default values
const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
  trackConversion: () => {},
  getExperimentVariant: () => ({
    variant: 'control',
    experimentId: '',
    experimentName: '',
    isDefault: true
  }),
  trackExperimentConversion: () => {}
});

// Analytics configuration
interface AnalyticsConfig {
  hotjarSiteId?: number;
  googleAnalyticsId?: string;
  amplitudeApiKey?: string;
  experimentApiKey?: string;
  enablePageTracking?: boolean;
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
  config?: AnalyticsConfig;
}

/**
 * Analytics Provider Component
 * 
 * This component initializes and manages analytics tracking throughout the application.
 */
export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ 
  children, 
  config = {
    hotjarSiteId: Number(import.meta.env.VITE_HOTJAR_SITE_ID) || undefined,
    googleAnalyticsId: import.meta.env.VITE_GA_MEASUREMENT_ID as string || undefined,
    amplitudeApiKey: import.meta.env.VITE_AMPLITUDE_API_KEY as string || undefined,
    experimentApiKey: import.meta.env.VITE_EXPERIMENT_API_KEY as string || undefined,
    enablePageTracking: true
  }
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
    
    // Initialize Amplitude for A/B testing if API keys are provided
    if (config.amplitudeApiKey && config.experimentApiKey) {
      initializeAmplitude(config.amplitudeApiKey, config.experimentApiKey);
    }
  }, [config.hotjarSiteId, config.googleAnalyticsId, config.amplitudeApiKey, config.experimentApiKey]);
  
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
  const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => {
    // Track in Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, eventData as Record<string, string | number | boolean>);
    }
    
    // Track in Hotjar
    if (window.hj) {
      window.hj('event', eventName);
    }
    
    console.log(`Event tracked: ${eventName}`, eventData);
  };
  
  // Track conversions (specialized events)
  const trackConversion = (conversionName: string, conversionData?: Record<string, unknown>) => {
    // Track as a regular event but with conversion flag
    trackEvent(conversionName, {
      ...conversionData,
      is_conversion: true,
    });
    
    console.log(`Conversion tracked: ${conversionName}`, conversionData);
  };
  
  // Implement A/B testing methods
  const runExperiment = (experimentId: string, userId?: string, experimentConfig?: Experiment): ExperimentResult => {
    return getExperimentVariant(experimentId, userId, experimentConfig);
  };
  
  const trackExperimentResult = (experimentId: string, conversionEvent: string, properties?: Record<string, unknown>): void => {
    trackExperimentConversion(experimentId, conversionEvent, properties);
  };
  
  // Provide analytics functions to children
  return (
    <AnalyticsContext.Provider value={{
      trackEvent,
      trackConversion,
      getExperimentVariant: runExperiment,
      trackExperimentConversion: trackExperimentResult
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

/**
 * Custom hook to use analytics functions
 */
export const useAnalytics = () => useContext(AnalyticsContext);
