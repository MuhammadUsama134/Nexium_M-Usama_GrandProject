"use client"
import { PitchBuilder } from "@/components/pitch-builder"
import { DashboardHeader } from "@/components/dashboard-header"

export default function CreatePitchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Pitch</h1>
          <p className="text-muted-foreground">Follow our step-by-step guide to create a compelling pitch</p>
        </div>
        <PitchBuilder />
      </div>
    </div>
  )
}
