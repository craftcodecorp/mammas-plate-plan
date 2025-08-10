/**
 * Firebase Analytics Integration
 * 
 * This module provides integration with Firebase Analytics for tracking
 * user interactions, conversions, and form submissions.
 */

import { initializeApp } from 'firebase/app';
import { 
  getAnalytics, 
  logEvent, 
  setUserId, 
  setUserProperties,
  isSupported
} from 'firebase/analytics';

// Firebase configuration
// Note: These values should be set in environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let analytics: ReturnType<typeof getAnalytics> | null = null;
let isInitialized = false;

/**
 * Initialize Firebase Analytics
 * @returns Promise that resolves when Firebase Analytics is initialized
 */
export const initFirebaseAnalytics = async (): Promise<boolean> => {
  if (isInitialized) return true;
  
  try {
    // Check if analytics is supported in this environment
    const supported = await isSupported();
    if (!supported) {
      console.warn('Firebase Analytics is not supported in this environment');
      return false;
    }
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    isInitialized = true;
    
    console.log('Firebase Analytics initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize Firebase Analytics:', error);
    return false;
  }
};

/**
 * Track an event in Firebase Analytics
 * @param eventName - Name of the event to track
 * @param eventParams - Parameters to include with the event
 */
export const trackFirebaseEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
): void => {
  if (!analytics) {
    console.warn('Firebase Analytics not initialized. Event not tracked:', eventName);
    return;
  }
  
  try {
    logEvent(analytics, eventName, eventParams);
  } catch (error) {
    console.error(`Error tracking Firebase event ${eventName}:`, error);
  }
};

/**
 * Set user ID for Firebase Analytics
 * @param userId - User ID to set
 */
export const setFirebaseUserId = (userId: string): void => {
  if (!analytics) {
    console.warn('Firebase Analytics not initialized. User ID not set:', userId);
    return;
  }
  
  try {
    setUserId(analytics, userId);
  } catch (error) {
    console.error('Error setting Firebase user ID:', error);
  }
};

/**
 * Set user properties for Firebase Analytics
 * @param properties - User properties to set
 */
export const setFirebaseUserProperties = (
  properties: Record<string, string>
): void => {
  if (!analytics) {
    console.warn('Firebase Analytics not initialized. User properties not set');
    return;
  }
  
  try {
    setUserProperties(analytics, properties);
  } catch (error) {
    console.error('Error setting Firebase user properties:', error);
  }
};

/**
 * Track a form submission event in Firebase Analytics
 * @param formId - ID of the form
 * @param success - Whether the submission was successful
 * @param userData - User data from the form
 */
export const trackFirebaseFormSubmission = (
  formId: string,
  success: boolean,
  userData?: {
    userId?: string;
    familySize?: string;
    hasDietaryRestrictions?: boolean;
    dietaryType?: string;
  }
): void => {
  const eventName = success ? 'form_submission_success' : 'form_submission_failure';
  
  trackFirebaseEvent(eventName, {
    form_id: formId,
    ...userData,
    timestamp: new Date().toISOString()
  });
  
  // If successful and we have a user ID, set it in Firebase
  if (success && userData?.userId) {
    setFirebaseUserId(userData.userId);
    
    // Set user properties based on form data
    const userProperties: Record<string, string> = {};
    
    if (userData.familySize) {
      userProperties.family_size = userData.familySize;
    }
    
    if (userData.hasDietaryRestrictions !== undefined) {
      userProperties.has_dietary_restrictions = String(userData.hasDietaryRestrictions);
    }
    
    if (userData.dietaryType) {
      userProperties.dietary_type = userData.dietaryType;
    }
    
    setFirebaseUserProperties(userProperties);
  }
};

/**
 * Track a conversion event in Firebase Analytics
 * @param conversionName - Name of the conversion
 * @param conversionData - Data associated with the conversion
 */
export const trackFirebaseConversion = (
  conversionName: string,
  conversionData?: Record<string, unknown>
): void => {
  trackFirebaseEvent(conversionName, {
    ...conversionData,
    is_conversion: true,
    timestamp: new Date().toISOString()
  });
};

export default {
  initFirebaseAnalytics,
  trackFirebaseEvent,
  setFirebaseUserId,
  setFirebaseUserProperties,
  trackFirebaseFormSubmission,
  trackFirebaseConversion
};
