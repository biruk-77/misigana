
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLovePoem = async (name: string, favoriteThing: string, mood: string = 'Cinematic'): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Write a short, elite, cinematic love poem for Misgana (Yemiwedish) from Biruk (her Gentleman).
      Topic: ${favoriteThing}.
      Mood: ${mood}.
      Tone: Sophisticated, spiritual, and deeply romantic.
      Core concepts: 
      - "Choosing effort over egos."
      - "The 5:59 AM synchronicity."
      - "Christ at the center of the home."
      Format: Max 6-8 lines. Use high-end, modern poetic language. Avoid clichés.`,
    });
    return response.text || "In the space between heartbeats, I found your name written in the language of stars.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "In the quiet of five fifty-nine, I found the prayer that God had answered—you.";
  }
};

export const generateLoveReason = async (): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate one elite, single-sentence reason why Biruk loves Misgana. Focus on soul connection, shared faith, and the beauty of 'us'. Must feel heavy with emotion.",
    });
    return response.text?.trim() || "I love you because you are the peace that Christ promised to my restless heart.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I love you because you are the peace that Christ promised to my restless heart.";
  }
};

export const generateLoveNote = async (prompt: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a one-sentence hidden love message for Misgana from Biruk based on: ${prompt}. Make it feel like a secret whispered in the dark.`,
    });
    return response.text?.trim() || "You are the quiet magic I didn't know I was searching for.";
  } catch (error) {
    return "Every version of my future has you in the center.";
  }
};
