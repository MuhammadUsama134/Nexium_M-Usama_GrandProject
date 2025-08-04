"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PitchBuilder } from "@/components/pitch-builder"
import { DashboardHeader } from "@/components/dashboard-header"
import { usePitches } from "@/hooks/use-pitches"

export default function EditPitchPage() {
  const params = useParams()
  const { getPitch } = usePitches()
  const [pitch, setPitch] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPitch = async () => {
      if (params.id) {
        try {
          const pitchData = await getPitch(params.id as string)
          setPitch(pitchData)
        } catch (error) {
          console.error("Error loading pitch:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    loadPitch()
  }, [params.id, getPitch])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <DashboardHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Pitch</h1>
          <p className="text-muted-foreground">Update your pitch content and settings</p>
        </div>
        <PitchBuilder initialData={pitch} />
      </div>
    </div>
  )
}
