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
import { AdminSidebarItems } from "@/routes/AdminSidebarItems";
import type { ISidebarItem } from "@/types";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    // remove user session form cookie
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // console.log("User logged out");
    await logout({}).unwrap();
    navigate("/login");
  };

  return (
    <Sidebar {...props}>
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {AdminSidebarItems.map((item, index) => (
                <SidebarItem key={index} item={item} isFirst={index === 0} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <Button onClick={handleLogout} variant={"destructive"} className="cursor-pointer">
            Logout
          </Button>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function SidebarItem({ item, isFirst = false }: { item: ISidebarItem; isFirst?: boolean }) {
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={isFirst}
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
                <Link to={subItem.url} className="inline-flex items-center gap-2">
                  {subItem.icon ? subItem.icon : <File />}
                  {subItem.title}
                </Link>
              </SidebarMenuButton>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
