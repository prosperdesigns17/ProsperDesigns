import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SEO from './components/SEO';
import { ErrorBoundary } from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import HeroSequence from './components/HeroSequence';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';

// Dynamic / Code-split Public Scroll Sections
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const ProjectShowcase = lazy(() => import('./components/ProjectShowcase'));
const BookConsultation = lazy(() => import('./components/BookConsultation'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const OurClients = lazy(() => import('./components/OurClients'));
const ClientTestimonials = lazy(() => import('./components/ClientTestimonials'));
const Contact = lazy(() => import('./components/Contact'));

// Dynamic / Code-split Admin Pages
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Helper loader animation for individual lazy sections
const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center text-white">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#d4af37]"></div>
  </div>
);

// Public Layout
function PublicSite() {
  return (
    <div id="home" className="bg-[#415C84] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <SEO />
      <Navbar />
      <HeroSequence />
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Services />
        <ProjectShowcase />
        <BookConsultation />
        <WhyChooseUs />
        <OurClients />
        <ClientTestimonials />
        <Contact />
      </Suspense>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

// SEO alias pages — same PublicSite, but with a different <title>, description, and canonical URL
// so Google can crawl and rank each service as an individual page.
function InteriorDesignPage() {
  return (
    <div id="home" className="bg-[#415C84] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <SEO
        title="Interior Designers in Vijayawada | Residential & Commercial Interiors | Prosper Designs"
        description="Prosper Designs offers premium interior design services in Vijayawada for homes, villas, offices, and commercial spaces. Best interior designers in Vijayawada, Andhra Pradesh."
        keywords="Interior Designers Vijayawada, Interior Design Vijayawada, Home Interior Designers, Commercial Interior Designers, Office Interior Designers, Villa Interior Designers, Residential Interiors Vijayawada, Prosper Designs"
        canonicalUrl="https://prosperdesigns.in/interior-design-vijayawada"
      />
      <Navbar />
      <HeroSequence />
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Services />
        <ProjectShowcase />
        <BookConsultation />
        <WhyChooseUs />
        <OurClients />
        <ClientTestimonials />
        <Contact />
      </Suspense>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

function LandscapeDesignPage() {
  return (
    <div id="home" className="bg-[#415C84] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <SEO
        title="Landscape Designers in Vijayawada | Garden Landscaping | Prosper Designs"
        description="Prosper Designs provides expert landscape design and garden landscaping services in Vijayawada, Andhra Pradesh. Transform your outdoor spaces with premium landscaping solutions."
        keywords="Landscape Designers Vijayawada, Garden Landscaping Vijayawada, Outdoor Design Vijayawada, Landscape Contractors Vijayawada, Landscape Design Andhra Pradesh, Prosper Designs"
        canonicalUrl="https://prosperdesigns.in/landscape-design-vijayawada"
      />
      <Navbar />
      <HeroSequence />
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Services />
        <ProjectShowcase />
        <BookConsultation />
        <WhyChooseUs />
        <OurClients />
        <ClientTestimonials />
        <Contact />
      </Suspense>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

function SwimmingPoolPage() {
  return (
    <div id="home" className="bg-[#415C84] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <SEO
        title="Swimming Pool Design & Construction in Vijayawada | Prosper Designs"
        description="Prosper Designs designs and constructs custom swimming pools for homes and commercial properties in Vijayawada, Andhra Pradesh. Expert pool builders with quality craftsmanship."
        keywords="Swimming Pool Designers Vijayawada, Swimming Pool Construction Vijayawada, Pool Builders Vijayawada, Custom Swimming Pools Andhra Pradesh, Prosper Designs"
        canonicalUrl="https://prosperdesigns.in/swimming-pool-design-vijayawada"
      />
      <Navbar />
      <HeroSequence />
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Services />
        <ProjectShowcase />
        <BookConsultation />
        <WhyChooseUs />
        <OurClients />
        <ClientTestimonials />
        <Contact />
      </Suspense>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

function WaterFountainPage() {
  return (
    <div id="home" className="bg-[#415C84] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <SEO
        title="Water Fountain Design in Vijayawada | Decorative Fountains | Prosper Designs"
        description="Prosper Designs creates stunning decorative and architectural water fountains for gardens and commercial spaces in Vijayawada, Andhra Pradesh."
        keywords="Water Fountain Designers Vijayawada, Decorative Fountains Vijayawada, Water Feature Design Vijayawada, Fountain Installation Andhra Pradesh, Prosper Designs"
        canonicalUrl="https://prosperdesigns.in/water-fountain-design-vijayawada"
      />
      <Navbar />
      <HeroSequence />
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Services />
        <ProjectShowcase />
        <BookConsultation />
        <WhyChooseUs />
        <OurClients />
        <ClientTestimonials />
        <Contact />
      </Suspense>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

function EpdmFlooringPage() {
  return (
    <div id="home" className="bg-[#415C84] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <SEO
        title="EPDM Flooring in Vijayawada | Rubber Flooring for Playgrounds | Prosper Designs"
        description="Prosper Designs provides and installs high-quality EPDM rubber flooring for playgrounds, sports areas, and commercial spaces in Vijayawada, Andhra Pradesh."
        keywords="EPDM Flooring Vijayawada, Rubber Flooring Vijayawada, Playground Flooring Vijayawada, Sports Flooring Vijayawada, Safe Flooring Children Vijayawada, Prosper Designs"
        canonicalUrl="https://prosperdesigns.in/epdm-flooring-vijayawada"
      />
      <Navbar />
      <HeroSequence />
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Services />
        <ProjectShowcase />
        <BookConsultation />
        <WhyChooseUs />
        <OurClients />
        <ClientTestimonials />
        <Contact />
      </Suspense>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

function PlaygroundEquipmentPage() {
  return (
    <div id="home" className="bg-[#415C84] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <SEO
        title="Playground Equipment in Vijayawada | Children Play Area | Prosper Designs"
        description="Prosper Designs supplies and installs safe, durable playground equipment for parks, schools, and residential communities in Vijayawada, Andhra Pradesh."
        keywords="Playground Equipment Vijayawada, Children Play Area Vijayawada, Play Station Installation Vijayawada, Outdoor Play Equipment Andhra Pradesh, School Playground Vijayawada, Prosper Designs"
        canonicalUrl="https://prosperdesigns.in/playground-equipment-vijayawada"
      />
      <Navbar />
      <HeroSequence />
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Services />
        <ProjectShowcase />
        <BookConsultation />
        <WhyChooseUs />
        <OurClients />
        <ClientTestimonials />
        <Contact />
      </Suspense>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

function ContactPage() {
  return (
    <div id="home" className="bg-[#415C84] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <SEO
        title="Contact Prosper Designs | Interior & Landscape Designers in Vijayawada"
        description="Contact Prosper Designs in Vijayawada for interior design, landscape design, swimming pool construction, EPDM flooring, playground equipment, and water fountain services. Call +91 8143947374."
        keywords="Contact Prosper Designs, Prosper Designs Phone Number, Interior Designers Vijayawada Contact, Landscape Designers Vijayawada Contact"
        canonicalUrl="https://prosperdesigns.in/contact"
      />
      <Navbar />
      <HeroSequence />
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Services />
        <ProjectShowcase />
        <BookConsultation />
        <WhyChooseUs />
        <OurClients />
        <ClientTestimonials />
        <Contact />
      </Suspense>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}


const LoadingFallback = () => (
  <div className="min-h-screen bg-[#415C84] flex items-center justify-center text-white">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Toaster position="top-right" />
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<PublicSite />} />

            {/* SEO Alias Routes — same UI, unique title/description/canonical per service */}
            <Route path="/interior-design-vijayawada" element={<InteriorDesignPage />} />
            <Route path="/landscape-design-vijayawada" element={<LandscapeDesignPage />} />
            <Route path="/swimming-pool-design-vijayawada" element={<SwimmingPoolPage />} />
            <Route path="/water-fountain-design-vijayawada" element={<WaterFountainPage />} />
            <Route path="/epdm-flooring-vijayawada" element={<EpdmFlooringPage />} />
            <Route path="/playground-equipment-vijayawada" element={<PlaygroundEquipmentPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Routes (Lazy Loaded) */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
