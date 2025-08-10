/// <reference types="vitest" />
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
  namespace Vi {
    interface Assertion<T>
      extends TestingLibraryMatchers<typeof expect.stringContaining, T> {
        // Add at least one property to avoid "interface declaring no members" warning
        toExist(): void;
      }
      
    interface AsymmetricMatchersContaining 
      extends TestingLibraryMatchers<typeof expect.stringContaining, unknown> {
        // Add at least one property to avoid "interface declaring no members" warning
        toExist(): void;
      }
  }
}
