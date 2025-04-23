"use client"

import { useState } from "react"
import { IconFileExport, IconFileTypePdf, IconFileTypeCsv, IconCalendarTime, IconUser } from "@tabler/icons-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { toast } from "sonner"

// Mock data for users
const users = [
  { id: "all", name: "All Users" },
  { id: "1", name: "Kim Min-ji" },
  { id: "2", name: "Park Ji-sung" },
  { id: "3", name: "Lee Soo-jin" }
]

export function ExportTools() {
  const [selectedUser, setSelectedUser] = useState("all")
  const [exportFormat, setExportFormat] = useState("pdf")
  const [dateRange, setDateRange] = useState<{
    from?: Date,
    to?: Date
  }>({})
  const [isExporting, setIsExporting] = useState(false)
  
  const handleExport = () => {
    if (!dateRange.from || !dateRange.to) {
      toast.error("Please select a date range")
      return
    }
    
    setIsExporting(true)
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      
      toast.success(
        `Successfully exported logs as ${exportFormat.toUpperCase()}`,
        {
          description: `${selectedUser === "all" ? "All users" : users.find(u => u.id === selectedUser)?.name} - ${format(dateRange.from!, "MMM d, yyyy")} to ${format(dateRange.to!, "MMM d, yyyy")}`
        }
      )
    }, 2000)
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <div className="p-4 pb-0">
        <h2 className="text-lg font-semibold">Export Logs</h2>
        <p className="text-sm text-muted-foreground">
          Export conversation logs in PDF or CSV format
        </p>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Select User</label>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1.5 block">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <IconCalendarTime className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM d, yyyy")} -{" "}
                        {format(dateRange.to, "MMM d, yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM d, yyyy")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1.5 block">Export Format</label>
            <div className="flex gap-2">
              <Button 
                variant={exportFormat === "pdf" ? "default" : "outline"} 
                className="flex-1 justify-start"
                onClick={() => setExportFormat("pdf")}
              >
                <IconFileTypePdf className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button 
                variant={exportFormat === "csv" ? "default" : "outline"} 
                className="flex-1 justify-start"
                onClick={() => setExportFormat("csv")}
              >
                <IconFileTypeCsv className="mr-2 h-4 w-4" />
                CSV
              </Button>
            </div>
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleExport}
            disabled={isExporting || !dateRange.from || !dateRange.to}
          >
            {isExporting ? (
              <>Exporting...</>
            ) : (
              <>
                <IconFileExport className="mr-2 h-4 w-4" />
                Export Logs
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}