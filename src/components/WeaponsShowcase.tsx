import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WEAPONS } from '../data';
import { Weapon } from '../types';
import { useAudioController } from './AudioNarrator';
import { Shield, Award, Zap, Sparkles, Orbit } from 'lucide-react';

export const WeaponsShowcase: React.FC = () => {
  const { playSwish, playTempleBell } = useAudioController();
  const [selectedWeaponIdx, setSelectedWeaponIdx] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activeWeapon = WEAPONS[selectedWeaponIdx];

  const handleWeaponSelect = (index: number) => {
    if (index === selectedWeaponIdx) return;
    playSwish();
    setSelectedWeaponIdx(index);
  };

  // Run procedural 3D wireframe render loop on our Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;
    let pulse = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) * 0.35;

      angle += 0.015;
      pulse = Math.sin(angle * 2) * 0.1;

      ctx.shadowBlur = 20;
      ctx.lineWidth = 1.8;

      switch (activeWeapon.id) {
        case 'sudarshan':
          // DRAW SPINNING SUDARSHAN CHAKRA
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.85)';
          ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';

          // Outer teeth ring
          ctx.beginPath();
          const teeth = 36;
          for (let i = 0; i <= teeth; i++) {
            const a = (i / teeth) * Math.PI * 2 + angle;
            const rMod = (i % 2 === 0) ? 0.95 : 1.15;
            const r = scale * (1 + pulse * 0.4) * rMod;
            const x = cx + Math.cos(a) * r;
            const y = cy + Math.sin(a) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();

          // Inner rings
          ctx.strokeStyle = 'rgba(255, 211, 105, 0.65)';
          ctx.beginPath();
          ctx.arc(cx, cy, scale * 0.6, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
          ctx.beginPath();
          ctx.arc(cx, cy, scale * 0.3, 0, Math.PI * 2);
          ctx.stroke();

          // Core spoke lines
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
          for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2 - angle * 0.5;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(a) * scale * 0.2, cy + Math.sin(a) * scale * 0.2);
            ctx.lineTo(cx + Math.cos(a) * scale * 0.8, cy + Math.sin(a) * scale * 0.8);
            ctx.stroke();
          }
          break;

        case 'gandiva':
          // DRAW GOLDEN GANDIVA BOW
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.85)';
          ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';

          // Draw double arc bow
          ctx.beginPath();
          for (let y = -scale; y <= scale; y += 5) {
            // Curving arc formula
            const xOffset = Math.cos((y / scale) * Math.PI * 0.5) * scale * 0.45;
            const x = cx - scale * 0.2 + xOffset;
            const actualY = cy + y;
            if (y === -scale) ctx.moveTo(x, actualY);
            else ctx.lineTo(x, actualY);
          }
          ctx.stroke();

          // Main heavy bow string (vibrating slightly)
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
          ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
          ctx.beginPath();
          ctx.moveTo(cx - scale * 0.15, cy - scale);
          // Mid-point vibration displacement
          const vib = Math.sin(angle * 8) * 2;
          ctx.lineTo(cx - scale * 0.15 + vib, cy);
          ctx.lineTo(cx - scale * 0.15, cy + scale);
          ctx.stroke();

          // Golden grip
          ctx.fillStyle = '#D4AF37';
          ctx.beginPath();
          ctx.arc(cx - scale * 0.15 + scale * 0.45, cy, 6, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'vasavi':
          // DRAW DART / SPEAR
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.85)';
          ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';

          const rot = angle * 0.4;

          // Main Shaft
          ctx.beginPath();
          ctx.moveTo(cx - Math.cos(rot) * scale * 1.1, cy - Math.sin(rot) * scale * 1.1);
          ctx.lineTo(cx + Math.cos(rot) * scale * 1.1, cy + Math.sin(rot) * scale * 1.1);
          ctx.stroke();

          // Spear Spearhead (Diamond shape)
          const hx = cx + Math.cos(rot) * scale * 1.1;
          const hy = cy + Math.sin(rot) * scale * 1.1;

          ctx.fillStyle = '#FFD369';
          ctx.beginPath();
          ctx.moveTo(hx, hy);
          ctx.lineTo(hx - Math.cos(rot - 0.2) * 25, hy - Math.sin(rot - 0.2) * 25);
          ctx.lineTo(hx - Math.cos(rot) * 35, hy - Math.sin(rot) * 35);
          ctx.lineTo(hx - Math.cos(rot + 0.2) * 25, hy - Math.sin(rot + 0.2) * 25);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Electric wings
          ctx.strokeStyle = 'rgba(74, 144, 226, 0.8)';
          ctx.shadowColor = 'rgba(74, 144, 226, 0.6)';
          for (let i = 0; i < 4; i++) {
            const side = i % 2 === 0 ? 1 : -1;
            const offset = (i < 2 ? 0.3 : 0.6) * scale;
            const ex = cx + Math.cos(rot) * offset;
            const ey = cy + Math.sin(rot) * offset;
            
            ctx.beginPath();
            ctx.moveTo(ex, ey);
            ctx.lineTo(ex - Math.cos(rot - 0.5 * side) * 15, ey - Math.sin(rot - 0.5 * side) * 15);
            ctx.lineTo(ex - Math.cos(rot) * 20, ey - Math.sin(rot) * 20);
            ctx.stroke();
          }
          break;

        case 'brahmastra':
          // DRAW ROARING SWIRLING FIRE SPHERE
          ctx.strokeStyle = 'rgba(255, 110, 50, 0.7)';
          ctx.shadowColor = 'rgba(255, 110, 50, 0.6)';

          // Swirling fire rings
          for (let r = 0; r < 4; r++) {
            const ringScale = scale * (0.4 + r * 0.2);
            ctx.beginPath();
            ctx.ellipse(cx, cy, ringScale, ringScale * 0.4, angle * (r % 2 === 0 ? 1 : -1), 0, Math.PI * 2);
            ctx.stroke();
          }

          // Floating particles
          ctx.fillStyle = '#FFD369';
          for (let i = 0; i < 12; i++) {
            const a = angle * 2 + (i / 12) * Math.PI * 2;
            const d = scale * 0.7;
            ctx.beginPath();
            ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.5, 2, 0, Math.PI * 2);
            ctx.fill();
          }

          // Glowing central needle (the grass blade)
          ctx.strokeStyle = '#FFFFFF';
          ctx.shadowColor = '#FFFFFF';
          ctx.beginPath();
          ctx.moveTo(cx, cy - scale * 0.25);
          ctx.lineTo(cx, cy + scale * 0.25);
          ctx.stroke();
          break;

        case 'pashupata':
          // DRAW MULTI-POINTED SHIVA STAR
          ctx.strokeStyle = 'rgba(74, 144, 226, 0.85)';
          ctx.shadowColor = 'rgba(74, 144, 226, 0.6)';

          // Draw star vortex
          ctx.beginPath();
          const points = 16;
          for (let i = 0; i <= points; i++) {
            const a = (i / points) * Math.PI * 2 + angle;
            const rMod = (i % 2 === 0) ? 1.15 : 0.45;
            const r = scale * rMod;
            const x = cx + Math.cos(a) * r;
            const y = cy + Math.sin(a) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();

          // Concentric spinning circle inside
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
          ctx.beginPath();
          ctx.arc(cx, cy, scale * 0.3, 0, Math.PI * 2);
          ctx.stroke();

          // Outer energy aura ring
          ctx.strokeStyle = 'rgba(74, 144, 226, 0.25)';
          ctx.beginPath();
          ctx.arc(cx, cy, scale * 1.25, 0, Math.PI * 2);
          ctx.stroke();
          break;

        default:
          break;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [activeWeapon]);

  return (
    <div id="weapons-section" className="relative w-full min-h-screen py-24 px-6 md:px-16 flex flex-col justify-center items-center z-10 overflow-hidden select-none text-left">
      {/* Background radial filter */}
      <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-amber-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl flex flex-col space-y-12">
        {/* Module Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs tracking-[0.2em] uppercase">
            <Orbit size={14} className="animate-spin" style={{ animationDuration: '8s' }} />
            <span>Divine Armaments</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-wide text-white">
            The Weapons of the <span className="text-amber-500">Astras</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-sans max-w-xl">
            Sourced from cosmic deities. Explore the ultimate weapons of mass destruction, physical bows, and nuclear-class astras summoned through high-concentration mental mantras.
          </p>
        </div>

        {/* Weapons layout panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Selector Cards */}
          <div className="lg:col-span-3 flex flex-col gap-3 justify-center">
            <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase pl-2 mb-1 block">
              CHOOSE ARMAMENT
            </span>
            {WEAPONS.map((wp, idx) => {
              const isActive = idx === selectedWeaponIdx;
              return (
                <button
                  key={wp.id}
                  onClick={() => handleWeaponSelect(idx)}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-500/10 border-amber-500/40 text-white shadow-lg shadow-amber-500/5'
                      : 'bg-[#111111]/30 border-gray-900 text-gray-400 hover:border-gray-800 hover:bg-[#111111]/60'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-amber-500 uppercase tracking-wider font-semibold">
                      {wp.astralType ? 'DIVINE ASTRA' : 'PHYSICAL WEAPON'}
                    </span>
                    <span className="font-serif text-sm font-medium tracking-wide">
                      {wp.name}
                    </span>
                  </div>
                  <Shield size={14} className={isActive ? 'text-amber-500' : 'text-gray-700'} />
                </button>
              );
            })}
          </div>

          {/* CENTER COLUMN: Real-time procedural 3D Wireframe Canvas */}
          <div className="lg:col-span-5 bg-black/40 border border-gray-900 rounded-2xl flex items-center justify-center p-6 relative aspect-square lg:aspect-auto min-h-[350px]">
            {/* Ambient indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 font-mono text-[9px] text-gray-500">
              <Zap size={11} className="text-amber-500 animate-pulse" />
              <span>REALTIME PROCEDURAL VECTOR RENDER</span>
            </div>

            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>

          {/* RIGHT COLUMN: Detailed characteristics */}
          <div className="lg:col-span-4 bg-[#111111]/80 border border-amber-500/15 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute top-4 right-4 text-[9px] font-mono text-gray-600">
              {activeWeapon.sanskritName}
            </div>

            <div className="space-y-6 text-left">
              
              {/* Heading */}
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest block font-semibold">
                  {activeWeapon.owner}
                </span>
                <h3 className="font-serif text-2xl text-white font-medium tracking-wide">
                  {activeWeapon.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed font-sans">
                {activeWeapon.description}
              </p>

              {/* Origin Fact */}
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                  ORIGIN STORY
                </span>
                <p className="text-gray-400 text-xs font-sans leading-relaxed">
                  {activeWeapon.origin}
                </p>
              </div>

              {/* Capabilities badge list */}
              <div className="space-y-2.5">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                  COMBAT CAPABILITIES
                </span>
                <div className="flex flex-col gap-2">
                  {activeWeapon.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                      <Sparkles size={11} className="text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="font-sans leading-normal">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Hint bar */}
            <div className="pt-6 border-t border-gray-900 mt-6 text-[10px] text-gray-500 font-mono text-center lg:text-left">
              💡 FLUID PROCEDURAL CANVAS TRANSITIONING ACTIVE AT 60 FPS
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
export default WeaponsShowcase;
