/**
 * A/B Testing Module
 * 
 * Provides functionality for A/B testing and feature flagging using
 * Amplitude Experiment or a simple local implementation.
 */

// Define experiment types
export interface Experiment {
  id: string;
  name: string;
  variants: string[];
  defaultVariant: string;
}

export interface ExperimentResult {
  variant: string;
  experimentId: string;
  experimentName: string;
  isDefault: boolean;
}

// Track active experiments
const activeExperiments: Record<string, ExperimentResult> = {};

/**
 * Initialize Amplitude for A/B testing
 * @param apiKey - Amplitude API key
 * @param experimentKey - Experiment API key
 */
export const initializeAmplitude = (apiKey?: string, experimentKey?: string): void => {
  if (!apiKey || !experimentKey) {
    console.log('Amplitude or Experiment API key not provided, using local A/B testing');
    return;
  }

  try {
    // Load Amplitude script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://cdn.amplitude.com/libs/amplitude-8.18.1-min.js';
    
    script.onload = () => {
      if (window.amplitude) {
        // Initialize Amplitude
        window.amplitude.getInstance().init(apiKey, undefined, {
          includeReferrer: true,
          includeUtm: true,
          includeGclid: true,
        });
        
        console.log('Amplitude initialized for A/B testing');
      }
    };
    
    document.head.appendChild(script);
  } catch (error) {
    console.error('Failed to initialize Amplitude:', error);
  }
};

/**
 * Get experiment variant for a user
 * @param experimentId - Experiment identifier
 * @param userId - User identifier (optional)
 * @param experimentConfig - Experiment configuration
 * @returns The variant assigned to the user
 */
export const getExperimentVariant = (
  experimentId: string,
  userId?: string,
  experimentConfig?: Experiment
): ExperimentResult => {
  // Check if we already have a result for this experiment
  if (activeExperiments[experimentId]) {
    return activeExperiments[experimentId];
  }
  
  // If Amplitude Experiment is available, use it
  if (window.amplitude && experimentConfig) {
    try {
      // This is a simplified implementation
      // In a real implementation, you would use Amplitude's Experiment SDK
      const variantIndex = Math.floor(Math.random() * experimentConfig.variants.length);
      const variant = experimentConfig.variants[variantIndex];
      
      const result: ExperimentResult = {
        variant,
        experimentId,
        experimentName: experimentConfig.name,
        isDefault: variant === experimentConfig.defaultVariant
      };
      
      // Store the result
      activeExperiments[experimentId] = result;
      
      // Track exposure in Amplitude
      window.amplitude.getInstance().logEvent('Experiment Exposure', {
        experimentId,
        experimentName: experimentConfig.name,
        variant
      });
      
      return result;
    } catch (error) {
      console.error('Error getting experiment variant from Amplitude:', error);
    }
  }
  
  // Fallback to local implementation
  if (experimentConfig) {
    // Simple hash function for consistent assignment
    const hash = userId 
      ? userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      : Math.floor(Math.random() * 1000);
    
    const variantIndex = hash % experimentConfig.variants.length;
    const variant = experimentConfig.variants[variantIndex];
    
    const result: ExperimentResult = {
      variant,
      experimentId,
      experimentName: experimentConfig.name,
      isDefault: variant === experimentConfig.defaultVariant
    };
    
    // Store the result
    activeExperiments[experimentId] = result;
    
    return result;
  }
  
  // Default fallback
  const defaultResult: ExperimentResult = {
    variant: 'control',
    experimentId,
    experimentName: experimentId,
    isDefault: true
  };
  
  activeExperiments[experimentId] = defaultResult;
  return defaultResult;
};

/**
 * Track experiment conversion
 * @param experimentId - Experiment identifier
 * @param conversionEvent - Conversion event name
 * @param properties - Additional properties
 */
export const trackExperimentConversion = (
  experimentId: string,
  conversionEvent: string,
  properties?: Record<string, unknown>
): void => {
  const experiment = activeExperiments[experimentId];
  
  if (!experiment) {
    console.warn(`No active experiment found with ID: ${experimentId}`);
    return;
  }
  
  // If Amplitude is available, track conversion
  if (window.amplitude) {
    window.amplitude.getInstance().logEvent(conversionEvent, {
      ...properties,
      experimentId,
      experimentName: experiment.experimentName,
      variant: experiment.variant,
      isConversion: true
    });
  }
  
  console.log(`Experiment conversion tracked: ${conversionEvent}`, {
    experimentId,
    variant: experiment.variant,
    ...properties
  });
};

// Define type definitions for window
declare global {
  interface Window {
    amplitude?: {
      getInstance: () => {
        init: (apiKey: string, userId?: string, config?: Record<string, unknown>) => void;
        logEvent: (eventName: string, eventProperties?: Record<string, unknown>) => void;
      };
    };
  }
}
