import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { n8nClient } from "@/lib/n8n"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { prompt, context } = await request.json()

    // Try n8n workflow first
    try {
      const n8nResult = await n8nClient.processAIContent(prompt, context)
      if (n8nResult) {
        return NextResponse.json({ content: n8nResult })
      }
    } catch (n8nError) {
      console.log("N8n workflow failed, falling back to direct AI call:", n8nError)
    }

    // Fallback to direct Gemini API call
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const contextString = context ? `Context: ${JSON.stringify(context, null, 2)}\n\n` : ""
    const fullPrompt = `${contextString}${prompt}\n\nPlease provide a professional, compelling response that would work well in a business pitch context.`

    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const content = response.text()

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error generating content:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}
