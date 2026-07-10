import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAMILY_TREE, CHARACTERS } from '../data';
import { FamilyNode } from '../types';
import { useAudioController } from './AudioNarrator';
import { GitBranch, User, Sparkles, Heart } from 'lucide-react';

export const FamilyTree: React.FC = () => {
  const { playSwish, playTempleBell } = useAudioController();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('shantanu');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const selectedNode = FAMILY_TREE.find(n => n.id === selectedNodeId) || FAMILY_TREE[0];

  // Group family nodes by generation to render a beautiful stratified vertical layout
  const generations = [1, 2, 3, 4, 5, 6];

  const getNodesByGeneration = (gen: number) => {
    return FAMILY_TREE.filter(n => n.generation === gen);
  };

  const handleNodeClick = (node: FamilyNode) => {
    if (node.id === selectedNodeId) return;
    playTempleBell();
    setSelectedNodeId(node.id);
  };

  // Check if a character has a detailed bio in CHARACTERS array
  const charDetails = CHARACTERS.find(c => c.id === selectedNode.id);

  return (
    <div id="family-tree-section" className="relative w-full min-h-screen py-24 px-6 md:px-16 flex flex-col justify-center items-center z-10 overflow-hidden select-none text-left">
      {/* Background space blur */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-sky-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl flex flex-col space-y-12">
        {/* Module Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 text-sky-500 font-mono text-xs tracking-[0.2em] uppercase">
            <GitBranch size={14} />
            <span>Lunar Dynasty Lineage</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-wide text-white">
            The Family Tree of the <span className="text-amber-500">Kuru Dynasty</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-sans max-w-xl">
            Trace the bloodline of Chandra Vansha (the Lunar Dynasty). Witness how a singular royal lineage splits into the warring Pandava and Kaurava factions. Click any node to reveal details.
          </p>
        </div>

        {/* Tree Container Split screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT PANEL: Interactive SVG visual Node Tree Map */}
          <div className="lg:col-span-8 bg-black/40 border border-gray-900 rounded-2xl p-6 relative overflow-x-auto overflow-y-hidden custom-scrollbar flex flex-col justify-center min-h-[480px]">
            {/* Legend Indicators */}
            <div className="absolute top-4 left-4 flex gap-4 text-[9px] font-mono text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-sky-500" /> Pandava</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-500" /> Kaurava</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-gray-500" /> Neutral</span>
            </div>

            {/* Render Stratified Generations */}
            <div className="flex flex-col space-y-10 items-center justify-center min-w-[650px] py-4 relative z-10">
              
              {generations.map(gen => (
                <div key={gen} className="flex flex-col items-center space-y-2 w-full">
                  
                  {/* Generation Label watermark */}
                  <span className="font-mono text-[9px] text-gray-700 uppercase tracking-[0.2em] block">
                    Generation {gen}
                  </span>

                  {/* Nodes in this Generation row */}
                  <div className="flex justify-center items-center gap-4 flex-wrap">
                    {getNodesByGeneration(gen).map(node => {
                      const isSelected = selectedNodeId === node.id;
                      const isHovered = hoveredNodeId === node.id;

                      const allianceColor = 
                        node.alliance === 'Pandava' ? 'border-sky-500/30 hover:border-sky-500 hover:shadow-sky-500/10' :
                        node.alliance === 'Kaurava' ? 'border-red-500/30 hover:border-red-500 hover:shadow-red-500/10' :
                        'border-gray-800 hover:border-gray-500 hover:shadow-gray-500/10';

                      const selectedBg = 
                        node.alliance === 'Pandava' ? 'bg-sky-500/20 border-sky-500 text-sky-400' :
                        node.alliance === 'Kaurava' ? 'bg-red-500/20 border-red-500 text-red-400' :
                        'bg-gray-800/80 border-gray-400 text-gray-300';

                      return (
                        <div
                          key={node.id}
                          onClick={() => handleNodeClick(node)}
                          onMouseEnter={() => setHoveredNodeId(node.id)}
                          onMouseLeave={() => setHoveredNodeId(null)}
                          className={`px-4 py-2.5 rounded-lg border text-xs cursor-pointer select-none transition-all duration-300 flex items-center gap-2 ${
                            isSelected ? selectedBg : `bg-[#111111]/80 ${allianceColor}`
                          }`}
                        >
                          <User size={12} className={isSelected ? 'animate-pulse text-amber-400' : 'text-gray-500'} />
                          <div className="flex flex-col text-left">
                            <span className="font-serif font-medium tracking-wide">{node.name}</span>
                            {node.spouse && (
                              <span className="text-[9px] text-gray-500 font-mono flex items-center gap-1">
                                <Heart size={8} className="text-red-400" /> {node.spouse.split('/')[0]}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* RIGHT PANEL: Floating Informational details drawer */}
          <div className="lg:col-span-4 bg-[#111111]/80 border border-sky-500/15 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute top-4 right-4 text-[9px] font-mono text-gray-600">
              ID: {selectedNode.id.toUpperCase()}
            </div>

            <div className="space-y-6">
              {/* Badge */}
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded border tracking-widest uppercase ${
                  selectedNode.alliance === 'Pandava' ? 'border-sky-500/20 text-sky-400 bg-sky-500/10' :
                  selectedNode.alliance === 'Kaurava' ? 'border-red-500/20 text-red-400 bg-red-500/10' :
                  'border-gray-800 text-gray-400 bg-gray-900/40'
                }`}>
                  {selectedNode.alliance} ALLIANCE
                </span>
                <span className="text-gray-700 font-mono text-[9px]">• GENERATION {selectedNode.generation}</span>
              </div>

              {/* Title & Spouse info */}
              <div className="space-y-1">
                <h3 className="font-serif text-2xl text-white font-medium tracking-wide">
                  {selectedNode.name}
                </h3>
                {selectedNode.spouse && (
                  <p className="text-xs text-amber-500 font-serif flex items-center gap-1">
                    💍 Spouse: <strong>{selectedNode.spouse}</strong>
                  </p>
                )}
              </div>

              {/* Bio description card */}
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase block">
                  Dynastic Background
                </span>
                
                {charDetails ? (
                  <p className="text-gray-300 text-sm leading-relaxed font-sans">
                    {charDetails.biography}
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm leading-relaxed font-sans italic">
                    A key figure of the royal Kuru lineage who helped shape the alliances and destiny of Hastinapur’s crown during this pivotal epoch.
                  </p>
                )}
              </div>

              {/* Lineage connections readout */}
              <div className="space-y-3 pt-4 border-t border-gray-800">
                <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase block">
                  Dynastic Branches
                </span>
                
                <div className="space-y-1.5 text-xs text-gray-300">
                  {selectedNode.children && (
                    <div className="flex flex-col gap-1 text-left">
                      <span className="text-gray-500">Children:</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedNode.children.map(childId => {
                          const childNode = FAMILY_TREE.find(n => n.id === childId);
                          return (
                            <span
                              key={childId}
                              onClick={() => {
                                const matched = FAMILY_TREE.find(n => n.id === childId);
                                if (matched) handleNodeClick(matched);
                              }}
                              className="px-2 py-0.5 bg-white/5 border border-white/10 rounded font-serif hover:border-amber-500/40 cursor-pointer text-gray-300 hover:text-white"
                            >
                              {childNode ? childNode.name : childId}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Quick guide text */}
            <div className="pt-6 border-t border-gray-900 mt-6 text-xs text-gray-500 font-mono text-center lg:text-left">
              💡 CLICK NODES TO NAVIGATE THE LUNAR ROYAL BLOODLINE
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
export default FamilyTree;
