/**
 * Simple Custom Error Logger
 * 
 * A lightweight error monitoring solution that logs errors to the console in development
 * and can send them to a custom endpoint in production.
 */

import React from 'react';

// Define severity levels
export enum Severity {
  Fatal = 'fatal',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Debug = 'debug'
}

// Define error context type
export interface ErrorContext {
  [key: string]: unknown;
}

// Define user info type
export interface UserInfo {
  id?: string;
  email?: string;
  username?: string;
  [key: string]: unknown;
}

// Global user context
let currentUser: UserInfo | null = null;

/**
 * Initialize the error logger
 * @param options - Configuration options
 */
export const initErrorLogger = (options: {
  appVersion?: string;
  environment?: string;
  endpoint?: string;
} = {}) => {
  const { appVersion, environment } = options;
  
  // Log initialization in development
  if (import.meta.env.DEV) {
    console.log(`[ErrorLogger] Initialized: ${environment || 'development'} v${appVersion || '1.0.0'}`);
  }
  
  // Set up global error handler
  window.addEventListener('error', (event) => {
    captureException(event.error || new Error(event.message), {
      source: 'window.onerror',
      lineno: event.lineno,
      colno: event.colno,
      filename: event.filename
    });
    
    // Don't prevent default error handling
    return false;
  });
  
  // Set up unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason));
    
    captureException(error, {
      source: 'unhandledrejection',
      promise: 'Promise rejection'
    });
  });
};

/**
 * Capture an exception
 * @param error - The error object
 * @param context - Additional context
 */
export const captureException = (error: Error, context?: ErrorContext): void => {
  // Prepare error data
  const errorData = prepareErrorData(error, context);
  
  // Log to console in development
  if (import.meta.env.DEV) {
    console.error('[ErrorLogger] Error captured:', errorData);
    return;
  }
  
  // In production, log to storage and potentially send to server
  logToStorage(errorData);
  
  // Optional: Send to server if endpoint is configured
  // sendToServer(errorData);
};

/**
 * Capture a message
 * @param message - The message to capture
 * @param level - Severity level
 * @param context - Additional context
 */
export const captureMessage = (
  message: string, 
  level: Severity = Severity.Info, 
  context?: ErrorContext
): void => {
  // Prepare message data
  const messageData = {
    message,
    level,
    context: { ...context },
    timestamp: new Date().toISOString(),
    user: currentUser,
    url: window.location.href,
    userAgent: navigator.userAgent
  };
  
  // Log to console in development
  if (import.meta.env.DEV) {
    const logMethod = level === Severity.Error ? console.error :
                     level === Severity.Warning ? console.warn :
                     console.log;
    logMethod('[ErrorLogger]', messageData);
    return;
  }
  
  // In production, log to storage
  logToStorage(messageData);
};

/**
 * Set user information
 * @param user - User information or null to clear
 */
export const setUser = (user: UserInfo | null): void => {
  currentUser = user;
  
  if (import.meta.env.DEV) {
    console.log('[ErrorLogger] User set:', user);
  }
};

/**
 * Create a simple error boundary component
 * Note: This is a simplified version that doesn't use React's ErrorBoundary
 * as it would require additional dependencies
 */
export class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  fallback: React.ComponentType<{
    error: Error;
    resetError: () => void;
  }> | React.ReactElement;
}, {
  hasError: boolean;
  error: Error | null;
}> {
  constructor(props: {
    children: React.ReactNode;
    fallback: React.ComponentType<{
      error: Error;
      resetError: () => void;
    }> | React.ReactElement;
  }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    captureException(error, { 
      source: 'ErrorBoundary',
      componentStack: errorInfo.componentStack 
    });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      const { error } = this.state;
      
      if (React.isValidElement(fallback)) {
        return fallback;
      }
      
      const FallbackComponent = fallback as React.ComponentType<{
        error: Error;
        resetError: () => void;
      }>;
      
      return React.createElement(FallbackComponent, {
        error: error!,
        resetError: this.resetError
      });
    }

    return this.props.children;
  }
}

// Helper functions
const prepareErrorData = (error: Error, context?: ErrorContext) => {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
    context: { ...context },
    timestamp: new Date().toISOString(),
    user: currentUser,
    url: window.location.href,
    userAgent: navigator.userAgent
  };
};

const logToStorage = (data: unknown) => {
  try {
    // Get existing logs
    const storedLogs = localStorage.getItem('error_logs');
    const logs = storedLogs ? JSON.parse(storedLogs) : [];
    
    // Add new log (limit to 20 most recent)
    logs.push(data);
    if (logs.length > 20) logs.shift();
    
    // Save back to storage
    localStorage.setItem('error_logs', JSON.stringify(logs));
  } catch (e) {
    // Silent fail if localStorage is not available
  }
};

// Optional: Function to send logs to a server
export const sendToServer = (data: unknown, endpoint?: string) => {
  if (!endpoint) return;
  
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    // Use keepalive to ensure the request completes even if page is unloading
    keepalive: true
  }).catch(() => {
    // Silent fail if the request fails
  });
};

// Export a function to get logs from storage (useful for debugging)
export const getStoredLogs = () => {
  try {
    const storedLogs = localStorage.getItem('error_logs');
    return storedLogs ? JSON.parse(storedLogs) : [];
  } catch (e) {
    return [];
  }
};

// Export a function to clear logs from storage
export const clearStoredLogs = () => {
  try {
    localStorage.removeItem('error_logs');
  } catch (e) {
    // Silent fail
  }
};
