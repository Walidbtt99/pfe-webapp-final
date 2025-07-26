"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DatabaseStatus {
  status: string
  database: string
  timestamp: string
}

export default function DatabaseMonitor() {
  const [status, setStatus] = useState<DatabaseStatus | null>(null)
  const [loading, setLoading] = useState(true)

  const checkStatus = async () => {
    try {
      const response = await fetch("/api/contact")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      setStatus({
        status: "ERROR",
        database: "disconnected",
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkStatus()
    const interval = setInterval(checkStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-4">
          <div className="animate-pulse">Checking database status...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Database Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <Badge variant={status?.database === "connected" ? "default" : "destructive"}>
              {status?.database === "connected" ? "🟢 Connected" : "🔴 Disconnected"}
            </Badge>
            <p className="text-xs text-gray-500 mt-1">
              Last check: {status?.timestamp ? new Date(status.timestamp).toLocaleTimeString() : "Unknown"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
