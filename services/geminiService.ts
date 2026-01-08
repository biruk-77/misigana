
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateLovePoem = async (name: string, favoriteThing: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, elite, and deeply emotional romantic poem for a girl named ${name} (often called Yemiwedish) from her boyfriend Biruk (her Gentleman). 
      The poem must mention her love for ${favoriteThing}. 
      Incorporate themes of:
      1. Their spiritual, God-centered bond (Christ at the center).
      2. 'Effort over egos'—a love that fixes and stays.
      3. She is his peace and his 'safe place'.
      Style: Elegant, like a modern-day Rumi or Neruda. Soft and cinematic.`,
    });
    return response.text || "My love for you transcends words, and even silence speaks of you.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Your beauty is beyond the reach of stars, a light that guides me home.";
  }
};

export const generateLoveReason = async (): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate one unique, elite-level poetic reason why Biruk loves Misgana (Yemiwedish). Focus on her spiritual depth, her being his peace, or their decision to always choose effort. One sentence, incredibly heartfelt.",
      config: {
        maxOutputTokens: 100,
      }
    });
    return response.text?.trim() || "You are the missing piece of my soul's puzzle.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Every moment with you is a gift I never knew I deserved.";
  }
};
