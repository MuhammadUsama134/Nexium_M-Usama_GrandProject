"use client"

import { useState } from "react"

interface PitchData {
  title?: string
  type?: string
  audience?: string
  problem?: string
  solution?: string
  [key: string]: string |undefined

}

export function useAI() {
  const [loading, setLoading] = useState(false)

  const generateContent = async (prompt: string, context?: PitchData): Promise<string> => {
    setLoading(true)
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, context }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate content")
      }

      const data = await response.json()
      return data.content
    } catch (error) {
      console.error("Error generating content:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const enhanceContent = async (content: string, style: string): Promise<string> => {
    setLoading(true)
    try {
      const response = await fetch("/api/ai/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, style }),
      })

      if (!response.ok) {
        throw new Error("Failed to enhance content")
      }

      const data = await response.json()
      return data.content
    } catch (error) {
      console.error("Error enhancing content:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const generateSummary = async (
    pitchData: PitchData,
  ): Promise<{
    oneLiner: string
    elevator: string
    oneMinute: string
  }> => {
    setLoading(true)
    try {
      const response = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pitchData }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate summary")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error generating summary:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    generateContent,
    enhanceContent,
    generateSummary,
  }
}
