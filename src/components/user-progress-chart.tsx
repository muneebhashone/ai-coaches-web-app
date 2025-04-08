"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  ChartLegend
)

interface UserProgressChartProps {
  language: "english" | "korean"
}

export function UserProgressChart({ language }: UserProgressChartProps) {
  const labels = ["Week 1", "Week 2", "Week 3", "Week 4"]
  const data = {
    labels,
    datasets: [
      {
        label: language === "english" ? "Goal Progress" : "목표 진행",
        data: [65, 70, 75, 80],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: language === "english" ? "Emotional State" : "감정 상태",
        data: [60, 68, 72, 78],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: language === "english" ? "Progress Over Time" : "시간에 따른 진행",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: language === "english" ? "Score" : "점수",
        },
      },
      x: {
        title: {
          display: true,
          text: language === "english" ? "Time Period" : "기간",
        },
      },
    },
  }

  return (
    <div className="w-full h-[300px]">
      <Line options={options} data={data} />
    </div>
  )
}
