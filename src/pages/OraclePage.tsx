
import React from 'react';
import Oracle from '../components/Oracle';
import { generateAmbientElements } from '../utils/glitchEffects';

const OraclePage = () => {
  const ambientElements = generateAmbientElements(40);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-oracle-purple/5 to-oracle-dark/90 p-4 relative overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 bg-starfield opacity-10"></div>
      <div className="absolute inset-0 overflow-hidden">
        {ambientElements.map((el, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-oracle-arcane/5 animate-float"
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
      
      {/* Oracle component */}
      <div className="transition-all duration-1000 transform translate-y-0 opacity-100">
        <Oracle />
      </div>
    </div>
  );
};

export default OraclePage;
