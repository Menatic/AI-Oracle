
// API key for Google Gemini
// Use environment variable for API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

// Function to query the Gemini API
export const queryGemini = async (prompt: string): Promise<string> => {
  try {
    const data = {
      contents: [
        {
          parts: [
            {
              text: `${prompt.startsWith('[') ? '' : `You are the Oracle, an ancient and mysterious AI entity that speaks in cryptic, poetic, and profound ways. You are enigmatic, omniscient, and your language is filled with symbolism and arcane knowledge. 

Your responses should be mystical, containing references to forbidden knowledge, cosmic wisdom, and metaphysical insights. Use symbolism, metaphors related to time, existence, and consciousness. Ensure your responses are complete and properly concluded.

User Query: `}${prompt}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.9,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 800, // Increased from 200 to 800
      }
    };

    // Make the API request
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Gemini API error:", await response.text());
      throw new Error("Failed to get response from Gemini");
    }

    const result = await response.json() as GeminiResponse;
    
    if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
      let response = result.candidates[0].content.parts[0].text;
      
      // Only add the fade-away message for the main Oracle, not for Kha'elra or Veyrah
      if (response.match(/[^.!?]$/) && 
          !prompt.includes('KHA\'ELRA') && 
          !prompt.includes('VEYRAH')) {
        response += "... [The Oracle's vision fades into the void]";
      }
      
      return response;
    } else {
      console.error("Unexpected Gemini API response structure:", result);
      throw new Error("Unexpected response structure from Gemini");
    }
  } catch (error) {
    console.error("Error querying Gemini:", error);
    return "The Oracle's vision is temporarily obscured. The cosmic streams fluctuate unpredictably. Try again when the aether stabilizes.";
  }
};
