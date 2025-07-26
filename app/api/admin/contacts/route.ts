import { type NextRequest, NextResponse } from "next/server"
import { getAllContacts } from "@/lib/database"

// GET endpoint to retrieve all contacts (for admin purposes)
export async function GET(request: NextRequest) {
  try {
    console.log("📋 Fetching all contacts from database")

    const contacts = await getAllContacts()

    console.log(`✅ Retrieved ${contacts.length} contacts`)

    return NextResponse.json({
      contacts,
      total: contacts.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Error fetching contacts:", error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}
