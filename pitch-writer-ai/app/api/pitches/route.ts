import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import clientPromise from "@/lib/mongodb"
import { n8nClient } from "@/lib/n8n"

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

    const { data: pitches, error } = await supabase
      .from("pitches")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ pitches })
  } catch (error) {
    console.error("Error fetching pitches:", error)
    return NextResponse.json({ error: "Failed to fetch pitches" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const pitchData = await request.json()

    // Save to Supabase (primary database)
    const { data: pitch, error: supabaseError } = await supabase
      .from("pitches")
      .insert([{ ...pitchData, user_id: user.id }])
      .select()
      .single()

    if (supabaseError) {
      throw supabaseError
    }

    // Also save to MongoDB for analytics and complex queries
    try {
      const client = await clientPromise
      const db = client.db("pitchwriter")
      const collection = db.collection("pitch_analytics")

      await collection.insertOne({
        pitch_id: pitch.id,
        user_id: user.id,
        type: pitchData.type,
        audience: pitchData.audience,
        created_at: new Date(),
        word_count: {
          problem: pitchData.problem?.split(" ").length || 0,
          solution: pitchData.solution?.split(" ").length || 0,
          total: Object.values(pitchData).join(" ").split(" ").length,
        },
      })
    } catch (mongoError) {
      console.error("MongoDB save failed:", mongoError)
      // Don't fail the request if MongoDB fails
    }

    // Track analytics via n8n
    try {
      await n8nClient.trackAnalytics("pitch_created", {
        pitch_id: pitch.id,
        user_id: user.id,
        type: pitchData.type,
        audience: pitchData.audience,
      })
    } catch (n8nError) {
      console.error("N8n analytics failed:", n8nError)
      // Don't fail the request if n8n fails
    }

    return NextResponse.json({ pitch })
  } catch (error) {
    console.error("Error creating pitch:", error)
    return NextResponse.json({ error: "Failed to create pitch" }, { status: 500 })
  }
}
