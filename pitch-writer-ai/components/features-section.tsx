"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, FileText, Download, History, Palette, Brain, Target, Zap, Shield, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Writing",
    description: "Generate compelling pitch content with advanced AI that understands your business context.",
    badge: "AI",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  },
  {
    icon: FileText,
    title: "Professional Templates",
    description: "Choose from expertly crafted templates for startups, sales, academic, and marketing pitches.",
    badge: "Templates",
    color: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  },
  {
    icon: Palette,
    title: "Tone & Style Control",
    description: "Adjust your pitch tone for different audiences - formal, persuasive, friendly, or concise.",
    badge: "Customization",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  },
  {
    icon: Target,
    title: "Audience Targeting",
    description: "Customize your pitch for specific audiences like VCs, customers, or internal stakeholders.",
    badge: "Targeting",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
  },
  {
    icon: Download,
    title: "Multiple Export Options",
    description: "Export your pitches as PDF, PowerPoint, or share via secure links.",
    badge: "Export",
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400",
  },
  {
    icon: History,
    title: "Version History",
    description: "Track changes and revert to previous versions of your pitches anytime.",
    badge: "History",
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
  },
  {
    icon: Zap,
    title: "Quick Generation",
    description: "Create elevator pitches, summaries, and full presentations in seconds.",
    badge: "Speed",
    color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and secure. Share pitches with confidence.",
    badge: "Security",
    color: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track pitch performance and get insights to improve your success rate.",
    badge: "Analytics",
    color: "bg-teal-100 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6 glass-effect">
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything You Need to Create
            <span className="block text-primary">Winning Pitches</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of tools helps you craft, refine, and deliver pitches that get results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="glass-effect hover:shadow-lg transition-all duration-300 group border-0">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-full ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
