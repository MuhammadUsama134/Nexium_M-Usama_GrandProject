"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Clock, TrendingUp, Sparkles, Edit, Trash2, Share } from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { useAuth } from "@/hooks/use-auth"
import { usePitches } from "@/hooks/use-pitches"
import { formatDistanceToNow } from "date-fns"

export default function DashboardPage() {
  const { user } = useAuth()
  const { pitches, loading, deletePitch } = usePitches()
  const [stats, setStats] = useState({
    totalPitches: 0,
    recentActivity: 0,
    successRate: 0,
  })

  useEffect(() => {
    if (pitches) {
      setStats({
        totalPitches: pitches.length,
        recentActivity: pitches.filter((p) => new Date(p.updated_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
          .length,
        successRate: Math.round(Math.random() * 30 + 70), // Mock success rate
      })
    }
  }, [pitches])

  const handleDeletePitch = async (pitchId: string) => {
    if (confirm("Are you sure you want to delete this pitch?")) {
      await deletePitch(pitchId)
    }
  }

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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.user_metadata?.full_name || "there"}! 👋</h1>
          <p className="text-muted-foreground">Ready to create your next compelling pitch?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pitches</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPitches}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentActivity}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.successRate}%</div>
              <p className="text-xs text-muted-foreground">Based on feedback</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/pitch/create">
              <Card className="glass-effect hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">New Pitch</h3>
                  <p className="text-sm text-muted-foreground">Start from scratch</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/templates">
              <Card className="glass-effect hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/30 transition-colors">
                    <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Use Template</h3>
                  <p className="text-sm text-muted-foreground">Choose from library</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/ai-assistant">
              <Card className="glass-effect hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-pink-200 group-hover:to-purple-200 dark:group-hover:from-pink-900/30 dark:group-hover:to-purple-900/30 transition-all">
                    <Sparkles className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h3 className="font-semibold mb-2">AI Assistant</h3>
                  <p className="text-sm text-muted-foreground">Get AI help</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/analytics">
              <Card className="glass-effect hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors">
                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Analytics</h3>
                  <p className="text-sm text-muted-foreground">View insights</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Pitches */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Pitches</h2>
            <Link href="/pitches">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          {pitches && pitches.length > 0 ? (
            <div className="grid gap-4">
              {pitches.slice(0, 5).map((pitch) => (
                <Card key={pitch.id} className="glass-effect">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{pitch.title}</h3>
                          <Badge variant={pitch.status === "completed" ? "default" : "secondary"}>{pitch.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{pitch.description || "No description"}</p>
                        <p className="text-xs text-muted-foreground">
                          Updated {formatDistanceToNow(new Date(pitch.updated_at))} ago
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Link href={`/pitch/${pitch.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeletePitch(pitch.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass-effect">
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No pitches yet</h3>
                <p className="text-muted-foreground mb-4">Create your first pitch to get started</p>
                <Link href="/pitch/create">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Pitch
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
