/**
 * API Mocks for E2E Tests
 * 
 * This file contains mock implementations of the User Management Service
 * and WhatsApp Service APIs for use in E2E tests.
 */

import { Page } from '@playwright/test';

/**
 * Sets up API mocks for E2E tests
 * 
 * @param page - Playwright page object
 */
export async function setupMockApi(page: Page): Promise<void> {
  // Setup global mock state
  await page.evaluate(() => {
    window.mockExistingUser = false;
    window.mockApiError = false;
    window.mockWhatsAppFailure = false;
  });

  // Mock User Management Service API - Partial Profile endpoint
  await page.route('**/api/v1/users/partial-profile', async (route) => {
    // Get request data
    const request = route.request();
    const method = request.method();
    const body = request.postDataJSON();
    
    // Check for mock conditions
    const mockExistingUser = await page.evaluate(() => window.mockExistingUser);
    const mockApiError = await page.evaluate(() => window.mockApiError);
    
    // Handle API error mock
    if (mockApiError) {
      return route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: {
            message: 'Validation error: Invalid phone number format',
            code: 'VALIDATION_ERROR'
          }
        })
      });
    }
    
    // Handle existing user mock
    if (mockExistingUser) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            id: 'existing-user-123',
            name: body.name,
            phoneNumber: body.phoneNumber,
            familySize: body.familySize,
            dietaryRestrictions: body.dietaryRestrictions,
            status: 'PENDING',
            source: 'landing_page',
            metadata: {
              createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
              updatedAt: new Date().toISOString()
            }
          },
          meta: {
            created: false
          }
        })
      });
    }
    
    // Default: New user creation
    return route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: {
          id: 'new-user-' + Date.now(),
          name: body.name,
          phoneNumber: body.phoneNumber,
          familySize: body.familySize,
          dietaryRestrictions: body.dietaryRestrictions,
          status: 'PENDING',
          source: 'landing_page',
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        },
        meta: {
          created: true
        }
      })
    });
  });
  
  // Mock WhatsApp Service API - Onboarding endpoint for landing page signup
  await page.route('**/api/v1/onboarding/landing-page-signup', async (route) => {
    // Check for mock conditions
    const mockWhatsAppFailure = await page.evaluate(() => window.mockWhatsAppFailure);
    
    if (mockWhatsAppFailure) {
      return route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: {
            message: 'Failed to send WhatsApp onboarding message',
            code: 'WHATSAPP_API_ERROR'
          }
        })
      });
    }
    
    // Default: Successful onboarding notification
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: {
          profileId: route.request().postDataJSON().profileId,
          onboardingId: 'onb-' + Date.now(),
          messageStatus: 'queued',
          timestamp: new Date().toISOString()
        }
      })
    });
  });
  
  // Mock WhatsApp Service API - Legacy Messages endpoint (for backward compatibility)
  await page.route('**/api/v1/messages', async (route) => {
    // Check for mock conditions
    const mockWhatsAppFailure = await page.evaluate(() => window.mockWhatsAppFailure);
    
    if (mockWhatsAppFailure) {
      return route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: {
            message: 'Failed to send WhatsApp message',
            code: 'WHATSAPP_API_ERROR'
          }
        })
      });
    }
    
    // Default: Successful message sending
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: {
          messageId: 'msg-' + Date.now(),
          status: 'queued',
          timestamp: new Date().toISOString()
        }
      })
    });
  });
  
  // Mock Analytics Service API - Events endpoint
  await page.route('**/api/v1/analytics/events', async (route) => {
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true
      })
    });
  });
  
  // Add type definition for window object
  await page.addInitScript(() => {
    window.mockExistingUser = false;
    window.mockApiError = false;
    window.mockWhatsAppFailure = false;
  });
}

// Add type definitions for the window object
declare global {
  interface Window {
    mockExistingUser: boolean;
    mockApiError: boolean;
    mockWhatsAppFailure: boolean;
  }
}
