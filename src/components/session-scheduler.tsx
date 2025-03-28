"use client"

import * as React from "react"
import { useState } from "react"
import {
  IconCalendar,
  IconCheck,
  IconLanguage,
  IconVideo,
} from "@tabler/icons-react"
import { format} from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent,CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toggle } from "@/components/ui/toggle"

// Sample available time slots
const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
]

// Sample coaches data
const coaches = [
  { id: "coach1", name: "Sarah Kim", expertise: ["Communication", "Leadership"], language: ["English", "Korean"] },
  { id: "coach2", name: "Min-ho Park", expertise: ["Career Development", "Networking"], language: ["Korean", "English"] },
  { id: "coach3", name: "Ji-young Lee", expertise: ["Stress Management", "Work-Life Balance"], language: ["Korean"] },
  { id: "coach4", name: "Sung-ho Kim", expertise: ["Leadership", "Team Management"], language: ["Korean", "English"] },
  { id: "coach5", name: "Hye-jin Cho", expertise: ["Public Speaking", "Anxiety Management"], language: ["Korean", "English"] },
]

// Sample booked sessions
const bookedSessions = [
  { date: "2025-03-29", time: "10:00", coachId: "coach1", userId: "user123" },
  { date: "2025-03-30", time: "14:00", coachId: "coach2", userId: "user456" },
  { date: "2025-04-01", time: "11:00", coachId: "coach1", userId: "user789" },
  { date: "2025-04-02", time: "15:00", coachId: "coach3", userId: "user101" },
]

