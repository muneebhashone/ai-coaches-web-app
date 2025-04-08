"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data - would be replaced with real data in production
const userData = [
    {
        id: 1,
        name: "Kim Min-ji",
        age: 32,
        occupation: "Marketing Manager",
        sessions: 8,
        goalProgress: 75,
        status: "active"
    },
    {
        id: 2,
        name: "Park Ji-sung",
        age: 28,
        occupation: "Software Developer",
        sessions: 12,
        goalProgress: 85,
        status: "active"
    },
    {
        id: 3,
        name: "Lee Soo-jin",
        age: 35,
        occupation: "Business Consultant",
        sessions: 5,
        goalProgress: 45,
        status: "stalled"
    },
    {
        id: 4,
        name: "Choi Woo-shik",
        age: 30,
        occupation: "Graphic Designer",
        sessions: 10,
        goalProgress: 65,
        status: "active"
    },
    {
        id: 5,
        name: "Kang Hye-jin",
        age: 27,
        occupation: "Graduate Student",
        sessions: 3,
        goalProgress: 30,
        status: "low-response"
    },
]

type BadgeVariant = "default" | "outline" | "secondary" | "destructive" | undefined

interface UserInsightsTableProps {
    language: "english" | "korean"
}

export function UserInsightsTable({ language }: UserInsightsTableProps) {
    // Status badge styling and text
    const getStatusBadge = (status: string) => {
        const variants: { [key: string]: { variant: BadgeVariant, label: string } } = {
            active: {
                variant: "default",
                label: language === "english" ? "Active" : "활성"
            },
            stalled: {
                variant: "destructive",
                label: language === "english" ? "Stalled" : "정체됨"
            },
            "low-response": {
                variant: "secondary",
                label: language === "english" ? "Low Response" : "낮은 응답"
            }
        }

        return variants[status] || { variant: "outline", label: status }
    }

    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>
                    {language === "english"
                        ? "User Insights"
                        : "사용자 인사이트"}
                </CardTitle>
                <CardDescription>
                    {language === "english"
                        ? "Detailed user demographics and progress statistics"
                        : "상세한 사용자 인구 통계 및 진행 통계"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{language === "english" ? "User" : "사용자"}</TableHead>
                            <TableHead>{language === "english" ? "Age" : "나이"}</TableHead>
                            <TableHead>{language === "english" ? "Occupation" : "직업"}</TableHead>
                            <TableHead>{language === "english" ? "Sessions" : "세션 수"}</TableHead>
                            <TableHead>{language === "english" ? "Goal Progress" : "목표 진행"}</TableHead>
                            <TableHead>{language === "english" ? "Status" : "상태"}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userData.map(user => {
                            const status = getStatusBadge(user.status)

                            return (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.age}</TableCell>
                                    <TableCell>{user.occupation}</TableCell>
                                    <TableCell>{user.sessions}</TableCell>
                                    <TableCell>{user.goalProgress}%</TableCell>
                                    <TableCell>
                                        <Badge variant={status.variant}>{status.label}</Badge>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
} 