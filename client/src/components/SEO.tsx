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

const DEFAULT_TITLE = 'Interior Designers in Vijayawada | Landscape Designers | Swimming Pools | Prosper Designs';
const DEFAULT_DESCRIPTION = "Prosper Designs is one of the leading Interior Designers and Landscape Designers in Vijayawada offering Interior Design, Garden Landscaping, Swimming Pool Construction, Water Fountains, EPDM Flooring, Playground Equipment and Turnkey Construction Services across Andhra Pradesh.";
const DEFAULT_KEYWORDS = 'Interior Designers Vijayawada, Interior Design Vijayawada, Landscape Designers Vijayawada, Garden Landscaping Vijayawada, Swimming Pool Designers Vijayawada, Swimming Pool Construction Vijayawada, Water Fountain Designers Vijayawada, Water Fountain Design Vijayawada, EPDM Flooring Vijayawada, Rubber Flooring Vijayawada, Playground Equipment Vijayawada, Children Play Area Vijayawada, Construction Company Vijayawada, Turnkey Construction Vijayawada, Interior Designers Andhra Pradesh, Landscape Contractors Andhra Pradesh, Commercial Interiors Vijayawada, Residential Interiors Vijayawada, Office Interiors Vijayawada, Villa Interiors Vijayawada, Luxury Interior Designers Vijayawada, Modern Interior Designers Vijayawada, Prosper Designs';
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
  'telephone': '+91 8143947374',
  'email': 'info@prosperdesigns.in',
  'priceRange': '₹₹₹',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Ramavarappadu',
    'addressLocality': 'Vijayawada',
    'addressRegion': 'Andhra Pradesh',
    'postalCode': '520008',
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
      'closes': '18:00'
    }
  ],
  'sameAs': [
    'https://www.instagram.com/prosper_designs17'
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

// Service schemas — one per service
const serviceSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Interior Design',
    'name': 'Interior Design Services in Vijayawada',
    'description': 'Premium residential and commercial interior design services including living rooms, bedrooms, offices, and villas in Vijayawada, Andhra Pradesh.',
    'url': `${SITE_URL}/interior-design-vijayawada`,
    'provider': { '@type': 'LocalBusiness', 'name': 'Prosper Designs', '@id': `${SITE_URL}/#organization` },
    'areaServed': 'Vijayawada'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Landscape Design',
    'name': 'Landscape Design Services in Vijayawada',
    'description': 'Expert garden landscaping, exterior design, and outdoor environment creation in Vijayawada, Andhra Pradesh.',
    'url': `${SITE_URL}/landscape-design-vijayawada`,
    'provider': { '@type': 'LocalBusiness', 'name': 'Prosper Designs', '@id': `${SITE_URL}/#organization` },
    'areaServed': 'Vijayawada'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Swimming Pool Construction',
    'name': 'Swimming Pool Design & Construction in Vijayawada',
    'description': 'Custom swimming pool design and construction services for homes and commercial properties in Vijayawada, Andhra Pradesh.',
    'url': `${SITE_URL}/swimming-pool-design-vijayawada`,
    'provider': { '@type': 'LocalBusiness', 'name': 'Prosper Designs', '@id': `${SITE_URL}/#organization` },
    'areaServed': 'Vijayawada'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Water Fountain Design',
    'name': 'Water Fountain Design in Vijayawada',
    'description': 'Decorative and architectural water fountain design and installation for gardens and commercial spaces in Vijayawada.',
    'url': `${SITE_URL}/water-fountain-design-vijayawada`,
    'provider': { '@type': 'LocalBusiness', 'name': 'Prosper Designs', '@id': `${SITE_URL}/#organization` },
    'areaServed': 'Vijayawada'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'EPDM Flooring',
    'name': 'EPDM Flooring in Vijayawada',
    'description': 'High-quality EPDM rubber flooring solutions for playgrounds, sports areas, and commercial spaces in Vijayawada, Andhra Pradesh.',
    'url': `${SITE_URL}/epdm-flooring-vijayawada`,
    'provider': { '@type': 'LocalBusiness', 'name': 'Prosper Designs', '@id': `${SITE_URL}/#organization` },
    'areaServed': 'Vijayawada'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Playground Equipment',
    'name': 'Playground Equipment Installation in Vijayawada',
    'description': 'Safe and durable children\'s playground equipment supply and installation for parks, schools, and residential communities in Vijayawada.',
    'url': `${SITE_URL}/playground-equipment-vijayawada`,
    'provider': { '@type': 'LocalBusiness', 'name': 'Prosper Designs', '@id': `${SITE_URL}/#organization` },
    'areaServed': 'Vijayawada'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Construction',
    'name': 'Turnkey Construction Services in Vijayawada',
    'description': 'End-to-end turnkey construction services for residential and commercial projects in Vijayawada, Andhra Pradesh.',
    'url': `${SITE_URL}/construction-vijayawada`,
    'provider': { '@type': 'LocalBusiness', 'name': 'Prosper Designs', '@id': `${SITE_URL}/#organization` },
    'areaServed': 'Vijayawada'
  }
];

// FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Which is the best Interior Designer in Vijayawada?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Prosper Designs is one of the leading interior design firms in Vijayawada, offering premium residential and commercial interior solutions including living rooms, bedrooms, offices, and villas across Andhra Pradesh.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Does Prosper Designs do Landscape Design in Vijayawada?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes, Prosper Designs provides expert garden landscaping, exterior design, and outdoor environment solutions in Vijayawada and across Andhra Pradesh.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Does Prosper Designs construct Swimming Pools in Vijayawada?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes, Prosper Designs designs and constructs custom swimming pools for homes and commercial properties in Vijayawada, Andhra Pradesh.'
      }
    },
    {
      '@type': 'Question',
      'name': 'What is EPDM Flooring and does Prosper Designs provide it in Vijayawada?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'EPDM (Ethylene Propylene Diene Monomer) flooring is a durable rubber surface used for playgrounds, sports areas, and commercial spaces. Prosper Designs provides and installs EPDM flooring in Vijayawada and Andhra Pradesh.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Does Prosper Designs install Playground Equipment in Vijayawada?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes, Prosper Designs supplies and installs safe and durable children\'s playground equipment for parks, schools, and residential communities in Vijayawada.'
      }
    },
    {
      '@type': 'Question',
      'name': 'How to contact Prosper Designs in Vijayawada?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'You can contact Prosper Designs at +91 8143947374 or visit our office at Ramavarappadu, Vijayawada, Andhra Pradesh – 520008. You can also reach us via our website at https://prosperdesigns.in.'
      }
    }
  ]
};

// BreadcrumbList schema for homepage
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': SITE_URL
    }
  ]
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

  const schemasToRender: Record<string, any>[] = [
    baseOrganizationSchema,
    websiteSchema,
    ...serviceSchemas,
    faqSchema,
    breadcrumbSchema,
  ];
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
