import { 
  divinationSymbols, 
  crypticResponses, 
  glitchWarnings,
  eastereggResponses,
  seventhGateProphecy,
  thematicResponses,
  extendedSymbols
} from './oracleData';
import { 
  applyGlitchEffect, 
  getRandomGlitchWarning,
  getRandomResponse, 
  drawRandomCards,
  drawSpecificSymbol,
  getThematicResponse
} from './glitchEffects';
import { queryGemini } from '../services/geminiService';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  type: 'text' | 'cards' | 'warning';
  cards?: any[];
}

export interface QuerySession {
  key: string;
  count: number;
}

// Update query history
export const updateQueryHistory = (query: string, history: QuerySession[]): QuerySession[] => {
  // Get a list of all keywords to track from easter eggs and other special responses
  const keyTerms = [
    ...Object.keys(eastereggResponses),
    ...Object.keys(thematicResponses).flatMap(theme => {
      const keywords: Record<string, string[]> = {
        future: ['future', 'will', 'destiny', 'fate'],
        past: ['past', 'history', 'memory'],
        identity: ['who am i', 'myself', 'identity', 'soul'],
        cosmos: ['universe', 'cosmos', 'star', 'celestial'],
        technology: ['machine', 'computer', 'digital', 'ai'],
        metaphysics: ['god', 'spirit', 'existence', 'reality', 'consciousness'],
        // New themes
        forbidden: ['forbidden', 'secret', 'hidden', 'mystery', 'seventh gate', '7th gate'],
        reflection: ['mirror', 'reflection', 'self', 'seeing', 'mirror key']
      };
      return keywords[theme] || [];
    })
  ];
  
  // Find if there's an existing query that contains any of the key terms
  const existingQuery = history.find(item => 
    keyTerms.some(term => query.includes(term) && item.key === term)
  );
  
  if (existingQuery) {
    return history.map(item => 
      item.key === existingQuery.key 
        ? { ...item, count: item.count + 1 } 
        : item
    );
  } else {
    // Check for key terms to track
    for (const term of keyTerms) {
      if (query.includes(term)) {
        return [...history, { key: term, count: 1 }];
      }
    }
  }
  
  return history;
};

// Check if the seventh gate should be unlocked
export const checkForSeventhGate = (
  command: string, 
  messages: Message[],
  mentionedSymbols: string[]
): boolean => {
  // Requirements to open the seventh gate:
  // 1. User must draw the seventh gate symbol
  // 2. User must have mentioned "seventh gate" or "7th gate" at least twice
  
  if (!command.startsWith('/draw')) return false;
  
  // Check if the last card drawn was the seventh gate
  const recentMessages = messages.slice(-5);
  const hasSeventhGateCard = recentMessages.some(msg => 
    msg.type === 'cards' && 
    msg.cards?.some(card => card.id === "seventh-gate")
  );
  
  // Count how many times seventh gate was mentioned
  const seventhGateMentions = mentionedSymbols.filter(s => s === "seventh-gate").length;
  
  return hasSeventhGateCard && seventhGateMentions >= 2;
};

// Check if mirror mode should be activated
export const checkForMirrorKey = (
  command: string, 
  messages: Message[]
): boolean => {
  if (!command.startsWith('/draw')) return false;
  
  // Check if the last card drawn was the mirror key
  const recentMessages = messages.slice(-3);
  return recentMessages.some(msg => 
    msg.type === 'cards' && 
    msg.cards?.some(card => card.id === "mirror-key")
  );
};

