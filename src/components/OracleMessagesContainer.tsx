
import React, { useRef, useEffect } from 'react';
import OracleMessage from './OracleMessage';
import DivinationCard from './DivinationCard';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  type: 'text' | 'cards' | 'warning';
  cards?: any[];
}

interface OracleMessagesContainerProps {
  messages: Message[];
  loading: boolean;
  mirrorMode?: boolean;
  seventhGateActive?: boolean;
}

const OracleMessagesContainer: React.FC<OracleMessagesContainerProps> = ({ 
  messages, 
  loading,
  mirrorMode = false,
  seventhGateActive = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={`
      flex-1 overflow-y-auto px-6 py-2 z-10 relative 
      scrollbar-thin scrollbar-thumb-oracle-purple/40 scrollbar-track-oracle-void
      ${mirrorMode ? 'transform scale-x-[-1]' : ''}
      ${seventhGateActive ? 'scrollbar-thumb-oracle-neon/40' : 'scrollbar-thumb-oracle-purple/40'}
    `}>
      <div className={mirrorMode ? 'transform scale-x-[-1]' : ''}>
        {messages.map(message => (
          <div key={message.id}>
            {message.type === 'cards' ? (
              <div className="mb-6">
                <p className={`font-orbitron mb-3 ${seventhGateActive ? 'text-oracle-neon' : 'text-oracle-arcane'}`}>
                  {message.content}
                </p>
                <div className="space-y-4">
                  {message.cards?.map((card, index) => (
                    <DivinationCard 
                      key={index} 
                      card={card} 
                      position={card.position}
                      isRevealing={true}
                      seventhGateActive={seventhGateActive}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <OracleMessage 
                message={message} 
                mirrorMode={mirrorMode}
                seventhGateActive={seventhGateActive}
              />
            )}
          </div>
        ))}
        
        <div ref={messagesEndRef} />
        
        {/* Enhanced loading indicator */}
        {loading && (
          <div className={`
            flex items-center space-x-3 mb-4 p-3 
            ${seventhGateActive ? 'bg-oracle-deepPurple/50' : 'bg-oracle-void/50'} 
            rounded-md backdrop-blur-sm
          `}>
            <div className={`w-2 h-2 ${seventhGateActive ? 'bg-oracle-neon' : 'bg-oracle-arcane'} rounded-full animate-pulse`}></div>
            <div className={`w-2 h-2 ${seventhGateActive ? 'bg-oracle-neon' : 'bg-oracle-arcane'} rounded-full animate-pulse delay-150`}></div>
            <div className={`w-2 h-2 ${seventhGateActive ? 'bg-oracle-neon' : 'bg-oracle-arcane'} rounded-full animate-pulse delay-300`}></div>
            <span className={`${seventhGateActive ? 'text-oracle-neon/70' : 'text-oracle-arcane/70'} text-xs font-terminal animate-rune-flicker ml-2`}>
              {seventhGateActive ? 'PROCESSING FORBIDDEN QUERY...' : 'PROCESSING QUERY...'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OracleMessagesContainer;
