/**
 * Organization Data for SEO
 * 
 * This module provides organization data for structured data (JSON-LD) implementation.
 */

import { generateOrganizationStructuredData } from './seo-utils';

/**
 * Organization data for Mamma's Plate Plan
 */
export const organizationData = {
  name: "Mamma's Plate Plan",
  url: "https://mammas-plate-plan.netlify.app",
  logo: "https://mammas-plate-plan.netlify.app/logo.png",
  description: "Planejamento de refeições saudáveis e deliciosas para toda a família",
  sameAs: [
    "https://facebook.com/mammasplateplan",
    "https://instagram.com/mammasplateplan",
    "https://twitter.com/mammasplateplan"
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
