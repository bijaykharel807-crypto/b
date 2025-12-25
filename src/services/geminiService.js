
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AboutStyle, DescriptionStyle, SloganStyle } from "../types";

// Re-export for easier import in ProductDetailPage (though no longer a type, just a constant array)
export { DescriptionStyle };

const initializeGeminiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is configured.");
  }
  return new GoogleGenerativeAI({ apiKey });
}

const handleGeminiError = async (error) => {
  console.error("Error generating content:", error);
    
  
  if (error.message && (error.message.includes("Requested entity was not found.") || error.message.includes("API key not valid"))) {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
    }
    throw new Error("Please select a valid Gemini API key from a paid GCP project.");
  }
  
  throw new Error(`AI Generation failed: ${error.message || 'Unknown error'}`);
}

export const generateProductDescription = async (
  params
) => {
  const ai = initializeGeminiClient();


  const stylePrompts = {
    minimalist: "Keep it extremely concise, focusing on pure form and function with a sophisticated, quiet tone.",
    luxurious: "Use rich, evocative language that emphasizes exclusivity, premium materials, and unparalleled status.",
    storytelling: "Create a short narrative around the product, focusing on the human experience and the heritage of craftsmanship.",
    modern: "Focus on innovation, contemporary aesthetics, and how it fits into a fast-paced, high-tech lifestyle."
  };

  const prompt = `You are a world-class copywriter for a high-end, Awwwards-winning boutique brand called "Elegance". 
  Write a compelling product description for: "${params.productName}".
  
  STYLE DIRECTION: ${stylePrompts[params.style]}
  
  Current context: ${params.currentDescription || 'A new addition to our collection.'}
  
  REQUIREMENTS:
  - Do not use cheesy marketing clichés.
  - Focus on quality, craftsmanship, and aesthetic value.
  - Maximum 3-4 sentences.
  - Return ONLY the description text itself, no titles or meta-commentary.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        maxOutputTokens: 600,
        thinkingConfig: { thinkingBudget: 300 },
      },
    });

    const text = response.text;
    if (!text) {
      console.warn("Response object received but text is undefined. Candidates:", response.candidates);
      throw new Error("Gemini API returned an empty response. This might happen if the thinking process consumed the token budget.");
    }
    return text.trim();
  } catch (error) {
    return handleGeminiError(error);
  }
};


export const generateAboutDescription = async (
  params
) => {
  const ai = initializeGeminiClient();

  const stylePrompts = {
    visionary: "Refine the philosophy to sound forward-thinking, inspiring, and focused on future impact.",
    heritage: "Emphasize tradition, craftsmanship, and the enduring legacy of the brand and its values.",
    sustainable: "Highlight environmental responsibility, ethical sourcing, and a commitment to a better planet.",
    innovative: "Focus on cutting-edge design, unique solutions, and how the brand pushes boundaries."
  };

  const prompt = `You are a sophisticated brand strategist for a high-end, Awwwards-winning boutique brand called "Elegance". 
  Refine the "Our Philosophy" section for the company's About Us page.
  
  STYLE DIRECTION: ${stylePrompts[params.style]}
  
  Current philosophy: ${params.currentPhilosophy}
  
  REQUIREMENTS:
  - Maintain the core message but rephrase to fit the chosen style.
  - Keep it concise, around 4-6 sentences.
  - Use elegant and thoughtful language.
  - Return ONLY the refined philosophy text itself, no titles or meta-commentary.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        maxOutputTokens: 800, 
        thinkingConfig: { thinkingBudget: 400 },
      },
    });

    const text = response.text;
    if (!text) {
      console.warn("Response object received but text is undefined. Candidates:", response.candidates);
      throw new Error("Gemini API returned an empty response. This might happen if the thinking process consumed the token budget.");
    }
    return text.trim();
  } catch (error) {
    return handleGeminiError(error);
  }
};

export const generateSlogan = async (
  params
) => {
  const ai = initializeGeminiClient();


  const stylePrompts = {
    catchy: "Create a memorable, short, and impactful slogan that grabs attention.",
    elegant: "Craft a sophisticated and refined slogan that evokes luxury and quality.",
    humorous: "Generate a lighthearted, witty, and slightly amusing slogan.",
    bold: "Develop a strong, confident, and assertive slogan that stands out."
  };

  const prompt = `You are a creative marketing expert for a high-end boutique brand called "Elegance". 
  Generate a marketing slogan for the product: "${params.productName}".
  
  STYLE DIRECTION: ${stylePrompts[params.style]}
  
  REQUIREMENTS:
  - The slogan must be very concise, ideally 3-7 words.
  - It should be compelling and reflect the product's essence.
  - Return ONLY the slogan text, no additional commentary or punctuation beyond the slogan itself.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.9,
        maxOutputTokens: 50, 
        thinkingConfig: { thinkingBudget: 25 },
      },
    });

    const text = response.text;
    if (!text) {
      console.warn("Response object received but text is undefined. Candidates:", response.candidates);
      throw new Error("Gemini API returned an empty response. This might happen if the thinking process consumed the token budget.");
    }
    return text.trim();
  } catch (error) {
    return handleGeminiError(error);
  }
};