
import React, { useState, useEffect } from 'react';
import { applyGlitchEffect } from '../utils/glitchEffects';

interface OracleMessageProps {
  message: {
    id: string;
    content: string;
    isUser: boolean;
    type: 'text' | 'cards' | 'warning';
    cards?: any[];
  };
  mirrorMode?: boolean;
  seventhGateActive?: boolean;
}

const OracleMessage: React.FC<OracleMessageProps> = ({ 
  message,
  mirrorMode = false,
  seventhGateActive = false
}) => {
  const [revealed, setRevealed] = useState(false);
  const [glitched, setGlitched] = useState(false);
  const [typewriterEffect, setTypewriterEffect] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 300);

    // Increased glitch chance for seventh gate
    const glitchChance = seventhGateActive ? 0.4 : 0.2;
    
    // Occasionally apply a glitch effect
    if (Math.random() < glitchChance && !message.isUser) {
      setGlitched(true);
      setTimeout(() => setGlitched(false), 800);
    }

    // Disable typewriter after content is shown
    const typewriterTimer = setTimeout(() => {
      setTypewriterEffect(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(typewriterTimer);
    };
  }, [message.isUser, seventhGateActive]);

  // Handle user messages
  if (message.isUser) {
    return (
      <div className={`text-right mb-6 ${mirrorMode ? 'text-left' : 'text-right'}`}>
        <div className={`
          inline-block 
          ${seventhGateActive ? 'bg-oracle-deepPurple/30 border-oracle-neon/40' : 'bg-oracle-purple/30 border-oracle-purple/40'} 
          py-2 px-4 rounded-lg backdrop-blur-sm border shadow-inner 
          ${seventhGateActive ? 'shadow-oracle-neon/20' : 'shadow-oracle-arcane/20'}
        `}>
          <p className={`
            font-terminal 
            ${seventhGateActive ? 'text-oracle-neon' : 'text-oracle-electric'}
          `}>
            &gt; {message.content}
          </p>
        </div>
      </div>
    );
  }

  // Handle warning messages
  if (message.type === 'warning') {
    return (
      <div className={`
        text-oracle-neon 
        ${seventhGateActive ? 'bg-oracle-deepPurple/70' : 'bg-oracle-void/70'} 
        border border-oracle-neon/50 p-3 my-3 
        ${glitched ? 'glitch-text' : ''} 
        shadow-lg backdrop-blur-sm animate-rune-flicker
      `}>
        {message.content}
      </div>
    );
  }

  // Handle oracle response messages
  return (
    <div className={`
      mb-6 max-w-[85%] oracle-message 
      ${revealed ? 'opacity-100' : 'opacity-0'} 
      transition-opacity duration-500
      ${typewriterEffect ? 'typewriter' : ''}
    `}>
      <div className="absolute top-0 left-0 w-full h-full bg-oracle-void/20 animate-screen-flicker opacity-20"></div>
      <p className={`
        ${seventhGateActive ? 'font-cinzel' : 'font-ritual'} 
        tracking-wide 
        ${seventhGateActive ? 'text-oracle-neon' : 'text-oracle-rune'} 
        relative z-10
      `}>
        {glitched ? applyGlitchEffect(message.content, seventhGateActive ? 0.7 : 0.5) : message.content}
      </p>
    </div>
  );
};

export default OracleMessage;
