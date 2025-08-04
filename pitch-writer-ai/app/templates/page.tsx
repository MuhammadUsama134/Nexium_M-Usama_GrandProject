"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Briefcase, Users, GraduationCap, TrendingUp, Rocket } from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"

const templates = [
  {
    id: "startup-pitch",
    title: "Startup Pitch",
    description: "Perfect for presenting your startup to investors and accelerators",
    category: "Business",
    difficulty: "Intermediate",
    icon: Rocket,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    sections: ["Problem", "Solution", "Market Size", "Business Model", "Traction", "Team", "Funding Ask"],
  },
  {
    id: "product-pitch",
    title: "Product Pitch",
    description: "Showcase your product features and benefits to potential customers",
    category: "Product",
    difficulty: "Beginner",
    icon: Briefcase,
    color: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    sections: ["Product Overview", "Key Features", "Benefits", "Use Cases", "Pricing", "Call to Action"],
  },
  {
    id: "sales-pitch",
    title: "Sales Pitch",
    description: "Convert prospects into customers with a compelling sales presentation",
    category: "Sales",
    difficulty: "Intermediate",
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    sections: [
      "Problem Identification",
      "Solution Presentation",
      "Value Proposition",
      "Social Proof",
      "Objection Handling",
      "Close",
    ],
  },
  {
    id: "academic-pitch",
    title: "Academic Pitch",
    description: "Present your research or academic project effectively",
    category: "Academic",
    difficulty: "Advanced",
    icon: GraduationCap,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
    sections: ["Research Question", "Literature Review", "Methodology", "Findings", "Implications", "Future Work"],
  },
  {
    id: "marketing-proposal",
    title: "Marketing Proposal",
    description: "Propose marketing strategies and campaigns to stakeholders",
    category: "Marketing",
    difficulty: "Intermediate",
    icon: Users,
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400",
    sections: [
      "Market Analysis",
      "Target Audience",
      "Strategy Overview",
      "Tactics",
      "Budget",
      "Timeline",
      "Expected ROI",
    ],
  },
]

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category.toLowerCase() === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || template.difficulty.toLowerCase() === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const categories = ["all", ...Array.from(new Set(templates.map((t) => t.category.toLowerCase())))]
  const difficulties = ["all", ...Array.from(new Set(templates.map((t) => t.difficulty.toLowerCase())))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Pitch Templates</h1>
          <p className="text-muted-foreground">
            Choose from our professionally crafted templates to get started quickly
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty === "all" ? "All Levels" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const IconComponent = template.icon
            return (
              <Card key={template.id} className="glass-effect hover:shadow-lg transition-all duration-200 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-full ${template.color} mb-4`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{template.category}</Badge>
                      <Badge
                        variant={
                          template.difficulty === "Beginner"
                            ? "default"
                            : template.difficulty === "Intermediate"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {template.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Includes:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.sections.slice(0, 3).map((section, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                      {template.sections.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.sections.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Link href={`/pitch/create?template=${template.id}`}>
                    <Button className="w-full">Use This Template</Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or browse all templates</p>
          </div>
        )}
      </div>
    </div>
  )
}
