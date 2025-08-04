import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("pitchwriter")
    const collection = db.collection("pitch_analytics")

    // Get user's pitch analytics
    const analytics = await collection.find({ user_id: user.id }).toArray()

    // Calculate statistics
    const stats = {
      totalPitches: analytics.length,
      pitchTypes: analytics.reduce(
        (acc, pitch) => {
          acc[pitch.type] = (acc[pitch.type] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      ),
      audienceTypes: analytics.reduce(
        (acc, pitch) => {
          acc[pitch.audience] = (acc[pitch.audience] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      ),
      averageWordCount:
        analytics.reduce((sum, pitch) => sum + (pitch.word_count?.total || 0), 0) / analytics.length || 0,
      createdThisMonth: analytics.filter(
        (pitch) => new Date(pitch.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      ).length,
    }

    return NextResponse.json({ analytics: stats })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
