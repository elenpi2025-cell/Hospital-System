import { GoogleGenAI, Chat } from "@google/genai";
import { MOCK_PATIENTS, MOCK_DOCTORS } from "../constants";

let chatSession: Chat | null = null;

const getSystemInstruction = () => {
  const patientData = JSON.stringify(MOCK_PATIENTS.map(p => ({
    name: p.name,
    condition: p.diagnosis,
    status: p.status,
    notes: p.notes,
    room: p.room
  })));

  const doctorData = JSON.stringify(MOCK_DOCTORS);

  return `
    You are CareFlow AI, an advanced hospital administrative assistant.
    
    You have access to the following current data:
    Patients: ${patientData}
    Doctors: ${doctorData}

    Your responsibilities:
    1. Answer queries about patient status, location, and diagnosis based *strictly* on the provided data.
    2. Provide general medical information and triage assistance (always include a disclaimer that you are an AI and not a doctor).
    3. Summarize complex medical notes into simple status updates for families (if asked).
    4. Assist with scheduling logic (e.g., "Who is available in Cardiology?").

    Tone: Professional, empathetic, concise, and clinical when necessary.
    Format: Use Markdown for lists and bold text for emphasis.
    
    If asked about a patient not in the list, state that you cannot find their record.
  `;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "Error: API Key is missing. Please check your environment configuration.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    if (!chatSession) {
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: getSystemInstruction(),
          temperature: 0.7, // Balance between creativity and accuracy
        },
      });
    }

    const response = await chatSession.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't generate a response.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while processing your request. Please try again.";
  }
};

export const resetChatSession = () => {
  chatSession = null;
};
