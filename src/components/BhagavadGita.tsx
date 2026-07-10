import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GITA_VERSES } from '../data';
import { useAudioController } from './AudioNarrator';
import { Sparkles, ArrowLeft, ArrowRight, BookOpen, Volume2, Heart, Smile } from 'lucide-react';

export const BhagavadGita: React.FC = () => {
  const { isPlaying, toggleAmbient, playTempleBell } = useAudioController();
  const [activeVerseIdx, setActiveVerseIdx] = useState<number>(0);

  const activeVerse = GITA_VERSES[activeVerseIdx];

  const handleNext = () => {
    playTempleBell();
    setActiveVerseIdx(prev => (prev + 1) % GITA_VERSES.length);
  };

  const handlePrev = () => {
    playTempleBell();
    setActiveVerseIdx(prev => (prev - 1 + GITA_VERSES.length) % GITA_VERSES.length);
  };

  return (
    <div id="gita-section" className="relative w-full min-h-screen py-24 px-6 md:px-16 flex flex-col justify-center items-center z-10 overflow-hidden select-none text-left">
      {/* Golden divine light beam overlay */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[200px] bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl flex flex-col space-y-12">
        
        {/* Module Header */}
        <div className="flex flex-col space-y-2 text-center items-center">
          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs tracking-[0.2em] uppercase">
            <BookOpen size={14} />
            <span>The Yoga of Consciousness</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-wide text-white">
            The Wisdom of <span className="text-amber-500">Bhagavad Gita</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-sans max-w-xl">
            Delivered on the battlefield of Kurukshetra. Freeze time and delve into the supreme dialog between Lord Krishna and Arjuna addressing duty, mind, and eternity.
          </p>
        </div>

        {/* Chariot Illustration & Dialogue Box Dual Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left panel: Chariot Graphic Overlay */}
          <div className="lg:col-span-4 flex justify-center items-center">
            <div className="relative group w-full max-w-[320px] aspect-[4/3] lg:aspect-[3/4] rounded-2xl overflow-hidden bg-black/60 border border-amber-500/20 p-2 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <img
                src="/src/assets/images/gita_chariot_1783523429768.jpg"
                alt="Krishna and Arjuna on the Golden Chariot"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 object-center"
              />
              <div className="absolute bottom-4 left-4 right-4 z-10 text-left space-y-1">
                <span className="font-mono text-[9px] text-amber-500 tracking-widest block">GITA UPADESH</span>
                <p className="font-serif text-sm text-white font-medium">Krishna & Arjuna on Chariot</p>
              </div>
            </div>
          </div>

          {/* Right panel: Verse Interactive Reader */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            
            {/* Seeker State Indicator (Psychological context) */}
            <div className="inline-flex items-center gap-2 self-start bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 text-xs text-amber-500 font-mono">
              <Heart size={12} className="animate-pulse" />
              <span>HEALS STATE: <strong>{activeVerse.seekerState}</strong></span>
            </div>

            {/* Verse Glassmorphic Card */}
            <div className="bg-[#111111]/70 backdrop-blur-md border border-amber-500/15 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl min-h-[380px] flex flex-col justify-between relative overflow-hidden">
              {/* Giant watermark */}
              <div className="absolute -bottom-10 -right-10 font-serif text-[180px] text-amber-500/5 font-bold pointer-events-none select-none">
                {activeVerse.chapter}.{activeVerse.verse}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVerse.verse}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 text-left"
                >
                  {/* Chapter-Verse badge */}
                  <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                    <span className="font-mono text-xs text-amber-500 font-bold tracking-widest">
                      CHAPTER {activeVerse.chapter}, VERSE {activeVerse.verse}
                    </span>
                    <span className="font-mono text-[9px] text-gray-500 uppercase">
                      SANSKRIT SLOKA
                    </span>
                  </div>

                  {/* original devnagari script */}
                  <div className="space-y-4">
                    <p className="font-serif text-xl md:text-2xl text-amber-400 font-semibold tracking-wide leading-relaxed text-center whitespace-pre-line py-2">
                      {activeVerse.sanskrit}
                    </p>
                    {/* romanized phonetic */}
                    <p className="font-sans text-xs text-gray-400 italic text-center max-w-xl mx-auto leading-relaxed">
                      "{activeVerse.transliteration}"
                    </p>
                  </div>

                  {/* English Translation */}
                  <div className="space-y-2 border-t border-gray-800/60 pt-4">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                      ENGLISH TRANSLATION
                    </span>
                    <p className="text-white text-sm md:text-base leading-relaxed font-sans">
                      {activeVerse.english}
                    </p>
                  </div>

                  {/* Philosophical Meaning commentary */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                      PRACTICAL METROPOLITAN MIND-SET
                    </span>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-sans">
                      {activeVerse.meaning}
                    </p>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Navigation row inside card */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-900 mt-6 z-10">
                {/* Tone ambient audio toggle inside card */}
                <button
                  onClick={toggleAmbient}
                  className={`flex items-center gap-2 font-mono text-[10px] px-3.5 py-1.5 rounded-full border tracking-widest uppercase transition-all ${
                    isPlaying
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                      : 'bg-black border-gray-800 text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <Volume2 size={11} className={isPlaying ? 'animate-pulse' : ''} />
                  <span>{isPlaying ? 'Mantra Drone Active' : 'Enable Meditation Drone'}</span>
                </button>

                {/* Left and Right sliders */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-lg bg-black border border-gray-800 hover:border-amber-500/40 text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <span className="font-mono text-xs text-gray-400">
                    {activeVerseIdx + 1} / {GITA_VERSES.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-lg bg-black border border-gray-800 hover:border-amber-500/40 text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>

            {/* Quick tips panel */}
            <div className="p-4 rounded-xl bg-[#111111]/30 border border-gray-900 text-xs text-gray-400 flex items-center gap-3">
              <Smile size={16} className="text-amber-500 flex-shrink-0" />
              <span><strong>Modern tip:</strong> Close your eyes, toggle the <strong>Meditation Drone</strong>, and read the slokas slowly to experience deep, ancient mindfulness.</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
export default BhagavadGita;
