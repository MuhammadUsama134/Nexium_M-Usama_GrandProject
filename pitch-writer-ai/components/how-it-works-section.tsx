"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Edit3, Sparkles, Download } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    step: "01",
    title: "Choose Your Template",
    description: "Select from our library of professional templates or start from scratch with our guided builder.",
    icon: Edit3,
    color: "bg-blue-500",
  },
  {
    step: "02",
    title: "AI-Powered Creation",
    description: "Our AI analyzes your input and generates compelling content tailored to your audience and goals.",
    icon: Sparkles,
    color: "bg-purple-500",
  },
  {
    step: "03",
    title: "Export & Share",
    description: "Download your pitch as PDF, PowerPoint, or share it via secure link with stakeholders.",
    icon: Download,
    color: "bg-green-500",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6">
            Simple Process
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create professional pitches in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="relative">
                <Card className="glass-effect hover:shadow-lg transition-all duration-300 group h-full">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <div
                        className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <Badge variant="outline" className="absolute -top-2 -right-2 text-xs font-bold">
                        {step.step}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link href="/auth">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Creating Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
