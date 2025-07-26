"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Contact {
  id: number
  name: string
  email: string
  company?: string
  message: string
  created_at: string
}

export default function AdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/contacts")

      if (!response.ok) {
        throw new Error("Failed to fetch contacts")
      }

      const data = await response.json()
      setContacts(data.contacts)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold uppercase text-black mb-4">ADMIN - CONTACTS</h1>
              <div className="w-24 h-1 bg-[#C0D830]"></div>
            </div>
            <Button onClick={fetchContacts} disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">Error: {error}</div>
          )}

          <div className="grid gap-6">
            {contacts.map((contact) => (
              <Card key={contact.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{contact.name}</h3>
                      <p className="text-gray-600">{contact.email}</p>
                      {contact.company && <p className="text-sm text-gray-500">{contact.company}</p>}
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(contact.created_at).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {contacts.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun contact trouvé</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
