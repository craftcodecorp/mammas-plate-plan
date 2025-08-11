/**
 * User Management Service API Client
 * 
 * This service handles communication with the User Management Service API.
 * It provides methods for creating and managing user profiles.
 */

import axios from 'axios';

// API base URL - should be configurable via environment variables in production
const API_BASE_URL = import.meta.env.VITE_USER_SERVICE_URL || 'http://localhost:3001/api/v1';

// Types
export interface PartialProfileData {
  name: string;
  phoneNumber: string;
  source: string;
  familySize: string;
  dietaryRestrictions?: string;
  acceptedTerms: boolean;
  acceptedPrivacyPolicy: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}

export interface PartialProfileResponse {
  id: string;
  name: string;
  phoneNumber: string;
  familySize: string;
  dietaryRestrictions?: string;
  createdAt: string;
  status: string;
}

/**
 * Creates a partial user profile in the User Management Service
 * 
 * @param profileData - The partial profile data to create
 * @returns A promise that resolves with the API response
 */
export const createPartialProfile = async (profileData: PartialProfileData): Promise<ApiResponse<PartialProfileResponse>> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/partial-profile`, 
      profileData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error creating partial profile:', error);
    
    // Handle axios error responses
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: {
          message: error.response.data?.message || 'Failed to create profile',
          code: error.response.data?.code || 'UNKNOWN_ERROR',
        },
      };
    }
    
    // Handle network or other errors
    return {
      success: false,
      error: {
        message: 'Network error or service unavailable',
        code: 'SERVICE_UNAVAILABLE',
      },
    };
  }
};
