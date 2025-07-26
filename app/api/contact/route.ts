import { type NextRequest, NextResponse } from "next/server"
import { saveContact, testConnection } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    console.log("📨 Received contact form submission")

    const body = await request.json()
    const { name, email, company, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      console.log("❌ Missing required fields")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("❌ Invalid email format:", email)
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    console.log("✅ Validation passed, saving to database...")

    // Save to database
    const savedContact = await saveContact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || undefined,
      message: message.trim(),
    })

    console.log("✅ Contact saved successfully:", savedContact.id)

    return NextResponse.json(
      {
        message: "Contact form submitted successfully",
        id: savedContact.id,
        timestamp: savedContact.created_at,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Error processing contact form:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Health check endpoint that tests database connection
export async function GET() {
  try {
    const dbConnected = await testConnection()

    return NextResponse.json({
      status: "OK",
      database: dbConnected ? "connected" : "disconnected",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "ERROR",
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
