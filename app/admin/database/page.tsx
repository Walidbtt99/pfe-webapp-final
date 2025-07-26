"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Contact {
  id: number
  name: string
  email: string
  company?: string
  message: string
  created_at: string
  message_length: number
}

interface DatabaseStats {
  total_contacts: string
  contacts_with_company: string
  first_contact: string
  latest_contact: string
}

interface TableColumn {
  column_name: string
  data_type: string
  is_nullable: string
}

interface DatabaseData {
  contacts: Contact[]
  statistics: DatabaseStats
  table_structure: TableColumn[]
}

export default function DatabaseAdminPage() {
  const [data, setData] = useState<DatabaseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDatabaseData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/database")

      if (!response.ok) {
        throw new Error("Failed to fetch database data")
      }

      const result = await response.json()
      if (result.success) {
        setData(result.data)
        setError(null)
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const addTestData = async () => {
    try {
      const response = await fetch("/api/admin/database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_test_data" }),
      })

      const result = await response.json()
      if (result.success) {
        alert(`✅ ${result.message}`)
        fetchDatabaseData() // Refresh data
      } else {
        alert(`❌ Error: ${result.error}`)
      }
    } catch (err) {
      alert(`❌ Error: ${err instanceof Error ? err.message : "Unknown error"}`)
    }
  }

  useEffect(() => {
    fetchDatabaseData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-xl">Loading database data...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Database Error:</strong> {error}
          </div>
          <Button onClick={fetchDatabaseData} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold uppercase text-black mb-4">DATABASE ADMIN</h1>
              <div className="w-24 h-1 bg-[#C0D830]"></div>
            </div>
            <div className="flex gap-4">
              <Button onClick={fetchDatabaseData} disabled={loading}>
                🔄 Refresh
              </Button>
              <Button onClick={addTestData} variant="outline">
                ➕ Add Test Data
              </Button>
            </div>
          </div>

          {/* Statistics */}
          {data && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#C0D830]">{data.statistics.total_contacts}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">With Company</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{data.statistics.contacts_with_company}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">First Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-700">
                    {data.statistics.first_contact
                      ? new Date(data.statistics.first_contact).toLocaleDateString("fr-FR")
                      : "N/A"}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Latest Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-700">
                    {data.statistics.latest_contact
                      ? new Date(data.statistics.latest_contact).toLocaleDateString("fr-FR")
                      : "N/A"}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Table Structure */}
          {data && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>📋 Table Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Nullable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.table_structure.map((column) => (
                        <tr key={column.column_name}>
                          <td className="border border-gray-300 px-4 py-2 font-mono">{column.column_name}</td>
                          <td className="border border-gray-300 px-4 py-2">{column.data_type}</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Badge variant={column.is_nullable === "YES" ? "secondary" : "destructive"}>
                              {column.is_nullable}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contacts Data */}
          {data && (
            <Card>
              <CardHeader>
                <CardTitle>📞 All Contacts ({data.contacts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {data.contacts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No contacts found in database</p>
                    <Button onClick={addTestData} className="mt-4">
                      Add Test Data
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Company</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Message</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.contacts.map((contact) => (
                          <tr key={contact.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 font-mono">{contact.id}</td>
                            <td className="border border-gray-300 px-4 py-2 font-semibold">{contact.name}</td>
                            <td className="border border-gray-300 px-4 py-2 text-blue-600">{contact.email}</td>
                            <td className="border border-gray-300 px-4 py-2">
                              {contact.company || <span className="text-gray-400 italic">N/A</span>}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 max-w-xs">
                              <div className="truncate" title={contact.message}>
                                {contact.message}
                              </div>
                              <Badge variant="outline" className="mt-1">
                                {contact.message_length} chars
                              </Badge>
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">
                              {new Date(contact.created_at).toLocaleString("fr-FR")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
