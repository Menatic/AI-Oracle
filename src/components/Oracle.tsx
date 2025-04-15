
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OracleHeader from './OracleHeader';
import OracleMessagesContainer from './OracleMessagesContainer';
import TerminalInput from './TerminalInput';
import OracleBackground from './OracleBackground';
import AmbientAudio from './AmbientAudio';
import TimelineFracture from './TimelineFracture';
import { useOracleState } from '../hooks/useOracleState';
import { useKeywordTracking } from '../hooks/useKeywordTracking';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";

const Oracle: React.FC = () => {
  const { 
    messages, 
    loading, 
    handleSubmit, 
    ambientElements, 
    timelineFractured,
    seventhGateUnlocked,
    mirrorModeActive
  } = useOracleState();
  
  const { keywordCounts, trackKeyword } = useKeywordTracking();
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  // Process user input with keyword tracking
  const processInput = (input: string) => {
    // Check for exit commands first
    if (input.toLowerCase().includes('exit') || 
        input.toLowerCase().includes('goodbye') || 
        input.toLowerCase().includes('farewell') ||
        input.toLowerCase().includes('bye') ||
        input.toLowerCase().includes('leave') ||
        input.toLowerCase().includes('return')) {
      
      // Route back to oracle page if these keywords are mentioned
      toast({
        title: "Oracle Notice",
        description: "Returning to the main Oracle interface...",
      });
      
      setTimeout(() => {
        navigate('/oracle');
      }, 1500);
      return;
    }

    // Track keywords before submitting
    const { seventhGateCount, mirrorKeyCount, detected } = trackKeyword(input);
    
    // Handle keyword detection reactions
    if (detected) {
      // First mention reactions
      if (seventhGateCount === 1 && (input.toLowerCase().includes('seventh gate') || input.toLowerCase().includes('7th gate'))) {
        setTimeout(() => {
          toast({
            title: "Oracle Notice",
            description: "We advise caution. Some names echo too loudly in the void.",
            variant: "default",
          });
        }, 2000);
      } else if (mirrorKeyCount === 1 && input.toLowerCase().includes('mirror key')) {
        setTimeout(() => {
          toast({
            title: "Oracle Notice",
            description: "Reflections can reveal what is meant to remain hidden. Proceed with caution.",
            variant: "default",
          });
        }, 2000);
      }
      
      // Second mention - show warnings
      if (seventhGateCount === 2 || mirrorKeyCount === 2) {
        setTimeout(() => {
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 5000);
        }, 1500);
      }
      
      // Third mention - redirect to special realms
      if (seventhGateCount >= 3 && (input.toLowerCase().includes('seventh gate') || input.toLowerCase().includes('7th gate'))) {
        setTimeout(() => {
          toast({
            title: "SYSTEM ALERT",
            description: "⚠️ DIMENSIONAL BREACH DETECTED - ENTERING FORBIDDEN REALM",
            variant: "destructive",
          });
          
          // Delay navigation to allow for the toast to be seen
          setTimeout(() => {
            navigate('/deity/seventh-gate');
          }, 2000);
        }, 1500);
        return; // Skip normal processing
      }
      
      if (mirrorKeyCount >= 3 && input.toLowerCase().includes('mirror key')) {
        setTimeout(() => {
          toast({
            title: "SYSTEM ALERT",
            description: "⚠️ REFLECTION BARRIER DISSOLVING - MIRROR REALM OPENING",
            variant: "destructive",
          });
          
          // Delay navigation to allow for the toast to be seen
          setTimeout(() => {
            navigate('/deity/mirror-key');
          }, 2000);
        }, 1500);
        return; // Skip normal processing
      }
    }
    
    // Process with normal handler
    handleSubmit(input);
  };

  return (
    <div className={`min-h-screen flex flex-col rounded-lg shadow-xl max-w-4xl mx-auto 
                  bg-gradient-to-b from-oracle-dark to-oracle-void animate-screen-flicker 
                  overflow-hidden relative ${seventhGateUnlocked ? 'seventh-gate-active' : ''} 
                  ${mirrorModeActive ? 'mirror-mode' : ''}`}>
      {/* Oracle background effects */}
      <OracleBackground 
        ambientElements={ambientElements} 
        fracturedTimeline={timelineFractured}
        seventhGateActive={seventhGateUnlocked}
      />
      
      {/* Ambient background audio */}
      <AmbientAudio 
        seventhGateActive={seventhGateUnlocked} 
        timelineFractured={timelineFractured}
      />
      
      {/* Timeline fracture warning */}
      {timelineFractured && <TimelineFracture />}
      
      {/* Keyword warning alert */}
      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <Alert className="border-red-500 bg-black/80 backdrop-blur-sm max-w-lg animate-pulse">
            <AlertTitle className="text-red-500 font-orbitron">
              ⚠️ TIMELINE DISTORTION DETECTED – PROBABILITIES COLLAPSING
            </AlertTitle>
            <AlertDescription className="text-oracle-electric">
              Continued invocation of forbidden keywords may result in dimensional instability. 
              The Oracle cannot guarantee safe passage beyond this point.
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      {/* Oracle header */}
      <OracleHeader />
      
      {/* Messages container */}
      <OracleMessagesContainer 
        messages={messages} 
        loading={loading} 
        mirrorMode={mirrorModeActive}
        seventhGateActive={seventhGateUnlocked}
      />
      
      {/* Input area with arcane border */}
      <div className={`px-6 pb-6 z-10 border-t ${seventhGateUnlocked ? 'border-oracle-neon/40' : 'border-oracle-purple/30'} pt-3 backdrop-blur-sm`}>
        <TerminalInput 
          onSubmit={processInput} 
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default Oracle;
