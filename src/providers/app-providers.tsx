import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AccessibilityProvider } from '@/components/accessibility/accessibility-provider';
import { AnalyticsProvider } from '@/lib/analytics/analytics-provider';
import { PerformanceProvider } from '@/components/performance/performance-provider';
import { ResponsiveTester } from '@/components/testing/responsive-tester';

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
    hotjarSiteId: process.env.NODE_ENV === 'production' ? 12345 : undefined, // Replace with your actual Hotjar ID in production
    googleAnalyticsId: process.env.NODE_ENV === 'production' ? 'G-XXXXXXXXXX' : undefined, // Replace with your actual GA4 ID
    enablePageTracking: process.env.NODE_ENV === 'production',
  };

  return (
    <BrowserRouter>
      <HelmetProvider>
        <AccessibilityProvider>
          <PerformanceProvider>
            <AnalyticsProvider config={analyticsConfig}>
              {children}
              
              {/* Only show responsive tester in development */}
              <ResponsiveTester onlyInDevelopment={true} />
            </AnalyticsProvider>
          </PerformanceProvider>
        </AccessibilityProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
