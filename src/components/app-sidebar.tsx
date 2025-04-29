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
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
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

// Updated navigation with only the 3 required items
const data = {
  navMain: [
    {
      title: "User Management",
      url: "/dashboard/users",
      icon: IconUsers,
      isActive: true,
    },
    {
      title: "Clone Coach Training",
      url: "/dashboard/clone-coach-training",
      icon: IconBook,
    },
    {
      title: "Messenger Management",
      url: "/dashboard/messenger-management",
      icon: IconMessageForward,
    },
  ],
};

export function AppSidebar({
  variant = "sidebar",
}: {
  variant?: "sidebar" | "floating" | "inset";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: userData, isLoading: isUserLoading } = useGetMe();
  const user = userData?.data;

  console.log({ user });

  const logoutMutation = useLogout({
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Successfully logged out");
        router.push("/login");
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
    <Sidebar variant={variant}>
      <SidebarHeader className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            AI Coaches
          </span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                <Link href={item.url}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50 p-4 space-y-4">
        {isUserLoading ? (
          <div className="flex items-center gap-3 px-2 py-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center gap-3 px-2 py-2 h-auto hover:bg-primary/5 justify-start"
              >
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={undefined} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconUserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconSettings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <IconLogout className="mr-2 h-4 w-4 text-destructive" />
                <span className="text-destructive">
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="ghost"
            className="w-full text-primary hover:bg-primary/5 hover:text-primary gap-2 justify-start"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            <IconLogout className="size-4" />
            <span>
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </span>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
