"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Startup Founder",
    company: "TechFlow",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "Pitch Writer AI helped me secure $2M in Series A funding. The AI-generated content was so compelling that investors were asking for follow-up meetings immediately.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Sales Director",
    company: "SalesForce Pro",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "Our conversion rate increased by 40% after using Pitch Writer AI for our sales presentations. The audience targeting feature is a game-changer.",
    rating: 5,
  },
  {
    name: "Dr. Emily Watson",
    role: "Research Professor",
    company: "MIT",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "As an academic, I struggle with making my research accessible. This platform helped me present my work in a way that both peers and funding committees could understand.",
    rating: 5,
  },
  {
    name: "James Park",
    role: "Product Manager",
    company: "InnovateCorp",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "The template library saved me hours of work. I can now create professional product pitches in minutes instead of days.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "Marketing Lead",
    company: "GrowthHack",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "The tone adjustment feature is incredible. I can adapt the same pitch for different stakeholders - from technical teams to C-suite executives.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Entrepreneur",
    company: "StartupLab",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "I've used this for investor pitches, client presentations, and even job interviews. It's like having a professional copywriter on demand.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Trusted by Professionals
            <span className="block text-primary">Worldwide</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how Pitch Writer AI has helped thousands of professionals create winning pitches
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-effect hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
