import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import API from '../api';
import type { Client } from '../types';

const DEFAULT_CLIENTS: Client[] = [
  { _id: 'c1', name: 'PVR Group', active: true, order: 1 },
  { _id: 'c2', name: 'Royal Icon', active: true, order: 2 },
  { _id: 'c3', name: 'PVR Classic', active: true, order: 3 },
  { _id: 'c4', name: 'SLV Estates', active: true, order: 4 },
  { _id: 'c5', name: 'Hotel Crab', active: true, order: 5 },
  { _id: 'c6', name: 'Urban Meadows', active: true, order: 6 },
  { _id: 'c7', name: 'Sky Towers', active: true, order: 7 },
  { _id: 'c8', name: 'Anandalahari', active: true, order: 8 },
  { _id: 'c9', name: 'Pride Developers', active: true, order: 9 },
  { _id: 'c10', name: 'Himaja Constructions', active: true, order: 10 },
  { _id: 'c11', name: 'Sresta Constructions', active: true, order: 11 },
  { _id: 'c12', name: 'End Avenue Serene', active: true, order: 12 },
  { _id: 'c13', name: 'Vertex Prime', active: true, order: 13 },
  { _id: 'c14', name: 'Aparna Luxury', active: true, order: 14 },
  { _id: 'c15', name: 'My Home Estates', active: true, order: 15 },
  { _id: 'c16', name: 'Incor Infrastructure', active: true, order: 16 },
  { _id: 'c17', name: 'Vasavi Group', active: true, order: 17 },
  { _id: 'c18', name: 'Mantri Developers', active: true, order: 18 }
];

export default function OurClients() {
  const [clients, setClients] = useState<Client[]>(DEFAULT_CLIENTS);

  const leftMarqueeRef = useRef<HTMLDivElement>(null);
  const rightMarqueeRef = useRef<HTMLDivElement>(null);
  const leftTweenRef = useRef<gsap.core.Tween | null>(null);
  const rightTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    API.get('/clients?active=true')
      .then(({ data }) => {
        const list = data?.data || data;
        if (Array.isArray(list) && list.length > 0) {
          setClients(list);
        }
      })
      .catch((err) => console.error('Failed to fetch clients:', err));
  }, []);

  useEffect(() => {
    if (clients.length === 0) return;

    const ctx = gsap.context(() => {
      const leftMarquee = leftMarqueeRef.current;
      const rightMarquee = rightMarqueeRef.current;

      const leftCount = Math.ceil(clients.length / 2);
      const rightCount = clients.length - leftCount;

      const leftDuration = Math.max(leftCount * 4.5, 12);
      const rightDuration = Math.max(rightCount * 4.5, 12);

      if (leftMarquee) {
        leftTweenRef.current = gsap.to(leftMarquee, {
          xPercent: -50,
          duration: leftDuration,
          ease: 'none',
          repeat: -1,
        });
      }

      if (rightMarquee) {
        rightTweenRef.current = gsap.to(rightMarquee, {
          xPercent: -50,
          duration: rightDuration,
          ease: 'none',
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, [clients]);

  const handleMouseEnter = () => {
    leftTweenRef.current?.pause();
    rightTweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    leftTweenRef.current?.resume();
    rightTweenRef.current?.resume();
  };

  if (clients.length === 0) return null;

  const leftCount = Math.ceil(clients.length / 2);
  const leftClients = clients.slice(0, leftCount);
  const rightClients = clients.slice(leftCount);

  const renderHorizontalList = (list: Client[]) => (
    <div className="flex gap-16 px-4">
      {list.map((c, idx) => (
        <span
          key={c._id || `${c.name}-${idx}`}
          className="text-white text-lg md:text-xl font-semibold tracking-wider flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] flex-shrink-0"></span>
          {c.name}
        </span>
      ))}
    </div>
  );

  return (
    <section className="py-24 md:py-32 bg-[#2A3F5C] text-white overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/10 w-[400px] h-[400px] bg-[#d4af37]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/10 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-[#d4af37] uppercase tracking-widest text-sm font-bold mb-4">Our Network</h3>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">Our Clients</h2>
        </div>

        <div 
          className="flex flex-col gap-8 max-w-5xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full overflow-hidden relative bg-[#1D2B42]/50 border border-white/5 py-6 rounded-2xl shadow-xl">
            <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#1D2B42]/90 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#1D2B42]/90 to-transparent z-10 pointer-events-none"></div>
            
            <div ref={leftMarqueeRef} className="flex whitespace-nowrap w-max">
              {renderHorizontalList(leftClients)}
              {renderHorizontalList(leftClients)}
            </div>
          </div>

          <div className="w-full overflow-hidden relative bg-[#1D2B42]/50 border border-white/5 py-6 rounded-2xl shadow-xl">
            <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#1D2B42]/90 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#1D2B42]/90 to-transparent z-10 pointer-events-none"></div>

            <div ref={rightMarqueeRef} className="flex whitespace-nowrap w-max">
              {renderHorizontalList(rightClients)}
              {renderHorizontalList(rightClients)}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
