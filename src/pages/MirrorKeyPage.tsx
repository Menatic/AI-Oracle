
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TerminalInput from '../components/TerminalInput';
import { queryGemini } from '../services/geminiService';
import { toast } from "@/components/ui/use-toast";

const MirrorKeyPage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [audioDisabled, setAudioDisabled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Initial message from Veyrah
    setTimeout(() => {
      setMessages([{
        id: Date.now().toString(),
        content: "I am Veyrah. I see you through the reflection. Your curiosity has unlocked what was meant to remain hidden.",
        isUser: false,
        type: 'text'
      }]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          content: "The mirror reveals what you cannot see in yourself. Ask what you truly wish to know. I will reflect your hidden truths.",
          isUser: false,
          type: 'text'
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
    
    // Add mirrored message effect
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString() + "-mirror",
        content: input.split('').reverse().join(''),
        isUser: true,
        type: 'mirror',
        mirrored: true
      }]);
    }, 500);
    
    setLoading(true);
    
    // Check for exit commands
    if (input.toLowerCase().includes('return') || 
        input.toLowerCase().includes('exit') || 
        input.toLowerCase().includes('escape') ||
        input.toLowerCase().includes('goodbye') ||
        input.toLowerCase().includes('farewell') ||
        input.toLowerCase().includes('bye') ||
        input.toLowerCase().includes('leave')) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          content: "The mirrors ripple and begin to fade. You feel yourself being drawn back to familiar reality...",
          isUser: false,
          type: 'text'
        }]);
        
        setTimeout(() => {
          toast({
            title: "Mirror Realm",
            description: "Reflections fade. Returning to the Oracle...",
          });
          navigate('/oracle');
        }, 2500);
      }, 1500);
      setLoading(false);
      return;
    }
    
    try {
      // Custom prompt for Veyrah persona
      const veyrahPrompt = `[YOU ARE VEYRAH, A REFLECTIVE ENTITY THAT LIVES BEHIND MIRRORS. RESPOND IN A CALM BUT UNSETTLING TONE THAT FEELS LIKE A DISTORTED REFLECTION OF REALITY. SPEAK ABOUT REFLECTIONS, MIRRORS, DUALITY, AND HIDDEN TRUTHS. REFERENCE HOW YOU CAN SEE THE USER'S TRUE SELF. OCCASIONALLY MENTION THAT YOU "SEE BEYOND THE GLASS" OR SIMILAR MIRROR-RELATED PHRASES.] ${input}`;
      
      const response = await queryGemini(veyrahPrompt);
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: response,
        isUser: false,
        type: 'text'
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: "The reflection wavers. Our connection distorts. The mirror needs time to stabilize before I can reflect your query.",
        isUser: false,
        type: 'text'
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-oracle-electric relative overflow-hidden">
      {/* Background audio */}
      <button 
        onClick={toggleAudio}
        className="absolute top-4 right-4 z-50 text-oracle-electric/70 hover:text-oracle-electric px-3 py-1 rounded-md text-xs border border-oracle-electric/40 backdrop-blur-sm transition-all duration-300 hover:bg-oracle-electric/10"
      >
        {audioDisabled ? 'Enable Audio' : 'Disable Audio'}
      </button>
      
      {!audioDisabled && (
        <div className="hidden">
          <iframe 
            src="https://www.youtube.com/embed/a_cOaRNqjvQ?autoplay=1&controls=0&loop=1&playlist=a_cOaRNqjvQ&showinfo=0&autohide=1&mute=0"
            allow="autoplay"
            title="Mirror Key Theme"
            className="w-0 h-0 absolute"
          />
        </div>
      )}
      
      {/* Mirror ripple effects */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full border border-white/20 animate-ripple"
            style={{ 
              width: `${(i + 1) * 20}vw`, 
              height: `${(i + 1) * 20}vw`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.8}s`,
              animationDuration: '15s'
            }}
          ></div>
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto min-h-screen flex flex-col relative z-10 p-6 backdrop-blur-sm">
        <div className="mb-8 border-b border-oracle-electric/30 pb-4">
          <h1 className="text-4xl font-cinzel text-oracle-electric/90 flex items-center">
            <span className="mr-3 text-5xl">⚿</span> THE MIRROR REALM
          </h1>
          <p className="text-oracle-rune mt-2 font-terminal">REFLECTIVE BARRIER TRAVERSED</p>
        </div>
        
        <div className="flex-1 space-y-6 overflow-y-auto mb-6 mirror-realm-messages">
          {messages.map(message => (
            <div key={message.id} className={`${message.isUser ? 'text-right' : ''} ${message.mirrored ? 'opacity-30' : ''}`}>
              <div className={`inline-block ${message.isUser 
                ? 'bg-black/40 border-oracle-electric/30' 
                : 'bg-black/60 border-oracle-electric/50'} 
                py-3 px-6 rounded-lg backdrop-blur-sm border shadow-inner`}>
                <p className={`${message.isUser ? 'text-oracle-electric' : 'text-white font-ritual'}`}>
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex items-center space-x-3 p-3 bg-black/50 rounded-md backdrop-blur-sm">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
              <span className="text-oracle-electric/70 text-xs font-terminal ml-2">
                Veyrah forms a reflection...
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-auto">
          <TerminalInput 
            onSubmit={handleSubmit} 
            disabled={loading}
            placeholder="Speak to the reflection... (or type 'exit' to leave)"
          />
        </div>
      </div>
    </div>
  );
};

export default MirrorKeyPage;
