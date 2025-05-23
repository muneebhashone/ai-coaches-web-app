import { UserProgressChart } from "@/components/user-progress-chart";
import { AnimatedCard } from "@/components/ui/animated-card";
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconChartLine, IconUsers, IconRobot } from "@tabler/icons-react";

interface SessionAnalysisProps {
    language: "english" | "korean";
}

// Mock data for user segments
const userSegments = [
    { name: "High Engagement", percentage: 35, color: "bg-green-500" },
    { name: "Moderate Engagement", percentage: 45, color: "bg-yellow-500" },
    { name: "Low Engagement", percentage: 20, color: "bg-red-500" }
];

// Mock data for chatbot feedback
const chatbotFeedback = [
    { metric: "Response Accuracy", score: 92, trend: "up" },
    { metric: "User Satisfaction", score: 88, trend: "up" },
    { metric: "Goal Achievement", score: 85, trend: "stable" },
    { metric: "Conversation Flow", score: 90, trend: "up" }
];

export function SessionAnalysis({ language }: SessionAnalysisProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <AnimatedCard>
                    <CardHeader className="pb-2">
                        <CardDescription>
                            {language === "english" ? "Total Sessions" : "전체 세션"}
                        </CardDescription>
                        <CardTitle className="text-2xl">156</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            {language === "english"
                                ? "+24% from last month"
                                : "지난 달 대비 +24%"}
                        </div>
                    </CardContent>
                </AnimatedCard>

                <AnimatedCard>
                    <CardHeader className="pb-2">
                        <CardDescription>
                            {language === "english" ? "Avg. Duration" : "평균 기간"}
                        </CardDescription>
                        <CardTitle className="text-2xl">8.5 min</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            {language === "english"
                                ? "+2.1 min from last month"
                                : "지난 달 대비 +2.1분"}
                        </div>
                    </CardContent>
                </AnimatedCard>

                <AnimatedCard>
                    <CardHeader className="pb-2">
                        <CardDescription>
                            {language === "english" ? "Satisfaction" : "만족도"}
                        </CardDescription>
                        <CardTitle className="text-2xl">4.7/5.0</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            {language === "english"
                                ? "+0.3 from last month"
                                : "지난 달 대비 +0.3"}
                        </div>
                    </CardContent>
                </AnimatedCard>
            </div>

            <AnimatedCard>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <IconChartLine className="h-5 w-5" />
                        <CardTitle>
                            {language === "english" ? "Weekly Trends" : "주간 트렌드"}
                        </CardTitle>
                    </div>
                    <CardDescription>
                        {language === "english"
                            ? "Progress and satisfaction trends over time"
                            : "시간에 따른 진행 상황 및 만족도 추이"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="w-full">
                    <Tabs defaultValue="progress" className="w-full">
                        <TabsList>
                            <TabsTrigger value="progress">
                                {language === "english" ? "Progress" : "진행"}
                            </TabsTrigger>
                            <TabsTrigger value="satisfaction">
                                {language === "english" ? "Satisfaction" : "만족도"}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent className="w-full" value="progress">
                            <UserProgressChart language={language} />
                        </TabsContent>
                        <TabsContent className="w-full" value="satisfaction">
                            <UserProgressChart language={language} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </AnimatedCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedCard>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <IconUsers className="h-5 w-5" />
                            <CardTitle>
                                {language === "english" ? "User Segments" : "사용자 세그먼트"}
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {userSegments.map((segment) => (
                                <div key={segment.name} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">{segment.name}</span>
                                        <span className="text-sm text-muted-foreground">
                                            {segment.percentage}%
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                                        <div
                                            className={`h-full ${segment.color}`}
                                            style={{ width: `${segment.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </AnimatedCard>

                <AnimatedCard>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <IconRobot className="h-5 w-5" />
                            <CardTitle>
                                {language === "english" ? "AI Coach Performance" : "AI 코치 성과"}
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {chatbotFeedback.map((item) => (
                                <div key={item.metric} className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">{item.metric}</p>
                                        <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                                            <div
                                                className="h-full bg-primary"
                                                style={{ width: `${item.score}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{item.score}%</span>
                                        <span className={`text-xs ${item.trend === "up"
                                            ? "text-green-500"
                                            : item.trend === "down"
                                                ? "text-red-500"
                                                : "text-yellow-500"
                                            }`}>
                                            {item.trend === "up" ? "↑" : item.trend === "down" ? "↓" : "→"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </AnimatedCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedCard>
                    <CardHeader>
                        <CardTitle>
                            {language === "english" ? "Session Types" : "세션 유형"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-primary mr-2" />
                                    <span>AI Coaching</span>
                                </div>
                                <span className="font-medium">68%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                                    <span>Human Coaching</span>
                                </div>
                                <span className="font-medium">22%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                                    <span>Combined</span>
                                </div>
                                <span className="font-medium">10%</span>
                            </div>
                        </div>
                    </CardContent>
                </AnimatedCard>

                <AnimatedCard>
                    <CardHeader>
                        <CardTitle>
                            {language === "english"
                                ? "Platform Distribution"
                                : "플랫폼 분포"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-primary mr-2" />
                                    <span>KakaoTalk</span>
                                </div>
                                <span className="font-medium">62%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                                    <span>Web Dashboard</span>
                                </div>
                                <span className="font-medium">28%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                                    <span>Other</span>
                                </div>
                                <span className="font-medium">10%</span>
                            </div>
                        </div>
                    </CardContent>
                </AnimatedCard>
            </div>
        </div>
    );
} 