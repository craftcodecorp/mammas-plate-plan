/**
 * WhatsApp integration service
 * 
 * This service handles sending WhatsApp messages to users.
 * In a production environment, this would integrate with the WhatsApp Business API
 * or a third-party service like Twilio.
 */

import { prepareWhatsAppNumber } from "./form-validation";

export interface WhatsAppMessage {
  to: string;
  message: string;
}

export interface SignupData {
  name: string;
  whatsapp: string;
  familySize: string;
  dietaryRestrictions: string;
}

/**
 * Sends a WhatsApp message
 * 
 * @param message - The message to send
 * @returns A promise that resolves when the message is sent
 */
export const sendWhatsAppMessage = async (message: WhatsAppMessage): Promise<boolean> => {
  try {
    // In a real implementation, this would call an API endpoint
    // For now, we'll simulate a successful API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("WhatsApp message sent:", message);
    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return false;
  }
};

/**
 * Sends a welcome message to a new user
 * 
 * @param data - The user's signup data
 * @returns A promise that resolves when the message is sent
 */
export const sendWelcomeMessage = async (data: SignupData): Promise<boolean> => {
  const phoneNumber = prepareWhatsAppNumber(data.whatsapp);
  
  // Customize the welcome message based on the user's profile
  let welcomeMessage = `Olá ${data.name.split(" ")[0]}, bem-vindo(a) ao Cardápio Fácil! 🎉\n\n`;
  welcomeMessage += "Estamos preparando seu cardápio personalizado e você receberá o primeiro em até 24 horas.\n\n";
  
  // Add personalized message based on family size
  if (data.familySize === "baby") {
    welcomeMessage += "Vamos incluir opções especiais para introdução alimentar do seu bebê.\n\n";
  } else if (data.familySize === "children") {
    welcomeMessage += "Vamos incluir opções que agradam as crianças, mas com todo o valor nutricional necessário.\n\n";
  }
  
  // Add personalized message based on dietary restrictions
  if (data.dietaryRestrictions && data.dietaryRestrictions !== "none") {
    welcomeMessage += "Suas restrições alimentares serão respeitadas em todas as refeições sugeridas.\n\n";
  }
  
  welcomeMessage += "Seu teste gratuito de 14 dias começou hoje! Não se preocupe, avisaremos antes do término.\n\n";
  welcomeMessage += "Equipe Cardápio Fácil";
  
  return sendWhatsAppMessage({
    to: phoneNumber,
    message: welcomeMessage
  });
};
