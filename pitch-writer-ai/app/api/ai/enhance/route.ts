import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { content, style } = await request.json()

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const stylePrompts = {
      formal: "Make this content more formal and professional, suitable for corporate presentations",
      persuasive: "Make this content more persuasive and compelling, focusing on benefits and emotional appeal",
      friendly: "Make this content more friendly and approachable, using conversational tone",
      concise:
        "Make this content more concise and to-the-point, removing unnecessary words while keeping the key message",
      "investor-friendly": "Optimize this content for investors, focusing on market opportunity, scalability, and ROI",
    }

    const stylePrompt = stylePrompts[style as keyof typeof stylePrompts] || stylePrompts.formal

    const prompt = `${stylePrompt}:\n\n${content}\n\nPlease rewrite this content according to the specified style while maintaining the core message and key information.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const enhancedContent = response.text()

    return NextResponse.json({ content: enhancedContent })
  } catch (error) {
    console.error("Error enhancing content:", error)
    return NextResponse.json({ error: "Failed to enhance content" }, { status: 500 })
  }
}
