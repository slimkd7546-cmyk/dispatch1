import React, {
  useState,
  ReactNode,
  useEffect,
  useCallback,
  memo,
} from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/navigation/Sidebar";
import Header from "@/components/navigation/Header";
import ChatButton from "@/components/messaging/ChatButton";
import ChatInterface from "@/components/messaging/ChatInterface";
import { AuthProvider } from "@/context/AuthContext";

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
  const [messagingPanelOpen, setMessagingPanelOpen] = useState(false);
  const location = useLocation();

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const handleSidebarToggle = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setMobileSidebarOpen((prev) => !prev);
  }, []);

  const handleMessagingToggle = useCallback(() => {
    setMessagingPanelOpen((prev) => !prev);
  }, []);

  return (
    <AuthProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Mobile sidebar overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
        {/* Sidebar - hidden on mobile unless toggled */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 shadow-lg",
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
            onToggleMessaging={handleMessagingToggle}
            messagingPanelOpen={messagingPanelOpen}
          />

          {/* Page content with scrolling */}
          <div className="flex flex-1 overflow-hidden grow flex-col-reverse w-full">
            <main className="flex-1 overflow-auto p-4 md:p-6 bg-background/50 w-full">
              <div className="w-full h-full">{children}</div>
            </main>

            {/* Messaging panel */}
            {messagingPanelOpen && (
              <div className="hidden md:block w-[450px] border-l overflow-hidden shadow-inner transition-all animate-slide-in-right h-full">
                <ChatInterface
                  standalone={true}
                  onClose={() => setMessagingPanelOpen(false)}
                />
              </div>
            )}
          </div>
          {/* Footer */}
          <footer className="border-t py-4 text-center text-sm text-muted-foreground bg-background/90 backdrop-blur-sm">
            <p>
              © {new Date().getFullYear()} Dispatch Management System. All
              rights reserved.
            </p>
          </footer>

          {/* Floating chat button (visible on mobile) */}
          <div className="md:hidden fixed bottom-6 right-6">
            <ChatButton />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default memo(DashboardLayout);
