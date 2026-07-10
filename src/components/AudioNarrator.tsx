import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleAmbient: () => void;
  playTempleBell: () => void;
  playSwish: () => void;
  speakText: (text: string, onStart?: () => void, onEnd?: () => void) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  activeNarrator: string | null;
  audioData: number[]; // Real-time ambient mock visualizer data
}

const AudioControllerContext = createContext<AudioContextType | undefined>(undefined);

export const useAudioController = () => {
  const context = useContext(AudioControllerContext);
  if (!context) {
    throw new Error('useAudioController must be used within an AudioControllerProvider');
  }
  return context;
};

export const AudioControllerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [activeNarrator, setActiveNarrator] = useState<string | null>(null);
  const [audioData, setAudioData] = useState<number[]>(Array(16).fill(5));

  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneOscsRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);
  const masterGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Initialize Web Audio API safely on user gesture
  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Resonant Lowpass Filter for that warm temple acoustic
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, ctx.currentTime);
      filter.Q.setValueAtTime(3.5, ctx.currentTime);
      filter.connect(masterGain);
      filterRef.current = filter;

      // Generate a rich, multi-harmonic Indian Tanpura / Tibetan bowl chord
      // Frequencies in C-sharp (72.8Hz, 109.2Hz, 145.6Hz, 218.4Hz)
      const baseFreq = 72.8; 
      const harmonics = [1, 1.5, 2, 3, 4]; // Perfect fifths and octaves
      
      harmonics.forEach((h, index) => {
        const osc = ctx.createOscillator();
        osc.type = index % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(baseFreq * h, ctx.currentTime);

        const gainNode = ctx.createGain();
        // Stagger volume levels
        const volume = index === 0 ? 0.25 : index === 1 ? 0.18 : index === 2 ? 0.15 : 0.08;
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);

        osc.connect(gainNode);
        gainNode.connect(filter);
        osc.start();

        droneOscsRef.current.push({ osc, gain: gainNode });

        // Add very slow micro-detuning over time to make the drone sound alive
        const detuneLFO = () => {
          if (!osc || !ctx) return;
          try {
            const time = ctx.currentTime;
            osc.frequency.setValueAtTime(baseFreq * h + Math.sin(time * (0.2 + index * 0.15)) * 0.5, time);
          } catch (e) {}
        };
        
        // Setup simple modulation interval
        const timerId = window.setInterval(detuneLFO, 200);
        return () => window.clearInterval(timerId);
      });

    } catch (e) {
      console.error('Failed to initialize AudioContext', e);
    }
  };

  // Toggle ambient soundtrack
  const toggleAmbient = () => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    const ctx = audioCtxRef.current;
    if (!ctx || !masterGainRef.current) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (isPlaying) {
      // Fade out slowly
      masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, ctx.currentTime);
      masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      setIsPlaying(false);
    } else {
      // Fade in slowly
      masterGainRef.current.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGainRef.current.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 1.5);
      setIsPlaying(true);
    }
  };

  // Play synthesized physical Indian temple bell
  const playTempleBell = () => {
    if (!audioCtxRef.current) {
      initAudio();
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    try {
      const now = ctx.currentTime;
      // High-end metallic tone (FM synthesis bell)
      // Bell harmonics are non-integer multiples
      const bellFreqs = [440, 540, 670, 780, 920, 1200];
      
      bellFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        
        // Bell strike amplitude envelope
        const initialGain = idx === 0 ? 0.3 : 0.15;
        gainNode.gain.setValueAtTime(initialGain, now);
        // Long ring decay
        const decayTime = idx === 0 ? 3.0 : idx === 1 ? 2.2 : 1.2;
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decayTime);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + decayTime + 0.1);
      });
    } catch (e) {
      console.warn('Error playing temple bell', e);
    }
  };

  // Play synthetic clean transition swish (wind effect)
  const playSwish = () => {
    if (!audioCtxRef.current) initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Create white noise buffer
      const bufferSize = ctx.sampleRate * 0.4; // 400ms swish
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(3, now);
      // Sweeping frequency from 200Hz to 1600Hz back to 300Hz
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(1500, now + 0.2);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.4);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.45);
    } catch (e) {}
  };

  // Generate mock real-time audio visualizer state
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (isPlaying) {
        setAudioData(prev =>
          prev.map(() => Math.floor(Math.random() * 25) + 5)
        );
      } else {
        setAudioData(prev => prev.map(val => Math.max(2, val * 0.85)));
      }
    }, 120);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  // Cinematic Narration (Text-to-Speech)
  const speakText = (text: string, onStart?: () => void, onEnd?: () => void) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current narration

      const cleanText = text;
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Detect if text contains Hindi characters (Devanagari range)
      const isHindi = /[\u0900-\u097F]/.test(text);
      
      // Configure deep storytelling voice
      const voices = window.speechSynthesis.getVoices();
      
      if (isHindi) {
        utterance.lang = 'hi-IN';
        // Look for Hindi voice
        const hindiVoice = voices.find(v => v.lang === 'hi-IN' || v.lang.startsWith('hi')) || 
                           voices.find(v => v.name.includes('Hindi') || v.name.includes('India'));
        if (hindiVoice) {
          utterance.voice = hindiVoice;
        }
        utterance.pitch = 0.92; // Warm, natural grandfatherly tone
        utterance.rate = 0.78;  // Nostalgic, peaceful storytelling speed
      } else {
        // Look for a British or English male voice if possible, which sounds highly narrative
        const bestVoice = voices.find(v => v.name.includes('Google UK English Male') || v.name.includes('Male') || v.lang === 'en-GB') || 
                          voices.find(v => v.lang.startsWith('en')) || 
                          voices[0];
        if (bestVoice) {
          utterance.voice = bestVoice;
        }
        utterance.pitch = 0.82; // Deep cinematic pitch
        utterance.rate = 0.84;  // Majestic slow narration rate
      }
      
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setActiveNarrator(text.slice(0, 30));
        if (onStart) onStart();
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setActiveNarrator(null);
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setActiveNarrator(null);
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Speech synthesis not supported.');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveNarrator(null);
    }
  };

  // Clean up Web Audio node connections on unmount
  useEffect(() => {
    return () => {
      droneOscsRef.current.forEach(({ osc, gain }) => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch (e) {}
      });
      if (masterGainRef.current) masterGainRef.current.disconnect();
      if (filterRef.current) filterRef.current.disconnect();
    };
  }, []);

  return (
    <AudioControllerContext.Provider
      value={{
        isPlaying,
        toggleAmbient,
        playTempleBell,
        playSwish,
        speakText,
        stopSpeaking,
        isSpeaking,
        activeNarrator,
        audioData,
      }}
    >
      {children}
    </AudioControllerContext.Provider>
  );
};
