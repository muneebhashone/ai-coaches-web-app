import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardMetricsCards } from "@/components/dashboard/dashboard-metrics-cards";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader />
      <DashboardMetricsCards />
    </div>
  );
}
