/**
 * Form Analytics Service
 * 
 * This module provides specialized analytics tracking for form interactions
 * and conversions on the landing page.
 */

import { useAnalytics } from './use-analytics';

// Form submission stages for funnel analysis
export enum FormStage {
  VIEWED = 'viewed',
  STARTED = 'started',
  ATTEMPTED = 'attempted',
  VALIDATED = 'validated',
  SUBMITTED = 'submitted',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

// Form field interaction types
export enum FieldInteraction {
  FOCUS = 'focus',
  BLUR = 'blur',
  CHANGE = 'change',
  ERROR = 'error'
}

// Form analytics service
export const useFormAnalytics = () => {
  const { trackEvent, trackConversion } = useAnalytics();
  
  /**
   * Track form view
   * @param formId - Identifier for the form
   * @param source - Source page or component
   */
  const trackFormView = (formId: string, source: string) => {
    trackEvent('form_view', {
      form_id: formId,
      source,
      timestamp: new Date().toISOString()
    });
  };
  
  /**
   * Track form field interaction
   * @param formId - Identifier for the form
   * @param fieldName - Name of the field
   * @param interactionType - Type of interaction
   * @param metadata - Additional metadata
   */
  const trackFieldInteraction = (
    formId: string,
    fieldName: string,
    interactionType: FieldInteraction,
    metadata?: Record<string, unknown>
  ) => {
    trackEvent('form_field_interaction', {
      form_id: formId,
      field_name: fieldName,
      interaction_type: interactionType,
      ...metadata
    });
  };
  
  /**
   * Track form stage
   * @param formId - Identifier for the form
   * @param stage - Current stage of the form
   * @param metadata - Additional metadata
   */
  const trackFormStage = (
    formId: string,
    stage: FormStage,
    metadata?: Record<string, unknown>
  ) => {
    trackEvent('form_stage', {
      form_id: formId,
      stage,
      timestamp: new Date().toISOString(),
      ...metadata
    });
  };
  
  /**
   * Track form submission
   * @param formId - Identifier for the form
   * @param success - Whether submission was successful
   * @param userData - User data from the form
   * @param metadata - Additional metadata
   */
  const trackFormSubmission = (
    formId: string,
    success: boolean,
    userData: {
      userId?: string;
      familySize?: string;
      hasDietaryRestrictions?: boolean;
      dietaryType?: string;
    },
    metadata?: Record<string, unknown>
  ) => {
    if (success) {
      // Track as conversion
      trackConversion('form_submission_success', {
        form_id: formId,
        user_id: userData.userId,
        family_size: userData.familySize,
        has_dietary_restrictions: userData.hasDietaryRestrictions,
        dietary_type: userData.dietaryType,
        timestamp: new Date().toISOString(),
        ...metadata
      });
    } else {
      // Track as regular event
      trackEvent('form_submission_failure', {
        form_id: formId,
        timestamp: new Date().toISOString(),
        ...metadata
      });
    }
  };
  
  /**
   * Track signup completion
   * @param userId - User ID
   * @param source - Source of the signup
   * @param metadata - Additional metadata
   */
  const trackSignupCompletion = (
    userId: string,
    source: string,
    metadata?: Record<string, unknown>
  ) => {
    trackConversion('signup_completed', {
      user_id: userId,
      source,
      conversion_value: 1,
      timestamp: new Date().toISOString(),
      ...metadata
    });
  };
  
  return {
    trackFormView,
    trackFieldInteraction,
    trackFormStage,
    trackFormSubmission,
    trackSignupCompletion,
    FormStage,
    FieldInteraction
  };
};
