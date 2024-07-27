"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type SidebarContextType = {
  isSidebarExpand: boolean;
  toggleSidebar: () => void;
  isSidebarMobileExpand: boolean;
  toggleSidebarMobile: () => void;
};

type SidebarProviderProps = {
  children: React.ReactNode;
};

// Create a context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [isSidebarExpand, setIsOpen] = useState<boolean>(true);
  const [isSidebarMobileExpand, setIsSidebarMobileOpen] =
    useState<boolean>(false);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const toggleSidebarMobile = useCallback(() => {
    setIsSidebarMobileOpen((prev) => !prev);
  }, []);

  const contextValue: SidebarContextType = {
    isSidebarExpand,
    toggleSidebar,
    isSidebarMobileExpand,
    toggleSidebarMobile,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
