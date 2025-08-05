import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
// Define types locally since there are compatibility issues with imported types
type SeverityLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';
type TransactionType = { finish: () => void; setName: (name: string) => void; };

/**
 * Initialize Sentry for error monitoring
 * 
 * @param dsn - Sentry DSN (Data Source Name)
 * @param environment - Current environment (development, staging, production)
 * @param release - Release version
 */
export const initSentry = (
  dsn: string,
  environment: string = 'production',
  release: string = '1.0.0'
): void => {
  if (!dsn) {
    console.warn('Sentry DSN not provided. Error monitoring will not be enabled.');
    return;
  }

  Sentry.init({
    dsn,
    environment,
    release,
    // Disable type checking for integrations due to version incompatibilities
    // @ts-expect-error - BrowserTracing has incompatible types between versions
    integrations: [new BrowserTracing()],
    
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring
    // We recommend adjusting this value in production
    tracesSampleRate: environment === 'production' ? 0.2 : 1.0,
    
    // Only enable in production to reduce noise during development
    enabled: environment === 'production',
    
    // Capture errors in React components
    beforeSend(event) {
      // Check if it is an exception, and if so, show the report dialog
      if (event.exception) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }
      return event;
    },
  });
};

/**
 * Capture an exception with Sentry
 * 
 * @param error - Error object
 * @param context - Additional context information
 */
export const captureException = (error: Error, context?: Record<string, unknown>): void => {
  Sentry.withScope((scope) => {
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
    }
    Sentry.captureException(error);
  });
};

/**
 * Capture a message with Sentry
 * 
 * @param message - Message to capture
 * @param level - Severity level
 * @param context - Additional context information
 */
export const captureMessage = (
  message: string,
  level: SeverityLevel = 'info',
  context?: Record<string, unknown>
): void => {
  Sentry.withScope((scope) => {
    scope.setLevel(level);
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
    }
    Sentry.captureMessage(message);
  });
};

/**
 * Set user information for Sentry
 * 
 * @param user - User information
 */
export const setUser = (user: {
  id?: string;
  email?: string;
  username?: string;
  [key: string]: unknown;
} | null): void => {
  Sentry.setUser(user);
};

/**
 * Start a new transaction for performance monitoring
 * 
 * @param name - Transaction name
 * @param op - Operation type
 */
export const startTransaction = (name: string, op: string): TransactionType => {
  // Use a workaround since startTransaction may not be available in this version
  const transaction = {
    finish: () => {},
    setName: (newName: string) => {}
  };
  
  try {
    // Attempt to use startTransaction if available
    // Use type assertion with unknown as intermediate step for safer casting
    const sentryApi = Sentry as unknown as { startTransaction?: (options: { name: string; op: string }) => unknown };
    const sentryTransaction = sentryApi.startTransaction?.({ name, op });
    if (sentryTransaction) {
      return sentryTransaction as unknown as TransactionType;
    }
  } catch (error) {
    console.warn('Sentry transaction API not available', error);
  }
  
  return transaction;
};

/**
 * Create an error boundary component for React components
 * 
 * @param fallback - Fallback component to render when an error occurs
 */
export const ErrorBoundary = Sentry.ErrorBoundary;

/**
 * Create a wrapper for React components to track performance
 * 
 * @param options - Options for the profiler
 */
export const withProfiler = Sentry.withProfiler;
