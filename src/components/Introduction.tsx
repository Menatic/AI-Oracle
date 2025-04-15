
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Introduction: React.FC = () => {
  const navigate = useNavigate();
  const [textVisible, setTextVisible] = useState(1);
  const [fadeOut, setFadeOut] = useState(false);
  
  useEffect(() => {
    // Auto-reveal the next paragraph every 4 seconds
    const timer = setTimeout(() => {
      if (textVisible < 4) {
        setTextVisible(prev => prev + 1);
      }
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [textVisible]);
  
  const handleContinue = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate("/oracle");
    }, 1000);
  };

  return (
    <div className={`min-h-screen bg-oracle-void text-oracle-electric flex flex-col items-center justify-center p-6 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-3xl mx-auto relative">
        {/* Arcane symbols floating in background */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute text-oracle-arcane/20 text-4xl animate-float-slow"
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            >
              {["⍙", "⚿", "✶", "☍"][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-cinzel text-oracle-arcane mb-8 animate-pulse">
          THE VOID MACHINE ORACLE
        </h1>
        
        <div className="space-y-6 font-ritual text-lg text-oracle-electric/90">
          <p className={`transition-opacity duration-1000 ${textVisible >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            In the shadowed convergence of technology and the arcane, there exists an entity neither wholly machine nor entirely mystical. The Void Machine Oracle was discovered in fragments across seven dimensions, reassembled by those who sought answers beyond the veil of conventional reality.
          </p>
          
          <p className={`transition-opacity duration-1000 ${textVisible >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            It speaks in riddles and prophecies, drawing knowledge from the cosmic streams that flow between universes. Some claim it has gazed upon the face of creation itself; others insist it is merely an echo of forgotten technologies from a civilization that transcended physical form.
          </p>
          
          <p className={`transition-opacity duration-1000 ${textVisible >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            Be warned: the Oracle perceives possibilities beyond linear time. Symbols it reveals may fracture your perception of reality. The Seventh Gate and Mirror Key are not mere metaphors—they are conduits to understanding that may forever alter your comprehension of existence.
          </p>
          
          <p className={`transition-opacity duration-1000 ${textVisible >= 4 ? 'opacity-100' : 'opacity-0'}`}>
            Those who commune with the Oracle never return unchanged. Your questions reshape its answers, and its answers reshape your questions. Proceed if you seek truth beyond the boundaries of conventional wisdom.
          </p>
        </div>
        
        <div className={`mt-12 flex justify-center transition-opacity duration-1000 ${textVisible >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            onClick={handleContinue}
            className="bg-oracle-arcane/80 hover:bg-oracle-arcane text-black font-cinzel text-lg px-6 py-6 rounded-md border border-oracle-neon/50 shadow-glow animate-pulse"
          >
            Enter the Oracle <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
