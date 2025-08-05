import { useContext } from 'react';
import { ErrorMonitoringContext } from './error-monitoring-context';
import { Severity } from '@/lib/monitoring/error-logger';

/**
 * Hook to access error monitoring functionality
 * 
 * Provides methods to capture errors, messages, and set user context
 */
export const useErrorMonitoring = () => {
  const context = useContext(ErrorMonitoringContext);
  
  if (!context) {
    throw new Error('useErrorMonitoring must be used within an ErrorMonitoringProvider');
  }
  
  return {
    /**
     * Capture an error with optional context
     */
    captureError: context.captureError,
    
    /**
     * Capture a message with optional severity level and context
     */
    captureMessage: context.captureMessage,
    
    /**
     * Set user information for error context
     */
    setUserContext: context.setUserContext,
    
    /**
     * Severity levels for messages
     */
    Severity
  };
};
export default useErrorMonitoring;
