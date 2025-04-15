import { DivinationSymbol } from './oracleData';

// Generate glitch text effects

/**
 * Apply a random glitch effect to text
 * @param text The text to apply the glitch effect to
 * @param intensity How intense the glitch should be (0-1)
 * @returns The glitched text
 */
export const applyGlitchEffect = (text: string, intensity = 0.3): string => {
  // Only apply the effect with a certain probability based on intensity
  if (Math.random() > intensity) return text;
  
  const effects = [
    mirrorText,
    addNoiseCharacters,
    corruptCharacters,
    addBinaryNoise,
    sliceText,
    zalgoText,
    redactText
  ];
  
  // Choose a random effect
  const effect = effects[Math.floor(Math.random() * effects.length)];
  return effect(text);
};

// Mirror the text
const mirrorText = (text: string): string => {
  return text.split('').reverse().join('');
};

// Add noise characters
const addNoiseCharacters = (text: string): string => {
  const noiseChars = '░▒▓█▄▀■□●○◆◇★☆⌂⌘☒☓☢☣⊗⊘⊙⊚⊛⊜⊝⊞⊟⊠⊡⍙⚿✶☍';
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    if (Math.random() < 0.1) {
      result += noiseChars[Math.floor(Math.random() * noiseChars.length)];
    }
    result += text[i];
  }
  
  return result;
};

// Corrupt some characters
const corruptCharacters = (text: string): string => {
  const chars = text.split('');
  
  for (let i = 0; i < chars.length; i++) {
    if (Math.random() < 0.15) {
      // Shift the character code
      const charCode = text.charCodeAt(i);
      chars[i] = String.fromCharCode(charCode + Math.floor(Math.random() * 10) - 5);
    }
  }
  
  return chars.join('');
};

// Add binary noise
const addBinaryNoise = (text: string): string => {
  // Add a binary segment somewhere in the text
  const binarySegment = ' 01'.repeat(Math.floor(Math.random() * 5) + 3);
  const position = Math.floor(Math.random() * text.length);
  
  return text.slice(0, position) + binarySegment + text.slice(position);
};

// Slice the text and reorder
const sliceText = (text: string): string => {
  const slicePoint = Math.floor(text.length / 2) + Math.floor(Math.random() * 5) - 2;
  return text.slice(slicePoint) + text.slice(0, slicePoint);
};

// Add zalgo text (text with combining characters)
const zalgoText = (text: string): string => {
  const zalgoChars = [
    '\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307', 
    '\u0308', '\u0309', '\u030A', '\u030B', '\u030C', '\u030D', '\u030E', '\u030F'
  ];
  
  let result = '';
  for (const char of text) {
    result += char;
    
    // 20% chance of zalgo-izing a character
    if (Math.random() < 0.2) {
      const numZalgo = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numZalgo; i++) {
        const zalgo = zalgoChars[Math.floor(Math.random() * zalgoChars.length)];
        result += zalgo;
      }
    }
  }
  
  return result;
};

// Redact portions of text
const redactText = (text: string): string => {
  const words = text.split(' ');
  const redactedWords = words.map(word => {
    if (word.length > 3 && Math.random() < 0.3) {
      return '█'.repeat(word.length);
    }
    return word;
  });
  
  return redactedWords.join(' ');
};

/**
 * Has a chance of generating a glitch warning
 * @param probability Chance of generating a warning (0-1)
 * @returns A glitch warning or null
 */
export const getRandomGlitchWarning = (
  probability = 0.15,
  warnings: string[]
): string | null => {
  if (Math.random() < probability) {
    const warningIndex = Math.floor(Math.random() * warnings.length);
    return warnings[warningIndex];
  }
  return null;
};

/**
 * Generate a random response from a list
 * @param responses Array of possible responses
 * @returns A randomly selected response
 */
export const getRandomResponse = (responses: string[]): string => {
  const index = Math.floor(Math.random() * responses.length);
  return responses[index];
};

/**
 * Generate a thematic response based on keywords in the query
 * @param query The user's query
 * @param thematicResponses Object containing thematic responses
 * @returns A thematic response if matched, null otherwise
 */
export const getThematicResponse = (
  query: string,
  thematicResponses: Record<string, string[]>
): string | null => {
  // Map of keywords to themes
  const themeKeywords: Record<string, string[]> = {
    future: ['future', 'will', 'tomorrow', 'next', 'coming', 'become', 'destiny', 'fate'],
    past: ['past', 'history', 'before', 'was', 'yesterday', 'memory', 'remember', 'forget'],
    identity: ['who am i', 'myself', 'identity', 'soul', 'self', 'who', 'person', 'being'],
    cosmos: ['universe', 'cosmos', 'star', 'planet', 'galaxy', 'space', 'astral', 'celestial'],
    technology: ['machine', 'computer', 'digital', 'technology', 'ai', 'code', 'program', 'algorithm'],
    metaphysics: ['god', 'spirit', 'existence', 'reality', 'consciousness', 'mind', 'truth', 'meaning'],
    forbidden: ['forbidden', 'secret', 'hidden', 'occult', 'mystery', 'seventh', '7th', 'gate'],
    reflection: ['mirror', 'reflection', 'self', 'seeing', 'glass', 'key']
  };
  
  // Check each theme's keywords
  for (const [theme, keywords] of Object.entries(themeKeywords)) {
    if (keywords.some(keyword => query.toLowerCase().includes(keyword))) {
      const responses = thematicResponses[theme];
      if (responses && responses.length > 0) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }
  
  return null;
};

/**
 * Draw random cards from the deck
 * @param deck The deck of cards to draw from
 * @param count Number of cards to draw
 * @returns Array of drawn cards
 */
export const drawRandomCards = (
  deck: any[], 
  count: number
): any[] => {
  const shuffled = [...deck].sort(() => 0.5 - Math.random());
  const drawn = shuffled.slice(0, count);
  
  // Determine if each card is reversed
  return drawn.map(card => ({
    ...card,
    isReversed: Math.random() > 0.6
  }));
};

/**
 * Draw a specific symbol from the deck
 * @param deck The deck of symbols
 * @param symbolId The specific symbol to draw
 * @returns The drawn symbol card
 */
export const drawSpecificSymbol = (
  deck: DivinationSymbol[],
  symbolId: string
): any => {
  // Find the specific card
  const specificCard = deck.find(card => card.id.toLowerCase() === symbolId);
  
  if (specificCard) {
    return {
      ...specificCard,
      isReversed: Math.random() > 0.7 // Lower chance of reversal for specifically requested symbols
    };
  }
  
  // Fallback to random card if specific one not found
  return drawRandomCards(deck, 1)[0];
};

/**
 * Apply typewriter effect to element
 * Using CSS animations
 */
export const applyTypewriterEffect = (
  element: HTMLElement, 
  text: string,
  delay = 30
): void => {
  let i = 0;
  element.textContent = '';
  element.style.opacity = '1';
  
  const typing = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, delay);
};

/**
 * Generate ambient background effects
 * @param count Number of ambient elements to generate
 * @returns Array of ambient element properties
 */
export const generateAmbientElements = (count: number = 20): any[] => {
  return Array.from({ length: count }).map(() => ({
    size: Math.random() * 10 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    animationDelay: Math.random() * 5,
    animationDuration: Math.random() * 10 + 5
  }));
};
