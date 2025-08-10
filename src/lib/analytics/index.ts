/**
 * Analytics Module Index
 * 
 * This file exports all analytics components and utilities for easy importing
 * throughout the application.
 */

// Export provider component
export { AnalyticsProvider } from './analytics-provider';

// Export analytics hook
export { useAnalytics } from './use-analytics';

// Export types
export type { AnalyticsContextType, AnalyticsProviderConfig } from './analytics-types';

// Export individual analytics services for direct usage if needed
export * from './google-analytics';
export * from './hotjar';
export * from './amplitude';
export * from './firebase-analytics';
