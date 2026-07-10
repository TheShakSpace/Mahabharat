import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KINGDOMS } from '../data';
import { Kingdom } from '../types';
import { useAudioController } from './AudioNarrator';
import { MapPin, Globe, Award, Sparkles, Navigation } from 'lucide-react';

export const KingdomMap: React.FC = () => {
  const { playSwish, playTempleBell } = useAudioController();
  const [selectedKingdomId, setSelectedKingdomId] = useState<string>('hastinapur');

  const activeKingdom = KINGDOMS.find(k => k.id === selectedKingdomId) || KINGDOMS[0];

  const handleNodeClick = (id: string) => {
    if (id === selectedKingdomId) return;
    playTempleBell();
    setSelectedKingdomId(id);
  };

  return (
    <div id="map-section" className="relative w-full min-h-screen py-24 px-6 md:px-16 flex flex-col justify-center items-center z-10 overflow-hidden select-none text-left">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl flex flex-col space-y-12">
        
        {/* Module Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs tracking-[0.2em] uppercase">
            <Globe size={14} />
            <span>Sacred Geography</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-wide text-white">
            The Kingdoms of <span className="text-amber-500">Ancient Bharat</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-sans max-w-xl">
            Click the glowing coordinates on the cartographic parchment to unlock the history, rulers, and modern geographical positions of ancient epic cities.
          </p>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Map Viewport with interactive coordinate rings */}
          <div className="lg:col-span-8 bg-black/50 border border-gray-900 rounded-2xl p-3 relative overflow-hidden flex items-center justify-center min-h-[420px] shadow-2xl">
            {/* Real generated cartographic background */}
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#090806]/80 border border-amber-500/10">
              <img
                src="/src/assets/images/ancient_bharat_map_1783523445581.jpg"
                alt="Map of Ancient Bharat"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-75 grayscale brightness-90 hover:grayscale-0 transition-all duration-1000 object-center"
              />

              {/* Glowing vector overlay nodes */}
              {KINGDOMS.map(kingdom => {
                const isSelected = kingdom.id === selectedKingdomId;
                return (
                  <button
                    key={kingdom.id}
                    onClick={() => handleNodeClick(kingdom.id)}
                    style={{ left: `${kingdom.coordinate.x}%`, top: `${kingdom.coordinate.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 flex flex-col items-center"
                  >
                    {/* Ring and Pulsar indicator */}
                    <div className="relative flex items-center justify-center">
                      <div className={`absolute w-8 h-8 rounded-full border transition-all duration-500 ${
                        isSelected 
                          ? 'border-amber-500 bg-amber-500/10 scale-125' 
                          : 'border-amber-500/30 group-hover:border-amber-400/80 bg-black/40 scale-100 group-hover:scale-110'
                      }`} />
                      <div className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                        isSelected ? 'bg-amber-400 border-white scale-110' : 'bg-amber-500/80 border-transparent'
                      }`} />
                    </div>

                    {/* Tooltip Label */}
                    <span className={`mt-2 font-serif text-[11px] tracking-wide px-2.5 py-1 rounded border transition-all ${
                      isSelected
                        ? 'bg-amber-500 border-amber-500 text-black font-semibold shadow-lg shadow-amber-500/10'
                        : 'bg-[#111111]/90 border-gray-800 text-gray-300 group-hover:border-amber-500/30'
                    }`}>
                      {kingdom.name}
                    </span>
                  </button>
                );
              })}

              {/* Scale vector watermark */}
              <div className="absolute bottom-4 left-4 font-mono text-[9px] text-gray-600 uppercase tracking-widest bg-black/50 px-2 py-1 rounded">
                SCALE: 1 UNIT = 100 YORJANAS • MERCATOR EQUATOR
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Kingdom description panel */}
          <div className="lg:col-span-4 bg-[#111111]/80 border border-amber-500/15 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute top-4 right-4 text-[9px] font-mono text-gray-600">
              LOCATION RECORD
            </div>

            <div className="space-y-6 text-left">
              
              {/* Badge */}
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-amber-500 animate-pulse" />
                <span className="font-mono text-[9px] text-amber-500 uppercase tracking-widest font-semibold">
                  {activeKingdom.modernLocation}
                </span>
              </div>

              {/* Title & Ruler */}
              <div className="space-y-1">
                <h3 className="font-serif text-2xl text-white font-medium tracking-wide">
                  {activeKingdom.name}
                </h3>
                <p className="text-xs text-gray-400 font-sans">
                  Crown Ruler: <strong className="font-serif text-amber-400">{activeKingdom.ruler}</strong>
                </p>
              </div>

              {/* Detailed History */}
              <div className="space-y-3">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                  HISTORICAL RECORDS & MYTHOS
                </span>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  {activeKingdom.history}
                </p>
              </div>

              {/* Importance inside epic */}
              <div className="space-y-2 border-t border-gray-800 pt-4">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block flex items-center gap-1">
                  <Award size={11} className="text-amber-500" />
                  SIGNIFICANCE TO THE EPIC
                </span>
                <p className="text-gray-400 text-xs font-sans leading-relaxed">
                  {activeKingdom.importance}
                </p>
              </div>

            </div>

            {/* Hint overlay */}
            <div className="pt-6 border-t border-gray-900 mt-6 text-[10px] text-gray-500 font-mono text-center lg:text-left flex items-center gap-2 justify-center lg:justify-start">
              <Navigation size={11} className="text-amber-500 animate-bounce" />
              <span>CLICK ANY GEOGRAPHICAL RING TO TRAVEL THE CONTINENT</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
export default KingdomMap;
