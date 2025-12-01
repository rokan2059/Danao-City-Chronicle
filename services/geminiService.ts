import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the Gemini API client
// The API key is guaranteed to be available in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Streams a blog post about Danao City.
 * @param onChunk Callback function to handle incoming text chunks.
 * @param onComplete Callback function when stream finishes.
 * @param onError Callback function for errors.
 */
export const streamDanaoBlog = async (
  onChunk: (text: string) => void,
  onComplete: () => void,
  onError: (error: string) => void
) => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      Write an extensive, immersive, and highly detailed travel blog post about Danao City, Cebu, Philippines. 
      The content must be thorough, covering history, adventure, culture, and food in depth.
      
      Structure the blog post with the following Markdown sections:
      
      1.  **Introduction**: 
          - Welcome to Danao City, the "Industrial Hub of Northern Cebu".
          - Mention its slogan "Live, Love, Danao".
          - Briefly explain the name's origin (from "Danao" meaning small lake/lagoon).
          
      2.  **A Complete History** (Go into detail):
          - **Origins & Spanish Era**: The establishment of the parish of Santo Tomas de Villanueva (1744) and early settlement history.
          - **The Revolution**: The local resistance against Spanish rule. Mention local heroes like Capitan Tan Francisco "Iskong" Batucan and the eventual surrender of Spanish forces (The "Pagtugyan").
          - **World War II & Resistance**: The Japanese occupation, the brave guerrilla fighters in the mountains, and the city's liberation.
          - **The Industrial Era & Durano Legacy**: How the Durano family (Ramon Durano Sr.) industrialized the city with the Universal Cement Company and Durano Sugar Mill, shaping its modern economy. Mention the granting of the City Charter.
          - **The Gunsmithing Capital**: The fascinating evolution from clandestine World War II "paltik" (homemade gun) makers to the establishment of the legal cooperative (World's first legal gun-making coop).
          
      3.  **Adventures & Nature**:
          - **Danasan Eco Adventure Park**: Highlight specific activities (The Drop, Wakeboarding, ATV, Skydrop).
          - **Mount Manghilao**: Describe the hike and the panoramic 360-degree view of the Camotes Sea.
          - **Golf & Leisure**: Mention the Club Filipino Inc. de Cebu golf course and the relaxing Danao City Boardwalk (Sands Gateway).
          
      4.  **Culture & Heritage**:
          - **Karansa Festival**: Detailed description of the festival held in September. Explain its roots in the pottery-making livelihood of Brgy. Suba (dance movements resembling pottery making: kneading, shaping, drying).
          - **Santo Tomas de Villanueva Church**: Its historical significance and architecture.
          - **Pottery**: The traditional craft in Barangay Suba.
          
      5.  **Gastronomic Journey (Food)**:
          - **Kiseo (Queseo)**: The famous carabao white cheese. Describe its taste and how it's made.
          - **Tinap-anan**: The local smoked fish delicacy.
          - **Local Favorites**: The bustling fish port market, Cassava cake, and Bibingka.
          
      6.  **Conclusion**: 
          - Summary of why Danao is a complete destination mixing heritage and progress.
          - Final call to action for visitors.

      Format:
      - Use H1 (#) for the main Title.
      - Use H2 (##) for main sections (History, Adventure, Culture, Food).
      - Use H3 (###) for subsections (e.g., eras in history).
      - Use bolding (**) for emphasis.
      - Use blockquotes (>) for slogans or key takeaways.
      
      Tone: Professional travel journalism, enthusiastic, and educational.
      Do not output raw markdown fences.
    `;

    const responseStream = await ai.models.generateContentStream({
      model: model,
      contents: prompt,
    });

    for await (const chunk of responseStream) {
      // Safely access the text property
      const text = (chunk as GenerateContentResponse).text;
      if (text) {
        onChunk(text);
      }
    }
    
    onComplete();
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    onError(err.message || "Failed to generate blog content.");
  }
};