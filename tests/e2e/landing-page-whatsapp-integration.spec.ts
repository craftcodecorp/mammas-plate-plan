/**
 * Landing Page to WhatsApp Integration E2E Test
 * 
 * Tests the complete flow from landing page form submission
 * to WhatsApp onboarding integration
 */

import { test, expect } from '@playwright/test';
import { setupMockApi } from '../mocks/api-mocks';

test.describe('Landing Page to WhatsApp Integration', () => {
  test.beforeEach(async ({ page }) => {
    // Setup API mocks
    await setupMockApi(page);
    
    // Navigate to landing page
    await page.goto('/');
  });
  
  test('should create a partial profile and notify WhatsApp Service', async ({ page }) => {
    // Fill out the landing page form
    await page.getByLabel('Nome completo').fill('Maria Silva');
    await page.getByLabel('WhatsApp').fill('11999999999');
    await page.getByLabel('Tamanho da família').selectOption('children');
    await page.getByLabel('Restrições alimentares').selectOption('vegetarian');
    
    // Accept terms and privacy policy
    await page.getByLabel('Aceito os termos de uso').check();
    await page.getByLabel('Aceito a política de privacidade').check();
    
    // Submit the form
    await page.getByRole('button', { name: 'Começar teste gratuito' }).click();
    
    // Wait for API calls to complete
    await Promise.all([
      page.waitForResponse(response => 
        response.url().includes('/users/partial-profile') && 
        response.status() === 201
      ),
      page.waitForResponse(response => 
        response.url().includes('/onboarding/landing-page-signup') && 
        response.status() === 200
      )
    ]);
    
    // Verify we're redirected to thank you page
    await expect(page).toHaveURL(/thank-you/);
    
    // Verify thank you page content
    await expect(page.getByText('Obrigado por se cadastrar')).toBeVisible();
    await expect(page.getByText('Enviamos uma mensagem para o seu WhatsApp')).toBeVisible();
    await expect(page.getByText('INICIAR')).toBeVisible();
    
    // Verify the state contains whatsappNotified flag
    const state = await page.evaluate(() => window.history.state);
    expect(state.usr.whatsappNotified).toBe(true);
  });
  
  test('should handle existing user with partial profile', async ({ page }) => {
    // Setup mock for existing user
    await page.evaluate(() => {
      window.mockExistingUser = true;
    });
    
    // Fill out the landing page form
    await page.getByLabel('Nome completo').fill('João Existente');
    await page.getByLabel('WhatsApp').fill('11888888888');
    await page.getByLabel('Tamanho da família').selectOption('adult');
    await page.getByLabel('Restrições alimentares').selectOption('none');
    
    // Accept terms and privacy policy
    await page.getByLabel('Aceito os termos de uso').check();
    await page.getByLabel('Aceito a política de privacidade').check();
    
    // Submit the form
    await page.getByRole('button', { name: 'Começar teste gratuito' }).click();
    
    // Wait for API calls to complete
    await Promise.all([
      page.waitForResponse(response => 
        response.url().includes('/users/partial-profile') && 
        response.status() === 200
      ),
      page.waitForResponse(response => 
        response.url().includes('/onboarding/landing-page-signup') && 
        response.status() === 200
      )
    ]);
    
    // Verify we're redirected to thank you page
    await expect(page).toHaveURL(/thank-you/);
    
    // Verify thank you page content acknowledges existing profile
    await expect(page.getByText('Obrigado por retornar')).toBeVisible();
  });
  
  test('should handle API errors gracefully', async ({ page }) => {
    // Setup mock for API error
    await page.evaluate(() => {
      window.mockApiError = true;
    });
    
    // Fill out the landing page form
    await page.getByLabel('Nome completo').fill('Erro Teste');
    await page.getByLabel('WhatsApp').fill('11777777777');
    await page.getByLabel('Tamanho da família').selectOption('baby');
    await page.getByLabel('Restrições alimentares').selectOption('gluten-free');
    
    // Accept terms and privacy policy
    await page.getByLabel('Aceito os termos de uso').check();
    await page.getByLabel('Aceito a política de privacidade').check();
    
    // Submit the form
    await page.getByRole('button', { name: 'Começar teste gratuito' }).click();
    
    // Verify error toast appears
    await expect(page.getByText('Erro ao criar perfil')).toBeVisible();
    
    // Verify we stay on the landing page
    await expect(page).not.toHaveURL(/thank-you/);
  });
  
  test('should handle WhatsApp notification failure gracefully', async ({ page }) => {
    // Setup mock for WhatsApp message failure
    await page.evaluate(() => {
      window.mockWhatsAppFailure = true;
    });
    
    // Fill out the landing page form
    await page.getByLabel('Nome completo').fill('Falha Mensagem');
    await page.getByLabel('WhatsApp').fill('11666666666');
    await page.getByLabel('Tamanho da família').selectOption('children');
    await page.getByLabel('Restrições alimentares').selectOption('none');
    
    // Accept terms and privacy policy
    await page.getByLabel('Aceito os termos de uso').check();
    await page.getByLabel('Aceito a política de privacidade').check();
    
    // Submit the form
    await page.getByRole('button', { name: 'Começar teste gratuito' }).click();
    
    // Wait for API calls to complete
    await Promise.all([
      page.waitForResponse(response => 
        response.url().includes('/users/partial-profile') && 
        response.status() === 201
      ),
      page.waitForResponse(response => 
        response.url().includes('/onboarding/landing-page-signup') && 
        response.status() === 500
      )
    ]);
    
    // Verify we're still redirected to thank you page
    await expect(page).toHaveURL(/thank-you/);
    
    // Verify thank you page shows alternative instructions
    await expect(page.getByText('Não foi possível enviar a mensagem')).toBeVisible();
    await expect(page.getByText('Por favor, inicie uma conversa')).toBeVisible();
    
    // Verify the state contains whatsappNotified flag as false
    const state = await page.evaluate(() => window.history.state);
    expect(state.usr.whatsappNotified).toBe(false);
  });
});
