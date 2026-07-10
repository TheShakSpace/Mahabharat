import React from 'react';
import { motion } from 'motion/react';
import { useAudioController } from './AudioNarrator';
import { Sparkles, Navigation2, RefreshCw, Github } from 'lucide-react';

interface EndingProps {
  onReplay: () => void;
}

export const Ending: React.FC<EndingProps> = ({ onReplay }) => {
  const { playTempleBell, stopSpeaking } = useAudioController();

  const handleReplay = () => {
    stopSpeaking();
    playTempleBell();
    onReplay();
  };

  return (
    <div id="ending-section" className="relative w-full min-h-screen py-24 px-6 md:px-16 flex flex-col justify-between items-center z-10 overflow-hidden select-none text-center">
      {/* Golden divine solar flare backdrop */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-amber-500/10 rounded-full filter blur-[150px] pointer-events-none" />

      {/* Decorative top spacer */}
      <div className="w-full max-w-4xl" />

      {/* Core Centerpieces */}
      <div className="w-full max-w-4xl space-y-10 z-10 my-auto">
        
        {/* Animated Temple Crest Icon */}
        <div className="flex justify-center items-center">
          <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 animate-pulse relative">
            <Sparkles size={24} />
            <span className="absolute -inset-1 border border-amber-500/10 rounded-full animate-ping pointer-events-none" />
          </div>
        </div>

        {/* The Sacred Quote Sloka */}
        <div className="space-y-6">
          <h2 className="font-serif text-3xl md:text-5xl text-amber-400 font-semibold tracking-wider text-center leading-relaxed">
            "यतो धर्मस्ततो जयः॥"
          </h2>
          <p className="font-serif text-lg md:text-xl text-gray-300 italic tracking-wider text-center max-w-2xl mx-auto">
            "Yato Dharmas Tato Jayaḥ"
          </p>
          <div className="h-[1px] w-24 bg-amber-500/30 mx-auto" />
          <p className="font-sans text-sm md:text-base text-gray-400 tracking-wider text-center max-w-xl mx-auto leading-relaxed uppercase">
            Where there is Dharma (Righteousness), there is Victory.
          </p>
        </div>

        <p className="text-gray-500 text-xs max-w-md mx-auto leading-relaxed font-sans">
          The epic of Mahabharata is not a relic of the past, but a living map of human psychology, morality, and spiritual destiny. The battle of Kurukshetra is fought inside the human mind every single day.
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handleReplay}
            className="group flex items-center gap-2.5 bg-[#111111]/80 hover:bg-amber-500 text-amber-500 hover:text-black border border-amber-500/20 px-8 py-4 rounded-xl font-serif text-sm tracking-[0.15em] uppercase font-bold shadow-xl transition-all duration-300 active:scale-95"
          >
            <RefreshCw size={15} className="group-hover:rotate-180 transition-transform duration-700" />
            <span>Replay the Journey</span>
          </button>
        </div>

      </div>

      {/* Footer Credits row */}
      <footer className="w-full flex flex-col md:flex-row justify-between items-center z-10 border-t border-gray-900 pt-8 gap-4">
        <div className="text-left font-mono text-[9px] text-gray-600">
          <span>COSMIC EPIC ARCHIVE • VOL. 1</span>
        </div>

        <div className="text-center font-serif text-xs text-gray-500 tracking-widest uppercase">
          DEDICATED TO PRESERVING THE LORE OF DHARMA THROUGH IMMERSIVE DIGITAL ART
        </div>

        <div className="text-right font-mono text-[9px] text-gray-600 flex items-center gap-1.5">
          <span>PRESENTED IN 60FPS</span>
        </div>
      </footer>
    </div>
  );
};
export default Ending;
