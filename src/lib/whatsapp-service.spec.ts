/**
 * WhatsApp Service Client Unit Tests
 * 
 * Tests the WhatsApp Service client functionality for communicating with the WhatsApp Service API
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { notifyLandingPageSignup, type SignupData } from './whatsapp-service';
import * as formValidation from './form-validation';

// Mock the form-validation module
vi.mock('./form-validation', () => ({
  prepareWhatsAppNumber: vi.fn((number) => `+55${number.replace(/\D/g, '')}`)
}));

describe('WhatsApp Service Client', () => {
  // Setup console spy
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  
  beforeEach(() => {
    // Mock console methods
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    // Mock environment variables
    vi.stubEnv('VITE_WHATSAPP_SERVICE_URL', 'https://api.test.com/api/v1');
    vi.stubEnv('VITE_WHATSAPP_API_KEY', 'test-api-key-123');
    
    // Reset mocks
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });
  
  describe('notifyLandingPageSignup', () => {
    it('should successfully notify WhatsApp Service of landing page signup', async () => {
      // Setup
      const profileId = 'test-profile-123';
      const formData: SignupData = {
        name: 'John Doe',
        whatsapp: '11999999999',
        familySize: 'children',
        dietaryRestrictions: 'vegetarian'
      };
      
      // Execute
      const result = await notifyLandingPageSignup(profileId, formData);
      
      // Verify
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(formValidation.prepareWhatsAppNumber).toHaveBeenCalledWith(formData.whatsapp);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'WhatsApp Service API call: POST https://api.test.com/api/v1/onboarding/landing-page-signup',
        expect.objectContaining({
          apiKey: expect.any(String),
          data: expect.objectContaining({
            profileId,
            name: formData.name,
            phoneNumber: '+5511999999999',
            familySize: formData.familySize,
            dietaryRestrictions: formData.dietaryRestrictions,
            source: 'landing_page'
          })
        })
      );
    });
    
    it('should handle errors when notifying WhatsApp Service', async () => {
      // Setup
      const profileId = 'test-profile-123';
      const formData: SignupData = {
        name: 'John Doe',
        whatsapp: '11999999999',
        familySize: 'children',
        dietaryRestrictions: 'vegetarian'
      };
      
      // Mock a failure scenario
      const mockError = new Error('Network error');
      vi.spyOn(global, 'setTimeout').mockImplementationOnce(() => {
        throw mockError;
      });
      
      // Execute
      const result = await notifyLandingPageSignup(profileId, formData);
      
      // Verify
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.code).toBe('API_ERROR');
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error calling WhatsApp Service API:',
        mockError
      );
    });
    
    it('should handle different family sizes and dietary restrictions', async () => {
      // Setup
      const profileId = 'test-profile-456';
      const formData: SignupData = {
        name: 'Maria da Silva',
        whatsapp: '11888888888',
        familySize: 'baby',
        dietaryRestrictions: 'none'
      };
      
      // Execute
      const result = await notifyLandingPageSignup(profileId, formData);
      
      // Verify
      expect(result.success).toBe(true);
      expect(formValidation.prepareWhatsAppNumber).toHaveBeenCalledWith(formData.whatsapp);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'WhatsApp Service API call: POST https://api.test.com/api/v1/onboarding/landing-page-signup',
        expect.objectContaining({
          data: expect.objectContaining({
            profileId,
            name: 'Maria da Silva',
            familySize: 'baby',
            dietaryRestrictions: "none",
            source: 'landing_page'
          })
        })
      );
    });
  });
  
  describe('deprecated functions', () => {
    it('should warn when using deprecated sendLandingPageCompletionMessage', async () => {
      // Import the deprecated function dynamically to avoid TypeScript errors
      const { sendLandingPageCompletionMessage } = await import('./whatsapp-service');
      
      // Setup
      const formData: SignupData = {
        name: 'John Doe',
        whatsapp: '11999999999',
        familySize: 'children',
        dietaryRestrictions: 'vegetarian'
      };
      
      // Execute
      const result = await sendLandingPageCompletionMessage(formData);
      
      // Verify
      expect(result).toBe(true);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "sendLandingPageCompletionMessage is deprecated. Use notifyLandingPageSignup instead."
      );
    });
  });
});
