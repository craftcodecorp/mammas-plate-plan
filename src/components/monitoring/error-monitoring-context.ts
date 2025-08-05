import { createContext } from 'react';
import { Severity } from '@/lib/monitoring/error-logger';

/**
 * Error Monitoring Context Type
 */
export interface ErrorMonitoringContextType {
  captureError: (error: Error, context?: Record<string, unknown>) => void;
  captureMessage: (message: string, level?: Severity, context?: Record<string, unknown>) => void;
  setUserContext: (user: { id?: string; email?: string; [key: string]: unknown } | null) => void;
}

/**
 * Default context value with empty implementations
 */
const defaultContext: ErrorMonitoringContextType = {
  captureError: () => {},
  captureMessage: () => {},
  setUserContext: () => {},
};

/**
 * Error Monitoring Context
 */
export const ErrorMonitoringContext = createContext<ErrorMonitoringContextType>(defaultContext);
