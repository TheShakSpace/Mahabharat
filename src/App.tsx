import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AudioControllerProvider, useAudioController } from './components/AudioNarrator';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Hero } from './components/Hero';
import { CinematicMoviePlayer } from './components/CinematicMoviePlayer';
import { Timeline } from './components/Timeline';
import { CharacterGallery } from './components/CharacterGallery';
import { KurukshetraWar } from './components/KurukshetraWar';
import { BhagavadGita } from './components/BhagavadGita';
import { FamilyTree } from './components/FamilyTree';
import { WeaponsShowcase } from './components/WeaponsShowcase';
import { KingdomMap } from './components/KingdomMap';
import { Ending } from './components/Ending';
import { Compass, Film, BookOpen, UserCheck, CalendarDays, Swords, Milestone, Shield, Map, LogOut } from 'lucide-react';

const SECTIONS = [
  { id: 'hero', label: 'Sanctum', icon: Compass },
  { id: 'cinema', label: 'Cinema Player', icon: Film },
  { id: 'timeline', label: 'Chronology', icon: CalendarDays },
  { id: 'characters', label: 'Pantheon', icon: UserCheck },
  { id: 'battlefield', label: 'War Room', icon: Swords },
  { id: 'gita', label: 'Gita Wisdom', icon: BookOpen },
  { id: 'family-tree', label: 'Lineage', icon: Milestone },
  { id: 'weapons', label: 'Arsenal', icon: Shield },
  { id: 'map', label: 'Geography', icon: Map },
  { id: 'ending', label: 'Departure', icon: LogOut }
];

function MainApp() {
  const [activeSection, setActiveSection] = useState<number>(0);
  const { playSwish } = useAudioController();
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth scroll to a target section
  const scrollToSection = (index: number) => {
    const targetElement = document.getElementById(SECTIONS[index].id + '-section');
    if (targetElement) {
      playSwish();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(index);
    }
  };

  // Setup dynamic scroll listener using IntersectionObserver for maximum performance
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Trigger trigger point near center of viewport
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace('-section', '');
          const idx = SECTIONS.findIndex(s => s.id === id);
          if (idx !== -1) {
            setActiveSection(idx);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTIONS.forEach(sec => {
      const el = document.getElementById(sec.id + '-section');
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F7F7F7] font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden w-full">
      
      {/* 1. Global Interactive Three.js Background Particle & Fog Canvas */}
      <ThreeCanvas activeSection={activeSection} />

      {/* 2. Floating Section Progress Navigator (Bento Dot Rail) */}
      <nav className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 bg-[#111111]/60 backdrop-blur-md border border-white/5 rounded-full px-2.5 py-6 shadow-2xl shadow-black/80">
        <span className="font-mono text-[8px] text-gray-500 tracking-widest uppercase mb-2">EPIC</span>
        {SECTIONS.map((sec, idx) => {
          const isActive = idx === activeSection;
          const Icon = sec.icon;

          return (
            <div key={sec.id} className="relative group flex items-center justify-center">
              <button
                onClick={() => scrollToSection(idx)}
                className={`p-2 rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-amber-500 border-amber-500 text-black scale-110 shadow-lg shadow-amber-500/20'
                    : 'bg-black/60 border-white/5 text-gray-400 hover:text-white hover:border-amber-500/30'
                }`}
              >
                <Icon size={12} />
              </button>

              {/* Tooltip hovering tag */}
              <div className="absolute right-12 scale-0 group-hover:scale-100 transition-transform origin-right duration-300 pointer-events-none bg-[#111111]/95 border border-amber-500/20 rounded px-3 py-1 font-mono text-[10px] text-amber-500 uppercase tracking-widest whitespace-nowrap shadow-xl">
                {idx + 1}. {sec.label}
              </div>
            </div>
          );
        })}
      </nav>

      {/* 3. Main Linear Sections Flow Container */}
      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* Section 1: Hero Landing Sanctum */}
        <div id="hero-section" className="w-full flex justify-center items-center">
          <Hero onBegin={() => scrollToSection(1)} />
        </div>

        {/* Section 2: Cinematic Movie Player Theater */}
        <div id="cinema-section" className="w-full border-t border-gray-900/40">
          <CinematicMoviePlayer />
        </div>

        {/* Section 3: Chronological Timeline */}
        <div id="timeline-section" className="w-full border-t border-gray-900/40">
          <Timeline />
        </div>

        {/* Section 3: Interactive Character Gallery */}
        <div id="characters-section" className="w-full border-t border-gray-900/40">
          <CharacterGallery />
        </div>

        {/* Section 4: Tactical War Room */}
        <div id="battlefield-section" className="w-full border-t border-gray-900/40">
          <KurukshetraWar />
        </div>

        {/* Section 5: Bhagavad Gita Wisom */}
        <div id="gita-section" className="w-full border-t border-gray-900/40">
          <BhagavadGita />
        </div>

        {/* Section 6: Lineage Family Tree */}
        <div id="family-tree-section" className="w-full border-t border-gray-900/40">
          <FamilyTree />
        </div>

        {/* Section 7: Celestial Arsenal Weapons */}
        <div id="weapons-section" className="w-full border-t border-gray-900/40">
          <WeaponsShowcase />
        </div>

        {/* Section 8: Sacred Geography Map */}
        <div id="map-section" className="w-full border-t border-gray-900/40">
          <KingdomMap />
        </div>

        {/* Section 9: Sacred Sunset Departure */}
        <div id="ending-section" className="w-full border-t border-gray-900/40">
          <Ending onReplay={() => scrollToSection(0)} />
        </div>

      </div>

    </div>
  );
}

export default function App() {
  return (
    <AudioControllerProvider>
      <MainApp />
    </AudioControllerProvider>
  );
}
