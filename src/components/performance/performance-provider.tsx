import React, { createContext, useContext, useEffect, useState } from 'react';
import { initWebVitals } from '@/lib/performance/web-vitals';

// Define context type
interface PerformanceContextType {
  isOptimized: boolean;
  deferredLoading: boolean;
  priorityLoading: boolean;
}

// Create context with default values
const PerformanceContext = createContext<PerformanceContextType>({
  isOptimized: false,
  deferredLoading: false,
  priorityLoading: true,
});

interface PerformanceProviderProps {
  children: React.ReactNode;
}

/**
 * Performance Provider Component
 * 
 * This component manages performance optimizations and monitoring
 * throughout the application.
 */
export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({ children }) => {
  const [isOptimized, setIsOptimized] = useState(false);
  const [deferredLoading, setDeferredLoading] = useState(false);
  const [priorityLoading, setPriorityLoading] = useState(true);
  
  useEffect(() => {
    // Initialize Web Vitals monitoring
    initWebVitals();
    
    // Set up performance observer for long tasks
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            // Log long tasks (tasks that block the main thread for more than 50ms)
            if (entry.duration > 50) {
              console.warn('Long task detected:', entry);
            }
          });
        });
        
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.error('PerformanceObserver for longtask not supported', e);
      }
    }
    
    // Mark the initial load in performance timeline
    performance.mark('app-initialized');
    
    // After initial render, enable deferred loading for non-critical content
    setTimeout(() => {
      setDeferredLoading(true);
      performance.mark('deferred-loading-enabled');
      performance.measure('time-to-deferred-loading', 'app-initialized', 'deferred-loading-enabled');
    }, 3000);
    
    // After the page is fully loaded and idle
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        setIsOptimized(true);
        performance.mark('optimization-complete');
      });
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(() => {
        setIsOptimized(true);
        performance.mark('optimization-complete');
      }, 5000);
    }
    
    // After critical content is loaded, we can deprioritize
    setTimeout(() => {
      setPriorityLoading(false);
    }, 2000);
  }, []);
  
  return (
    <PerformanceContext.Provider value={{ isOptimized, deferredLoading, priorityLoading }}>
      {children}
    </PerformanceContext.Provider>
  );
};

/**
 * Custom hook to use performance context
 */
export const usePerformance = () => useContext(PerformanceContext);

/**
 * Component that defers rendering until after initial load
 */
export const DeferredContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { deferredLoading } = usePerformance();
  
  if (!deferredLoading) {
    return null;
  }
  
  return <>{children}</>;
};

/**
 * Component that only renders content when it's in the viewport
 */
export const ViewportAwareContent: React.FC<{ 
  children: React.ReactNode;
  threshold?: number;
}> = ({ children, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);
  
  return (
    <div ref={ref}>
      {isVisible ? children : <div style={{ height: '100px' }} />}
    </div>
  );
};
