import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudioController } from './AudioNarrator';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, 
  Tv, Film, Sparkles, AlertCircle, Headphones, RefreshCw,
  MessageSquare, User, Zap, Star, Compass
} from 'lucide-react';

interface MovieChapter {
  id: string;
  title: string;
  subTitle: string;
  narrator: string;
  avatar: string;
  quote: string;
  narrationText: string;
  image: string;
  particles: 'cosmic' | 'embers' | 'dust' | 'sparks' | 'golden_rays';
  overlayColor: string;
  duration: number; // in seconds
}

const MOVIE_CHAPTERS: MovieChapter[] = [
  {
    id: 'kuru-birth',
    title: 'भीष्म की भीषण प्रतिज्ञा और कुरुवंश की नींव',
    subTitle: 'अध्याय १: हस्तिनापुर का उदय',
    narrator: 'संजय (दिव्यदृष्टि)',
    avatar: '👁️',
    quote: '"मैं आजीवन ब्रह्मचर्य का पालन करूँगा और निष्काम भाव से हस्तिनापुर के सिंहासन की रक्षा करूँगा।" — गंगापुत्र भीष्म',
    narrationText: 'महाभारत की इस महान गाथा का प्रारंभ एक प्रतिज्ञा से होता है। कुरुवंश के महान संरक्षक, गंगापुत्र देवव्रत ने अपने पिता की प्रसन्नता के लिए आजीवन ब्रह्मचर्य और सिंहासन त्याग की भीषण प्रतिज्ञा ली, जिससे वे भीष्म कहलाए। किंतु समय का चक्र घूमता रहा। कुछ पीढ़ियों के पश्चात, इसी कुरुवंश की शाखाएं दो प्रतिरोधी ध्रुवों में विभाजित हो गईं - एक ओर धर्मपरायण पांच पांडव और दूसरी ओर तृष्णा और अहंकार से ग्रस्त सौ कौरव। यहीं से धर्म और अधर्म के मध्य होने वाले महासंग्राम की पृष्ठभूमि तैयार हुई।',
    image: '/src/assets/images/kurukshetra_twilight_1783523399963.jpg',
    particles: 'dust',
    overlayColor: 'from-blue-950/40 via-transparent to-black/90',
    duration: 18
  },
  {
    id: 'dice-game',
    title: 'शकुनि का कपट जाल और द्रौपदी का शीलभंग',
    subTitle: 'अध्याय २: धर्मसभा का पतन',
    narrator: 'महाकाव्य सूत्रधार',
    avatar: '🕉️',
    quote: '"हे गोविंद! हे द्वारकाधीश! इस असहाय स्थिति में अब केवल आपका ही सहारा है।" — द्रौपदी',
    narrationText: 'द्यूत क्रीड़ा की उस ऐतिहासिक सभा में शकुनि के छली पांसों ने पांडवों का सर्वस्व हर लिया। धर्मराज युधिष्ठिर एक-एक कर अपने भाइयों, स्वयं को और अंत में महारानी द्रौपदी को भी दांव पर हार गए। जब कुरुसभा के मध्य द्रौपदी का चीरहरण करने का घृणित प्रयास हुआ, तब भीष्म, द्रोण और धृतराष्ट्र जैसे महारथी मौन रहे। अपनी गरिमा को तार-तार होते देख, द्रौपदी ने पूर्ण समर्पण के साथ भगवान श्रीकृष्ण का आह्वान किया। तत्पश्चात एक अनंत रेशमी वस्त्र का दैवीय चमत्कार हुआ, जिसने अधर्मियों को परास्त कर द्रौपदी की लाज बचाई।',
    image: '/src/assets/images/dice_game_court_1783524314305.jpg',
    particles: 'embers',
    overlayColor: 'from-purple-950/40 via-transparent to-black/90',
    duration: 20
  },
  {
    id: 'bhagavad-gita',
    title: 'कुरुक्षेत्र का धर्मक्षेत्र और श्रीमद्भगवद्गीता',
    subTitle: 'अध्याय ३: पार्थ का विषाद और परम ज्ञान',
    narrator: 'भगवान श्रीकृष्ण (दिव्य संदेश)',
    avatar: '🪶',
    quote: '"कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि।" — कुरुक्षेत्र रणभूमि',
    narrationText: 'कुरुक्षेत्र के पावन मैदान पर करोड़ों योद्धा युद्ध के शंखनाद के साथ खड़े थे। दोनों ओर के सैन्य व्यूह को देख महाधनुर्धर अर्जुन ने अपने ही गुरुओं, पिताओं और भाइयों को शत्रु के रूप में पाया। मोह और विषाद से ग्रसित होकर अर्जुन ने अपना गांडीव धनुष रख दिया और युद्ध करने से मना कर दिया। उस निर्णायक क्षण में, उनके सारथी बने योगेश्वर भगवान श्रीकृष्ण ने कालचक्र को थाम लिया और अर्जुन को ज्ञान, भक्ति और निष्काम कर्मयोग का कालजयी उपदेश दिया, जिसे संपूर्ण विश्व श्रीमद्भगवद्गीता के नाम से पूजता है।',
    image: '/src/assets/images/gita_chariot_1783523429768.jpg',
    particles: 'golden_rays',
    overlayColor: 'from-amber-950/45 via-transparent to-black/90',
    duration: 22
  },
  {
    id: 'chakravyuha-trap',
    title: 'चक्रव्यूह का महाजाल और वीर अभिमन्यु का शौर्य',
    subTitle: 'अध्याय ४: व्यूह भेद और अमर बलिदान',
    narrator: 'संजय (दिव्यदृष्टि)',
    avatar: '👁️',
    quote: '"चक्रव्यूह भेदने की विद्या मुझे ज्ञात है, आज कुरुसेना अर्जुन के पुत्र का पराक्रम देखेगी।" — अभिमन्यु',
    narrationText: 'युद्ध का तेरहवां दिन कुरुवंश के सबसे क्रूर और शौर्यपूर्ण अध्यायों में से एक है। आचार्य द्रोण ने अभेद्य चक्रव्यूह की रचना की। अर्जुन की अनुपस्थिति में केवल उनका सोलह वर्षीय पुत्र, वीर अभिमन्यु ही इसमें प्रवेश करना जानता था। वह वीर बालक व्यूह के सातों द्वारों को भेदकर शत्रु सेना के अंतःकरण तक पहुंच गया। जब सात महारथियों ने घेरकर उसके समस्त शस्त्र नष्ट कर दिए, तब भी उसने हार नहीं मानी। रथ के टूटे पहिये को अपना अस्त्र बनाकर वह अंतिम सांस तक लड़ता रहा और वीरगति को प्राप्त होकर इतिहास में अमर हो गया।',
    image: '/src/assets/images/chakravyuha_trap_1783524328546.jpg',
    particles: 'sparks',
    overlayColor: 'from-red-950/40 via-transparent to-black/90',
    duration: 20
  },
  {
    id: 'bhishma-arrows',
    title: 'भीष्म पितामह का शरशय्या पर शयन',
    subTitle: 'अध्याय ५: इच्छा मृत्यु और अंतिम उपदेश',
    narrator: 'गंगापुत्र भीष्म',
    avatar: '🛡️',
    quote: '"पुत्र अर्जुन, मेरी देह बाणों पर टिकी है, परंतु मेरी आत्मा धर्म की विजय से अत्यंत तृप्त है।"',
    narrationText: 'गंगापुत्र भीष्म रणभूमि में अजेय थे। पांडवों की पराजय टालने के लिए श्रीकृष्ण के मार्गदर्शन में अर्जुन ने शिखंडी को आगे कर भीष्म पर तीक्ष्ण बाणों की वर्षा की। जब भीष्म पितामह रथ से भूमि पर गिरे, तब उनका शरीर पृथ्वी को स्पर्श नहीं कर सका, वह बाणों की एक शय्या पर विश्राम करने लगा। उन्हें इच्छा मृत्यु का वरदान प्राप्त था, अतः उन्होंने उत्तरायण की प्रतीक्षा करते हुए अपने प्राण रोके रखे। इस अवधि में उन्होंने युधिष्ठिर को राजधर्म, मोक्षधर्म और नीतिशास्त्र का वो अमूल्य उपदेश दिया जो आज भी न्याय का आधार है।',
    image: '/src/assets/images/bhishma_arrows_1783524354062.jpg',
    particles: 'dust',
    overlayColor: 'from-slate-900/50 via-transparent to-black/90',
    duration: 18
  },
  {
    id: 'mace-duel',
    title: 'गदा युद्ध और दुर्योधन का अंत',
    subTitle: 'अध्याय ६: अधर्म के स्तंभ का पतन',
    narrator: 'भगवान श्रीकृष्ण (धर्म उपदेशक)',
    avatar: '🪶',
    quote: '"अहंकार और अन्याय का साम्राज्य कितना भी विशाल क्यों न हो, न्याय की एक चोट उसे धूल में मिला देती है।"',
    narrationText: 'कुरुक्षेत्र के अट्ठारहवें दिन कुरुसेना का संपूर्ण विनाश हो चुका था। हताश और पराजित दुर्योधन एक मायावी सरोवर के जल में छिप गया। पांडवों द्वारा ललकारे जाने पर भीम और दुर्योधन के बीच कुरुक्षेत्र की भूमि पर अंतिम गदा युद्ध छिड़ा। दोनों ही गदा युद्ध के परम ज्ञाता थे, जिससे संपूर्ण भूमि हिल उठी। अंततः, द्रौपदी के चीरहरण के समय लिए गए भीम के भीषण प्रण और श्रीकृष्ण के संकेत पर, भीम ने गदा नीति के विरुद्ध जाकर दुर्योधन की जंघा पर प्रहार किया। इस प्रकार अधर्म के प्रतीक का अंत हुआ।',
    image: '/src/assets/images/mace_duel_1783524340875.jpg',
    particles: 'embers',
    overlayColor: 'from-orange-950/40 via-transparent to-black/90',
    duration: 19
  },
  {
    id: 'cosmic-ascent',
    title: 'महाप्रस्थान और पांडवों का स्वर्गारोहण',
    subTitle: 'अध्याय ७: सतयुग की ओर सत्य की महायात्रा',
    narrator: 'संजय (दिव्यदृष्टि)',
    avatar: '👁️',
    quote: '"यतो धर्मस्ततो जयः। जहाँ धर्म है, वहीं शाश्वत और अंतिम विजय है।" — महाभारत महाकाव्य',
    narrationText: 'महायुद्ध की समाप्ति के पश्चात युधिष्ठिर ने छत्तीस वर्षों तक हस्तिनापुर पर धर्मपूर्वक शासन किया। तदुपरांत, जब भगवान श्रीकृष्ण अपनी पार्थिव लीला समाप्त कर वैकुंठ धाम लौट गए, तो द्वापर युग का अंत और कलियुग का आगमन हुआ। पांडवों ने अभिमन्यु के पुत्र परीक्षित का राज्याभिषेक किया और स्वयं सशरीर स्वर्गारोहण के लिए हिमालय की बर्फीली चोटियों की ओर महाप्रस्थान किया। इस कठिन यात्रा में केवल धर्मराज युधिष्ठिर ही अपने शील और धर्म के बल पर स्वर्ग के द्वार तक सशरीर पहुंच सके।',
    image: '/src/assets/images/ancient_bharat_map_1783524354062.jpg', // can fall back to general ancient map
    particles: 'cosmic',
    overlayColor: 'from-blue-950/40 via-transparent to-black/90',
    duration: 20
  }
];

