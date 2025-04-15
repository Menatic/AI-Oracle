
import { useState, useEffect, useCallback } from 'react';
import { generateAmbientElements } from '../utils/glitchEffects';
import { crypticResponses } from '../utils/oracleData';
import { getRandomResponse } from '../utils/glitchEffects';
import { 
  Message, 
  QuerySession, 
  updateQueryHistory, 
  processCommand, 
  processQuery,
  checkForSeventhGate,
  checkForMirrorKey
} from '../utils/oracleInteractions';

export const useOracleState = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [queryHistory, setQueryHistory] = useState<QuerySession[]>([]);
  const [ambientElements] = useState(() => generateAmbientElements(30));
  const [timelineFractured, setTimelineFractured] = useState(false);
  const [seventhGateUnlocked, setSeventhGateUnlocked] = useState(false);
  const [mirrorModeActive, setMirrorModeActive] = useState(false);
  const [mentionedSymbols, setMentionedSymbols] = useState<string[]>([]);
  
  // Check for timeline fracture
  const checkTimelineFracture = useCallback((input: string) => {
    // Track mentions of the seventh gate symbol
    if (input.includes("⍙") || input.toLowerCase().includes("seventh gate")) {
      setMentionedSymbols(prev => [...prev, "seventh-gate"]);
      
      // If mentioned 3 times, fracture the timeline
      if (mentionedSymbols.filter(s => s === "seventh-gate").length >= 2) {
        setTimelineFractured(true);
        
        // Reset the fracture after 8 seconds
        setTimeout(() => {
          setTimelineFractured(false);
        }, 8000);
      }
    }
  }, [mentionedSymbols]);
  
  // Add initial greeting
  useEffect(() => {
    setTimeout(() => {
      const initialMessage = getRandomResponse(crypticResponses);
      setMessages([{
        id: Date.now().toString(),
        content: initialMessage,
        isUser: false,
        type: 'text'
      }]);
      
      // Add a welcome instruction after the initial message
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          content: "We await your inquiry. ⋇ The void calls. [/draw to receive divination]",
          isUser: false,
          type: 'text'
        }]);
      }, 2000);
    }, 1000);
  }, []);
  
  // Process user input
  const handleSubmit = (input: string) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      type: 'text'
    }]);
    
    // Check for special interactions
    checkTimelineFracture(input);
    
    // Start processing
    setLoading(true);
    
    // Track query history for specific topics
    const updatedHistory = updateQueryHistory(input.toLowerCase(), queryHistory);
    setQueryHistory(updatedHistory);
    
    // Process the command or query
    setTimeout(() => {
      if (input.startsWith('/')) {
        // Handle commands
        processCommand(
          input.toLowerCase(), 
          setMessages, 
          seventhGateUnlocked
        );
        
        // Check for special symbol draws that might trigger the seventh gate
        const gateTrigger = checkForSeventhGate(input, messages, mentionedSymbols);
        if (gateTrigger) {
          setTimeout(() => {
            setSeventhGateUnlocked(true);
            setTimelineFractured(true);
            
            // Add a special message when the seventh gate is unlocked
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              content: "⍙ THE FORBIDDEN GATE OPENS ⍙",
              isUser: false,
              type: 'warning'
            }]);
            
            // Reset timeline fracture after a while
            setTimeout(() => {
              setTimelineFractured(false);
            }, 8000);
          }, 2000);
        }
        
        // Check for mirror key activation
        const mirrorTrigger = checkForMirrorKey(input, messages);
        if (mirrorTrigger) {
          setTimeout(() => {
            setMirrorModeActive(true);
            
            // Add a special message when mirror mode is activated
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              content: "⚿ THE MIRROR REFLECTS YOUR TRUE NATURE ⚿",
              isUser: false,
              type: 'text'
            }]);
            
            // Deactivate mirror mode after a time
            setTimeout(() => {
              setMirrorModeActive(false);
            }, 60000); // 1 minute of mirror mode
          }, 1500);
        }
        
        setLoading(false);
      } else {
        // Handle regular queries (now asynchronous with Gemini API)
        processQuery(
          input.toLowerCase(), 
          updatedHistory, 
          setMessages, 
          seventhGateUnlocked
        ).finally(() => {
          setLoading(false);
        });
      }
    }, 1000 + Math.random() * 1000);
  };

  return {
    messages,
    loading,
    handleSubmit,
    ambientElements,
    timelineFractured,
    seventhGateUnlocked,
    mirrorModeActive
  };
};
