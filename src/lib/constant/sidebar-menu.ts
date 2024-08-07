type ChildrenMenu = {
  label: string;
  icon: string;
  link: string;
};

type SidebarMenu = {
  label: string;
  icon: string;
  iconDark: string;
  link: string;
  children?: ChildrenMenu[];
};

export const sidebarMenu: SidebarMenu[] = [
  {
    label: "Dasboard",
    icon: "/icons/dashboard.svg",
    iconDark: "/icons/dashboard-black.svg",
    link: "/dashboard",
  },
  {
    label: "Tautan",
    icon: "/icons/link.svg",
    iconDark: "/icons/link-dark.svg",
    link: "/tautan",
  },
  {
    label: "Data Leads",
    icon: "/icons/peminat.svg",
    iconDark: "/icons/peminat-dark.svg",
    link: "/data-leads",
  },
];
