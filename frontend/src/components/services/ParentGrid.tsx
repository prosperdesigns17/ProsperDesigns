import { motion } from 'framer-motion';
import type { Service } from '../../types';

interface ParentGridProps {
  parents: Service[];
  onSelect: (parent: Service) => void;
  sectionRef?: React.RefObject<HTMLElement | null>;
  cardWidth?: number;
  gap?: number;
}

export default function ParentGrid({ parents, onSelect }: ParentGridProps) {
  return (
    <motion.div
      key="parent-grid-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {parents.map((parent, i) => {
          const childCount = parent.children?.length || 0;
          return (
            <motion.div
              key={parent._id || parent.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.015 }}
              onClick={() => onSelect(parent)}
              className="group relative h-[240px] overflow-hidden rounded-2xl cursor-pointer bg-[#1D2B42] shadow-2xl border border-white/10"
            >
              <img
                src={parent.coverImage || '/placeholder-cover.jpg'}
                alt={parent.title}
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <p className="text-[#d4af37] text-[10px] uppercase tracking-widest font-semibold mb-1">
                  {childCount} {childCount === 1 ? 'Category' : 'Categories'}
                </p>
                <h3 className="text-white text-xl font-bold uppercase tracking-wide leading-tight mb-2">
                  {parent.title}
                </h3>
                <p className="text-[#d4af37] text-xs uppercase tracking-widest font-semibold flex items-center gap-1 group-hover:translate-x-2 transition-transform duration-300">
                  View Categories <span>→</span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
