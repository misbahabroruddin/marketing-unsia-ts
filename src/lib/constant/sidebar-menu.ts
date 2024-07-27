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
    label: "Link",
    icon: "/icons/link.svg",
    iconDark: "/icons/link-dark.svg",
    link: "/link",
  },
  {
    label: "Peminat",
    icon: "/icons/peminat.svg",
    iconDark: "/icons/peminat-dark.svg",
    link: "/peminat",
  },
];
