import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Play, RotateCcw, Sparkles, Orbit, Sliders, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';

const GRAVITY_PRESETS = [
  { label: 'Earth (1G)', value: 0.55 },
  { label: 'Moon (0.16G)', value: 0.15 },
  { label: 'Zero-G (0G)', value: 0.0 },
  { label: 'Invert (-1G)', value: -0.45 },
];

export default function RetroPhysicsLab() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [gravityIndex, setGravityIndex] = useState(0);
  const [bounciness, setBounciness] = useState(0.75);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtScanlines, setCrtScanlines] = useState(true);

  // Physics simulation state stored in refs for 60FPS fluid execution
  const ballsRef = useRef([
    { x: 100, y: 80, vx: 4, vy: 2, radius: 18, color: '#D97746' },
    { x: 220, y: 120, vx: -3, vy: 1, radius: 22, color: '#F59E0B' },
    { x: 340, y: 60, vx: 2, vy: -2, radius: 15, color: '#10B981' },
  ]);

  const targetRingRef = useRef({ x: 240, y: 220, radius: 34, hitTimer: 0 });
  const draggedBallIndex = useRef(null);
  const mousePos = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });

  // Web Audio Synth for retro sound effects
  const playRetroBeep = (freq = 440, type = 'sine') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      // AudioContext policy fallback
    }
  };

  // Main 60FPS Physics Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const g = GRAVITY_PRESETS[gravityIndex].value;

      ctx.clearRect(0, 0, width, height);

      // Draw tactile background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Golden Energy Goal / Target Hole
      const target = targetRingRef.current;
      target.hitTimer = Math.max(0, target.hitTimer - 1);
      const isTargetLit = target.hitTimer > 0;

      ctx.beginPath();
      ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
      ctx.strokeStyle = isTargetLit ? '#F59E0B' : 'rgba(217, 119, 70, 0.4)';
      ctx.lineWidth = isTargetLit ? 4 : 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(target.x, target.y, target.radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = isTargetLit ? 'rgba(245, 158, 11, 0.3)' : 'rgba(217, 119, 70, 0.1)';
      ctx.fill();

      // Update and Draw Physics Orbs
      ballsRef.current.forEach((ball, idx) => {
        // If not dragged, apply velocity and gravity
        if (draggedBallIndex.current !== idx) {
          ball.vy += g;
          ball.x += ball.vx;
          ball.y += ball.vy;

          // Wall Collisions: Left & Right
          if (ball.x - ball.radius < 0) {
            ball.x = ball.radius;
            ball.vx = -ball.vx * bounciness;
            playRetroBeep(320);
          } else if (ball.x + ball.radius > width) {
            ball.x = width - ball.radius;
            ball.vx = -ball.vx * bounciness;
            playRetroBeep(320);
          }

          // Wall Collisions: Floor & Ceiling
          if (ball.y - ball.radius < 0) {
            ball.y = ball.radius;
            ball.vy = -ball.vy * bounciness;
            playRetroBeep(280);
          } else if (ball.y + ball.radius > height) {
            ball.y = height - ball.radius;
            ball.vy = -ball.vy * bounciness;
            ball.vx *= 0.98; // Ground friction
            if (Math.abs(ball.vy) > 1) playRetroBeep(260);
          }

          // Goal Collision Detection
          const distToTarget = Math.hypot(ball.x - target.x, ball.y - target.y);
          if (distToTarget < target.radius) {
            target.hitTimer = 18;
            ball.vx *= -1.2;
            ball.vy *= -1.2;
            setScore(prev => prev + 100 * combo);
            setCombo(prev => Math.min(8, prev + 1));
            playRetroBeep(680, 'square');
          }
        } else {
          // If dragged, follow mouse with velocity inertia tracking
          ball.vx = (mousePos.current.x - mousePos.current.prevX) * 0.8;
          ball.vy = (mousePos.current.y - mousePos.current.prevY) * 0.8;
          ball.x = mousePos.current.x;
          ball.y = mousePos.current.y;
        }

        // Render Ball Glow & Core
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.shadowColor = ball.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Ball specular highlight
        ctx.beginPath();
        ctx.arc(ball.x - ball.radius * 0.3, ball.y - ball.radius * 0.3, ball.radius * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gravityIndex, bounciness, combo, soundEnabled]);

  // Mouse & Touch Dragging Handlers
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const clickY = (e.clientY - rect.top) * (canvas.height / rect.height);

    mousePos.current = { x: clickX, y: clickY, prevX: clickX, prevY: clickY };

    // Check if clicked inside any ball
    ballsRef.current.forEach((ball, idx) => {
      const dist = Math.hypot(clickX - ball.x, clickY - ball.y);
      if (dist < ball.radius * 1.3) {
        draggedBallIndex.current = idx;
        playRetroBeep(520);
      }
    });
  };

  const handleMouseMove = (e) => {
    if (draggedBallIndex.current === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const moveX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const moveY = (e.clientY - rect.top) * (canvas.height / rect.height);

    mousePos.current.prevX = mousePos.current.x;
    mousePos.current.prevY = mousePos.current.y;
    mousePos.current.x = moveX;
    mousePos.current.y = moveY;
  };

  const handleMouseUp = () => {
    if (draggedBallIndex.current !== null) {
      draggedBallIndex.current = null;
    }
  };

  const handleSpawnBall = () => {
    const colors = ['#D97746', '#F59E0B', '#10B981', '#38BDF8', '#EC4899'];
    const newBall = {
      x: 100 + Math.random() * 200,
      y: 60,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -3,
      radius: 14 + Math.random() * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    ballsRef.current.push(newBall);
    playRetroBeep(720);
  };

  const handleReset = () => {
    ballsRef.current = [
      { x: 100, y: 80, vx: 4, vy: 2, radius: 18, color: '#D97746' },
      { x: 220, y: 120, vx: -3, vy: 1, radius: 22, color: '#F59E0B' },
      { x: 340, y: 60, vx: 2, vy: -2, radius: 15, color: '#10B981' },
    ];
    setScore(0);
    setCombo(1);
    playRetroBeep(220);
  };

  return (
    <div ref={containerRef} className="w-full bg-[#121316] text-slate-100 rounded-xl border border-white/10 overflow-hidden shadow-2xl font-mono select-none">
      
      {/* Top Console Header */}
      <div className="px-5 py-3 bg-[#18191E] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-4 h-4 text-terracotta" />
          <span className="font-bold text-white tracking-wider uppercase">PIXELFORGE // 2D PHYSICS LAB</span>
        </div>

        {/* Score & Combo HUD */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded border border-white/10">
            <span className="text-slate-400">SCORE:</span>
            <span className="text-amber-400 font-bold font-mono tracking-widest">{score.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-1 bg-terracotta/20 px-2 py-1 rounded border border-terracotta/30 text-terracotta font-bold text-[11px]">
            <span>x{combo} COMBO</span>
          </div>
        </div>
      </div>

      {/* Physics Canvas & Interactive Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left: The Physics Simulation Arena */}
        <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col items-center justify-center relative bg-[#0B0C0E] border-b lg:border-b-0 lg:border-r border-white/10">
          
          <div className="relative w-full aspect-[16/10] max-w-xl rounded-xl overflow-hidden border border-white/10 shadow-inner">
            <canvas
              ref={canvasRef}
              width={480}
              height={300}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full h-full bg-[#0E0F12] cursor-grab active:cursor-grabbing block"
            />

            {/* Optional Retro CRT Scanline Shader Overlay */}
            {crtScanlines && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
                  backgroundSize: '100% 4px',
                }}
              />
            )}

            {/* In-Canvas Tactile Instructions */}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-2.5 py-1 rounded text-[10px] text-slate-400 border border-white/10 pointer-events-none">
              DRAG & FLING ORBS INTO THE RING
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between w-full max-w-xl mt-4 gap-2 text-xs">
            <div className="flex gap-2">
              <button
                onClick={handleSpawnBall}
                className="px-3 py-1.5 rounded bg-terracotta hover:bg-terracotta-hover text-white font-bold transition-all flex items-center gap-1.5 shadow-md shadow-terracotta/20 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>+ SPAWN ORB</span>
              </button>

              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all flex items-center gap-1 text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10 transition-colors"
                aria-label="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setCrtScanlines(!crtScanlines)}
                className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors ${
                  crtScanlines ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                CRT SCANLINES
              </button>
            </div>
          </div>
        </div>

        {/* Right: Physics Parameters Tuning Box */}
        <div className="lg:col-span-4 p-6 space-y-6 bg-[#141519] flex flex-col justify-between text-xs">
          
          <div className="space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-slate-400 uppercase tracking-widest font-bold">
              <Sliders className="w-4 h-4 text-terracotta" />
              <span>PHYSICS ENVIRONMENT</span>
            </div>

            {/* Gravity Mode Selector */}
            <div className="space-y-2">
              <span className="text-slate-400 block text-[11px] uppercase">GRAVITY SIMULATION:</span>
              <div className="grid grid-cols-2 gap-2">
                {GRAVITY_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.label}
                    onClick={() => setGravityIndex(idx)}
                    className={`py-2 px-2.5 rounded text-[11px] font-bold transition-all text-center ${
                      gravityIndex === idx
                        ? 'bg-terracotta text-white shadow-md shadow-terracotta/30'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bounciness / Restitution Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400 uppercase">SURFACE ELASTICITY:</span>
                <span className="text-amber-400 font-bold">{Math.round(bounciness * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="0.95"
                step="0.05"
                value={bounciness}
                onChange={(e) => setBounciness(parseFloat(e.target.value))}
                className="w-full accent-terracotta cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>DAMPENED</span>
                <span>HYPER-BOUNCE</span>
              </div>
            </div>
          </div>

          {/* Real-time Telemetry Stats */}
          <div className="p-3 bg-black/40 rounded border border-white/5 space-y-1.5 text-[11px]">
            <div className="flex justify-between text-slate-400">
              <span>ACTIVE PARTICLES:</span>
              <span className="text-white font-bold">{ballsRef.current.length}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>SOLVER REFRESH:</span>
              <span className="text-emerald-400 font-bold">60 FPS LOCKED</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
