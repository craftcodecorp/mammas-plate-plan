/**
 * Utility functions for smooth scrolling
 */

/**
 * Scrolls smoothly to an element with the specified ID
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top of the element (in pixels)
 */
export const scrollToElement = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Scrolls smoothly to the signup form
 */
export const scrollToSignupForm = (): void => {
  scrollToElement('signup-form', 50); // 50px offset from the top
};
