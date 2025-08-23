export interface ISidebarItem {
  title: string;
  url: string;
  items: {
    title: string;
    url: string;
    Component: React.FC;
    icon?: React.ReactNode;
  }[];
}
