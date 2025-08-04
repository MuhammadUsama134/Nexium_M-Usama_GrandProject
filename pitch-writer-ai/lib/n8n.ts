interface N8nWorkflowResponse {
  success: boolean
  data?: any
  error?: string
}

export class N8nClient {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = process.env.N8N_WEBHOOK_URL || "http://localhost:5678"
    this.apiKey = process.env.N8N_API_KEY || ""
  }

  async triggerWorkflow(workflowId: string, data: any): Promise<N8nWorkflowResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/webhook/${workflowId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`N8n workflow failed: ${response.statusText}`)
      }

      const result = await response.json()
      return { success: true, data: result }
    } catch (error) {
      console.error("N8n workflow error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  async processAIContent(prompt: string, context: any): Promise<string> {
    const result = await this.triggerWorkflow("ai-content-generation", {
      prompt,
      context,
      timestamp: new Date().toISOString(),
    })

    if (!result.success) {
      throw new Error(result.error || "Failed to process AI content")
    }

    return result.data?.content || ""
  }

  async sendNotification(type: string, data: any): Promise<void> {
    await this.triggerWorkflow("notification-sender", {
      type,
      data,
      timestamp: new Date().toISOString(),
    })
  }

  async trackAnalytics(event: string, data: any): Promise<void> {
    await this.triggerWorkflow("analytics-tracker", {
      event,
      data,
      timestamp: new Date().toISOString(),
    })
  }
}

export const n8nClient = new N8nClient()
