/**
 * WhatsApp Service Client
 * 
 * This client communicates with the WhatsApp Service API.
 * It does NOT directly send WhatsApp messages but rather calls the WhatsApp Service API
 * which is responsible for all WhatsApp communication.
 * 
 * IMPORTANT: This client should NOT directly create or update user profiles.
 * User profile management is the responsibility of the User Management Service.
 * The WhatsApp service should only handle message sending and WhatsApp-specific logic.
 */

import { prepareWhatsAppNumber } from "./form-validation";

export interface WhatsAppApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
}

export interface SignupData {
  name: string;
  whatsapp: string;
  familySize: string;
  dietaryRestrictions: string;
}

export interface LandingPageSignupRequest {
  profileId: string;
  name: string;
  phoneNumber: string;
  familySize: string;
  dietaryRestrictions?: string;
  source: string;
}

/**
 * Base function to call the WhatsApp Service API
 * 
 * @param endpoint - API endpoint path
 * @param method - HTTP method
 * @param data - Request payload
 * @returns API response
 */
async function callWhatsAppServiceApi<T = unknown>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST',
  data?: unknown
): Promise<WhatsAppApiResponse<T>> {
  try {
    const apiUrl = import.meta.env.VITE_WHATSAPP_SERVICE_URL || 'http://localhost:3002/api/v1';
    const apiKey = import.meta.env.VITE_WHATSAPP_API_KEY || 'dev-api-key';
    
    // In a real implementation, this would make an actual API call
    // For now, we'll simulate a successful API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(`WhatsApp Service API call: ${method} ${apiUrl}${endpoint}`, {
      apiKey: `${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)}`,
      data
    });
    
    // Simulate successful response
    return {
      success: true,
      data: { messageId: `msg-${Date.now()}` } as unknown as T
    };
  } catch (error) {
    console.error("Error calling WhatsApp Service API:", error);
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: 'API_ERROR'
      }
    };
  }
}

/**
 * Notifies the WhatsApp Service of a new landing page signup
 * 
 * This tells the WhatsApp Service to send a welcome message to the user
 * instructing them to start the WhatsApp onboarding process.
 * 
 * @param profileId - ID of the partial user profile
 * @param data - The user's signup data
 * @returns A promise that resolves to the API response
 */
export const notifyLandingPageSignup = async (
  profileId: string,
  data: SignupData
): Promise<WhatsAppApiResponse> => {
  const phoneNumber = prepareWhatsAppNumber(data.whatsapp);
  
  return callWhatsAppServiceApi('/onboarding/landing-page-signup', 'POST', {
    profileId,
    name: data.name,
    phoneNumber,
    familySize: data.familySize,
    dietaryRestrictions: data.dietaryRestrictions || undefined,
    source: 'landing_page'
  });
};

/**
 * @deprecated Use notifyLandingPageSignup instead
 * This function violates the architectural boundary that all WhatsApp communication
 * must go through the WhatsApp Service. It will be removed in a future release.
 * 
 * @param data - The user's signup data
 * @returns A promise that resolves to true if the notification was successful
 */
export const sendLandingPageCompletionMessage = async (data: SignupData): Promise<boolean> => {
  console.warn("sendLandingPageCompletionMessage is deprecated. Use notifyLandingPageSignup instead.");
  const response = await notifyLandingPageSignup('unknown', data);
  return response.success;
};