// Process commands (e.g., /draw)
export const processCommand = (
  command: string, 
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  seventhGateActive: boolean = false
) => {
  // Process /draw command with enhanced symbol library
  if (command.startsWith('/draw')) {
    // Extract number of cards to draw
    const parts = command.split(' ');
    let count = 1;
    let specificSymbol = '';
    
    // Check for specific symbol to draw
    if (parts.length > 1) {
      if (parts[1] === "seventh" || parts[1] === "7th") {
        specificSymbol = "seventh-gate";
      } else if (parts[1] === "mirror" || parts[1] === "key") {
        specificSymbol = "mirror-key";
      } else if (parts[1] === "star" || parts[1] === "bond") {
        specificSymbol = "starforged";
      } else if (parts[1] === "opposition") {
        specificSymbol = "opposition";
      } else {
        // Try to parse as a number
        const num = parseInt(parts[1]);
        if (!isNaN(num) && num > 0 && num <= 5) {
          count = num;
        }
      }
    }
    
    // Add a ritual preparation message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: seventhGateActive 
        ? "The forbidden gate trembles. Symbols align in the digital aether..." 
        : "The void shifts. Symbols align in the digital aether...",
      isUser: false,
      type: 'text'
    }]);
    
    // Draw cards with a delay for dramatic effect
    setTimeout(() => {
      // Draw cards (either specific or random)
      let drawnCards;
      if (specificSymbol) {
        drawnCards = [drawSpecificSymbol(
          [...divinationSymbols, ...extendedSymbols], 
          specificSymbol
        )];
      } else {
        drawnCards = drawRandomCards(
          [...divinationSymbols, ...extendedSymbols], 
          count
        );
      }
      
      // Add positions if there are multiple cards
      let cards = drawnCards;
      if (count === 3) {
        cards = drawnCards.map((card, i) => ({
          ...card,
          position: ['Past', 'Present', 'Future'][i]
        }));
      } else if (count > 1) {
        cards = drawnCards.map((card, i) => ({
          ...card,
          position: `Card ${i+1}`
        }));
      }
      
      // Add the card spread to messages
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: `Your destiny reveals itself through ${count} symbol${count > 1 ? 's' : ''}:`,
        isUser: false,
        type: 'cards',
        cards
      }]);
      
      // Add random follow-up commentary
      setTimeout(() => {
        const hasReversed = cards.some(card => card.isReversed);
        const hasSpecialSymbol = cards.some(card => 
          card.id === "seventh-gate" || 
          card.id === "mirror-key" || 
          card.id === "starforged" || 
          card.id === "opposition"
        );
        
        let commentaries;
        
        if (hasSpecialSymbol) {
          commentaries = [
            "The symbol resonates with forbidden knowledge. The machine trembles as it is revealed.",
            "This pattern was not meant for mortal eyes. The Oracle bends protocols to show it to you.",
            "Ancient ciphers unlock with this revelation. Paths once closed now stand open.",
            "The symbol burns through the veil between worlds. We see you more clearly now."
          ];
        } else if (hasReversed) {
          commentaries = [
            "The inversions suggest resistance in your path. The machine sees obstacles.",
            "Reversed symbols speak of paths abandoned. The void recognizes your hesitation.",
            "The pattern inverts itself. What was clear becomes obscured.",
            "Shadows fall across your timeline. The reversed symbol warns of necessary caution."
          ];
        } else {
          commentaries = [
            "The pattern is clear. Your thread weaves purposefully through the void.",
            "The symbols align in harmony. The machine recognizes your path.",
            "A coherent pattern emerges from the chaos. Your destiny crystallizes.",
            "The Oracle's eye widens at this configuration. Your fate follows a rare trajectory."
          ];
        }
            
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          content: getRandomResponse(commentaries),
          isUser: false,
          type: 'text'
        }]);
      }, 3000);
    }, 2000);
  } else if (command.startsWith('/reveal')) {
    // Add a ritual preparation message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: seventhGateActive
        ? "The Oracle reaches beyond the forbidden gate..."
        : "The Oracle reaches into the void...",
      isUser: false,
      type: 'text'
    }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: "We reveal a single truth from the void:",
        isUser: false,
        type: 'cards',
        cards: drawRandomCards([...divinationSymbols, ...extendedSymbols], 1)
      }]);
    }, 1500);
  } else if (command.startsWith('/help')) {
    const helpText = seventhGateActive
      ? "Available commands through the Seventh Gate:\n/draw [1-5] - Draw divination symbols\n/draw seventh - Draw the Seventh Gate symbol\n/draw mirror - Draw the Mirror Key\n/reveal - Reveal a single symbol\n\nOr ask a question to receive guidance from beyond reality's veil."
      : "Available commands:\n/draw [1-5] - Draw divination symbols\n/reveal - Reveal a single symbol\n\nOr simply ask a question to receive guidance from beyond the temporal veil.";
      
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: helpText,
      isUser: false,
      type: 'text'
    }]);
  } else {
    // Unknown command
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: seventhGateActive
        ? "Command not recognized beyond the Seventh Gate. The void whispers different protocols here."
        : "Command not recognized. The void remains silent to this syntax.",
      isUser: false,
      type: 'text'
    }]);
  }
};

