"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

export function UserFilters() {
  const t = useTranslations("dashboard.userManagement.filters");
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("filterByStage")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allStages")}</SelectItem>
            <SelectItem value="onboarding">Onboarding</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("filterByStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allStatuses")}</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="at-risk">At Risk</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}