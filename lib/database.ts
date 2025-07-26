import { Pool } from "pg"

// Create a connection pool to PostgreSQL
let pool: Pool | null = null

export function getDbPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Connection pool settings
      max: 20, // Maximum number of connections
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })

    // Handle connection errors
    pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err)
    })

    console.log("✅ Database connection pool created")
  }

  return pool
}

// Function to save contact form data
export async function saveContact(contactData: {
  name: string
  email: string
  company?: string
  message: string
}) {
  const pool = getDbPool()
  const client = await pool.connect()

  try {
    console.log("💾 Saving contact to database:", contactData.email)

    const query = `
      INSERT INTO contacts (name, email, company, message, created_at) 
      VALUES ($1, $2, $3, $4, NOW()) 
      RETURNING id, created_at
    `

    const values = [contactData.name, contactData.email, contactData.company || null, contactData.message]

    const result = await client.query(query, values)

    console.log("✅ Contact saved with ID:", result.rows[0].id)

    return {
      id: result.rows[0].id,
      created_at: result.rows[0].created_at,
      ...contactData,
    }
  } catch (error) {
    console.error("❌ Database error:", error)
    throw new Error("Failed to save contact to database")
  } finally {
    // Always release the client back to the pool
    client.release()
  }
}

// Function to get all contacts (for admin purposes)
export async function getAllContacts() {
  const pool = getDbPool()
  const client = await pool.connect()

  try {
    const result = await client.query(
      "SELECT id, name, email, company, message, created_at FROM contacts ORDER BY created_at DESC",
    )

    return result.rows
  } catch (error) {
    console.error("❌ Database error:", error)
    throw new Error("Failed to fetch contacts")
  } finally {
    client.release()
  }
}

// Test database connection
export async function testConnection() {
  try {
    const pool = getDbPool()
    const client = await pool.connect()

    const result = await client.query("SELECT NOW() as current_time")
    client.release()

    console.log("✅ Database connection successful:", result.rows[0].current_time)
    return true
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    return false
  }
}
