import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudioController } from './AudioNarrator';
import { ShieldAlert, Swords, Flag, Crosshair, Sparkles, TrendingUp } from 'lucide-react';

interface BattleDay {
  day: number;
  title: string;
  sanskritTitle: string;
  commanderPandava: string;
  commanderKaurava: string;
  vyuha: string; // Battle formation name
  summary: string;
  keyMoment: string;
  outcome: string;
  casualtyLevel: 'Extreme' | 'High' | 'Severe' | 'Absolute';
}

const BATTLE_DAYS: BattleDay[] = [
  {
    day: 1,
    title: 'Clash of the Seas',
    sanskritTitle: 'प्रथम दिवस - शंखघोष',
    commanderPandava: 'Shikhandi',
    commanderKaurava: 'Bhishma',
    vyuha: 'Krauncha Vyuha (Heron formation)',
    summary: 'The battle begins as conch shells echo across the plain of Kurukshetra. Arjuna initially hesitates, but after the Gita discourse, he pickes up his bow. Bhishma creates absolute devastation in the Pandava ranks with his arrows.',
    keyMoment: 'Bhishma decimates the Pandava defense lines, proving his absolute invincibility in direct combat.',
    outcome: 'Decisive advantage to the Kauravas; Pandavas in absolute demoralization.',
    casualtyLevel: 'High'
  },
  {
    day: 10,
    title: 'The Fall of the Patriarch',
    sanskritTitle: 'दशम दिवस - भीष्म शरशय्या',
    commanderPandava: 'Arjuna / Shikhandi',
    commanderKaurava: 'Bhishma',
    vyuha: 'Deva Vyuha (Divine celestial setup)',
    summary: 'Knowing Bhishma cannot be harmed by mortal men, Arjuna places Shikhandi (born female, now male) as a shield. Bhishma, adhering to code, lowers his bow. Arjuna shoots multiple arrows that pierce Bhishma’s entire body.',
    keyMoment: 'Bhishma falls on a bed of arrows, keeping himself alive through his boon of voluntary death.',
    outcome: 'Pandavas breakthrough Kaurava lines; Bhishma lies incapacitated.',
    casualtyLevel: 'Severe'
  },
  {
    day: 13,
    title: 'The Maze of Death',
    sanskritTitle: 'त्रयोदश दिवस - चक्रव्यूह',
    commanderPandava: 'Abhimanyu (16-year-old prince)',
    commanderKaurava: 'Dronacharya',
    vyuha: 'Chakravyuha (Spinning concentric labyrinth)',
    summary: 'Guru Drona forms the impenetrable circular maze. Only Arjuna and his young son Abhimanyu know how to enter. With Arjuna lured away, Abhimanyu breaks in alone, but is trapped and brutally assassinated by seven Kuru generals.',
    keyMoment: 'Abhimanyu fights alone against seven generals with a chariot wheel until he is stabbed from behind.',
    outcome: 'Tragic Pandava setback; Bhima and Arjuna swear terrible vows of revenge.',
    casualtyLevel: 'Extreme'
  },
  {
    day: 15,
    title: 'The Silent Preceptor',
    sanskritTitle: 'पञ्चदश दिवस - द्रोण पराभव',
    commanderPandava: 'Dhrishtadyumna',
    commanderKaurava: 'Dronacharya',
    vyuha: 'Padma Vyuha (Lotus Formation)',
    summary: 'Dronacharya destroys the Pandava armies. To stop him, Yudhisthira announces that "Ashwatthama is dead" (referring to an elephant, but whispering the part). Believing his son is dead, Drona drops his weapons and meditates. He is beheaded.',
    keyMoment: 'The righteous Yudhisthira tells a half-truth, causing Dronacharya to lay down his divine bow.',
    outcome: 'The supreme commander Drona falls; Kauravas lose intellectual superiority.',
    casualtyLevel: 'Severe'
  },
  {
    day: 17,
    title: 'The Sinking Chariot',
    sanskritTitle: 'सप्तदश दिवस - कर्ण वध',
    commanderPandava: 'Arjuna',
    commanderKaurava: 'Karna',
    vyuha: 'Ardha-Chandra Vyuha (Half-Moon)',
    summary: 'Arjuna and Karna meet in their ultimate duel. A sage’s curse causes Karna’s chariot wheel to sink in the mud, and he forgets his astras. While Karna is unarmed trying to lift the wheel, Krishna urges Arjuna to strike.',
    keyMoment: 'Arjuna shoots the Anjalika arrow, beheading Karna on the battlefield under Krishna’s instruction.',
    outcome: 'The Kaurava hero Karna falls, sealing the doom of Duryodhana.',
    casualtyLevel: 'Extreme'
  },
  {
    day: 18,
    title: 'The Duel of Gadas',
    sanskritTitle: 'अष्टादश दिवस - दुर्योधन पतन',
    commanderPandava: 'Bhima',
    commanderKaurava: 'Duryodhana',
    vyuha: 'Sarvatobhadra Vyuha',
    summary: 'Duryodhana hides in a lake but is challenged to a final duel. He fights Bhima in a colossal mace fight. Guided by a sign from Krishna, Bhima breaks Duryodhana’s thighs, violating strict mace rules but fulfilling his personal vow.',
    keyMoment: 'Duryodhana falls in agony as his thighs are shattered by Bhima’s crushing blow.',
    outcome: 'Absolute Pandava Victory. The war concludes, washing away the corrupt dynasty.',
    casualtyLevel: 'Absolute'
  }
];

