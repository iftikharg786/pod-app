
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Always create a new GoogleGenAI instance right before making an API call 
// to ensure it uses the most up-to-date API key.
export const getDesignSuggestions = async (productType: string, occasion?: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 3 creative design ideas for a custom ${productType}${occasion ? ` for the occasion: ${occasion}` : ''}. Include a short catchy phrase and a visual description for each.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              idea: {
                type: Type.STRING,
                description: 'A creative title for the design idea.'
              },
              description: {
                type: Type.STRING,
                description: 'A detailed visual description of the design.'
              },
              phrase: {
                type: Type.STRING,
                description: 'A short, catchy phrase to include in the design.'
              }
            },
            required: ["idea", "description", "phrase"]
          }
        }
      }
    });
    
    // Fix: Access the .text property directly and handle potential undefined.
    const text = response.text;
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error("Gemini AI error:", error);
    return [];
  }
};
