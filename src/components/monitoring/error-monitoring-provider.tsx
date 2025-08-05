import React, { useEffect, ReactNode } from 'react';
import { initErrorLogger, ErrorBoundary, setUser, Severity, captureException, captureMessage } from '@/lib/monitoring/error-logger';
import { ErrorMonitoringContext } from './error-monitoring-context';

// Custom error fallback component
const ErrorFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => {
  return (
    <div className="error-boundary-fallback">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={resetError}>Try again</button>
    </div>
  );
};

// Props for the ErrorMonitoringProvider component
interface ErrorMonitoringProviderProps {
  children: ReactNode;
  logEndpoint?: string;
  environment?: string;
  appVersion?: string;
}

/**
 * Error Monitoring Provider Component
 * 
 * Initializes custom error logger and provides error monitoring functionality to the application.
 */
export const ErrorMonitoringProvider: React.FC<ErrorMonitoringProviderProps> = ({
  children,
  logEndpoint,
  environment = import.meta.env.MODE,
  appVersion = import.meta.env.VITE_APP_VERSION as string || '1.0.0',
}) => {
  // Initialize custom error logger on mount
  useEffect(() => {
    // Only initialize in production to avoid noise during development
    if (import.meta.env.PROD) {
      initErrorLogger({
        appVersion,
        environment,
        endpoint: logEndpoint
      });
    }
  }, [appVersion, environment, logEndpoint]);

  // Context value
  const contextValue = {
    captureError: (error: Error, context?: Record<string, unknown>) => {
      // Use custom error logger to capture the error
      captureException(error, context);
    },
    setUserContext: (user: { id?: string; email?: string; [key: string]: unknown } | null) => {
      // Set user context in error logger
      setUser(user);
    },
    captureMessage: (message: string, level: Severity = Severity.Info, context?: Record<string, unknown>) => {
      // Capture a message with the specified severity level
      captureMessage(message, level, context);
    }
  };

  return (
    <ErrorMonitoringContext.Provider value={contextValue}>
      <ErrorBoundary fallback={ErrorFallback}>
        {children}
      </ErrorBoundary>
    </ErrorMonitoringContext.Provider>
  );
};

export default ErrorMonitoringProvider;
