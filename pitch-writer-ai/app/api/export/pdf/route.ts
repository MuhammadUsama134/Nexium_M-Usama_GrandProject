import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { jsPDF } from "jspdf"

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

    const { pitchId } = await request.json()

    // Get pitch data
    const { data: pitch, error } = await supabase
      .from("pitches")
      .select("*")
      .eq("id", pitchId)
      .eq("user_id", user.id)
      .single()

    if (error || !pitch) {
      return NextResponse.json({ error: "Pitch not found" }, { status: 404 })
    }

    // Create PDF
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.width
    const margin = 20
    let yPosition = margin

    // Title
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text(pitch.title, margin, yPosition)
    yPosition += 20

    // Description
    if (pitch.description) {
      doc.setFontSize(12)
      doc.setFont("helvetica", "normal")
      const descLines = doc.splitTextToSize(pitch.description, pageWidth - 2 * margin)
      doc.text(descLines, margin, yPosition)
      yPosition += descLines.length * 6 + 10
    }

    // Sections
    const sections = [
      { title: "Problem Statement", content: pitch.problem },
      { title: "Solution", content: pitch.solution },
      { title: "Market Size", content: pitch.market_size },
      { title: "Target Audience", content: pitch.target_audience },
      { title: "Unique Selling Proposition", content: pitch.usp },
      { title: "Revenue Model", content: pitch.revenue_model },
      { title: "Go-to-Market Strategy", content: pitch.go_to_market },
      { title: "Competition", content: pitch.competition },
      { title: "Team", content: pitch.team },
      { title: "The Ask", content: pitch.ask },
    ]

    sections.forEach((section) => {
      if (section.content) {
        // Check if we need a new page
        if (yPosition > doc.internal.pageSize.height - 40) {
          doc.addPage()
          yPosition = margin
        }

        // Section title
        doc.setFontSize(16)
        doc.setFont("helvetica", "bold")
        doc.text(section.title, margin, yPosition)
        yPosition += 10

        // Section content
        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")
        const contentLines = doc.splitTextToSize(section.content, pageWidth - 2 * margin)
        doc.text(contentLines, margin, yPosition)
        yPosition += contentLines.length * 5 + 15
      }
    })

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"))

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${pitch.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
