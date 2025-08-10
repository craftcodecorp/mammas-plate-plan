/**
 * Type declarations for analytics modules
 */

// Declare module for hotjar
declare module './hotjar' {
  export function initializeHotjar(siteId?: string): Promise<boolean>;
  export function trackPageView(path: string): void;
  export function trackHotjarEvent(eventName: string, eventProperties?: Record<string, unknown>): void;
  
  const hotjar: {
    initializeHotjar: typeof initializeHotjar;
    trackPageView: typeof trackPageView;
    trackHotjarEvent: typeof trackHotjarEvent;
  };
  
  export default hotjar;
}

// Declare module for amplitude
declare module './amplitude' {
  export function initializeAmplitude(apiKey?: string): Promise<boolean>;
  export function trackAmplitudeEvent(eventName: string, eventProperties?: Record<string, unknown>): void;
  export function trackAmplitudeConversion(conversionName: string, conversionProperties?: Record<string, unknown>): void;
  export function setAmplitudeUserId(userId: string): void;
  export function setAmplitudeUserProperties(properties: Record<string, unknown>): void;
  
  const amplitude: {
    initializeAmplitude: typeof initializeAmplitude;
    trackAmplitudeEvent: typeof trackAmplitudeEvent;
    trackAmplitudeConversion: typeof trackAmplitudeConversion;
    setAmplitudeUserId: typeof setAmplitudeUserId;
    setAmplitudeUserProperties: typeof setAmplitudeUserProperties;
  };
  
  export default amplitude;
}
