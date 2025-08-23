import type { ISidebarItem } from "@/types";

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  return sidebarItems.flatMap((section) => {
    return (section.items || []).map((route) => {
      return {
        path: route.url,
        Component: route.Component,
      };
    });
  });
};
