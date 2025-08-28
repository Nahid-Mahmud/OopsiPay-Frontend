import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Link, Outlet, useLocation } from "react-router";
import { ModeToggle } from "../mode-toggle";

export default function DashboardLayout() {
  // get routes like /admin/analytics
  const location = useLocation();
  const breadcrumbs = location.pathname.split("/").filter(Boolean);
  // const { data: userData, isLoading: isLoadingUserData } = useUserInfoQuery();
  // const getInitials = (firstName: string, lastName: string) => {
  //   return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  // };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <span key={index} className="flex items-center">
                    {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                    <BreadcrumbItem>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage className="capitalize">{crumb}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild className="capitalize">
                          <Link to={`/${breadcrumbs.slice(0, index + 1).join("/")}`}>{crumb}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </span>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* <div className="flex gap-2">
            <Popover>
              <PopoverTrigger>
                <Avatar className="h-8 w-8  transition-all duration-300 group-hover:ring-primary/40">
                  <AvatarImage src={userData?.data?.profilePicture || undefined} className="object-cover" />
                  <AvatarFallback className="text-2xl font-serif bg-gradient-to-br from-primary/20 to-accent/20">
                    {isLoadingUserData ? (
                      // <Loader2 className="h-8 w-8 animate-spin" />
                      <Skeleton className="h-8 w-8" />
                    ) : (
                      getInitials(userData?.data?.firstName || "U", userData?.data?.lastName || "U")
                    )}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-fit p-0" align="end" side="bottom" sideOffset={8}>
                <LogoutButton />
              </PopoverContent>
            </Popover>
          </div> */}
          <ModeToggle />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
