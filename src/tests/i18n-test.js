/**
 * Simple test script to verify language switching functionality
 * 
 * This script can be run in the browser console to test if all translation keys
 * are properly loaded and displayed when switching languages.
 */

(function() {
  console.log('Starting i18n test...');
  
  // Get the current language
  const getCurrentLanguage = () => {
    return localStorage.getItem('language') || 'pt-BR';
  };
  
  // Log the current language
  console.log('Current language:', getCurrentLanguage());
  
  // Function to toggle language
  const toggleLanguage = () => {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'pt-BR' ? 'en-US' : 'pt-BR';
    
    console.log(`Switching language from ${currentLang} to ${newLang}`);
    
    // Set the new language in localStorage
    localStorage.setItem('language', newLang);
    
    // Reload the page to apply the new language
    window.location.reload();
  };
  
  // Create a button to toggle language
  const createToggleButton = () => {
    const button = document.createElement('button');
    button.textContent = 'Toggle Language for Testing';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.left = '20px';
    button.style.zIndex = '9999';
    button.style.padding = '10px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    
    button.addEventListener('click', toggleLanguage);
    
    document.body.appendChild(button);
    
    console.log('Language toggle button added to the page');
  };
  
  // Function to check for missing translations
  const checkMissingTranslations = () => {
    const currentLang = getCurrentLanguage();
    
    // Get all elements with data-i18n attribute
    const i18nElements = document.querySelectorAll('[data-i18n]');
    
    console.log(`Found ${i18nElements.length} elements with data-i18n attribute`);
    
    // Check for elements with missing translations
    i18nElements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (element.textContent.includes('missing translation')) {
        console.error(`Missing translation for key: ${key} in language: ${currentLang}`);
      }
    });
    
    console.log('Translation check completed');
  };
  
  // Run the test
  createToggleButton();
  
  // Check for missing translations after a short delay to ensure the page is fully loaded
  setTimeout(checkMissingTranslations, 2000);
  
  console.log('i18n test initialized. Use the button at the bottom left to toggle language.');
})();
