import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import API from '../api';
import { servicesConfig } from '../servicesConfig';
import type { Service, ChildService } from '../types';
import ParentGrid from './services/ParentGrid';
import ChildGrid from './services/ChildGrid';
import ServiceDetail from './services/ServiceDetail';

type Level = 'parents' | 'children' | 'detail';

const getOrderIndex = (title: string): number => {
  const normalized = title.toLowerCase();
  if (normalized.includes('interior')) return 0;
  if (normalized.includes('exterior') || normalized.includes('landscaping')) return 1;
  if (normalized.includes('pool') || normalized.includes('fountain') || normalized.includes('swimming')) return 2;
  if (normalized.includes('play')) return 3;
  if (normalized.includes('construction')) return 4;
  if (normalized.includes('maintenance') || normalized.includes('service')) return 5;
  return 999;
};

// Map the static public configurations to the database types as fallback
const mapStaticToDbFormat = (): Service[] => {
  return servicesConfig.map((parent, pIdx) => ({
    _id: `static-parent-${pIdx}`,
    title: parent.title,
    coverImage: parent.coverImage,
    children: parent.subServices.map((sub) => ({
      title: sub.title,
      coverImage: sub.coverImage,
      description: sub.description,
      features: sub.features || [],
      gallery: sub.gallery
        .filter((img) => {
          const name = img.image.split('/').pop()?.toLowerCase() || '';
          return !['cover.jpg', 'cover.jpeg', 'cover.png', 'cover.webp', 'cover.avif'].includes(name);
        })
        .map((img) => ({
          url: img.image,
          caption: img.title,
          description: img.description || '',
        })),
    })),
  }));
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Navigation state
  const [level, setLevel] = useState<Level>('parents');
  const [selectedParent, setSelectedParent] = useState<Service | null>(null);
  const [selectedChild, setSelectedChild] = useState<ChildService | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await API.get('/services');
        const extracted = data?.data || data;
        const dbList: Service[] = Array.isArray(extracted) ? extracted : [];
        const staticList = mapStaticToDbFormat();

        // Check which static categories are missing from dbList
        const missingStatic = staticList.filter((staticParent) => {
          const sTitle = staticParent.title.toLowerCase();
          return !dbList.some((dbParent) => {
            const dTitle = dbParent.title.toLowerCase();
            return dTitle.includes(sTitle) || sTitle.includes(dTitle) ||
                   (sTitle.includes('maintenance') && dTitle.includes('maintenance'));
          });
        });

        const combined = [...dbList, ...missingStatic];
        const sorted = combined.sort((a, b) => getOrderIndex(a.title) - getOrderIndex(b.title));
        setServices(sorted);
      } catch (err) {
        console.error('Failed to fetch database services, falling back to static config.', err);
        const mapped = mapStaticToDbFormat();
        mapped.sort((a, b) => getOrderIndex(a.title) - getOrderIndex(b.title));
        setServices(mapped);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  const handleParentSelect = (parent: Service) => {
    setSelectedParent(parent);
    setLevel('children');
  };

  const handleChildSelect = (child: ChildService) => {
    setSelectedChild(child);
    setLevel('detail');
  };

  const handleBackToParents = () => {
    setLevel('parents');
    setSelectedParent(null);
    setSelectedChild(null);
  };

  const handleBackToChildren = () => {
    setLevel('children');
    setSelectedChild(null);
  };

  if (loading) {
    return (
      <section id="services" className="py-24 md:py-32 bg-[#2A3F5C] text-white flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-[#d4af37]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-gray-300 font-light tracking-widest text-sm">LOADING SERVICES...</span>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="services" className="bg-[#2A3F5C] text-white relative">
      <AnimatePresence mode="wait">
        {level === 'parents' && (
          <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
            {/* Section Header */}
            <div className="max-w-2xl mb-12">
              <h3 className="text-[#d4af37] uppercase tracking-widest text-sm font-bold mb-4">Our Expertise</h3>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-6">Services</h2>
              <p className="text-gray-300 font-light text-lg">
                Explore our curated, luxury portfolio of custom craftsmanship.
              </p>
            </div>

            <ParentGrid
              parents={services}
              onSelect={handleParentSelect}
              sectionRef={sectionRef}
            />
          </div>
        )}

        {level === 'children' && selectedParent && (
          <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
            <ChildGrid
              parent={selectedParent}
              onBack={handleBackToParents}
              onSelect={handleChildSelect}
            />
          </div>
        )}

        {level === 'detail' && selectedParent && selectedChild && (
          <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
            <ServiceDetail
              parent={selectedParent}
              child={selectedChild}
              onBack={handleBackToChildren}
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
