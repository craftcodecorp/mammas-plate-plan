import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AccessibilityProvider } from '@/components/accessibility/accessibility-provider';
import { AnalyticsProvider } from '@/lib/analytics/analytics-provider';
import { PerformanceProvider } from '@/components/performance/performance-provider';
import { ResponsiveTester } from '@/components/testing/responsive-tester';
import { ErrorMonitoringProvider } from '@/components/monitoring/error-monitoring-provider';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * App Providers Component
 * 
 * This component wraps the application with all necessary providers
 * for testing, optimization, accessibility, and analytics.
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  // Analytics configuration
  const analyticsConfig = {
    hotjarSiteId: import.meta.env.PROD ? 12345 : undefined, // Replace with your actual Hotjar ID in production
    googleAnalyticsId: import.meta.env.PROD ? 'G-XXXXXXXXXX' : undefined, // Replace with your actual GA4 ID
    enablePageTracking: import.meta.env.PROD,
  };

  // Error monitoring configuration
  const errorMonitoringConfig = {
    logEndpoint: import.meta.env.VITE_ERROR_LOG_ENDPOINT as string,
    environment: import.meta.env.MODE,
    appVersion: import.meta.env.VITE_APP_VERSION as string || '1.0.0',
  };

  return (
    <BrowserRouter>
      <ErrorMonitoringProvider
        logEndpoint={errorMonitoringConfig.logEndpoint}
        environment={errorMonitoringConfig.environment}
        appVersion={errorMonitoringConfig.appVersion}
      >
        <HelmetProvider>
          <AccessibilityProvider>
            <PerformanceProvider>
              <AnalyticsProvider config={analyticsConfig}>
                {children}
                
                {/* Only show responsive tester in development */}
                {import.meta.env.MODE === 'development' && <ResponsiveTester />}
              </AnalyticsProvider>
            </PerformanceProvider>
          </AccessibilityProvider>
        </HelmetProvider>
      </ErrorMonitoringProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