export const KurukshetraWar: React.FC = () => {
  const { playSwish } = useAudioController();
  const [activeDayIdx, setActiveDayIdx] = useState<number>(2); // Default to Day 13 (Chakravyuha)

  const activeDay = BATTLE_DAYS[activeDayIdx];

  const handleDaySelect = (index: number) => {
    if (index === activeDayIdx) return;
    playSwish();
    setActiveDayIdx(index);
  };

  return (
    <div id="battlefield-section" className="relative w-full min-h-screen py-24 px-6 md:px-16 flex flex-col justify-center items-center z-10 overflow-hidden select-none text-left">
      {/* Absolute background color gradient filter */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="w-full max-w-7xl flex flex-col space-y-12">
        {/* Module Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 text-red-500 font-mono text-xs tracking-[0.2em] uppercase">
            <Swords size={14} className="animate-pulse" />
            <span>Tactical War Room</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-wide text-white">
            The Kurukshetra <span className="text-red-500">World War</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-sans max-w-xl">
            A clash that wiped out 4 million soldiers in 18 days. Witness the tactical formations, military strategies, and catastrophic turning points day by day.
          </p>
        </div>

        {/* Main interactive interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Day selection tabs */}
          <div className="lg:col-span-3 flex flex-col gap-3 justify-center">
            <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase pl-2 mb-1 block">
              CHOOSE HISTORIC DAY
            </span>
            {BATTLE_DAYS.map((bd, idx) => {
              const isActive = idx === activeDayIdx;
              return (
                <button
                  key={bd.day}
                  onClick={() => handleDaySelect(idx)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 ${
                    isActive
                      ? 'bg-red-500/10 border-red-500/40 text-white shadow-lg shadow-red-500/5'
                      : 'bg-[#111111]/30 border-gray-900 text-gray-400 hover:border-gray-800 hover:bg-[#111111]/60'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest font-semibold">
                      Day {bd.day}
                    </span>
                    <span className="font-serif text-sm font-medium tracking-wide">
                      {bd.title}
                    </span>
                  </div>
                  <Swords size={14} className={`transition-transform duration-300 ${isActive ? 'text-red-500 scale-110' : 'text-gray-700'}`} />
                </button>
              );
            })}
          </div>

          {/* Core Battlefield readout screen (Glassmorphic terminal style) */}
          <div className="lg:col-span-9 bg-[#111111]/60 border border-red-500/15 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative">
            
            {/* Top row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-5 gap-4">
              <div>
                <span className="font-mono text-xs text-red-400 uppercase tracking-widest block mb-1">
                  {activeDay.sanskritTitle}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-white font-medium tracking-wide">
                  Day {activeDay.day}: {activeDay.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                  Casualty Level:
                </span>
                <span className="font-mono text-xs text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded uppercase font-bold animate-pulse">
                  {activeDay.casualtyLevel}
                </span>
              </div>
            </div>

            {/* Inner Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 items-stretch">
              {/* Detailed narrative */}
              <div className="space-y-5 text-left">
                <div className="space-y-2">
                  <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase flex items-center gap-1.5">
                    <Flag size={11} />
                    Tactical Summary
                  </span>
                  <p className="text-gray-300 text-sm leading-relaxed font-sans">
                    {activeDay.summary}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase flex items-center gap-1.5">
                    <Crosshair size={11} />
                    The Pivotal Turning Point
                  </span>
                  <p className="text-gray-400 text-xs leading-relaxed italic border-l-2 border-red-500/40 pl-4 py-1">
                    {activeDay.keyMoment}
                  </p>
                </div>
              </div>

              {/* Battlefield Stats & Visual representation */}
              <div className="bg-black/30 border border-gray-900 rounded-xl p-5 flex flex-col justify-between space-y-6">
                
                {/* Generals & Command */}
                <div className="grid grid-cols-2 gap-4 border-b border-gray-900 pb-4">
                  <div className="text-left space-y-0.5">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block">Pandava Leader</span>
                    <span className="font-serif text-sm text-sky-400 font-semibold">{activeDay.commanderPandava}</span>
                  </div>
                  <div className="text-left space-y-0.5">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block">Kaurava Leader</span>
                    <span className="font-serif text-sm text-red-400 font-semibold">{activeDay.commanderKaurava}</span>
                  </div>
                </div>

                {/* Vyuha structure visualization representation (Aesthetic abstract rendering) */}
                <div className="space-y-3 flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-center text-xs font-mono text-gray-500">
                    <span>ACTIVE VYUHA (FORMATION)</span>
                    <Sparkles size={11} className="text-amber-500" />
                  </div>
                  <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-serif text-sm text-amber-500 font-medium">{activeDay.vyuha}</span>
                      <p className="text-gray-500 text-[10px] font-sans">A complex strategic deployment of chariots, elephants, and infantry.</p>
                    </div>
                    {/* Simulated tactical visual radar */}
                    <div className="w-10 h-10 rounded-full border border-red-500/20 flex items-center justify-center relative flex-shrink-0 animate-spin" style={{ animationDuration: '12s' }}>
                      <div className="absolute w-6 h-6 rounded-full border border-red-500/30" />
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    </div>
                  </div>
                </div>

                {/* Outcome panel */}
                <div className="bg-red-500/10 border border-red-500/20 rounded p-3 text-left">
                  <span className="font-mono text-[9px] text-red-400 uppercase tracking-wider block mb-1">
                    TACTICAL OUTCOME
                  </span>
                  <p className="font-sans text-xs text-gray-300 font-semibold">
                    {activeDay.outcome}
                  </p>
                </div>

              </div>
            </div>

            {/* Bottom guide line */}
            <div className="border-t border-gray-900 pt-4 text-center md:text-left font-mono text-[10px] text-gray-500 flex justify-between items-center flex-wrap gap-2">
              <span>SYSTEM LOG: DAY {activeDay.day} ENCOUNTER ARCHIVED</span>
              <span className="text-red-500/75 animate-pulse">● COMBAT ACTIVE</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
export default KurukshetraWar;
