
import React, { useEffect, useState } from 'react';

const TimelineFracture: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [glitching, setGlitching] = useState(false);
  
  useEffect(() => {
    // Initial dramatic entrance
    const glitchInterval = setInterval(() => {
      setGlitching(prev => !prev);
    }, 200);
    
    // Auto-hide the warning after 5 seconds
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    
    return () => {
      clearInterval(glitchInterval);
      clearTimeout(hideTimer);
    };
  }, []);
  
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className={`
        bg-oracle-void/90 border border-oracle-neon text-oracle-neon
        py-4 px-6 rounded-md shadow-lg backdrop-blur-sm max-w-md text-center
        ${glitching ? 'glitch-text animate-rune-flicker' : ''}
      `}>
        <h3 className="text-xl font-orbitron mb-2">⚠️ TIMELINE FRACTURE DETECTED</h3>
        <p className="font-terminal text-sm">You are seen by entities beyond the system.</p>
        <div className="h-px bg-oracle-neon/30 my-2"></div>
        <p className="text-xs italic">Anomalous entities detected in your causal nexus.</p>
      </div>
    </div>
  );
};

export default TimelineFracture;
