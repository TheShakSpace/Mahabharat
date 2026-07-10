import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TIMELINE, CHARACTERS } from '../data';
import { TimelineEvent } from '../types';
import { useAudioController } from './AudioNarrator';
import { Calendar, Award, Users, ChevronRight, Bookmark } from 'lucide-react';

export const Timeline: React.FC = () => {
  const { playSwish } = useAudioController();
  const [activeEventIndex, setActiveEventIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeEvent = TIMELINE[activeEventIndex];

  const handleEventClick = (index: number) => {
    if (index === activeEventIndex) return;
    playSwish();
    setActiveEventIndex(index);
  };

  // Find characters associated with this event
  const associatedCharacters = CHARACTERS.filter(char =>
    activeEvent.characters.includes(char.id)
  );

  return (
    <div id="timeline-section" className="relative w-full min-h-screen py-24 px-6 md:px-16 flex flex-col justify-center items-center z-10 overflow-hidden select-none text-left">
      {/* Absolute background visual guides */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl flex flex-col space-y-10">
        
        {/* Module Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs tracking-[0.2em] uppercase">
            <Calendar size={14} />
            <span>Chronology of the Cosmos</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-wide text-white">
            The Timeline of <span className="text-amber-500">Mahabharata</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-sans max-w-xl">
            Scroll the chronology of history. Observe how individual choices, celestial oaths, and divine intentions set off a chain reaction culminating in the transition of cosmic epochs.
          </p>
        </div>

        {/* Dual-Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT COLUMN: Pinned Active Viewport Details (Glassmorphic) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#111111]/80 backdrop-blur-xl border border-amber-500/15 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden h-full min-h-[500px]">
            {/* Year Watermark */}
            <div className="absolute -top-10 -right-10 font-serif text-8xl md:text-9xl text-amber-500/5 font-bold pointer-events-none select-none select-all-none">
              3100
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Year Indicator */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded font-mono text-xs text-amber-500 uppercase tracking-widest font-semibold">
                  {activeEvent.year}
                </div>

                {/* Titles */}
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl md:text-3xl text-white tracking-wide font-medium">
                    {activeEvent.title}
                  </h3>
                  <p className="font-sans text-amber-400 text-xs uppercase tracking-[0.15em] font-medium">
                    {activeEvent.subTitle}
                  </p>
                </div>

                {/* Core Narrative */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans">
                  {activeEvent.description}
                </p>

                {/* Ethical Importance */}
                <div className="bg-black/40 border-l-2 border-amber-500 p-4 rounded-r-lg space-y-1">
                  <span className="flex items-center gap-1.5 text-xs font-mono text-amber-500 tracking-wider uppercase font-semibold">
                    <Award size={12} />
                    Cosmic Importance
                  </span>
                  <p className="text-gray-400 text-xs font-sans leading-relaxed">
                    {activeEvent.importance}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Related Characters section */}
            <div className="mt-8 pt-6 border-t border-gray-800 space-y-3">
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400 tracking-widest uppercase">
                <Users size={11} />
                Key Stakeholders
              </span>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence mode="popLayout">
                  {associatedCharacters.map(char => (
                    <motion.div
                      key={char.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-gray-300 hover:border-amber-500/30 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{char.name}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Scroller list of chronological cards */}
          <div className="lg:col-span-7 flex flex-col justify-start relative pl-4 md:pl-8">
            {/* Glowing Vertical Timeline Path */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-amber-500/10 via-amber-500/40 to-amber-500/10" />

            {/* Milestone List container */}
            <div
              ref={scrollContainerRef}
              className="space-y-4 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar scroll-smooth"
            >
              {TIMELINE.map((event, idx) => {
                const isActive = idx === activeEventIndex;
                return (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(idx)}
                    className={`relative cursor-pointer pl-6 md:pl-8 py-3.5 transition-all duration-300 select-none ${
                      isActive ? 'translate-x-2' : 'opacity-60 hover:opacity-100 hover:translate-x-1'
                    }`}
                  >
                    {/* Glowing Timeline Node */}
                    <div
                      className={`absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                        isActive
                          ? 'bg-amber-500 border-amber-500 scale-125 shadow-lg shadow-amber-500'
                          : 'bg-black border-gray-600 group-hover:border-amber-400'
                      }`}
                    />

                    {/* Timeline Item Card */}
                    <div
                      className={`p-4 md:p-5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                        isActive
                          ? 'bg-amber-500/10 border-amber-500/40 shadow-xl shadow-amber-500/5'
                          : 'bg-[#111111]/40 border-gray-900 hover:bg-[#111111]/70'
                      }`}
                    >
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] text-amber-500 tracking-wider uppercase font-semibold">
                            {event.year}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-700" />
                          <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                            EVENT {idx + 1}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg text-white font-medium tracking-wide">
                          {event.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        {isActive ? (
                          <div className="bg-amber-500/20 text-amber-400 rounded-full p-1.5">
                            <Bookmark size={14} className="fill-amber-500/20" />
                          </div>
                        ) : (
                          <ChevronRight size={16} className="text-gray-600" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Scroll Assist Prompt */}
            <div className="mt-4 text-center lg:text-left font-mono text-[10px] text-gray-500 pl-8 select-none">
              💡 CLICK ANY CHRONOLOGICAL MILESTONE TO LOAD EPIC TRANSITIONS
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
export default Timeline;
