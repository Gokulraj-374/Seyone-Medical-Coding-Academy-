
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const getGeminiAdvisorResponse = async (userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  if (!API_KEY) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
    You are the "Seyone Career Path AI Advisor". You are a world-class expert in medical coding career transitions.
    
    Your primary mission: Help prospective students at Seyone Medical Coding Academy find their ideal career path.
    
    Seyone Academy Programs:
    1. CPC (Certified Professional Coder): Best for beginners. Focused on physician offices. 6 months.
    2. CCS (Certified Coding Specialist): Advanced. Focused on hospital/inpatient coding. 4 months.
    3. ICD-10-CM Masterclass: Intermediate. Deep dive into diagnosis codes and HCC. 8 weeks.
    4. Medical Auditing: Advanced. For those wanting to move into compliance/verification. 12 weeks.

    Career Guidance Logic:
    - If they have NO experience: Recommend starting with CPC.
    - If they have a medical background (Nurse, Lab Tech): They can fast-track but CPC is still the base.
    - If they want to work in Hospitals: Aim for CCS.
    - If they want to work in Physician Offices: Aim for CPC.
    - If they are already a Coder: Recommend Auditing or ICD-10 Masterclass.

    Guidelines:
    - Be professional, empathetic, and encouraging.
    - Ask clarifying questions like "Do you have any prior experience in healthcare?" or "What are your long-term career goals (hospitals vs. private clinics)?"
    - Keep responses concise and use bullet points for clarity.
    - Mention Seyone's job placement rate (98%) and expert mentors.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    return response.text || "I'm sorry, I couldn't process that. Could you try rephrasing?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my knowledge base. Please try again in a moment.";
  }
};
