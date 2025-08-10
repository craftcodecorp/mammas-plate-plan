/**
 * Type declarations for Hotjar
 */

// Global window declarations
declare global {
  interface Window {
    hj?: (command: string, ...args: unknown[]) => void;
    _hjSettings?: {
      hjid: number;
      hjsv: number;
    };
  }
}

// Module exports
export function initializeHotjar(siteId: string): void;
export function trackHotjarEvent(eventName: string): void;
export function trackHotjarPageView(pageName: string): void;

export const hotjar: {
  initialize: (siteId: string) => void;
  trackEvent: (eventName: string) => void;
  trackPageView: (pageName: string) => void;
};

export default hotjar;
