import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Square, Volume2, Disc, Sliders, Activity, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const SOUND_PRESETS = [
  { id: 'chord-1', label: 'E5 Power Chord', freq: 164.81, type: 'sawtooth', color: '#D97746', icon: '🎸' },
  { id: 'chord-2', label: 'A Minor Riff', freq: 220.00, type: 'sawtooth', color: '#E85D35', icon: '⚡' },
  { id: 'chord-3', label: 'C Major Arp', freq: 261.63, type: 'triangle', color: '#F59E0B', icon: '✨' },
  { id: 'synth-1', label: 'Cyberpunk Lead', freq: 440.00, type: 'square', color: '#10B981', icon: '🎹' },
  { id: 'bass-1', label: 'Analog Sub Bass', freq: 82.41, type: 'sine', color: '#38BDF8', icon: '🔊' },
  { id: 'lofi-1', label: 'Lo-Fi Ambient Pad', freq: 329.63, type: 'sine', color: '#A855F7', icon: '🌙' },
];

export default function KineticAudioStudio() {
  const [activePad, setActivePad] = useState(null);
  const [bpm, setBpm] = useState(120);
  const [isPlayingSeq, setIsPlayingSeq] = useState(false);
  const [reverbActive, setReverbActive] = useState(true);
  const [overdriveActive, setOverdriveActive] = useState(false);

  const audioCtxRef = useRef(null);
  const seqTimerRef = useRef(null);
  const seqStepRef = useRef(0);
  const waveSvgRef = useRef(null);
  const bpmPulseRef = useRef(null);

  // Initialize Web Audio Context safely
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Trigger a synthesized guitar/synth tone
  const playTone = (preset) => {
    setActivePad(preset.id);
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = overdriveActive ? 'sawtooth' : preset.type;
      osc.frequency.setValueAtTime(preset.freq, ctx.currentTime);

      // Attack and Release Envelope
      const attackTime = 0.03;
      const releaseTime = reverbActive ? 0.65 : 0.35;
      
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + attackTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + releaseTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + releaseTime);

      // Trigger GSAP Reactive Waveform Surge
      triggerWaveAnimation(preset.color);
    } catch (e) {
      // Audio fallback
    }

    // Reset active pad state after tone finishes
    setTimeout(() => {
      setActivePad(prev => (prev === preset.id ? null : prev));
    }, 300);
  };

  // GSAP Waveform Animation Surge
  const triggerWaveAnimation = (color = '#D97746') => {
    if (!waveSvgRef.current) return;

    const paths = waveSvgRef.current.querySelectorAll('.wave-bar');
    gsap.fromTo(paths, 
      {
        scaleY: () => 0.3 + Math.random() * 0.4,
        fill: color,
      },
      {
        scaleY: () => 0.8 + Math.random() * 1.6,
        duration: 0.25,
        stagger: {
          each: 0.015,
          from: 'center',
          yoyo: true,
          repeat: 1,
        },
        ease: 'power2.out',
      }
    );
  };

  // BPM Pulse Visualizer Animation
  useEffect(() => {
    const intervalMs = (60 / bpm) * 1000;
    const pulseInterval = setInterval(() => {
      if (bpmPulseRef.current) {
        gsap.fromTo(bpmPulseRef.current,
          { scale: 1.05, opacity: 1 },
          { scale: 1, opacity: 0.7, duration: (60 / bpm) * 0.4, ease: 'power2.out' }
        );
      }
    }, intervalMs);

    return () => clearInterval(pulseInterval);
  }, [bpm]);

  // Automated 8-Step Arpeggio Sequencer Loop
  useEffect(() => {
    if (!isPlayingSeq) {
      if (seqTimerRef.current) clearInterval(seqTimerRef.current);
      return;
    }

    const intervalMs = (60 / bpm) * 500; // Eighth notes
    seqTimerRef.current = setInterval(() => {
      const preset = SOUND_PRESETS[seqStepRef.current % SOUND_PRESETS.length];
      playTone(preset);
      seqStepRef.current = (seqStepRef.current + 1) % SOUND_PRESETS.length;
    }, intervalMs);

    return () => {
      if (seqTimerRef.current) clearInterval(seqTimerRef.current);
    };
  }, [isPlayingSeq, bpm, reverbActive, overdriveActive]);

  return (
    <div className="w-full bg-[#121316] text-slate-100 rounded-xl border border-white/10 overflow-hidden shadow-2xl font-mono select-none">
      
      {/* Top Console Header */}
      <div className="px-5 py-3 bg-[#18191E] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-terracotta" />
          <span className="font-bold text-white tracking-wider uppercase">RIFFWAVE // KINETIC AUDIO STUDIO</span>
        </div>

        {/* BPM & Sequencer HUD */}
        <div className="flex items-center gap-4 text-xs">
          <div ref={bpmPulseRef} className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded border border-white/10 will-change-transform">
            <span className="w-2 h-2 rounded-full bg-terracotta animate-ping"></span>
            <span className="text-slate-400">TEMPO:</span>
            <span className="text-amber-400 font-bold font-mono tracking-wider">{bpm} BPM</span>
          </div>

          <button
            onClick={() => setIsPlayingSeq(!isPlayingSeq)}
            className={`px-3 py-1 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
              isPlayingSeq 
                ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
          >
            {isPlayingSeq ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isPlayingSeq ? 'STOP ARP' : 'AUTO ARP'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Console Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Column: Interactive Frequency Waveform Visualizer */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between relative bg-[#0B0C0E] border-b lg:border-b-0 lg:border-r border-white/10 min-h-[360px]">
          
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/5">
            <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Activity className="w-3.5 h-3.5 text-terracotta" />
              ACOUSTIC WAVEFORM MONITOR
            </span>
            <span className="text-emerald-400 text-[10px] font-bold">WEB AUDIO SYNTH ENGINE</span>
          </div>

          {/* GSAP Morphing Reactive Waveform Graphic */}
          <div className="my-auto py-8 flex items-center justify-center">
            <svg 
              ref={waveSvgRef} 
              viewBox="0 0 320 80" 
              className="w-full max-w-md h-24 overflow-visible"
            >
              {Array.from({ length: 32 }).map((_, i) => {
                const xPos = i * 10;
                return (
                  <rect
                    key={i}
                    className="wave-bar transition-colors duration-200 will-change-transform"
                    x={xPos + 2}
                    y={20}
                    width={5}
                    height={40}
                    rx={2}
                    fill="rgba(217, 119, 70, 0.45)"
                    style={{ transformOrigin: 'center center' }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Audio FX Switches */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 uppercase">ACTIVE FX:</span>
              <button
                onClick={() => setReverbActive(!reverbActive)}
                className={`px-2.5 py-1 rounded transition-colors border ${
                  reverbActive 
                    ? 'bg-terracotta/20 border-terracotta/40 text-terracotta font-bold'
                    : 'bg-white/5 border-white/10 text-slate-500'
                }`}
              >
                SPATIAL REVERB
              </button>
              <button
                onClick={() => setOverdriveActive(!overdriveActive)}
                className={`px-2.5 py-1 rounded transition-colors border ${
                  overdriveActive 
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 font-bold'
                    : 'bg-white/5 border-white/10 text-slate-500'
                }`}
              >
                TUBE OVERDRIVE
              </button>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <span>BPM:</span>
              <input 
                type="range" 
                min="70" 
                max="160" 
                value={bpm} 
                onChange={(e) => setBpm(parseInt(e.target.value))}
                className="w-24 accent-terracotta cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Guitar & Synth Sound Pads */}
        <div className="lg:col-span-5 p-6 space-y-4 bg-[#141519] flex flex-col justify-between">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs text-slate-400">
              <span className="uppercase tracking-wider font-bold">TACTILE SOUND PADS</span>
              <span className="text-[10px] text-terracotta font-semibold">TAP TO TRIGGER TONES</span>
            </div>

            {/* 6 Playable Sound Pads Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {SOUND_PRESETS.map((preset) => {
                const isActive = activePad === preset.id;

                return (
                  <button
                    key={preset.id}
                    onClick={() => playTone(preset)}
                    className={`relative p-3.5 rounded-xl border text-left transition-all duration-150 active:scale-95 flex flex-col justify-between h-24 ${
                      isActive
                        ? 'border-white bg-white/15 shadow-lg shadow-terracotta/30 scale-[0.98]'
                        : 'border-white/10 bg-[#0E0F12] hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className="text-xl">{preset.icon}</span>
                      <span className="text-[10px] text-slate-500 uppercase">{preset.type}</span>
                    </div>

                    <div>
                      <div className="font-bold text-xs text-white tracking-tight">
                        {preset.label}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {preset.freq.toFixed(1)} Hz
                      </div>
                    </div>

                    {/* Active LED indicator */}
                    <div 
                      className={`absolute bottom-2 right-2 w-2 h-2 rounded-full transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-20'
                      }`}
                      style={{ backgroundColor: preset.color, boxShadow: isActive ? `0 0 8px ${preset.color}` : 'none' }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-black/40 rounded border border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
            <span>BROWSER SYNTHESIS:</span>
            <span className="text-emerald-400 font-bold">ZERO LATENCY / 60FPS</span>
          </div>

        </div>

      </div>

    </div>
  );
}
