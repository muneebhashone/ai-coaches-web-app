"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconBook,
  IconLogout,
  IconMessageForward,
  IconUsers,
  IconUserCircle,
  IconSettings,
  IconChevronRight,
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import { useGetMe, useLogout } from "@/services/auth/auth.hooks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const data = (locale: string, t: (value: string) => string) => {
  return [
    {
      title: t("userManagement.title"),
      url: `/${locale}/dashboard/user-management`,
      icon: IconUsers,
      description: "Manage users and permissions",
    },
    {
      title: t("cloneCoachTraining.title"),
      url: `/${locale}/dashboard/clone-coach-training`,
      icon: IconBook,
      description: "Train and configure AI coaches",
    },
    {
      title: t("messengerManagement.title"),
      url: `/${locale}/dashboard/messenger-management`,
      icon: IconMessageForward,
      description: "Manage messaging platforms",
    },
  ];
};

export function AppSidebar({
  variant = "sidebar",
}: {
  variant?: "sidebar" | "floating" | "inset";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const { data: userData, isLoading: isUserLoading } = useGetMe();
  const user = userData?.data;
  const t = useTranslations("dashboard");

  const navMain = data(locale, t);

  const logoutMutation = useLogout({
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Successfully logged out");
        router.push(`/${locale}/login`);
      } else {
        toast.error(response.message || "Logout failed");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Logout failed. Please try again.");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Sidebar variant={variant} className="border-r border-border/40">
      <SidebarHeader className="px-4 py-4 border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src="/logo.png" 
              alt="logo" 
              className="w-10 h-10 rounded-lg shadow-sm" 
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-base text-foreground">Julia Coaching Lab</h1>
            <p className="text-xs text-muted-foreground">Coaches Panel</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <div className="mb-3">
          <h2 className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Navigation
          </h2>
        </div>
        <SidebarMenu className="space-y-1">
          {navMain.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "group relative rounded-md mx-1 px-3 py-2.5 transition-colors duration-150",
                    "hover:bg-accent hover:text-accent-foreground",
                    "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                >
                  <Link href={item.url} className="flex items-center gap-3 w-full">
                    <item.icon className="size-4 shrink-0" />
                    <span className="font-medium text-sm truncate">{item.title}</span>
                    {isActive && (
                      <IconChevronRight className="size-3 ml-auto shrink-0" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-border/30 p-3">
        {isUserLoading ? (
          <div className="flex items-center gap-3 px-2 py-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-2 w-24" />
            </div>
          </div>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex items-center gap-3 px-2 py-2 h-auto rounded-md",
                  "hover:bg-accent hover:text-accent-foreground transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "justify-start"
                )}
              >
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src={undefined} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left flex-1 min-w-0">
                  <span className="font-medium text-sm truncate">{user.name}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </span>
                </div>
                <IconChevronRight className="size-3 text-muted-foreground shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconUserCircle className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconSettings className="mr-2 h-4 w-4" />
                  <span>Preferences</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <IconLogout className="mr-2 h-4 w-4 text-destructive" />
                <span className="text-destructive">
                  {logoutMutation.isPending ? "Logging out..." : "Sign Out"}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="ghost"
            className={cn(
              "w-full text-destructive hover:bg-destructive/10 hover:text-destructive",
              "gap-2 justify-start px-2 py-2 rounded-md transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            <IconLogout className="size-4" />
            <span className="text-sm">
              {logoutMutation.isPending ? "Logging out..." : "Sign Out"}
            </span>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