export function SessionScheduler() {
  const [language, setLanguage] = useState<"english" | "korean">("english")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedCoach, setSelectedCoach] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  // Filter available time slots based on selected date and coach
  const getAvailableTimeSlots = () => {
    if (!date || !selectedCoach) return []
    
    const formattedDate = format(date, "yyyy-MM-dd")
    const bookedTimesForCoach = bookedSessions
      .filter(session => session.date === formattedDate && session.coachId === selectedCoach)
      .map(session => session.time)
    
    return timeSlots.filter(time => !bookedTimesForCoach.includes(time))
  }
  
  const availableTimeSlots = getAvailableTimeSlots()
  
  // Check if a date has any available coaches
  const isDateUnavailable = (date: Date) => {
    // Disable past dates and weekends
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return (
      date < today ||
      date.getDay() === 0 || // Sunday
      date.getDay() === 6    // Saturday
    )
  }
  
  // Handle booking confirmation
  const handleBookSession = () => {
    if (!date || !selectedCoach || !selectedTime) {
      toast.error(
        language === "english"
          ? "Please select a date, coach, and time"
          : "날짜, 코치 및 시간을 선택해주세요"
      )
      return
    }
    
    setShowConfirmation(true)
  }
  
  // Handle final booking submission
  const confirmBooking = () => {
    // In a real app, this would send data to an API
    toast.success(
      language === "english"
        ? "Session scheduled successfully!"
        : "세션이 성공적으로 예약되었습니다!"
    )
    
    // Reset form
    setSelectedTime("")
    setShowConfirmation(false)
  }
  
  // Get selected coach details
  const getSelectedCoach = () => {
    return coaches.find(coach => coach.id === selectedCoach)
  }
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {language === "english" ? "Schedule 1:1 Coaching Session" : "1:1 코칭 세션 예약"}
        </CardTitle>
        <Toggle
          aria-label="Toggle language"
          pressed={language === "korean"}
          onPressedChange={(pressed) => setLanguage(pressed ? "korean" : "english")}
        >
          <IconLanguage className="h-4 w-4 mr-2" />
          {language === "english" ? "English" : "한국어"}
        </Toggle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">
                {language === "english" ? "1. Select a Date" : "1. 날짜 선택"}
              </h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={isDateUnavailable}
                className="rounded-md border"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">
                {language === "english" ? "2. Select a Coach" : "2. 코치 선택"}
              </h3>
              <Select value={selectedCoach} onValueChange={setSelectedCoach}>
                <SelectTrigger>
                  <SelectValue placeholder={language === "english" ? "Select a coach" : "코치 선택"} />
                </SelectTrigger>
                <SelectContent>
                  {coaches.map((coach) => (
                    <SelectItem key={coach.id} value={coach.id}>
                      <div className="flex flex-col">
                        <span>{coach.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {coach.expertise.join(", ")}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedCoach && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-1">
                    {language === "english" ? "Coach Languages" : "코치 언어"}
                  </h4>
                  <div className="flex gap-1">
                    {getSelectedCoach()?.language.map((lang) => (
                      <Badge key={lang} variant="outline">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">
                {language === "english" ? "3. Select a Time" : "3. 시간 선택"}
              </h3>
              
              {date && selectedCoach ? (
                availableTimeSlots.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    {language === "english"
                      ? "No available time slots for the selected date and coach."
                      : "선택한 날짜와 코치에 대한 사용 가능한 시간 슬롯이 없습니다."}
                  </p>
                )
              ) : (
                <p className="text-muted-foreground">
                  {language === "english"
                    ? "Please select a date and coach first."
                    : "먼저 날짜와 코치를 선택해주세요."}
                </p>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">
                {language === "english" ? "4. Session Details" : "4. 세션 세부 정보"}
              </h3>
              
              <div className="rounded-md border p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <IconCalendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {date
                      ? format(date, "PPP")
                      : language === "english"
                      ? "No date selected"
                      : "날짜가 선택되지 않았습니다"}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <IconVideo className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {selectedCoach
                      ? getSelectedCoach()?.name
                      : language === "english"
                      ? "No coach selected"
                      : "코치가 선택되지 않았습니다"}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <IconCalendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {selectedTime
                      ? selectedTime
                      : language === "english"
                      ? "No time selected"
                      : "시간이 선택되지 않았습니다"}
                  </span>
                </div>
                
                <div className="pt-2">
                  <Button
                    className="w-full"
                    disabled={!date || !selectedCoach || !selectedTime}
                    onClick={handleBookSession}
                  >
                    {language === "english" ? "Book Session" : "세션 예약"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === "english" ? "Confirm Booking" : "예약 확인"}
            </DialogTitle>
            <DialogDescription>
              {language === "english"
                ? "Please confirm your coaching session details."
                : "코칭 세션 세부 정보를 확인하세요."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium">
                  {language === "english" ? "Date" : "날짜"}
                </h4>
                <p>{date && format(date, "PPP")}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">
                  {language === "english" ? "Time" : "시간"}
                </h4>
                <p>{selectedTime}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">
                  {language === "english" ? "Coach" : "코치"}
                </h4>
                <p>{getSelectedCoach()?.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">
                  {language === "english" ? "Session Type" : "세션 유형"}
                </h4>
                <p>{language === "english" ? "Video Call (Zoom)" : "화상 통화 (Zoom)"}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium">
                {language === "english" ? "Important Notes" : "중요 사항"}
              </h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                <li>
                  {language === "english"
                    ? "You will receive a Zoom link via email before the session."
                    : "세션 전에 이메일로 Zoom 링크를 받게 됩니다."}
                </li>
                <li>
                  {language === "english"
                    ? "Please join the session 5 minutes before the scheduled time."
                    : "예약된 시간보다 5분 전에 세션에 참여해 주세요."}
                </li>
                <li>
                  {language === "english"
                    ? "If you need to cancel, please do so at least 24 hours in advance."
                    : "취소해야 하는 경우 최소 24시간 전에 취소해 주세요."}
                </li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
            >
              {language === "english" ? "Cancel" : "취소"}
            </Button>
            <Button onClick={confirmBooking}>
              <IconCheck className="h-4 w-4 mr-2" />
              {language === "english" ? "Confirm Booking" : "예약 확인"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
