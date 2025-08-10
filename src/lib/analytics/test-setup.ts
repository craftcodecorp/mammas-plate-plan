/**
 * Test Setup for Analytics Tests
 * 
 * This file provides the necessary setup for testing analytics components
 * with a DOM environment.
 */

import { vi, beforeEach, beforeAll, afterEach, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';

// Create mock functions to be used in tests
export const mockInitializeGoogleAnalytics = vi.fn().mockResolvedValue(true);
export const mockTrackGAEvent = vi.fn();
export const mockTrackGAPageView = vi.fn();
export const mockSetGAUserId = vi.fn();

export const mockInitializeHotjar = vi.fn().mockResolvedValue(true);
export const mockTrackHotjarEvent = vi.fn();
export const mockTrackHotjarPageView = vi.fn();

export const mockInitAmplitude = vi.fn().mockResolvedValue(true);
export const mockLogAmplitudeEvent = vi.fn();
export const mockSetAmplitudeUserId = vi.fn();
export const mockSetAmplitudeUserProperties = vi.fn();
export const mockTrackAmplitudePageView = vi.fn();

export const mockAmplitude = {
  trackConversion: vi.fn(),
  setUserId: vi.fn(),
  setUserProperties: vi.fn()
};

export const mockInitFirebaseAnalytics = vi.fn().mockResolvedValue(true);
export const mockTrackFirebaseEvent = vi.fn();
export const mockTrackFirebaseConversion = vi.fn();
export const mockSetFirebaseUserId = vi.fn();
export const mockSetFirebaseUserProperties = vi.fn();

// Mock the hotjar module
vi.mock('./hotjar', () => ({
  initializeHotjar: mockInitializeHotjar,
  trackHotjarEvent: mockTrackHotjarEvent,
  trackPageView: mockTrackHotjarPageView,
}));

// Mock the google-analytics module
vi.mock('./google-analytics', () => ({
  initializeGoogleAnalytics: mockInitializeGoogleAnalytics,
  trackGAEvent: mockTrackGAEvent,
  trackGAPageView: mockTrackGAPageView,
  setGAUserId: mockSetGAUserId,
}));

// Mock the amplitude module
vi.mock('./amplitude', () => ({
  init: mockInitAmplitude,
  logEvent: mockLogAmplitudeEvent,
  amplitude: mockAmplitude,
  setUserProperties: mockSetAmplitudeUserProperties,
  setUserId: mockSetAmplitudeUserId,
  trackPageView: mockTrackAmplitudePageView,
}));

// Mock the firebase-analytics module
vi.mock('./firebase-analytics', () => ({
  initFirebaseAnalytics: mockInitFirebaseAnalytics,
  trackFirebaseEvent: mockTrackFirebaseEvent,
  trackFirebaseConversion: mockTrackFirebaseConversion,
  setFirebaseUserId: mockSetFirebaseUserId,
  setFirebaseUserProperties: mockSetFirebaseUserProperties,
}));

// Stub environment variables
beforeEach(() => {
  vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-SV42D9S9DM');
  vi.stubEnv('VITE_HOTJAR_SITE_ID', '6484693');
  vi.stubEnv('VITE_AMPLITUDE_API_KEY', 'your-amplitude-api-key');
  vi.stubEnv('VITE_FIREBASE_ENABLED', 'true');
  
  // Reset all mocks before each test
  vi.clearAllMocks();
});

// Mock global browser objects
beforeAll(() => {
  // Hotjar
  vi.stubGlobal('hj', vi.fn());
  
  // Amplitude
  vi.stubGlobal('amplitude', {
    getInstance: vi.fn().mockReturnValue({
      init: vi.fn(),
      logEvent: vi.fn(),
      setUserId: vi.fn(),
      setUserProperties: vi.fn(),
      regenerateDeviceId: vi.fn(),
      trackConversion: vi.fn()
    }),
  });
  
  // Google Analytics
  vi.stubGlobal('gtag', vi.fn());
  vi.stubGlobal('dataLayer', []);
});

// Mock observers
vi.stubGlobal('IntersectionObserver', class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
});

vi.stubGlobal('ResizeObserver', class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
});

vi.stubGlobal('MutationObserver', class {
  observe = vi.fn();
  disconnect = vi.fn();
});

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Clean up after all tests
afterAll(() => {
  vi.unstubAllEnvs();
});
