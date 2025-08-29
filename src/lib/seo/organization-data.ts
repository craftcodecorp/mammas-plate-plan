/**
 * Organization Data for SEO
 * 
 * This module provides organization data for structured data (JSON-LD) implementation.
 */

import { generateOrganizationStructuredData } from './seo-utils';

/**
 * Organization data for Cardápio Fácil
 */
export const organizationData = {
  name: "Cardápio Fácil",
  url: "https://cardapiofacil.online",
  logo: "https://cardapiofacil.online/logo.png",
  description: "Planejamento de refeições saudáveis e deliciosas para toda a família",
  sameAs: [
    "https://facebook.com/cardapiofacil",
    "https://instagram.com/cardapiofacil",
    "https://twitter.com/cardapiofacil"
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55-11-99999-9999',
    contactType: 'customer service',
    availableLanguage: ['Portuguese', 'English']
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Paulista, 1000',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '01310-100',
    addressCountry: 'BR'
  }
};

/**
 * Generate organization structured data
 * @returns JSON-LD structured data string
 */
export const getOrganizationStructuredData = (): string => {
  return generateOrganizationStructuredData({
    name: organizationData.name,
    url: organizationData.url,
    logo: organizationData.logo,
    description: organizationData.description,
    sameAs: organizationData.sameAs
  });
};

/**
 * Generate extended organization structured data with contact points and address
 * @returns JSON-LD structured data string
 */
export const getExtendedOrganizationStructuredData = (): string => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organizationData.name,
    url: organizationData.url,
    logo: organizationData.logo,
    description: organizationData.description,
    sameAs: organizationData.sameAs,
    contactPoint: organizationData.contactPoint,
    address: organizationData.address
  };
  
  return JSON.stringify(structuredData);
};
