import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  schemaData?: object | object[];
  noindex?: boolean;
}

const DEFAULT_TITLE = 'Prosper Designs | Interior & Landscape Designers in Vijayawada';
const DEFAULT_DESCRIPTION = 'Prosper Designs provides luxury interior designing, landscape designing, swimming pools, water fountains, EPDM flooring, children\'s play areas, and outdoor solutions across Vijayawada & Andhra Pradesh.';
const DEFAULT_KEYWORDS = 'Interior Designers Vijayawada, Interior Designers Andhra Pradesh, Landscape Designers Vijayawada, Landscape Contractors Andhra Pradesh, Garden Landscaping, Swimming Pool Construction, Water Fountain Design, EPDM Flooring, Rubber Flooring, Children Play Area Equipment, Outdoor Play Station Installation, Commercial Interiors, Residential Interiors, Office Interiors, Villa Interiors, Luxury Interior Designers, Modern Interior Designers';
const SITE_URL = 'https://prosperdesigns.in';
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

// Organization & LocalBusiness JSON-LD Schema
const baseOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'InteriorDesigner', 'ProfessionalService'],
  '@id': `${SITE_URL}/#organization`,
  'name': 'Prosper Designs',
  'alternateName': 'Prosper Designs Interior & Landscape Solutions',
  'url': SITE_URL,
  'logo': `${SITE_URL}/logo.png`,
  'image': `${SITE_URL}/logo.png`,
  'description': DEFAULT_DESCRIPTION,
  'telephone': '+91 98765 43210', // Placeholder contact number
  'email': 'info@prosperdesigns.in',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'MG Road, Benz Circle Area',
    'addressLocality': 'Vijayawada',
    'addressRegion': 'Andhra Pradesh',
    'postalCode': '520010',
    'addressCountry': 'IN'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': '16.5062',
    'longitude': '80.6480'
  },
  'areaServed': [
    { '@type': 'AdministrativeArea', 'name': 'Vijayawada' },
    { '@type': 'AdministrativeArea', 'name': 'Andhra Pradesh' },
    { '@type': 'AdministrativeArea', 'name': 'Guntur' },
    { '@type': 'AdministrativeArea', 'name': 'Amaravati' },
    { '@type': 'AdministrativeArea', 'name': 'Visakhapatnam' },
    { '@type': 'Country', 'name': 'India' }
  ],
  'openingHoursSpecification': [
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      'opens': '09:00',
      'closes': '19:00'
    }
  ],
  'priceRange': '₹₹₹',
  'sameAs': [
    'https://www.facebook.com/prosperdesigns',
    'https://www.instagram.com/prosperdesigns',
    'https://www.linkedin.com/company/prosperdesigns'
  ]
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  'url': SITE_URL,
  'name': 'Prosper Designs',
  'publisher': { '@id': `${SITE_URL}/#organization` }
};

export const SEO: React.FC<SEOProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl = SITE_URL,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  schemaData,
  noindex = false,
}) => {
  const fullCanonical = canonicalUrl.startsWith('http') ? canonicalUrl : `${SITE_URL}${canonicalUrl}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  const schemasToRender: Record<string, any>[] = [baseOrganizationSchema, websiteSchema];
  if (schemaData) {
    if (Array.isArray(schemaData)) {
      schemasToRender.push(...schemaData);
    } else {
      schemasToRender.push(schemaData as Record<string, any>);
    }
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="Prosper Designs" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Verification Placeholders */}
      <meta name="google-site-verification" content="GOOGLE_SEARCH_CONSOLE_VERIFICATION_PLACEHOLDER" />
      <meta name="msvalidate.01" content="BING_WEBMASTER_VERIFICATION_PLACEHOLDER" />

      {/* JSON-LD Schema Scripts */}
      {schemasToRender.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
