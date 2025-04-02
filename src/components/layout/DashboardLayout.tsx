import React, { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/navigation/Sidebar";
import Header from "@/components/navigation/Header";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?:
    | "Admin"
    | "Dispatcher"
    | "Officer"
    | "Reviewer"
    | "Connect"
    | "Driver";
  userName?: string;
  userAvatar?: string;
  pageTitle?: string;
}

const DashboardLayout = ({
  children,
  userRole = "Dispatcher",
  userName = "Jane Doe",
  userAvatar = "",
  pageTitle = "Dashboard",
}: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      {/* Sidebar - hidden on mobile unless toggled */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Sidebar
          userRole={userRole}
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleSidebarToggle}
        />
      </div>
      {/* Main content */}
      <div
        className={cn(
          "flex flex-1 flex-col overflow-hidden transition-all duration-300",
          sidebarCollapsed ? "md:pl-[70px]" : "md:pl-[280px]",
        )}
      >
        {/* Header */}
        <Header
          title={pageTitle}
          onMenuToggle={handleMobileMenuToggle}
          userRole={userRole}
          userName={userName}
          userAvatar={userAvatar}
        />
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Header 1
        </h1>
        {/* Page content with scrolling */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
        {/* Footer */}
        <footer className="border-t py-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Dispatch Management System. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
