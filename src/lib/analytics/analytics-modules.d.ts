/**
 * Module declarations for analytics modules
 */

declare module './amplitude' {
  import { AnalyticsContextType } from './analytics-types';
  
  export const init: (apiKey: string) => Promise<void>;
  export const logEvent: (eventType: string, eventProperties?: Record<string, unknown>) => void;
  export const trackConversion: (conversionName: string, properties?: Record<string, unknown>) => void;
  export const setUserId: (userId: string) => void;
  export const setUserProperties: (properties: Record<string, unknown>) => void;
  export const trackPageView: (pageName: string) => void;
  
  export const amplitude: AnalyticsContextType;
  export default amplitude;
}

declare module './hotjar' {
  export const initializeHotjar: (siteId: string) => void;
  export const trackHotjarEvent: (eventName: string) => void;
  export const trackHotjarPageView: (pageName: string) => void;
  
  export const hotjar: {
    initialize: (siteId: string) => void;
    trackEvent: (eventName: string) => void;
    trackPageView: (pageName: string) => void;
  };
  export default hotjar;
}
