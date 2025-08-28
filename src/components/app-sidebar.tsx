import { ChevronRight, File, Folder } from "lucide-react";
import * as React from "react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";
import { USER_ROLES } from "@/constants/user.constants";
import { useDriver } from "@/hooks/useDriver";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { AdminSidebarItems } from "@/routes/AdminSidebarItems";
import { AgentSidebarItems } from "@/routes/AgentSidebarItems";
import { UserSidebarItems } from "@/routes/UserSidebarItems";
import type { ISidebarItem } from "@/types";
import { useMemo, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import LogoutButton from "./LogoutButton";
import { Skeleton } from "./ui/skeleton";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { startTour, isTourActive } = useDriver();
  const location = useLocation();
  const { data: userData, isLoading: userDataLoading } = useUserInfoQuery();

  const sideBarItems = () => {
    switch (userData?.data?.role) {
      case USER_ROLES.ADMIN:
        return AdminSidebarItems;
      case USER_ROLES.SUPER_ADMIN:
        return AdminSidebarItems;
      case USER_ROLES.USER:
        return UserSidebarItems;
      case USER_ROLES.AGENT:
        return AgentSidebarItems;
      default:
        return [];
    }
  };

  const getSectionIndex = (pathname: string, items: ISidebarItem[]) => {
    for (let i = 0; i < items.length; i++) {
      const section = items[i];
      if (section.items.some((item) => item.url === pathname)) {
        return i;
      }
    }
    return 0;
  };

  const currentSidebarItems = sideBarItems();
  const activeSectionIndex = getSectionIndex(location.pathname, currentSidebarItems);

  const sidebarTourSteps = useMemo(
    () => [
      {
        element: "#user-sidebar-menu",
        popover: {
          title: "User Menu",
          description: "Access your account settings, profile, and more.",
        },
      },
      {
        element: "#logout-button",
        popover: {
          title: "Logout",
          description: "Click here to log out of your account.",
        },
      },
    ],
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const hadSeenTour = localStorage.getItem("admin-sidebar-tour");
      const isDesktop = window.innerWidth >= 768;

      if (!hadSeenTour && isDesktop && !isTourActive()) {
        localStorage.setItem("admin-sidebar-tour", "true");
        startTour(sidebarTourSteps);
        localStorage.setItem("admin-sidebar-tour", "true");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [sidebarTourSteps, startTour, isTourActive]);

  return (
    <Sidebar {...props}>
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel>
            {userDataLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : userData?.data?.role === USER_ROLES.USER ? (
              "User Panel"
            ) : (
              "Admin Panel"
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu id="user-sidebar-menu">
              {userDataLoading
                ? // Loading skeleton
                  Array.from({ length: 3 }).map((_, index) => (
                    <SidebarMenuItem key={index}>
                      <div className="space-y-2 p-2">
                        <Skeleton className="h-4 w-32" />
                        <div className="ml-4 space-y-1">
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-3 w-28" />
                        </div>
                      </div>
                    </SidebarMenuItem>
                  ))
                : currentSidebarItems.map((item, index) => (
                    <SidebarItem key={index} item={item} isOpen={index === activeSectionIndex} />
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          {/* <Button onClick={handleLogout} variant={"destructive"} className="cursor-pointer">
            Logout
          </Button> */}

          <LogoutButton />
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function SidebarItem({ item, isOpen = false }: { item: ISidebarItem; isOpen?: boolean }) {
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={isOpen}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Folder />
            {item.title}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((subItem, index) => (
              <SidebarMenuButton key={index} isActive={false} className="data-[active=true]:bg-transparent">
                <NavLink
                  to={subItem.url}
                  // className="inline-flex items-center gap-2"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "text-muted-foreground inline-flex items-center gap-2"
                      : isActive
                      ? "font-medium inline-flex items-center gap-2 text-primary/80"
                      : "transition-opacity inline-flex items-center gap-2"
                  }
                >
                  {subItem.icon ? subItem.icon : <File />}
                  {subItem.title}
                </NavLink>
              </SidebarMenuButton>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
