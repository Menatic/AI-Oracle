
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface AmbientAudioProps {
  seventhGateActive: boolean;
  timelineFractured: boolean;
}

const AmbientAudio: React.FC<AmbientAudioProps> = ({ 
  seventhGateActive,
  timelineFractured 
}) => {
  const [audioDisabled, setAudioDisabled] = useState(false);
  const location = useLocation();
  
  const getAudioSource = () => {
    if (location.pathname === '/deity/seventh-gate') {
      return "https://www.youtube.com/embed/uxnVKxwSYPM?autoplay=1&controls=0&loop=1&playlist=uxnVKxwSYPM&showinfo=0&autohide=1&mute=0";
    } else if (location.pathname === '/deity/mirror-key') {
      return "https://www.youtube.com/embed/a_cOaRNqjvQ?autoplay=1&controls=0&loop=1&playlist=a_cOaRNqjvQ&showinfo=0&autohide=1&mute=0";
    } else {
      return "https://www.youtube.com/embed/2uJYMlMdqeI?autoplay=1&controls=0&loop=1&playlist=2uJYMlMdqeI&showinfo=0&autohide=1&mute=0";
    }
  };

  const toggleAudio = () => {
    setAudioDisabled(!audioDisabled);
  };

  return (
    <>
      <button 
        onClick={toggleAudio}
        className="absolute top-4 right-4 z-50 text-oracle-arcane/70 hover:text-oracle-arcane px-3 py-1 rounded-md text-xs border border-oracle-arcane/40 backdrop-blur-sm transition-all duration-300 hover:bg-oracle-arcane/10"
      >
        {audioDisabled ? 'Enable Audio' : 'Disable Audio'}
      </button>
      
      {!audioDisabled && (
        <div className="hidden">
          <iframe 
            src={getAudioSource()}
            allow="autoplay"
            title="Background Ambient Sound"
            className="w-0 h-0 absolute"
          />
        </div>
      )}
      
      <audio 
        preload="auto"
        className="hidden"
        src="/fracture-sound.mp3"
      />
    </>
  );
};

export default AmbientAudio;
