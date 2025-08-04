"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-8 glass-effect">
            <Sparkles className="w-4 h-4 mr-2" />
            Ready to Get Started?
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            Create Your First
            <span className="block text-primary">Winning Pitch Today</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who are already creating compelling pitches with AI. Start your free trial
            today - no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/auth">
              <Button size="lg" className="text-lg px-8 py-6 group">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass-effect bg-transparent">
                Browse Templates
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            Free forever plan available • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}
