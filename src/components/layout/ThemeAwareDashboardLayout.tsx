import React from "react";
import DashboardLayout from "./DashboardLayout";
import { ThemeProvider } from "@/components/ui/theme-provider";

interface ThemeAwareDashboardLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  userRole?:
    | "Admin"
    | "Dispatcher"
    | "Officer"
    | "Reviewer"
    | "Connect"
    | "Driver";
  userName?: string;
  userAvatar?: string;
  onToggleMessaging?: () => void;
  messagingPanelOpen?: boolean;
}

const ThemeAwareDashboardLayout = ({
  children,
  pageTitle,
  userRole,
  userName,
  userAvatar,
  onToggleMessaging,
  messagingPanelOpen,
}: ThemeAwareDashboardLayoutProps) => {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <DashboardLayout
        pageTitle={pageTitle}
        userRole={userRole}
        userName={userName}
        userAvatar={userAvatar}
        onToggleMessaging={onToggleMessaging}
        messagingPanelOpen={messagingPanelOpen}
      >
        {children}
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default ThemeAwareDashboardLayout;
