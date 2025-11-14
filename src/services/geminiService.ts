import { GoogleGenerativeAI } from "@google/generative-ai";

interface GeneratePostParams {
  sourceText: string;
  persona: string;
  platform: string;
  temperature: number;
  apiKey: string;
}

const PROMPT_PREFIX = `You are an expert social media copywriter.

Task: Rewrite the source content into "one" concise, engaging post for the specified platform.

Requirements:

* Use the specified persona and platform conventions.
* Focus on one key idea or hook from the source.
* Avoid hashtags unless they are crucial.
* Prefer plain language and short sentences.
* No emojis unless the platform usually embraces them.
* No preambles about yourself or what you are doing.
* Do not include explanations or analysis.
* Just output the final post.
`;

export async function generatePost({
  sourceText,
  persona,
  platform,
  temperature,
  apiKey,
}: GeneratePostParams): Promise<string> {
  if (!apiKey) {
    throw new Error("Missing Gemini API key");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `${PROMPT_PREFIX}

Persona: ${persona}
Platform: ${platform}

Source content:
"""
${sourceText}
"""

Write the final post now.`;

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature,
      maxOutputTokens: 300,
    },
  });

  const response = result.response;
  const text = response.text();

  return text.trim();
}

