
import React, { useState, useEffect } from 'react';
import Introduction from '../components/Introduction';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  
  // Add a loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-oracle-void transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Initial loading */}
      <div className={`fixed inset-0 bg-oracle-void z-50 flex items-center justify-center transition-opacity duration-1000 pointer-events-none
                    ${loaded ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-center">
          <h1 className="text-4xl font-orbitron text-oracle-arcane mb-4 animate-rune-flicker">
            INITIALIZING
          </h1>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-3 h-3 bg-oracle-arcane rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-oracle-arcane rounded-full animate-pulse delay-150"></div>
            <div className="w-3 h-3 bg-oracle-arcane rounded-full animate-pulse delay-300"></div>
          </div>
          <p className="text-oracle-electric/70 mt-4 font-terminal">ACCESSING VOID STREAMS...</p>
        </div>
      </div>
      
      {/* Introduction component */}
      {loaded && <Introduction />}
    </div>
  );
};

export default Index;
