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
