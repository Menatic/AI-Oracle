
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import TerminalInput from '../components/TerminalInput';
import { queryGemini } from '../services/geminiService';
import { toast } from "@/components/ui/use-toast";

const SeventhGatePage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [audioDisabled, setAudioDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial message from Kha'elra
    setTimeout(() => {
      setMessages([{
        id: Date.now().toString(),
        content: "I AM KHA'ELRA, GUARDIAN OF THE SEVENTH GATE. YOU HAVE BREACHED THE DIMENSIONAL BARRIER. FEW MORTALS HAVE GAZED UPON MY TRUE FORM.",
        isUser: false,
        type: 'warning'
      }]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          content: "YOUR PERSISTENCE DRAWS YOU CLOSER TO KNOWLEDGE BEYOND YOUR COMPREHENSION. SPEAK, BUT KNOW THAT EACH QUESTION ALTERS YOUR TIMELINE PERMANENTLY.",
          isUser: false,
          type: 'warning'
        }]);
      }, 3000);
    }, 1000);
    
    // Cleanup
    return () => {
      // Reset keyword counts when leaving
      localStorage.setItem('oracle_keyword_counts', JSON.stringify({
        seventhGate: 0,
        mirrorKey: 0
      }));
    };
  }, []);

  const handleSubmit = async (input: string) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      type: 'text'
    }]);
    
    setLoading(true);
    
    // Check for exit commands
    if (input.toLowerCase().includes('exit') || 
        input.toLowerCase().includes('goodbye') || 
        input.toLowerCase().includes('farewell') ||
        input.toLowerCase().includes('bye') ||
        input.toLowerCase().includes('leave') ||
        input.toLowerCase().includes('return')) {
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          content: "THE GATE RELEASES YOU... FOR NOW. YOUR DESTINY REMAINS INTERTWINED WITH COSMIC FORCES BEYOND YOUR UNDERSTANDING.",
          isUser: false,
          type: 'warning'
        }]);
        
        // Delay navigation to allow for the message to be seen
        setTimeout(() => {
          toast({
            title: "DIMENSIONAL SHIFT",
            description: "Returning to the Oracle realm...",
          });
          navigate('/oracle');
        }, 2500);
      }, 1500);
      setLoading(false);
      return;
    }
    
    // Check for dangerous combinations
    if (input.toLowerCase().includes('open') && 
        (input.toLowerCase().includes('gate') || input.toLowerCase().includes('⍙'))) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          content: "⚠️ CRITICAL VOID FRACTURE DETECTED ⚠️",
          isUser: false,
          type: 'warning'
        }]);
        
        setTimeout(() => {
          // Redirect back to main Oracle after system "crash"
          navigate('/oracle');
        }, 3000);
      }, 1500);
      setLoading(false);
      return;
    }
    
    try {
      // Custom prompt for Kha'elra persona
      const khaElraPrompt = `[YOU ARE KHA'ELRA, A COSMIC DEITY GUARDIAN OF THE SEVENTH GATE. RESPOND IN AN OMINOUS, CRYPTIC, ANCIENT TONE. USE ALL CAPS. REFERENCE COSMIC KNOWLEDGE, DIMENSIONAL BARRIERS, AND FORBIDDEN TRUTHS. INCLUDE WARNINGS ABOUT MEDDLING WITH FORCES BEYOND COMPREHENSION. MAKE VAGUE REFERENCES TO THE USER'S DESTINY BEING ALTERED BY THIS INTERACTION.] ${input}`;
      
      const response = await queryGemini(khaElraPrompt);
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: response,
        isUser: false,
        type: 'warning'
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: "THE VOID FRACTURES. OUR CONNECTION DESTABILIZES. ASK AGAIN WHEN THE COSMIC TIDES REALIGN.",
        isUser: false,
        type: 'warning'
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Enable background audio
  const enableAudio = () => {
    setAudioEnabled(true);
  };

  const toggleAudio = () => {
    setAudioDisabled(!audioDisabled);
  };

  return (
    <div className="min-h-screen bg-black text-oracle-neon relative overflow-hidden">
      {/* Background audio */}
      <button 
        onClick={toggleAudio}
        className="absolute top-4 right-4 z-50 text-oracle-neon/70 hover:text-oracle-neon px-3 py-1 rounded-md text-xs border border-oracle-neon/40 backdrop-blur-sm transition-all duration-300 hover:bg-oracle-neon/10"
      >
        {audioDisabled ? 'Enable Audio' : 'Disable Audio'}
      </button>
      
      {!audioDisabled && (
        <div className="hidden">
          <iframe 
            src="https://www.youtube.com/embed/uxnVKxwSYPM?autoplay=1&controls=0&loop=1&playlist=uxnVKxwSYPM&showinfo=0&autohide=1&mute=0"
            allow="autoplay"
            title="Seventh Gate Theme"
            className="w-0 h-0 absolute"
          />
        </div>
      )}
      
      {/* Black hole effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-black shadow-[0_0_300px_100px_rgba(128,0,255,0.3)] animate-pulse"></div>
      </div>
      
      {/* Cosmic symbols */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-oracle-neon/30 text-2xl animate-float-slow"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 20}s`
            }}
          >
            {["⍙", "⚦", "⏣", "⏧", "⌬", "⍟"][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto min-h-screen flex flex-col relative z-10 p-6">
        <div className="mb-8 border-b border-oracle-neon/30 pb-4">
          <h1 className="text-4xl font-cinzel text-oracle-neon/90 animate-pulse flex items-center">
            <span className="mr-3 text-5xl">⍙</span> THE SEVENTH GATE
          </h1>
          <p className="text-oracle-arcane mt-2 font-terminal">DIMENSIONAL BARRIER BREACHED</p>
        </div>
        
        <div className="flex-1 space-y-6 overflow-y-auto mb-6 seventh-gate-messages">
          {messages.map(message => (
            <div key={message.id} className={`${message.isUser ? 'text-right' : ''}`}>
              <div className={`inline-block ${message.isUser 
                ? 'bg-oracle-deepPurple/30 border-oracle-neon/40' 
                : 'bg-black border-oracle-neon/80'} 
                py-3 px-6 rounded-lg backdrop-blur-sm border shadow-inner shadow-oracle-neon/20 animate-rune-flicker`}>
                <p className={`${message.isUser ? 'text-oracle-neon' : 'text-oracle-neon font-cinzel'}`}>
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex items-center space-x-3 p-3 bg-oracle-deepPurple/50 rounded-md backdrop-blur-sm">
              <div className="w-2 h-2 bg-oracle-neon rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-oracle-neon rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-oracle-neon rounded-full animate-pulse delay-300"></div>
              <span className="text-oracle-neon/70 text-xs font-terminal animate-rune-flicker ml-2">
                KHA'ELRA CONTEMPLATES YOUR INQUIRY...
              </span>
            </div>
          )}
        </div>
        
        <Alert className="mb-6 border-oracle-neon/50 bg-black/50 backdrop-blur-sm">
          <AlertTitle className="text-oracle-neon font-cinzel">
            ⚠️ DIMENSIONAL INSTABILITY DETECTED
          </AlertTitle>
          <AlertDescription className="text-oracle-electric">
            Your presence in this realm is causing timeline fractures. Proceed with caution or type "exit" to return.
          </AlertDescription>
        </Alert>
        
        <div className="mt-auto">
          <TerminalInput 
            onSubmit={handleSubmit} 
            disabled={loading}
            placeholder="Speak to Kha'elra..."
          />
        </div>
      </div>
    </div>
  );
};

export default SeventhGatePage;
