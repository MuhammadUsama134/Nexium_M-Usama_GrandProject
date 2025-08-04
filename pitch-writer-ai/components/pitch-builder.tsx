"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Save, Sparkles, FileText, Download, Share, Wand2 } from "lucide-react"
import { toast } from "sonner" 
import { usePitches } from "@/hooks/use-pitches"
import { useAI } from "@/hooks/use-ai"

const pitchSteps = [
  {
    id: "basic",
    title: "Basic Information",
    description: "Start with the fundamentals",
  },
  {
    id: "problem",
    title: "Problem Statement",
    description: "Define the problem you're solving",
  },
  {
    id: "solution",
    title: "Solution",
    description: "Present your solution",
  },
  {
    id: "market",
    title: "Market & Audience",
    description: "Define your target market",
  },
  {
    id: "business",
    title: "Business Model",
    description: "Explain how you make money",
  },
  {
    id: "team",
    title: "Team & Execution",
    description: "Showcase your team",
  },
  {
    id: "ask",
    title: "The Ask",
    description: "What do you need?",
  },
  {
    id: "review",
    title: "Review & Export",
    description: "Finalize your pitch",
  },
]

interface PitchData {
  id?: string
  title: string
  description: string
  type: string
  audience: string
  problem: string
  solution: string
  market_size: string
  target_audience: string
  usp: string
  revenue_model: string
  go_to_market: string
  competition: string
  team: string
  ask: string
  status: string
}

interface PitchBuilderProps {
  initialData?: PitchData | null
}

