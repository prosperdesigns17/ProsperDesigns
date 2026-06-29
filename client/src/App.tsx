import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SEO from './components/SEO';
import { ErrorBoundary } from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import HeroSequence from './components/HeroSequence';
import About from './components/About';
import Services from './components/Services';
import ProjectShowcase from './components/ProjectShowcase';
import BookConsultation from './components/BookConsultation';
import WhyChooseUs from './components/WhyChooseUs';
import OurClients from './components/OurClients';
import ClientTestimonials from './components/ClientTestimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Dynamic / Code-split Admin Pages
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Public Layout
function PublicSite() {
  return (
    <div id="home" className="bg-[#415C84] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <SEO />
      <Navbar />
      <HeroSequence />
      <About />
      <Services />
      <ProjectShowcase />
      <BookConsultation />
      <WhyChooseUs />
      <OurClients />
      <ClientTestimonials />
      <Contact />
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