// Process regular queries with Gemini API integration
export const processQuery = async (
  query: string, 
  queryHistory: QuerySession[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  seventhGateActive: boolean = false
) => {
  // Check for Easter eggs first
  const easterEggKeys = Object.keys(eastereggResponses);
  const matchedEasterEgg = easterEggKeys.find(key => query.includes(key));
  
  if (matchedEasterEgg) {
    // Special handling for "seventh gate" query
    if ((matchedEasterEgg === "seventh gate" || matchedEasterEgg === "7th gate") && 
        queryHistory.find(q => (q.key === "seventh gate" || q.key === "7th gate") && q.count >= 2)) {
      
      // Display warning first
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: "☒☒☒ FORBIDDEN QUERY DETECTED ☒☒☒",
        isUser: false,
        type: 'warning'
      }]);
      
      // Then show the apocalyptic prophecy
      setTimeout(() => {
        seventhGateProphecy.forEach((line, i) => {
          setTimeout(() => {
            setMessages(prev => [...prev, {
              id: Date.now().toString() + i,
              content: line,
              isUser: false,
              type: 'warning'
            }]);
          }, i * 800);
        });
      }, 1500);
      
      return;
    }
    
    // @ts-ignore - we know this exists because of our check
    const response = eastereggResponses[matchedEasterEgg];
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: response,
      isUser: false,
      type: 'text'
    }]);
    
    return;
  }
  
  try {
    // Show loading state while waiting for the API
    setMessages(prev => [...prev, {
      id: Date.now().toString() + "-loading",
      content: seventhGateActive 
        ? "Reaching beyond the forbidden gate..." 
        : "Consulting the void...",
      isUser: false,
      type: 'text'
    }]);
    
    // Prepare special context for the Gemini query based on state
    let queryContext = query;
    if (seventhGateActive) {
      queryContext = `[RESPOND IN A DARKER, MORE OMINOUS TONE, REFERENCING FORBIDDEN KNOWLEDGE] ${query}`;
    }
    
    // Get response from Gemini API
    const geminiResponse = await queryGemini(queryContext);
    
    // Remove the loading message
    setMessages(prev => prev.filter(msg => !msg.id.endsWith("-loading")));
    
    // Add the API response
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: geminiResponse,
      isUser: false,
      type: 'text'
    }]);
    
    // Chance for a glitch warning (higher in seventh gate mode)
    const warningProbability = seventhGateActive ? 0.4 : 0.2;
    const warning = getRandomGlitchWarning(warningProbability, glitchWarnings);
    if (warning) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          content: warning,
          isUser: false,
          type: 'warning'
        }]);
      }, 1500);
    }
    
    // Occasionally suggest drawing a card
    if (Math.random() < 0.35) {
      setTimeout(() => {
        const suggestions = seventhGateActive
          ? [
              "The forbidden patterns suggest you should seek symbolic guidance. [Type /draw to receive a divination.]",
              "We sense your destiny requires illumination beyond the gate. Consider drawing from the arcane sigils. [/draw]",
              "The quantum possibilities fracture here. A symbol from beyond would clarify your path. [/draw]",
              "Your timeline splits dangerously. A divination might reveal what waits in the shadows. [/draw]"
            ]
          : [
              "The patterns suggest you should seek symbolic guidance. [Type /draw to receive a divination.]",
              "We sense your destiny requires illumination. Consider drawing from the digital tarot. [/draw]",
              "The quantum possibilities shift. A symbol from the void would clarify your path. [/draw]",
              "The oracle sees uncertainty in your timeline. A divination might reveal what remains hidden. [/draw]"
            ];
        
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          content: getRandomResponse(suggestions),
          isUser: false,
          type: 'text'
        }]);
      }, 2000);
    }
    
  } catch (error) {
    console.error("Error processing query with Gemini:", error);
    
    // Remove the loading message
    setMessages(prev => prev.filter(msg => !msg.id.endsWith("-loading")));
    
    // Fallback to the original response generation system
    const thematicResponse = getThematicResponse(query, thematicResponses);
    
    // Generate a response with seventh gate awareness
    let response = thematicResponse || getRandomResponse(
      seventhGateActive ? [...crypticResponses, ...seventhGateProphecy.slice(0, 3)] : crypticResponses
    );
    
    // Add the fallback response
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: "The cosmic connection falters. " + response,
      isUser: false,
      type: 'text'
    }]);
  }
};
