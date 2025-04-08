import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProgressMetric {
    label: string
    value: number
    change: number
}

interface FeedbackMetric {
    id: string
    question: string
    average: number
    responseRate: number
}

interface MetricDetailsDialogProps {
    title: string
    value: string | number
    description: string
    children: React.ReactNode
    language: "english" | "korean"
    progressMetrics?: {
        sessions: ProgressMetric
        goals: ProgressMetric
    }
    feedbackMetrics?: FeedbackMetric[]
}

export function MetricDetailsDialog({
    title,
    value,
    description,
    children,
    language,
    progressMetrics,
    feedbackMetrics,
}: MetricDetailsDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full h-full p-0">
                    {children}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="progress" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="progress">
                            {language === "english" ? "Progress" : "진행 상황"}
                        </TabsTrigger>
                        <TabsTrigger value="feedback">
                            {language === "english" ? "Feedback" : "피드백"}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="progress" className="py-4 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">{value}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{description}</p>
                            </CardContent>
                        </Card>
                        {progressMetrics && (
                            <div className="space-y-4">
                                <h4 className="font-medium">
                                    {language === "english" ? "Progress Tracking" : "진행 상황 추적"}
                                </h4>

                                {/* Sessions Progress */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            {language === "english" ? "Session Completion" : "세션 완료"}
                                        </span>
                                        <span className="text-sm font-medium">
                                            {progressMetrics.sessions.value}%
                                            {progressMetrics.sessions.change > 0 && (
                                                <span className="text-green-500 ml-1">
                                                    (+{progressMetrics.sessions.change}%)
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <Progress value={progressMetrics.sessions.value} className="h-2" />
                                    <p className="text-xs text-muted-foreground">
                                        {progressMetrics.sessions.label}
                                    </p>
                                </div>

                                {/* Goals Progress */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            {language === "english" ? "Goal Achievement" : "목표 달성"}
                                        </span>
                                        <span className="text-sm font-medium">
                                            {progressMetrics.goals.value}%
                                            {progressMetrics.goals.change > 0 && (
                                                <span className="text-green-500 ml-1">
                                                    (+{progressMetrics.goals.change}%)
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <Progress value={progressMetrics.goals.value} className="h-2" />
                                    <p className="text-xs text-muted-foreground">
                                        {progressMetrics.goals.label}
                                    </p>
                                </div>
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="feedback" className="py-4 space-y-4">
                        <div className="space-y-4">
                            <h4 className="font-medium">
                                {language === "english" ? "User Feedback Metrics" : "사용자 피드백 지표"}
                            </h4>

                            {feedbackMetrics ? (
                                feedbackMetrics.map((metric) => (
                                    <div key={metric.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">{metric.question}</span>
                                            <span className="text-sm font-medium">
                                                {metric.average.toFixed(1)}/5
                                            </span>
                                        </div>
                                        <Progress value={metric.average * 20} className="h-2" />
                                        <p className="text-xs text-muted-foreground">
                                            {language === "english"
                                                ? `Response rate: ${metric.responseRate}%`
                                                : `응답률: ${metric.responseRate}%`}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-muted-foreground py-6">
                                    {language === "english"
                                        ? "No feedback data available yet"
                                        : "아직 사용 가능한 피드백 데이터가 없습니다"}
                                </div>
                            )}

                            <div className="border-t pt-4 mt-6">
                                <h4 className="font-medium mb-2">
                                    {language === "english"
                                        ? "Automatic Likert Scale Questions"
                                        : "자동 리커트 척도 질문"}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    {language === "english"
                                        ? "After each session, users are prompted with 1-2 Likert scale questions to assess action plan follow-through, emotional state, and goal progress."
                                        : "각 세션 후 사용자에게 1-2개의 리커트 척도 질문을 통해 실행 계획 이행, 감정 상태 및 목표 진행 상황을 평가합니다."}
                                </p>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
} 