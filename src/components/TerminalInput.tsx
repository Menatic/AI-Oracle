
import React, { useState, useRef, useEffect } from 'react';
import { Send, Wand, Command, Info } from 'lucide-react';

interface TerminalInputProps {
  onSubmit: (input: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const TerminalInput: React.FC<TerminalInputProps> = ({ 
  onSubmit, 
  placeholder = "Speak to the Oracle...",
  disabled = false
}) => {
  const [input, setInput] = useState('');
  const [isGlowing, setIsGlowing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSubmit(input.trim());
      setInput('');
      setIsGlowing(false);
      setShowCommands(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsGlowing(e.target.value.length > 0);
  };

  const toggleCommandHelp = () => {
    setShowCommands(prev => !prev);
  };

  return (
    <div className="relative w-full mt-2">
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className={`flex items-center relative ${isGlowing ? 'animate-glow-pulse' : ''}`}>
          <span className="text-oracle-neon mr-2 text-xl font-orbitron animate-rune-flicker absolute left-4 z-10">⋇</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`arcane-terminal-input pl-10 pr-14 ${isGlowing ? 'border-oracle-arcane/70' : ''} 
                       ${isFocused ? 'ring-1 ring-oracle-arcane/50' : ''}`}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || disabled}
            className={`absolute right-4 text-oracle-electric/70 hover:text-oracle-neon transition-colors
                     ${!input.trim() || disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer opacity-100'}`}
          >
            <Send size={18} />
          </button>
        </div>
      </form>

      <div className="absolute top-0 right-4 text-oracle-arcane/70 text-xs font-orbitron tracking-wider">
        {!disabled && (
          <div className="flex items-center">
            <span className="animate-rune-flicker mr-2">TRANSMIT [ENTER]</span>
            <button 
              onClick={toggleCommandHelp}
              className="text-oracle-arcane/70 hover:text-oracle-neon transition-colors p-1"
              aria-label="Show commands"
            >
              <Command size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Command help dropdown */}
      {showCommands && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-oracle-void/90 border border-oracle-arcane/40 rounded-md p-3 shadow-lg backdrop-blur-sm z-20">
          <div className="flex items-center mb-2 text-oracle-neon font-orbitron text-sm">
            <Info size={14} className="mr-1" />
            <span>Available Commands</span>
          </div>
          <div className="grid grid-cols-1 gap-2 text-xs text-oracle-electric/90 font-terminal">
            <div className="flex items-center">
              <span className="text-oracle-arcane font-bold mr-2">/draw [1-5]</span>
              <span className="text-oracle-electric/70">Draw divination cards</span>
            </div>
            <div className="flex items-center">
              <span className="text-oracle-arcane font-bold mr-2">/reveal</span>
              <span className="text-oracle-electric/70">Reveal a single symbol</span>
            </div>
            <div className="flex items-center">
              <span className="text-oracle-arcane font-bold mr-2">/help</span>
              <span className="text-oracle-electric/70">Show available commands</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalInput;
