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

interface ProgressMetric {
    label: string
    value: number
    change: number
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
}

export function MetricDetailsDialog({
    title,
    value,
    description,
    children,
    language,
    progressMetrics,
}: MetricDetailsDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full h-full p-0">
                    {children}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                </div>
            </DialogContent>
        </Dialog>
    )
} 