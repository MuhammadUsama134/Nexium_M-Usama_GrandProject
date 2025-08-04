import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { pitchData } = await request.json()

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const pitchContent = `
Title: ${pitchData.title || "N/A"}
Problem: ${pitchData.problem || "N/A"}
Solution: ${pitchData.solution || "N/A"}
Market: ${pitchData.market_size || "N/A"}
Revenue Model: ${pitchData.revenue_model || "N/A"}
Team: ${pitchData.team || "N/A"}
Ask: ${pitchData.ask || "N/A"}
    `.trim()

    const prompts = {
      oneLiner: `Create a compelling one-liner (maximum 15 words) that captures the essence of this pitch:\n\n${pitchContent}`,
      elevator: `Create a 30-second elevator pitch (2-3 sentences) based on this information:\n\n${pitchContent}`,
      oneMinute: `Create a 1-minute pitch summary (4-5 sentences) that covers the key points:\n\n${pitchContent}`,
    }

    const results = await Promise.all([
      model.generateContent(prompts.oneLiner),
      model.generateContent(prompts.elevator),
      model.generateContent(prompts.oneMinute),
    ])

    const [oneLinerResult, elevatorResult, oneMinuteResult] = results

    return NextResponse.json({
      oneLiner: (await oneLinerResult.response).text(),
      elevator: (await elevatorResult.response).text(),
      oneMinute: (await oneMinuteResult.response).text(),
    })
  } catch (error) {
    console.error("Error generating summary:", error)
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 })
  }
}
