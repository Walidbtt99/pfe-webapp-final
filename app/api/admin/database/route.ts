import { type NextRequest, NextResponse } from "next/server"
import { getDbPool } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const pool = getDbPool()
    const client = await pool.connect()

    // Get all contacts with detailed info
    const contactsResult = await client.query(`
      SELECT 
        id,
        name,
        email,
        company,
        message,
        created_at,
        LENGTH(message) as message_length
      FROM contacts 
      ORDER BY created_at DESC
    `)

    // Get database statistics
    const statsResult = await client.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN company IS NOT NULL THEN 1 END) as contacts_with_company,
        MIN(created_at) as first_contact,
        MAX(created_at) as latest_contact
      FROM contacts
    `)

    // Get table info
    const tableInfoResult = await client.query(`
      SELECT 
        column_name,
        data_type,
        is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'contacts'
      ORDER BY ordinal_position
    `)

    client.release()

    return NextResponse.json({
      success: true,
      data: {
        contacts: contactsResult.rows,
        statistics: statsResult.rows[0],
        table_structure: tableInfoResult.rows,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Database query error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// POST endpoint to add test data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === "add_test_data") {
      const pool = getDbPool()
      const client = await pool.connect()

      const testContacts = [
        {
          name: "Jean Dupont",
          email: "jean.dupont@test.com",
          company: "TechCorp France",
          message: "Intéressé par vos solutions d'électromobilité pour notre flotte de véhicules.",
        },
        {
          name: "Marie Martin",
          email: "marie.martin@innovation.fr",
          company: "Innovation Auto",
          message: "Demande d'information sur vos services de diagnostic et maintenance.",
        },
        {
          name: "Pierre Durand",
          email: "p.durand@email.com",
          company: null,
          message: "Question sur l'architecture électronique de véhicules connectés.",
        },
      ]

      const insertedContacts = []

      for (const contact of testContacts) {
        const result = await client.query(
          `INSERT INTO contacts (name, email, company, message, created_at) 
           VALUES ($1, $2, $3, $4, NOW()) 
           RETURNING id, created_at`,
          [contact.name, contact.email, contact.company, contact.message],
        )

        insertedContacts.push({
          ...contact,
          id: result.rows[0].id,
          created_at: result.rows[0].created_at,
        })
      }

      client.release()

      return NextResponse.json({
        success: true,
        message: `${insertedContacts.length} test contacts added`,
        contacts: insertedContacts,
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("❌ Error adding test data:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
