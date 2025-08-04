/**
 * Form validation utility functions
 */

/**
 * Validates a name field
 * @param name - The name to validate
 * @returns An error message if invalid, or null if valid
 */
export const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return "Nome é obrigatório";
  }
  
  if (name.trim().length < 3) {
    return "Nome deve ter pelo menos 3 caracteres";
  }
  
  return null;
};

/**
 * Validates a Brazilian phone number in WhatsApp format
 * @param phone - The phone number to validate
 * @returns An error message if invalid, or null if valid
 */
export const validateWhatsApp = (phone: string): string | null => {
  if (!phone.trim()) {
    return "Número de WhatsApp é obrigatório";
  }
  
  // Remove non-numeric characters for validation
  const numericPhone = phone.replace(/\D/g, "");
  
  // Brazilian phone numbers should have 10 or 11 digits (with area code)
  if (numericPhone.length < 10 || numericPhone.length > 11) {
    return "Número de WhatsApp inválido";
  }
  
  return null;
};

/**
 * Formats a phone number as a Brazilian phone number
 * @param phone - The phone number to format
 * @returns The formatted phone number
 */
export const formatWhatsAppNumber = (phone: string): string => {
  // Remove non-numeric characters
  const numericPhone = phone.replace(/\D/g, "");
  
  if (numericPhone.length <= 2) {
    return numericPhone;
  }
  
  if (numericPhone.length <= 6) {
    return `(${numericPhone.slice(0, 2)}) ${numericPhone.slice(2)}`;
  }
  
  if (numericPhone.length <= 10) {
    return `(${numericPhone.slice(0, 2)}) ${numericPhone.slice(2, 6)}-${numericPhone.slice(6)}`;
  }
  
  return `(${numericPhone.slice(0, 2)}) ${numericPhone.slice(2, 7)}-${numericPhone.slice(7, 11)}`;
};

/**
 * Validates a select field
 * @param value - The selected value
 * @returns An error message if invalid, or null if valid
 */
export const validateSelect = (value: string): string | null => {
  if (!value) {
    return "Este campo é obrigatório";
  }
  
  return null;
};

/**
 * Prepares WhatsApp number for API integration
 * @param phone - The phone number to prepare
 * @returns The prepared phone number in international format
 */
export const prepareWhatsAppNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const numericPhone = phone.replace(/\D/g, "");
  
  // Add Brazilian country code if not present
  if (numericPhone.startsWith("55")) {
    return numericPhone;
  }
  
  return `55${numericPhone}`;
};
