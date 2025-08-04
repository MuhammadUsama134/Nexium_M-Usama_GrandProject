"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "./use-auth"

interface Pitch {
  id: string
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
  created_at: string
  updated_at: string
  user_id: string
}

export function usePitches() {
  const [pitches, setPitches] = useState<Pitch[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    if (user) {
      fetchPitches()
    }
  }, [user])

  const fetchPitches = async () => {
    try {
      const { data, error } = await supabase
        .from("pitches")
        .select("*")
        .eq("user_id", user?.id)
        .order("updated_at", { ascending: false })

      if (error) throw error
      setPitches(data || [])
    } catch (error) {
      console.error("Error fetching pitches:", error)
    } finally {
      setLoading(false)
    }
  }

  const savePitch = async (pitchData: Omit<Pitch, "id" | "created_at" | "updated_at" | "user_id">) => {
    if (!user) throw new Error("User not authenticated")

    const { data, error } = await supabase
      .from("pitches")
      .insert([{ ...pitchData, user_id: user.id }])
      .select()
      .single()

    if (error) throw error

    setPitches((prev) => [data, ...prev])
    return data
  }

  const updatePitch = async (id: string, pitchData: Partial<Pitch>) => {
    const { data, error } = await supabase.from("pitches").update(pitchData).eq("id", id).select().single()

    if (error) throw error

    setPitches((prev) => prev.map((p) => (p.id === id ? data : p)))
    return data
  }

  const deletePitch = async (id: string) => {
    const { error } = await supabase.from("pitches").delete().eq("id", id)

    if (error) throw error

    setPitches((prev) => prev.filter((p) => p.id !== id))
  }

  const getPitch = async (id: string) => {
    const { data, error } = await supabase.from("pitches").select("*").eq("id", id).single()

    if (error) throw error
    return data
  }

  return {
    pitches,
    loading,
    savePitch,
    updatePitch,
    deletePitch,
    getPitch,
    refetch: fetchPitches,
  }
}
