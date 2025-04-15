
import React, { useEffect, useState } from 'react';

interface AmbientElement {
  size: number;
  x: number;
  y: number;
  animationDelay: number;
  animationDuration: number;
}

interface OracleBackgroundProps {
  ambientElements: AmbientElement[];
  fracturedTimeline?: boolean;
  seventhGateActive?: boolean;
}

const OracleBackground: React.FC<OracleBackgroundProps> = ({ 
  ambientElements,
  fracturedTimeline = false,
  seventhGateActive = false 
}) => {
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  
  // Increase glitch effects when timeline is fractured
  useEffect(() => {
    if (fracturedTimeline) {
      setGlitchIntensity(0.7);
      const timer = setTimeout(() => {
        setGlitchIntensity(0.3);
      }, 4000);
      
      return () => clearTimeout(timer);
    } else {
      setGlitchIntensity(seventhGateActive ? 0.4 : 0.1);
    }
  }, [fracturedTimeline, seventhGateActive]);
  
  return (
    <>
      {/* Oracle background effects */}
      <div className="absolute inset-0 bg-starfield opacity-20 animate-constellation-pulse"></div>
      <div className="absolute inset-0 bg-glitch-texture"></div>
      
      {/* Scan lines overlay */}
      <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none"></div>
      
      {/* Seventh Gate specific effects */}
      {seventhGateActive && (
        <div className="absolute inset-0 bg-seventh-gate-texture opacity-30 animate-slow-pulse pointer-events-none"></div>
      )}
      
      {/* Glitch layer with variable intensity */}
      <div 
        className="absolute inset-0 bg-glitch-overlay pointer-events-none" 
        style={{ 
          opacity: glitchIntensity,
          mixBlendMode: 'overlay'
        }}
      ></div>
      
      {/* Special symbols that float in the background when seventh gate is active */}
      {seventhGateActive && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {["⍙", "⚿", "✶", "☍"].map((symbol, i) => (
            <div 
              key={`gate-symbol-${i}`}
              className="absolute text-oracle-neon/10 text-4xl animate-float-slow pointer-events-none"
              style={{
                left: `${10 + (i * 20)}%`,
                top: `${15 + (i * 15)}%`,
                animationDelay: `${i * 1.5}s`,
              }}
            >
              {symbol}
            </div>
          ))}
        </div>
      )}
      
      {/* Dynamic ambient elements */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {ambientElements.map((el, i) => (
          <div 
            key={i}
            className={`absolute rounded-full bg-oracle-arcane/5 animate-float pointer-events-none
                      ${seventhGateActive ? 'bg-oracle-neon/5' : 'bg-oracle-arcane/5'}
                      ${fracturedTimeline ? 'animate-glitch-float' : 'animate-float'}`}
            style={{
              width: `${el.size}px`,
              height: `${el.size}px`,
              left: `${el.x}%`,
              top: `${el.y}%`,
              animationDelay: `${el.animationDelay}s`,
              animationDuration: `${el.animationDuration}s`
            }}
          ></div>
        ))}
      </div>
    </>
  );
};

export default OracleBackground;
