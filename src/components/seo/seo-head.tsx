import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOMetadata } from '@/lib/seo/seo-utils';

interface SEOHeadProps extends SEOMetadata {
  structuredData?: string;
}

/**
 * SEO Head Component
 * 
 * This component manages all SEO-related tags in the document head.
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  additionalMetaTags,
  additionalLinkTags,
  structuredData,
}) => {
  // Update the document title when the title prop changes
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph / Facebook */}
      {openGraph && (
        <>
          <meta property="og:title" content={openGraph.title || title} />
          <meta property="og:description" content={openGraph.description || description} />
          <meta property="og:type" content={openGraph.type || 'website'} />
          {openGraph.url && <meta property="og:url" content={openGraph.url} />}
          {openGraph.image && <meta property="og:image" content={openGraph.image} />}
          {openGraph.siteName && <meta property="og:site_name" content={openGraph.siteName} />}
          {openGraph.locale && <meta property="og:locale" content={openGraph.locale} />}
        </>
      )}
      
      {/* Twitter */}
      {twitter && (
        <>
          <meta name="twitter:card" content={twitter.card || 'summary_large_image'} />
          {twitter.site && <meta name="twitter:site" content={twitter.site} />}
          {twitter.creator && <meta name="twitter:creator" content={twitter.creator} />}
          {twitter.image && <meta name="twitter:image" content={twitter.image} />}
        </>
      )}
      
      {/* Additional Meta Tags */}
      {additionalMetaTags?.map((tag, index) => (
        <meta
          key={`meta-${index}`}
          {...(tag.name && { name: tag.name })}
          {...(tag.property && { property: tag.property })}
          content={tag.content}
        />
      ))}
      
      {/* Additional Link Tags */}
      {additionalLinkTags?.map((tag, index) => (
        <link
          key={`link-${index}`}
          rel={tag.rel}
          href={tag.href}
          {...(tag.sizes && { sizes: tag.sizes })}
          {...(tag.type && { type: tag.type })}
        />
      ))}
      
      {/* Structured Data / JSON-LD */}
      {structuredData && (
        <script type="application/ld+json">
          {structuredData}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
