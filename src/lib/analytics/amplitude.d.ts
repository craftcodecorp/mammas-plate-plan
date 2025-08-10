/**
 * Type declarations for Amplitude
 */

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

declare global {
  interface Window {
    amplitude?: {
      getInstance: (instanceName?: string) => AmplitudeInstance;
    };
  }
}

// Module exports
export function init(apiKey: string): Promise<void>;
export function logEvent(eventType: string, eventProperties?: Record<string, unknown>): void;
export function trackConversion(conversionName: string, properties?: Record<string, unknown>): void;
export function setUserId(userId: string): void;
export function setUserProperties(properties: Record<string, unknown>): void;
export function trackPageView(pageName: string): void;

import { AnalyticsContextType } from './analytics-types';
export const amplitude: AnalyticsContextType;
export default amplitude;
