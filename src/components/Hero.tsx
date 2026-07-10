import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAudioController } from './AudioNarrator';
import { Volume2, VolumeX, ShieldAlert, Sparkles, Navigation } from 'lucide-react';

interface HeroProps {
  onBegin: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBegin }) => {
  const { isPlaying, toggleAmbient, playTempleBell, audioData } = useAudioController();
  const [hoverButton, setHoverButton] = useState(false);

  const handleBegin = () => {
    playTempleBell();
    onBegin();
  };

  return (
    <div id="hero-section" className="relative w-full min-h-screen flex flex-col justify-between items-center px-6 py-12 md:px-16 overflow-hidden">
      {/* Dynamic Lighting Overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Top Header Row */}
      <header className="w-full flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg tracking-[0.2em] text-amber-500 font-semibold uppercase">Kuru Chronicles</span>
          <div className="h-[1px] w-8 bg-amber-500/30" />
          <span className="font-mono text-xs text-gray-500 tracking-wider">3102 BCE ERA</span>
        </div>

        {/* Ambient Sound Controller */}
        <div className="flex items-center gap-4">
          {isPlaying && (
            <div className="flex items-end gap-[3px] h-4">
              {audioData.slice(0, 8).map((val, idx) => (
                <motion.div
                  key={idx}
                  className="w-[2px] bg-amber-500/80 rounded-full"
                  animate={{ height: `${val / 1.5}px` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                />
              ))}
            </div>
          )}
          <button
            onClick={toggleAmbient}
            className="flex items-center gap-2 bg-[#111111]/80 hover:bg-[#1f1e1a]/90 text-amber-500 border border-amber-500/20 rounded-full px-4 py-2 text-xs tracking-widest uppercase font-mono transition-all duration-300 hover:border-amber-500/50 shadow-lg shadow-amber-500/5"
          >
            {isPlaying ? (
              <>
                <Volume2 size={13} className="animate-pulse" />
                <span>Ambient On</span>
              </>
            ) : (
              <>
                <VolumeX size={13} />
                <span>Muted</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Center Content */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto z-10">
        
        {/* Left Side: Typography */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center items-start text-left space-y-8 select-none">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5">
            <Sparkles size={13} className="text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-amber-400 font-medium">An Immersive Audio-Visual Experience</span>
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-6xl md:text-8xl font-medium tracking-[0.1em] text-white leading-none">
              MAHA
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300">
                BHARATA
              </span>
            </h1>
            <p className="font-mono text-sm md:text-base tracking-[0.3em] uppercase text-gray-400">
              The Greatest Epic Ever Told
            </p>
          </div>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg font-sans">
            Step into the sacred age of Dwapara Yuga. Explore a saga of supreme dharma, royal treachery, celestial armaments, and the cosmic discourse of the Bhagavad Gita delivered on the precipice of absolute destruction.
          </p>

          {/* Action Trigger */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <button
              onClick={handleBegin}
              onMouseEnter={() => setHoverButton(true)}
              onMouseLeave={() => setHoverButton(false)}
              className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black px-8 py-4 rounded-lg font-serif tracking-[0.15em] uppercase font-bold text-sm shadow-xl shadow-amber-500/15 transition-all duration-300 transform active:scale-95 animate-pulse"
            >
              {/* Ripple Ring */}
              {hoverButton && (
                <span className="absolute inset-0 bg-white/20 animate-ping rounded-lg pointer-events-none" />
              )}
              <span className="flex items-center gap-2">
                🎬 Watch Epic Movie
                <Navigation size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
            
            <button
              onClick={() => {
                playTempleBell();
                const targetElement = document.getElementById('timeline-section');
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-transparent hover:bg-white/5 text-gray-300 border border-gray-700 hover:border-amber-500/40 px-6 py-4 rounded-lg font-mono tracking-widest uppercase text-xs transition-all duration-300"
            >
              📚 Explore Archives
            </button>
          </div>
        </div>

        {/* Right Side: Portrait Floating Card */}
        <div className="col-span-1 lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative group w-full max-w-[340px] aspect-[3/4] rounded-2xl overflow-hidden bg-[#111111]/60 border border-amber-500/25 p-3 shadow-2xl shadow-black/80 flex flex-col justify-between"
          >
            {/* Glossy sheen */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-10" />

            {/* Glowing frame */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl opacity-10 blur-xl group-hover:opacity-25 transition-opacity pointer-events-none" />

            {/* Generated illustration image */}
            <div className="relative w-full h-[85%] rounded-xl overflow-hidden bg-black/40">
              <img
                src="/src/assets/images/krishna_chakra_1783523413370.jpg"
                alt="Lord Krishna holding Sudarshan Chakra"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
            </div>

            {/* Card Footer Details */}
            <div className="p-3 text-left space-y-1 z-10">
              <div className="flex justify-between items-center">
                <span className="font-serif text-sm text-amber-500 font-semibold tracking-wider">YOGESHVARA KRISHNA</span>
                <span className="font-mono text-[9px] text-gray-500 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded">AVATAR</span>
              </div>
              <p className="text-gray-400 text-[11px] font-sans leading-relaxed">
                The supreme strategist of Mahabharata holding the celestial spinning Sudarshan Chakra.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Bottom status bar */}
      <footer className="w-full flex justify-between items-end z-20 pt-6">
        <div className="flex flex-col items-start text-left space-y-1 font-mono text-[10px] text-gray-500">
          <span>COSMIC DATE: DWAPARA END</span>
          <span>LOCATION: KURUKSHETRA</span>
        </div>
        
        {/* Scroll indicator prompt */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center cursor-pointer select-none"
          onClick={handleBegin}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-500/75 mb-1.5">Scroll Down</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-amber-500 to-transparent" />
        </motion.div>

        <div className="text-right font-mono text-[10px] text-gray-500">
          <span>60 FPS IMMERSIVE CANVAS</span>
        </div>
      </footer>
    </div>
  );
};
export default Hero;
