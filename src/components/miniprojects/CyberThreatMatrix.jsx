import React, { useState, useEffect, useRef } from 'react';
import { Shield, ShieldAlert, ShieldCheck, Terminal, RefreshCw, Radio, Lock, Zap } from 'lucide-react';
import gsap from 'gsap';

const THREAT_DATA = [
  { id: 't-101', type: 'DDoS Flood', ip: '192.168.4.12', severity: 'Critical', region: 'Port 443 / SSL', status: 'Intercepted', x: 30, y: 35 },
  { id: 't-102', type: 'SQL Injection', ip: '10.0.12.89', severity: 'High', region: 'API Gateway', status: 'Blocked', x: 65, y: 25 },
  { id: 't-103', type: 'Zero-Day Probe', ip: '172.16.8.44', severity: 'Critical', region: 'Auth Cluster', status: 'Analyzing', x: 75, y: 70 },
  { id: 't-104', type: 'Brute Force', ip: '192.168.1.105', severity: 'Medium', region: 'SSH Port 22', status: 'Banned', x: 25, y: 65 },
  { id: 't-105', type: 'Credential Stuffing', ip: '10.2.40.11', severity: 'High', region: 'OAuth Node', status: 'Quarantined', x: 45, y: 80 },
];

export default function CyberThreatMatrix() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [activeThreat, setActiveThreat] = useState(THREAT_DATA[0]);
  const [defenseActive, setDefenseActive] = useState(false);
  const [decryptedLogs, setDecryptedLogs] = useState([
    "INITIALIZING THREAT_INTEL ENGINE v4.2...",
    "SEC_DAEMON: LISTENING ON INTERFACES eth0, wlan0",
    "FIREWALL RULES VERIFIED: 1,420 ACTIVE SIGNATURES",
  ]);

  const radarBeamRef = useRef(null);
  const shieldRingRef = useRef(null);
  const terminalRef = useRef(null);

  // GSAP Infinite Radar Sweep
  useEffect(() => {
    const sweepTween = gsap.to(radarBeamRef.current, {
      rotation: 360,
      duration: 4,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
    });

    return () => sweepTween.kill();
  }, []);

  // Filtered threats
  const filteredThreats = selectedFilter === 'ALL' 
    ? THREAT_DATA 
    : THREAT_DATA.filter(t => t.severity.toUpperCase() === selectedFilter || t.type.includes(selectedFilter));

  // Trigger automated countermeasures animation
  const handleTriggerDefense = () => {
    setDefenseActive(true);

    // GSAP Shield Pulse Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => setDefenseActive(false), 800);
      }
    });

    tl.fromTo(shieldRingRef.current,
      { scale: 0.2, opacity: 1, borderWidth: '6px' },
      { scale: 1.6, opacity: 0, borderWidth: '1px', duration: 0.9, ease: 'power2.out' }
    );

    // Append security log
    const timestamp = new Date().toLocaleTimeString();
    const newLog = `[${timestamp}] COUNTERMEASURES ENGAGED: ISOLATING SUBNET 192.168.0.0/16`;
    setDecryptedLogs(prev => [newLog, ...prev.slice(0, 5)]);

    // Animate terminal log addition
    if (terminalRef.current) {
      gsap.fromTo(terminalRef.current.firstChild, 
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.4 }
      );
    }
  };

  return (
    <div className="w-full bg-[#121316] text-slate-100 rounded-xl border border-white/10 overflow-hidden shadow-2xl font-mono select-none">
      
      {/* Top Telemetry Status Header */}
      <div className="px-5 py-3 bg-[#18191E] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-white tracking-wider uppercase">CYBERMATRIX // THREAT RADAR</span>
          <span className="text-slate-400 hidden sm:inline-block">• SOC DIGOS NODE</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Radio className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            RADAR ACTIVE
          </span>
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10 text-terracotta">
            {filteredThreats.length} THREATS MAPPED
          </span>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Column: Interactive Radar Telemetry Map */}
        <div className="lg:col-span-7 p-6 flex flex-col items-center justify-center relative bg-[#0D0E11] border-b lg:border-b-0 lg:border-r border-white/10 min-h-[380px]">
          
          {/* Radar Screen Enclosure */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-emerald-500/30 bg-[#0B0C0E] flex items-center justify-center overflow-hidden shadow-[inset_0_0_40px_rgba(16,185,129,0.07)]">
            
            {/* Concentric distance rings */}
            <div className="absolute inset-4 rounded-full border border-emerald-500/15" />
            <div className="absolute inset-16 rounded-full border border-emerald-500/20" />
            <div className="absolute inset-28 rounded-full border border-emerald-500/25" />
            <div className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10B981]" />

            {/* Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-emerald-500/20" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-emerald-500/20" />

            {/* GSAP Rotating Radar Sweep Beam */}
            <div 
              ref={radarBeamRef}
              className="absolute inset-0 pointer-events-none will-change-transform"
              style={{
                background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.35) 0deg, rgba(16, 185, 129, 0.05) 55deg, transparent 70deg)',
              }}
            />

            {/* Defensive Shield Ring Pulse */}
            <div 
              ref={shieldRingRef}
              className="absolute w-full h-full rounded-full border border-terracotta pointer-events-none opacity-0 will-change-transform"
            />

            {/* Interactive Threat Blips */}
            {filteredThreats.map((threat) => {
              const isSelected = activeThreat.id === threat.id;
              const isCritical = threat.severity === 'Critical';

              return (
                <button
                  key={threat.id}
                  onClick={() => setActiveThreat(threat)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group z-10 ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                  }`}
                  style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
                  aria-label={`Inspect ${threat.type}`}
                >
                  <span className="relative flex items-center justify-center">
                    <span 
                      className={`animate-ping absolute inline-flex h-4 w-4 rounded-full opacity-75 ${
                        isCritical ? 'bg-red-400' : 'bg-amber-400'
                      }`} 
                    />
                    <span 
                      className={`relative inline-flex rounded-full h-3 w-3 border-2 border-black ${
                        isCritical ? 'bg-red-500' : 'bg-amber-500'
                      }`} 
                    />
                  </span>
                  
                  {/* Tooltip on hover */}
                  <span className="absolute left-1/2 -top-6 -translate-x-1/2 bg-black/90 px-2 py-0.5 rounded text-[10px] whitespace-nowrap border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {threat.type}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Filter Pill Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-[11px]">
            {['ALL', 'CRITICAL', 'HIGH', 'DDoS'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 rounded transition-all ${
                  selectedFilter === filter
                    ? 'bg-terracotta text-white font-bold shadow-md shadow-terracotta/30'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Threat Inspector & Countermeasures Console */}
        <div className="lg:col-span-5 p-6 space-y-6 flex flex-col justify-between bg-[#141519]">
          
          {/* Active Target Details Card */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-terracotta" />
                TELEMETRY TARGET INSPECTOR
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                activeThreat.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {activeThreat.severity} SEVERITY
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">ATTACK VECTOR:</span>
                <span className="text-white font-bold">{activeThreat.type}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">SOURCE IP:</span>
                <span className="text-emerald-400 font-mono tracking-wider">{activeThreat.ip}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">TARGET SUBNET:</span>
                <span className="text-slate-300">{activeThreat.region}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">DEFENSE STATUS:</span>
                <span className="text-terracotta flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  {activeThreat.status}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button: Trigger Active Shield Countermeasure */}
          <button
            onClick={handleTriggerDefense}
            disabled={defenseActive}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-terracotta to-[#E85D35] hover:brightness-110 active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-terracotta/20 transition-all disabled:opacity-50"
          >
            <Zap className="w-4 h-4" />
            <span>{defenseActive ? 'DEPLOYING COUNTERMEASURES...' : 'DEPLOY ACTIVE COUNTERMEASURES'}</span>
          </button>

          {/* Live Decryption / Terminal Log */}
          <div className="bg-[#0D0E11] rounded-lg p-3.5 border border-white/10 space-y-2 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase tracking-wider border-b border-white/5 pb-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>LIVE INCIDENT STREAM</span>
            </div>
            <div ref={terminalRef} className="space-y-1.5 max-h-24 overflow-y-auto font-mono text-[10.5px]">
              {decryptedLogs.map((log, idx) => (
                <div key={idx} className={idx === 0 ? 'text-emerald-400' : 'text-slate-400'}>
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