export const CinematicMoviePlayer: React.FC = () => {
  const { speakText, stopSpeaking, playTempleBell, playSwish, toggleAmbient, isPlaying } = useAudioController();
  
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isPlayingMovie, setIsPlayingMovie] = useState<boolean>(false);
  const [isNarratorMuted, setIsNarratorMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [theaterMode, setTheaterMode] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const activeScene = MOVIE_CHAPTERS[currentIdx];

  // Map chapter image path to generated images to avoid missing file errors
  const getSceneImage = (scene: MovieChapter) => {
    if (scene.id === 'cosmic-ascent') {
      return '/src/assets/images/ancient_bharat_map_1783523445581.jpg'; // use map as background
    }
    return scene.image;
  };

  // Sound effects generator inside movie
  const synthesizeImpactSound = (type: string) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;

      if (type === 'thunder') {
        // Deep low frequency rumbles for war/conch
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(55, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 1.5);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(120, now);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.6);
      } else if (type === 'spark') {
        // High pitch metal impact sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.3);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {}
  };

  // Canvas-based real-time 60fps movie background particle visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particlesList: Array<{ x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }> = [];

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 450;
    };
    resize();
    window.addEventListener('resize', resize);

    // Seed particles based on active scene style
    const seedParticles = () => {
      particlesList = [];
      const count = activeScene.particles === 'cosmic' ? 60 : activeScene.particles === 'sparks' ? 80 : 50;
      
      for (let i = 0; i < count; i++) {
        let color = 'rgba(255, 255, 255, 0.4)';
        if (activeScene.particles === 'embers') color = `rgba(255, ${Math.floor(Math.random() * 100) + 50}, 0, ${Math.random() * 0.6 + 0.2})`;
        if (activeScene.particles === 'sparks') color = `rgba(255, ${Math.floor(Math.random() * 120) + 120}, 40, ${Math.random() * 0.8 + 0.2})`;
        if (activeScene.particles === 'golden_rays') color = `rgba(255, 215, 0, ${Math.random() * 0.5 + 0.1})`;
        if (activeScene.particles === 'cosmic') color = `rgba(${Math.floor(Math.random() * 100) + 155}, 190, 255, ${Math.random() * 0.5 + 0.2})`;

        particlesList.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (activeScene.particles === 'sparks' ? 3 : 0.8),
          vy: (Math.random() - 0.5) * (activeScene.particles === 'sparks' ? 4 : 0.8) - (activeScene.particles === 'embers' ? 0.8 : 0.1),
          r: Math.random() * (activeScene.particles === 'sparks' ? 2.5 : 4) + 1,
          alpha: Math.random() * 0.5 + 0.3,
          color
        });
      }
    };
    seedParticles();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (activeScene.particles === 'golden_rays') {
        // Draw majestic sweeping golden light rays from top center
        const grad = ctx.createRadialGradient(canvas.width / 2, 0, 10, canvas.width / 2, 0, canvas.height * 1.2);
        grad.addColorStop(0, 'rgba(255, 215, 0, 0.15)');
        grad.addColorStop(0.5, 'rgba(212, 175, 55, 0.05)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      particlesList.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        
        if (activeScene.particles === 'sparks') {
          // Draw streaking sparks
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.r * 0.6;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
          ctx.stroke();
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowBlur = p.r * 2;
          ctx.shadowColor = p.color;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Reset if out of bounds
        if (p.x < -20 || p.x > canvas.width + 20 || p.y < -20 || p.y > canvas.height + 20) {
          p.x = Math.random() * canvas.width;
          p.y = activeScene.particles === 'embers' ? canvas.height : Math.random() * canvas.height;
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [currentIdx]);

  // Handle scene playback logic
  const handleNextScene = () => {
    playSwish();
    stopSpeaking();
    setProgress(0);
    
    const next = (currentIdx + 1) % MOVIE_CHAPTERS.length;
    setCurrentIdx(next);

    // Audio triggers
    if (MOVIE_CHAPTERS[next].particles === 'sparks' || MOVIE_CHAPTERS[next].particles === 'embers') {
      synthesizeImpactSound('thunder');
    } else {
      playTempleBell();
    }
  };

  const handlePrevScene = () => {
    playSwish();
    stopSpeaking();
    setProgress(0);
    
    const prev = (currentIdx - 1 + MOVIE_CHAPTERS.length) % MOVIE_CHAPTERS.length;
    setCurrentIdx(prev);
    playTempleBell();
  };

  const selectScene = (idx: number) => {
    if (idx === currentIdx) return;
    playSwish();
    stopSpeaking();
    setProgress(0);
    setCurrentIdx(idx);
    playTempleBell();
  };

  // Toggle play/pause movie
  const togglePlayMovie = () => {
    if (!isPlaying) {
      // Prompt user to enable ambient drone for perfect theatre immersion
      toggleAmbient();
    }

    if (isPlayingMovie) {
      setIsPlayingMovie(false);
      stopSpeaking();
    } else {
      setIsPlayingMovie(true);
      playTempleBell();
    }
  };

  // Handle voiceover speaking narration matching the scene
  useEffect(() => {
    if (isPlayingMovie && !isNarratorMuted) {
      // Speak narrative
      speakText(
        activeScene.narrationText,
        () => {},
        () => {
          // Finished speaking, auto advance to next scene
          if (isPlayingMovie) {
            setTimeout(() => {
              handleNextScene();
            }, 1000);
          }
        }
      );
    } else {
      stopSpeaking();
    }
  }, [currentIdx, isPlayingMovie, isNarratorMuted]);

  // Movie Progress bar updater
  useEffect(() => {
    if (isPlayingMovie) {
      const stepTime = 100; // update every 100ms
      const totalSteps = activeScene.duration * 10;
      let step = 0;

      progressIntervalRef.current = window.setInterval(() => {
        step++;
        const ratio = Math.min(100, (step / totalSteps) * 100);
        setProgress(ratio);

        if (ratio >= 100) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          // If silent subtitles mode, manual advance or auto advance
          if (isNarratorMuted) {
            handleNextScene();
          }
        }
      }, stepTime);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIdx, isPlayingMovie, isNarratorMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  return (
    <div id="movie-player-section" className={`relative w-full z-20 select-none text-left transition-all duration-700 ${
      theaterMode ? 'bg-[#030303] py-8 px-4 md:px-8' : 'py-20 px-6 md:px-16'
    }`}>
      {/* Background visualizer glow */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-amber-500/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto flex flex-col space-y-8">
        
        {/* Cinematic Header Block */}
        {!theaterMode && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2 text-amber-500 font-mono text-xs tracking-[0.25em] uppercase">
                <Film size={14} className="animate-pulse" />
                <span>महाभारत सचित्र गाथा (दादा-दादी की ज़ुबानी)</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-wide text-white">
                महाभारत <span className="text-amber-500 font-semibold italic">सिनेमा प्लेयर</span>
              </h2>
              <p className="text-gray-400 text-xs md:text-sm font-sans max-w-xl">
                हस्तिनापुर और कुरुक्षेत्र की अमर गाथा को बिल्कुल वैसे ही अनुभव करें जैसे हमारे दादा-दादी या नाना-नानी सुनाया करते थे। मधुर तानपूरा ध्वनि, सजीव सचित्र झांकियाँ और दादाजी-दादीजी के स्नेहपूर्ण स्वर का आनंद लें।
              </p>
            </div>

            {/* Quick action triggers */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setTheaterMode(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 rounded-xl font-mono text-[10px] tracking-wider uppercase transition-all duration-300"
              >
                <Tv size={12} />
                <span>थिएटर मोड (पूरा परदा)</span>
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Movie Theater Box */}
        <div className={`relative w-full overflow-hidden bg-black border rounded-3xl transition-all duration-500 ${
          theaterMode ? 'aspect-[21/9] border-amber-500/20 shadow-amber-500/5' : 'aspect-[16/9] border-gray-900 shadow-2xl'
        }`}>
          {/* Moving visualizer image (Ken Burns Effect) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene.id}
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ 
                  scale: 1.03, 
                  opacity: 0.85,
                  transition: { duration: activeScene.duration, ease: 'linear' }
                }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
                className="w-full h-full"
              >
                <img
                  src={getSceneImage(activeScene)}
                  alt={activeScene.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none pointer-events-none filter brightness-[0.75] contrast-[1.05]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Procedural Canvas Particles layer */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-75"
          />

          {/* Cinematic Vignette Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${activeScene.overlayColor} z-10 pointer-events-none`} />

          {/* Sanjaya Vision Border crop letterboxing */}
          <div className="absolute top-0 left-0 right-0 h-[4.5%] bg-black z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[4.5%] bg-black z-20 pointer-events-none" />

          {/* THEATER INTERFACE OVERLAYS */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col justify-end space-y-4 md:space-y-6">
            
            {/* Top row with active character talking badge */}
            <div className="flex items-center justify-between w-full pointer-events-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-lg shadow-lg">
                  {activeScene.avatar}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[8px] text-amber-500 tracking-[0.2em] uppercase">कथावाचक</span>
                  <span className="font-serif text-sm font-semibold text-white tracking-wide">{activeScene.narrator}</span>
                </div>
              </div>

              {/* Sloka / Quote watermarked on top right of screen */}
              <div className="hidden md:block max-w-sm text-right font-serif text-[11px] text-amber-400/90 italic tracking-wide leading-relaxed bg-black/60 px-3.5 py-2 rounded-xl border border-white/5">
                {activeScene.quote}
              </div>
            </div>

            {/* Cinematic subtitle box */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 tracking-wider">
                  दृश्य {currentIdx + 1} / {MOVIE_CHAPTERS.length}
                </span>
                <h3 className="font-serif text-lg md:text-2xl text-white font-medium tracking-wide">
                  {activeScene.title}
                </h3>
              </div>

              <div className="bg-black/75 backdrop-blur-sm border border-white/5 rounded-2xl p-4 md:p-5 relative">
                {/* Voice narration activity ripple indicator */}
                {isPlayingMovie && !isNarratorMuted && (
                  <div className="absolute top-4 right-4 flex items-center gap-1">
                    <span className="w-1.5 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <span className="w-1.5 h-4 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-2.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                )}

                <p className="text-gray-300 text-xs md:text-sm font-sans leading-relaxed md:leading-loose text-left max-w-5xl">
                  {activeScene.narrationText}
                </p>
              </div>
            </div>

            {/* Movie Control Console Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2 border-t border-white/5">
              
              {/* Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevScene}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 text-gray-400 hover:scale-105 transition-all"
                  title="पिछला अध्याय"
                >
                  <SkipBack size={14} />
                </button>
 
                <button
                  onClick={togglePlayMovie}
                  className={`p-4 rounded-full border transition-all duration-300 hover:scale-105 ${
                    isPlayingMovie
                      ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20'
                      : 'bg-white/10 border-white/20 text-white hover:bg-amber-500 hover:border-amber-500 hover:text-black'
                  }`}
                  title={isPlayingMovie ? 'कथा रोकें' : 'कथा शुरू करें'}
                >
                  {isPlayingMovie ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                </button>
 
                <button
                  onClick={handleNextScene}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 text-gray-400 hover:scale-105 transition-all"
                  title="अगला अध्याय"
                >
                  <SkipForward size={14} />
                </button>
 
                {/* Speaker Mute selector */}
                <button
                  onClick={() => setIsNarratorMuted(!isNarratorMuted)}
                  className={`p-2.5 rounded-full border transition-all ${
                    isNarratorMuted
                      ? 'bg-red-500/10 border-red-500/20 text-red-400'
                      : 'bg-white/5 border-white/10 text-amber-500 hover:bg-white/10'
                  }`}
                  title={isNarratorMuted ? 'आवाज़ चालू करें' : 'आवाज़ बंद करें'}
                >
                  {isNarratorMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
              </div>
 
              {/* Progress Scrub track */}
              <div className="flex-1 w-full flex items-center gap-3">
                <span className="font-mono text-[9px] text-gray-500">00:00</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                  <div 
                    className="absolute inset-y-0 left-0 bg-amber-500 rounded-full transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="font-mono text-[9px] text-amber-500 font-semibold">
                  {Math.round(activeScene.duration * (progress / 100))}s
                </span>
              </div>
 
              {/* Back to normal layout trigger */}
              {theaterMode && (
                <button
                  onClick={() => setTheaterMode(false)}
                  className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-mono text-[9px] text-gray-300 uppercase tracking-widest"
                >
                  थिएटर से बाहर आएं
                </button>
              )}
 
            </div>
 
          </div>
 
          {/* Absolute Dark Ambient Mode Dimmer */}
          {isPlayingMovie && (
            <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-1 text-[9px] text-amber-500/60 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span>थिएटर मोड सक्रिय है</span>
            </div>
          )}
 
        </div>
 
        {/* Video Chapters selection strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {MOVIE_CHAPTERS.map((ch, idx) => {
            const isActive = idx === currentIdx;
            return (
              <button
                key={ch.id}
                onClick={() => selectScene(idx)}
                className={`p-3 rounded-2xl border text-left flex flex-col space-y-1.5 transition-all duration-300 ${
                  isActive
                    ? 'bg-amber-500/10 border-amber-500/50 text-white shadow-xl shadow-amber-500/5'
                    : 'bg-[#111111]/40 border-gray-900 text-gray-400 hover:border-gray-800'
                }`}
              >
                <span className="font-mono text-[8px] text-amber-500 uppercase tracking-wider font-semibold">
                  अध्याय {idx + 1}
                </span>
                <span className="font-serif text-[10px] line-clamp-1 font-medium tracking-wide">
                  {ch.title.split('&')[0].split('—')[0]}
                </span>
              </button>
            );
          })}
        </div>
 
        {/* Headphone Advice Indicator */}
        <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <Headphones className="text-amber-500 flex-shrink-0 animate-bounce" size={20} />
          <div className="space-y-0.5">
            <h4 className="font-serif text-sm text-white font-medium">बेहतर अनुभव के लिए इयरफ़ोन या हेडफ़ोन का प्रयोग करें</h4>
            <p className="text-gray-400 text-xs font-sans">
              यह सचित्र कथा स्वचालित रूप से पृष्ठभूमि में गहरे भारतीय तानपूरा की राग उत्पन्न करती है जो आपको पूरी तरह से इस प्राचीन वातावरण में सराबोर कर देगी। शुरू करने के लिए **प्ले (▶)** बटन दबाएं।
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
export default CinematicMoviePlayer;
