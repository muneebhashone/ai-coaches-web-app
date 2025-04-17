"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface UserActivityChartProps {
  language: "english" | "korean";
  data: { week: string; sessionCount: number; goalProgress: number }[];
}

export function UserActivityChart({ language, data }: UserActivityChartProps) {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>
          {language === "english"
            ? "Progress & Activity Trends"
            : "진행 및 활동 동향"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sessionCount"
                name={language === "english" ? "Session Count" : "세션 수"}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="goalProgress"
                name={
                  language === "english" ? "Goal Progress %" : "목표 진행률 %"
                }
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
