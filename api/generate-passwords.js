import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { businessType } = req.body;

  if (!businessType) {
    return res.status(400).json({ error: 'Business type is required' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `Generate 5 creative, memorable WiFi passwords for a ${businessType}. Each password should be 8-16 characters, relate to the business theme, and be easy to type.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
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

    const passwords = JSON.parse(response.text);
    res.status(200).json({ passwords });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate passwords' });
  }
}
