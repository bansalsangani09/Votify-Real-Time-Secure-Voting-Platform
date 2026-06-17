import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Reusable SEO component for dynamic head metadata tags.
 */
export default function SEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  canonicalUrl,
}) {
  const baseTitle = 'Votify | Secure Voting System';
  const siteTitle = title ? `${title} | Votify` : baseTitle;
  const siteDescription =
    description ||
    'Votify - The next-generation governance protocol built with cryptographic integrity and decentralized consensus.';
  const siteKeywords =
    keywords ||
    'voting, blockchain, secure, elections, consensus, cryptography, governance, SaaS';
  const siteOgTitle = ogTitle || siteTitle;
  const siteOgDescription = ogDescription || siteDescription;
  
  // Use absolute URLs for OpenGraph where possible, default to public folder asset
  const siteOgImage = ogImage 
    ? ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`
    : `${window.location.origin}/og-image.webp`;

  const currentUrl = canonicalUrl || window.location.href;

  return (
    <Helmet>
      {/* Standard HTML Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={siteOgTitle} />
      <meta property="og:description" content={siteOgDescription} />
      <meta property="og:image" content={siteOgImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={siteOgTitle} />
      <meta name="twitter:description" content={siteOgDescription} />
      <meta name="twitter:image" content={siteOgImage} />

      {/* Structured Schema Markup (JSON-LD) for Search Engines */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'Votify',
          'applicationCategory': 'GovernanceApplication',
          'operatingSystem': 'All',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD',
          },
          'description': siteDescription,
        })}
      </script>
    </Helmet>
  );
}
