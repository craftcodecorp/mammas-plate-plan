import { useContext } from 'react';
import { AnalyticsContext } from './analytics-provider';
import type { AnalyticsContextType } from './analytics-types';

/**
 * Hook to use analytics functionality throughout the application
 * 
 * @returns Analytics context with tracking methods
 * @throws Error if used outside of AnalyticsProvider
 */
export const useAnalytics = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  
  return context;
};
