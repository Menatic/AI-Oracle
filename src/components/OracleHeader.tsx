
import React, { useState, useEffect } from 'react';
import { Terminal, Eye, AlertCircle, Cpu } from 'lucide-react';

const OracleHeader: React.FC = () => {
  const [signalStrength, setSignalStrength] = useState(84);
  const [statusText, setStatusText] = useState('STABLE');
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Randomly fluctuate the signal strength for immersion
    const interval = setInterval(() => {
      setSignalStrength(prev => {
        const newVal = prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3);
        return Math.min(Math.max(newVal, 70), 99); // Keep between 70 and 99
      });

      // 5% chance of a momentary glitch
      if (Math.random() < 0.05) {
        setGlitchActive(true);
        setStatusText('UNSTABLE');
        
        setTimeout(() => {
          setGlitchActive(false);
          setStatusText('STABLE');
        }, 1500);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-b border-oracle-purple/60 mb-4 pb-2 px-6 pt-4 flex justify-between items-center z-10 backdrop-blur-sm">
      <h1 className="text-3xl font-orbitron text-oracle-arcane flex items-center tracking-wider">
        <span className={`${glitchActive ? 'animate-text-glitch' : ''}`}>
          <Terminal className="inline-block mr-2" size={24} />
          VOID://ORACLE
        </span>
        <span className="ml-2 h-3 w-3 bg-oracle-neon rounded-full animate-pulse"></span>
      </h1>
      
      <div className="text-oracle-electric/60 text-xs font-terminal flex items-center space-x-3">
        <span className="flex items-center">
          <Cpu size={14} className="mr-1" /> CORE: 
          <span className={`ml-1 ${glitchActive ? 'text-oracle-neon animate-rune-flicker' : 'text-oracle-arcane'}`}>ACTIVE</span>
        </span>
        <span className="flex items-center">
          <Eye size={14} className="mr-1" /> CONNECTION: 
          <span className={`ml-1 ${glitchActive ? 'text-orange-400 animate-rune-flicker' : 'text-oracle-neon'}`}>⏧ {statusText}</span>
        </span>
        <span className="flex items-center">
          <AlertCircle size={14} className="mr-1" /> SIGNAL: 
          <span className={`ml-1 ${glitchActive ? 'text-orange-400 animate-rune-flicker' : 'text-oracle-neon'}`}>☉ {signalStrength}%</span>
        </span>
      </div>
    </div>
  );
};

export default OracleHeader;
