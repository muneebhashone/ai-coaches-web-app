"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Bot, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export function DashboardMetricsCards() {
  const t = useTranslations("dashboard");
  const router = useRouter();

  const cards = [
    {
      title: t("userManagement.title"),
      description: t("userManagement.description"),
      icon: Users,
      href: "/dashboard/user-management",
      iconColor: "text-primary",
    },
    {
      title: t("cloneCoachTraining.title"),
      description: t("cloneCoachTraining.description"),
      icon: Bot,
      href: "/dashboard/clone-coach-training",
      iconColor: "text-accent",
    },
    {
      title: t("messengerManagement.title"),
      description: t("messengerManagement.description"),
      icon: MessageSquare,
      href: "/dashboard/messenger-management",
      iconColor: "text-secondary",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.href} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-background ${card.iconColor}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {card.title}
                    </CardTitle>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-muted-foreground mb-4 min-h-[2.5rem]">
                {card.description}
              </CardDescription>
              <Button
                onClick={() => router.push(card.href)}
                className="w-full"
                variant="default"
              >
                View
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}