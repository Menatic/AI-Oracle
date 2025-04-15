
import React, { useState, useEffect } from 'react';
import { DivinationSymbol } from '../utils/oracleData';
import { applyGlitchEffect } from '../utils/glitchEffects';

interface DivinationCardProps {
  card: DivinationSymbol & { isReversed: boolean };
  position?: string;
  isRevealing?: boolean;
  seventhGateActive?: boolean;
}

const DivinationCard: React.FC<DivinationCardProps> = ({ 
  card, 
  position,
  isRevealing = false,
  seventhGateActive = false
}) => {
  const [revealed, setRevealed] = useState(false);
  const [glitched, setGlitched] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const [symbolFocus, setSymbolFocus] = useState(false);
  
  // Special symbols that trigger special effects
  const specialSymbols = {
    "⍙": "seventh-gate",  // The Seventh Gate
    "⚿": "mirror-key",    // The Mirror Key
    "✶": "starforged",    // Starforged Bond 
    "☍": "opposition"     // Opposition Aspect
  };
  
  const isSpecialSymbol = Object.keys(specialSymbols).includes(card.symbol);
  
  useEffect(() => {
    if (isRevealing) {
      // Random delay for more organic feeling reveal
      const timer = setTimeout(() => {
        setRevealed(true);
        
        // Start pulsing after reveal
        setTimeout(() => {
          setPulsing(true);
        }, 500);
        
        // Special effect for special symbols
        if (isSpecialSymbol) {
          setTimeout(() => {
            setSymbolFocus(true);
            setTimeout(() => setSymbolFocus(false), 1500);
          }, 1200);
        }
      }, 800 + Math.random() * 400);
      
      // Increased glitch chance for seventh gate
      const glitchChance = seventhGateActive ? 0.7 : 0.4;
      
      // Occasionally apply a glitch effect
      if (Math.random() < glitchChance) {
        setGlitched(true);
        setTimeout(() => setGlitched(false), 800);
      }
      
      // Occasionally trigger symbol rotation
      if (Math.random() < 0.6) {
        setRotating(true);
        setTimeout(() => setRotating(false), 3000 + Math.random() * 2000);
      }
      
      return () => clearTimeout(timer);
    }
  }, [isRevealing, isSpecialSymbol, seventhGateActive]);

  // Determine symbol class based on special symbol status
  const getSymbolClass = () => {
    if (!isSpecialSymbol) return "";
    
    // @ts-ignore - The symbol is checked in isSpecialSymbol
    const symbolType = specialSymbols[card.symbol];
    
    switch (symbolType) {
      case "seventh-gate":
        return "text-red-500 seventh-gate-symbol";
      case "mirror-key":
        return "text-oracle-neon mirror-key-symbol";
      case "starforged":
        return "text-yellow-400 starforged-symbol";
      case "opposition":
        return "text-purple-500 opposition-symbol";
      default:
        return "";
    }
  };

  return (
    <div 
      className={`
        oracle-card 
        ${revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} 
        transition-all duration-1000 ease-in-out 
        ${pulsing ? 'animate-glow-pulse' : ''}
        ${seventhGateActive ? 'from-oracle-deepPurple/90 to-oracle-void border-oracle-neon/60' : 'from-oracle-deepPurple to-oracle-void border-oracle-purple/60'}
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`
          flex items-center justify-center w-12 h-12 
          ${seventhGateActive ? 'bg-oracle-deepPurple' : 'bg-oracle-void'} 
          rounded-full 
          ${seventhGateActive ? 'border-oracle-neon/50' : 'border-oracle-arcane/50'} 
          border overflow-hidden
          ${symbolFocus ? 'ring-2 ring-offset-2 ring-oracle-neon/70' : ''}
          transition-all duration-500
        `}>
          <span 
            className={`
              text-3xl 
              ${seventhGateActive ? 'text-oracle-neon' : 'text-oracle-arcane'} 
              ${rotating ? 'animate-symbol-rotate' : ''} 
              ${glitched ? 'animate-rune-flicker' : ''}
              ${getSymbolClass()}
              ${symbolFocus ? 'scale-125' : ''}
              transition-transform duration-500
            `}
          >
            {card.symbol}
          </span>
        </div>
        <div>
          <h3 className={`
            font-orbitron tracking-wider 
            ${glitched ? 'glitch-text' : ''} 
            ${card.isReversed 
              ? (seventhGateActive ? 'text-red-400' : 'text-oracle-neon') 
              : (seventhGateActive ? 'text-oracle-neon' : 'text-oracle-rune')}
          `}>
            {position && (
              <span className={`
                ${seventhGateActive ? 'text-oracle-neon' : 'text-oracle-arcane'} 
                mr-2
              `}>
                ⏧ {position} —
              </span>
            )}
            {card.name} {card.isReversed ? '(reversed)' : ''}
          </h3>
          <p className={`
            ${seventhGateActive ? 'text-oracle-neon/90' : 'text-oracle-electric/90'} 
            font-terminal text-sm mt-1
          `}>
            {card.isReversed ? card.reversedMeaning : card.meaning}
          </p>
        </div>
      </div>
      
      {revealed && (
        <div>
          <div className={`
            h-px 
            ${seventhGateActive 
              ? 'bg-gradient-to-r from-transparent via-oracle-neon/50 to-transparent' 
              : 'bg-gradient-to-r from-transparent via-oracle-arcane/50 to-transparent'} 
            my-3 ${pulsing ? 'animate-pulse' : ''}
          `}></div>
          <p className={`
            ${seventhGateActive ? 'text-oracle-neon/70' : 'text-oracle-electric/70'} 
            italic text-sm mt-2 pt-2 font-terminal
          `}>
            {glitched 
              ? applyGlitchEffect(card.description, seventhGateActive ? 0.7 : 0.5) 
              : card.description}
          </p>
          
          {/* Special hint for special symbols */}
          {isSpecialSymbol && (
            <div className={`
              mt-4 pt-2 
              ${seventhGateActive ? 'border-t border-oracle-neon/30' : 'border-t border-oracle-arcane/30'}
              text-xs italic font-terminal
              ${seventhGateActive ? 'text-oracle-neon/50' : 'text-oracle-arcane/50'}
            `}>
              {card.symbol === "⍙" && "This symbol opens forbidden pathways. Invoke it at your peril."}
              {card.symbol === "⚿" && "The key reflects the seeker. What do you see in the mirror?"}
              {card.symbol === "✶" && "Bonds forged in starlight connect across timelines."}
              {card.symbol === "☍" && "For every force, an equal opposition waits in shadow."}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DivinationCard;
