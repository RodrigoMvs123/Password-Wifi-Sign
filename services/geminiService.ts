import { GoogleGenAI, Type } from "@google/genai";

// Safe access to process.env to prevent crashes in environments where it's undefined
const getApiKey = () => {
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    return process.env.API_KEY;
  }
  return "";
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export const generateWifiPasswords = async (businessType: string): Promise<string[]> => {
  try {
    const modelId = 'gemini-2.5-flash';
    const prompt = `Generate 5 creative, memorable WiFi passwords for a ${businessType}. Each password should be 8-16 characters, relate to the business theme, and be easy to type.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
      },
    });

    if (!response.text) {
      throw new Error("No text returned from API");
    }

    const passwords = JSON.parse(response.text);
    return passwords;
  } catch (error) {
    console.error("Error generating passwords:", error);
    // Fallback in case of severe error to prevent app crash
    return [
      "Guest_Wifi_01",
      "Welcome123",
      "Free_Internet",
      "Connect_Here",
      "Fast_Speed_24"
    ];
  }
};