export function PitchBuilder({ initialData }: PitchBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [pitchData, setPitchData] = useState<PitchData>({
    title: "",
    description: "",
    type: "",
    audience: "",
    problem: "",
    solution: "",
    market_size: "",
    target_audience: "",
    usp: "",
    revenue_model: "",
    go_to_market: "",
    competition: "",
    team: "",
    ask: "",
    status: "draft",
  })
  const [isGenerating, setIsGenerating] = useState(false)
 
  const { savePitch, updatePitch } = usePitches()
  const { generateContent, enhanceContent } = useAI()

  useEffect(() => {
    if (initialData) {
      setPitchData(initialData)
    }
  }, [initialData])

  const progress = ((currentStep + 1) / pitchSteps.length) * 100

  const handleInputChange = (field: keyof PitchData, value: string) => {
    setPitchData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < pitchSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = async () => {
    try {
      if (initialData?.id) {
        await updatePitch(initialData.id, pitchData)
        toast.success("Pitch updated!", { 
          description: "Your changes have been saved.",
        })
      } else {
        await savePitch(pitchData)
        toast.success("Pitch saved!", { 
          description: "Your pitch has been saved to your dashboard.",
        })
      }
    } catch (error) {
      toast.error("Error", { 
        description: "Failed to save pitch. Please try again.",
      })
    }
  }

  const handleAIGenerate = async (field: keyof PitchData, prompt: string) => {
    setIsGenerating(true)
    try {
      const content = await generateContent(prompt, pitchData)
      handleInputChange(field, content)
      toast.success("Content generated!", { 
        description: "AI has generated content for this section.",
      })
    } catch (error) {
      toast.error("Error", { 
        description: "Failed to generate content. Please try again.",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const renderStepContent = () => {
    const step = pitchSteps[currentStep]

    switch (step.id) {
      case "basic":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Pitch Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Revolutionary AI-Powered Marketing Platform"
                value={pitchData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Brief Description</Label>
              <Textarea
                id="description"
                placeholder="A short summary of what your pitch is about..."
                value={pitchData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Pitch Type</Label>
                <Select value={pitchData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pitch type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup Pitch</SelectItem>
                    <SelectItem value="product">Product Pitch</SelectItem>
                    <SelectItem value="sales">Sales Pitch</SelectItem>
                    <SelectItem value="academic">Academic Pitch</SelectItem>
                    <SelectItem value="marketing">Marketing Proposal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Select value={pitchData.audience} onValueChange={(value) => handleInputChange("audience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investors">Investors</SelectItem>
                    <SelectItem value="customers">Customers</SelectItem>
                    <SelectItem value="partners">Partners</SelectItem>
                    <SelectItem value="internal">Internal Team</SelectItem>
                    <SelectItem value="academic">Academic Committee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case "problem":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="problem">Problem Statement *</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleAIGenerate(
                      "problem",
                      `Generate a compelling problem statement for a ${pitchData.type} pitch targeting ${pitchData.audience}. The pitch is about: ${pitchData.title}`,
                    )
                  }
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  AI Generate
                </Button>
              </div>
              <Textarea
                id="problem"
                placeholder="Describe the problem you're solving. What pain points does your audience face?"
                value={pitchData.problem}
                onChange={(e) => handleInputChange("problem", e.target.value)}
                rows={6}
              />
              <p className="text-sm text-muted-foreground">
                Tip: Focus on a problem that your audience can relate to and quantify the impact if possible.
              </p>
            </div>
          </div>
        )

      case "solution":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="solution">Your Solution *</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleAIGenerate(
                      "solution",
                      `Generate a compelling solution description for: ${pitchData.problem}. The solution should be for a ${pitchData.type} pitch.`,
                    )
                  }
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  AI Generate
                </Button>
              </div>
              <Textarea
                id="solution"
                placeholder="Explain your solution. How does it solve the problem you identified?"
                value={pitchData.solution}
                onChange={(e) => handleInputChange("solution", e.target.value)}
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="usp">Unique Selling Proposition</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleAIGenerate(
                      "usp",
                      `Generate a unique selling proposition for this solution: ${pitchData.solution}`,
                    )
                  }
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  AI Generate
                </Button>
              </div>
              <Textarea
                id="usp"
                placeholder="What makes your solution unique? Why should people choose you over alternatives?"
                value={pitchData.usp}
                onChange={(e) => handleInputChange("usp", e.target.value)}
                rows={4}
              />
            </div>
          </div>
        )

      case "market":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="market_size">Market Size & Opportunity</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleAIGenerate(
                      "market_size",
                      `Generate market size and opportunity analysis for: ${pitchData.solution}`,
                    )
                  }
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  AI Generate
                </Button>
              </div>
              <Textarea
                id="market_size"
                placeholder="Describe the market size, growth potential, and opportunity..."
                value={pitchData.market_size}
                onChange={(e) => handleInputChange("market_size", e.target.value)}
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="target_audience">Target Audience Details</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleAIGenerate("target_audience", `Define target audience for: ${pitchData.solution}`)
                  }
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  AI Generate
                </Button>
              </div>
              <Textarea
                id="target_audience"
                placeholder="Who are your ideal customers? Demographics, psychographics, behavior..."
                value={pitchData.target_audience}
                onChange={(e) => handleInputChange("target_audience", e.target.value)}
                rows={4}
              />
            </div>
          </div>
        )

      case "business":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="revenue_model">Revenue Model</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleAIGenerate("revenue_model", `Generate a revenue model for: ${pitchData.solution}`)
                  }
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  AI Generate
                </Button>
              </div>
              <Textarea
                id="revenue_model"
                placeholder="How do you make money? Pricing strategy, revenue streams..."
                value={pitchData.revenue_model}
                onChange={(e) => handleInputChange("revenue_model", e.target.value)}
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="go_to_market">Go-to-Market Strategy</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleAIGenerate("go_to_market", `Generate go-to-market strategy for: ${pitchData.solution}`)
                  }
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  AI Generate
                </Button>
              </div>
              <Textarea
                id="go_to_market"
                placeholder="How will you reach your customers? Marketing channels, sales strategy..."
                value={pitchData.go_to_market}
                onChange={(e) => handleInputChange("go_to_market", e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="competition">Competition Analysis</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleAIGenerate("competition", `Generate competition analysis for: ${pitchData.solution}`)
                  }
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  AI Generate
                </Button>
              </div>
              <Textarea
                id="competition"
                placeholder="Who are your competitors? How are you different and better?"
                value={pitchData.competition}
                onChange={(e) => handleInputChange("competition", e.target.value)}
                rows={4}
              />
            </div>
          </div>
        )

      case "team":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="team">Team & Execution</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleAIGenerate("team", `Generate team description and execution plan for: ${pitchData.solution}`)
                  }
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  AI Generate
                </Button>
              </div>
              <Textarea
                id="team"
                placeholder="Introduce your team, their expertise, and your execution plan..."
                value={pitchData.team}
                onChange={(e) => handleInputChange("team", e.target.value)}
                rows={6}
              />
              <p className="text-sm text-muted-foreground">
                Highlight key team members, their relevant experience, and why they are the right people to execute this
                vision.
              </p>
            </div>
          </div>
        )

      case "ask":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="ask">The Ask</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleAIGenerate(
                      "ask",
                      `Generate a compelling ask/call-to-action for a ${pitchData.type} pitch about: ${pitchData.solution}`,
                    )
                  }
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  AI Generate
                </Button>
              </div>
              <Textarea
                id="ask"
                placeholder="What do you need? Funding amount, partnership, support, next steps..."
                value={pitchData.ask}
                onChange={(e) => handleInputChange("ask", e.target.value)}
                rows={5}
              />
              <p className="text-sm text-muted-foreground">
                Be specific about what you are asking for and what the next steps should be.
              </p>
            </div>
          </div>
        )

      case "review":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Your Pitch is Ready! 🎉</h3>
              <p className="text-muted-foreground">Review your pitch and export it in your preferred format</p>
            </div>

            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="export">Export Options</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{pitchData.title}</CardTitle>
                    <CardDescription>{pitchData.description}</CardDescription>
                    <div className="flex gap-2">
                      <Badge>{pitchData.type}</Badge>
                      <Badge variant="outline">{pitchData.audience}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pitchData.problem && (
                      <div>
                        <h4 className="font-semibold mb-2">Problem</h4>
                        <p className="text-sm text-muted-foreground">{pitchData.problem}</p>
                      </div>
                    )}
                    {pitchData.solution && (
                      <div>
                        <h4 className="font-semibold mb-2">Solution</h4>
                        <p className="text-sm text-muted-foreground">{pitchData.solution}</p>
                      </div>
                    )}
                    {pitchData.ask && (
                      <div>
                        <h4 className="font-semibold mb-2">The Ask</h4>
                        <p className="text-sm text-muted-foreground">{pitchData.ask}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="export" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">PDF Document</h3>
                      <p className="text-sm text-muted-foreground mb-4">Professional PDF format perfect for sharing</p>
                      <Button className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <Share className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Share Link</h3>
                      <p className="text-sm text-muted-foreground mb-4">Generate a secure link to share your pitch</p>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Share className="w-4 h-4 mr-2" />
                        Create Link
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <Card className="glass-effect mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">{pitchSteps[currentStep].title}</h2>
              <p className="text-muted-foreground">{pitchSteps[currentStep].description}</p>
            </div>
            <Badge variant="outline">
              Step {currentStep + 1} of {pitchSteps.length}
            </Badge>
          </div>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card className="glass-effect mb-8">
        <CardContent className="p-8">{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>

          {currentStep === pitchSteps.length - 1 ? (
            <Button onClick={handleSave}>
              <Sparkles className="w-4 h-4 mr-2" />
              Complete Pitch
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}