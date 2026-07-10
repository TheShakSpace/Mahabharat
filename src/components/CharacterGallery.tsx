import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHARACTERS } from '../data';
import { Character } from '../types';
import { useAudioController } from './AudioNarrator';
import { Sparkles, Users, Award, Shield, X, Volume2, SquareTerminal, Star } from 'lucide-react';

export const CharacterGallery: React.FC = () => {
  const { playTempleBell, speakText, stopSpeaking, isSpeaking, activeNarrator } = useAudioController();
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [hoveredCharId, setHoveredCharId] = useState<string | null>(null);

  const handleOpenModal = (char: Character) => {
    playTempleBell();
    setSelectedChar(char);
  };

  const handleCloseModal = () => {
    stopSpeaking();
    setSelectedChar(null);
  };

  const handleVoiceNarration = (char: Character) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const narrationText = `${char.name}, known in Sanskrit as ${char.sanskritName}. Role: ${char.role}. Biography: ${char.biography} ${char.importance}`;
      speakText(narrationText);
    }
  };

  return (
    <div id="character-section" className="relative w-full min-h-screen py-24 px-6 md:px-16 flex flex-col justify-center items-center z-10 overflow-hidden select-none text-left">
      {/* Background visual glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl flex flex-col space-y-12">
        {/* Module Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs tracking-[0.2em] uppercase">
            <Users size={14} />
            <span>Interactive Gallery</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-wide text-white">
            The Pantheon of <span className="text-amber-500">Legendary Heroes</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-sans max-w-xl">
            Hover over any figure to illuminate their weapon systems. Click a card to unlock a detailed cinematic biography, relational mapping, and voice-guided narrations.
          </p>
        </div>

        {/* Character Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CHARACTERS.map(char => {
            const isHovered = hoveredCharId === char.id;
            const allianceColor = 
              char.alliance === 'Pandava' ? 'border-sky-500/20 text-sky-400 bg-sky-500/10' :
              char.alliance === 'Kaurava' ? 'border-red-500/20 text-red-400 bg-red-500/10' :
              char.alliance === 'Divine' ? 'border-amber-500/20 text-amber-400 bg-amber-500/10' :
              'border-gray-500/20 text-gray-400 bg-gray-500/10';

            return (
              <motion.div
                key={char.id}
                onMouseEnter={() => setHoveredCharId(char.id)}
                onMouseLeave={() => setHoveredCharId(null)}
                onClick={() => handleOpenModal(char)}
                className="relative h-[380px] rounded-2xl overflow-hidden bg-[#111111]/40 border border-gray-800 hover:border-amber-500/40 transition-all duration-500 group cursor-pointer p-4 flex flex-col justify-between shadow-lg shadow-black/60"
                whileHover={{ y: -6 }}
              >
                {/* Highlight Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-95' : 'opacity-80'}`} />

                {/* Micro sparks system when hovered (pure css animations) */}
                {isHovered && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                    <div className="absolute bottom-4 left-1/4 w-1 h-1 bg-amber-400 rounded-full animate-ping" />
                    <div className="absolute bottom-16 right-1/4 w-1 h-1 bg-amber-500 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
                    <div className="absolute bottom-28 left-1/3 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.8s' }} />
                  </div>
                )}

                {/* Character image representation placeholder (aesthetic silhouettes with beautiful backlighting) */}
                <div className="absolute inset-x-4 top-4 h-[55%] rounded-xl overflow-hidden bg-black/40 border border-gray-800/80 z-0">
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent z-10`} />
                  <img
                    src={`/src/assets/images/${char.avatar}`}
                    alt={char.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 object-center"
                  />
                  {/* Glowing weapon symbol indicator */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className="p-2 rounded-full bg-black/85 border border-amber-500/20 text-amber-500 group-hover:border-amber-500 group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all">
                      <Shield size={12} />
                    </div>
                  </div>
                </div>

                {/* Card Title & Alliance */}
                <div className="relative z-10 mt-auto pt-4 flex flex-col items-start space-y-2">
                  <span className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded tracking-widest uppercase border ${allianceColor}`}>
                    {char.alliance}
                  </span>
                  
                  <div>
                    <h3 className="font-serif text-xl font-medium text-white tracking-wide group-hover:text-amber-400 transition-colors">
                      {char.name}
                    </h3>
                    <p className="font-mono text-[9px] text-gray-500 tracking-wider">
                      {char.sanskritName} • {char.role.split(',')[0]}
                    </p>
                  </div>

                  {/* Tiny power badge list */}
                  <div className="flex gap-1.5 overflow-hidden h-4 w-full opacity-60 group-hover:opacity-100 transition-opacity">
                    {char.powers.slice(0, 2).map((power, idx) => (
                      <span key={idx} className="text-[8px] font-sans text-gray-400 border border-gray-800 px-1.5 py-0.5 rounded-sm whitespace-nowrap bg-black/30">
                        {power}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* DETAILED CINEMATIC MODAL OVERLAY */}
      <AnimatePresence>
        {selectedChar && (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center z-50 p-4 overflow-y-auto">
            {/* Dark background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 180 }}
              className="relative w-full max-w-5xl bg-[#111111]/95 border border-amber-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-black z-10 grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[550px] max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 z-20 p-2 rounded-full bg-black/50 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5"
              >
                <X size={18} />
              </button>

              {/* LEFT HALF: Decorative Character Graphic */}
              <div className="col-span-1 md:col-span-5 relative bg-black flex flex-col justify-end p-8 overflow-hidden min-h-[300px] md:min-h-0">
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
                <img
                  src={`/src/assets/images/${selectedChar.avatar}`}
                  alt={selectedChar.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 object-center"
                />

                {/* Backlighting Sphere */}
                <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full filter blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-3">
                  <span className="font-mono text-[10px] text-amber-500 tracking-[0.3em] uppercase block">
                    {selectedChar.sanskritName}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-white font-semibold">
                    {selectedChar.name}
                  </h3>
                  <div className="h-[2px] w-12 bg-amber-500" />
                  <p className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                    {selectedChar.role}
                  </p>
                </div>
              </div>

              {/* RIGHT HALF: Rich Biography & Interactive Metrics */}
              <div className="col-span-1 md:col-span-7 p-6 md:p-10 space-y-8 flex flex-col justify-start">
                
                {/* Header buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-5">
                  <span className="font-mono text-xs uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 border border-amber-500/20 rounded">
                    ALLIANCE: {selectedChar.alliance}
                  </span>

                  {/* Narrator Trigger */}
                  <button
                    onClick={() => handleVoiceNarration(selectedChar)}
                    className={`flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full border tracking-widest uppercase transition-all duration-300 ${
                      isSpeaking
                        ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20 font-bold'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:border-amber-500/40'
                    }`}
                  >
                    <Volume2 size={13} className={isSpeaking ? 'animate-bounce' : ''} />
                    <span>{isSpeaking ? 'Stop Narrator' : 'Voice Narration'}</span>
                  </button>
                </div>

                {/* Biography Grid */}
                <div className="space-y-4">
                  <h4 className="font-serif text-lg text-white font-medium flex items-center gap-2">
                    <Sparkles size={16} className="text-amber-500" />
                    Epic Biography
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed font-sans">
                    {selectedChar.biography}
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed italic border-l-2 border-amber-500/30 pl-4 py-1">
                    <strong>Significance:</strong> {selectedChar.importance}
                  </p>
                </div>

                {/* Animated Stats / Attributes */}
                <div className="space-y-4">
                  <h4 className="font-serif text-lg text-white font-medium flex items-center gap-2">
                    <Award size={16} className="text-amber-500" />
                    Combat & Moral Attributes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(selectedChar.stats).map(([key, val]) => (
                      <div key={key} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-mono text-gray-400 capitalize">{key}</span>
                          <span className="font-mono text-amber-500 font-bold">{val}%</span>
                        </div>
                        {/* Custom visual progress bar */}
                        <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${val}%` }}
                            transition={{ duration: 1.0, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details Section (Weapons & Connections) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  
                  {/* Weapons */}
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase block">
                      Legendary Arsenal
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {selectedChar.weapons.map((w, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 px-3 py-1.5 border border-white/5 rounded">
                          <Shield size={12} className="text-amber-500" />
                          <span>{w}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Relationship connections */}
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase block">
                      Royal Lineage
                    </span>
                    <div className="space-y-1.5 text-xs text-gray-300">
                      {selectedChar.relationships.mother && (
                        <div>
                          <span className="text-gray-500 mr-2">Mother:</span>
                          <span className="font-serif">{selectedChar.relationships.mother}</span>
                        </div>
                      )}
                      {selectedChar.relationships.father && (
                        <div>
                          <span className="text-gray-500 mr-2">Father:</span>
                          <span className="font-serif">{selectedChar.relationships.father}</span>
                        </div>
                      )}
                      {selectedChar.relationships.spouse && (
                        <div>
                          <span className="text-gray-500 mr-2">Spouse:</span>
                          <span className="font-serif">{selectedChar.relationships.spouse}</span>
                        </div>
                      )}
                      {selectedChar.relationships.mentor && (
                        <div>
                          <span className="text-gray-500 mr-2">Mentor:</span>
                          <span className="font-serif text-amber-500">{selectedChar.relationships.mentor}</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default CharacterGallery;
