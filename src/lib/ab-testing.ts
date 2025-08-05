/**
 * A/B Testing Utility
 * 
 * This module provides functionality for A/B testing different components
 * and tracking user interactions with variants.
 */

import { createExperiment } from '@amplitude/experiment-js-client';
import { useEffect, useState } from 'react';

// Initialize the experiment client
// Replace with your actual API key when deploying
const AMPLITUDE_API_KEY = 'placeholder-api-key';
const experimentClient = createExperiment({
  apiKey: AMPLITUDE_API_KEY,
});

// Define experiment types
export type ExperimentVariant = 'control' | 'variant-a' | 'variant-b';

export interface ExperimentConfig {
  name: string;
  variants: ExperimentVariant[];
  defaultVariant: ExperimentVariant;
}

/**
 * Custom hook for A/B testing
 * @param config - The experiment configuration
 * @returns The selected variant for the user
 */
export const useABTest = (config: ExperimentConfig) => {
  const [variant, setVariant] = useState<ExperimentVariant>(config.defaultVariant);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchVariant = async () => {
      try {
        // Fetch the variant from the experiment service
        const result = await experimentClient.fetch({
          user_id: getUserId(),
        });

        // Get the variant for this specific experiment
        const experimentVariant = result.variants[config.name] as ExperimentVariant;
        
        if (experimentVariant && config.variants.includes(experimentVariant)) {
          setVariant(experimentVariant);
        }
      } catch (error) {
        console.error('Error fetching experiment variant:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchVariant();
  }, [config.name, config.variants]);

  // Track exposure to this variant
  useEffect(() => {
    if (isLoaded) {
      trackExposure(config.name, variant);
    }
  }, [isLoaded, variant, config.name]);

  return { variant, isLoaded };
};

/**
 * Get or create a unique user ID for A/B testing
 */
const getUserId = (): string => {
  let userId = localStorage.getItem('ab_test_user_id');
  
  if (!userId) {
    userId = `user_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('ab_test_user_id', userId);
  }
  
  return userId;
};

/**
 * Track exposure to an experiment variant
 */
const trackExposure = (experimentName: string, variant: ExperimentVariant) => {
  // This would typically send data to your analytics service
  console.log(`User exposed to experiment: ${experimentName}, variant: ${variant}`);
  
  // In a real implementation, you would track this with your analytics service
  // For example with Google Analytics:
  if (window.gtag) {
    window.gtag('event', 'experiment_exposure', {
      'experiment_name': experimentName,
      'variant': variant
    });
  }
};

/**
 * Track a conversion for an experiment
 */
export const trackConversion = (experimentName: string, variant: ExperimentVariant, eventName: string) => {
  // This would typically send data to your analytics service
  console.log(`Conversion for experiment: ${experimentName}, variant: ${variant}, event: ${eventName}`);
  
  // In a real implementation, you would track this with your analytics service
  if (window.gtag) {
    window.gtag('event', eventName, {
      'experiment_name': experimentName,
      'variant': variant
    });
  }
};

// Note: gtag is already defined in google-analytics.ts
// No need to redeclare it here
