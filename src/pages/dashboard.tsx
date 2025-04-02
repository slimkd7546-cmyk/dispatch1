import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import DispatcherDashboard from "@/components/dashboard/DispatcherDashboard";
import OfficerDashboard from "@/components/dashboard/OfficerDashboard";
import ReviewerDashboard from "@/components/dashboard/ReviewerDashboard";
import ConnectDashboard from "@/components/dashboard/ConnectDashboard";
import DriverDashboard from "@/components/dashboard/DriverDashboard";
import { ThemeProvider } from "@/components/ui/theme-provider";

interface DashboardPageProps {
  userRole?:
    | "Admin"
    | "Dispatcher"
    | "Officer"
    | "Reviewer"
    | "Connect"
    | "Driver";
  userName?: string;
  userAvatar?: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  userRole = "Dispatcher", // Default role
  userName = "Jane Doe",
  userAvatar = "",
}) => {
  // State to track the current role (could be changed via role switcher in a real app)
  const [currentRole, setCurrentRole] = useState<
    "Admin" | "Dispatcher" | "Officer" | "Reviewer" | "Connect" | "Driver"
  >(userRole);

  // Get page title based on role
  const getPageTitle = () => {
    switch (currentRole) {
      case "Admin":
        return "Admin Dashboard";
      case "Dispatcher":
        return "Dispatcher Dashboard";
      case "Officer":
        return "Officer Dashboard";
      case "Reviewer":
        return "Reviewer Dashboard";
      case "Connect":
        return "Connect Dashboard";
      case "Driver":
        return "Driver Dashboard";
      default:
        return "Dashboard";
    }
  };

  // Render the appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (currentRole) {
      case "Admin":
        return <AdminDashboard />;
      case "Dispatcher":
        return <DispatcherDashboard />;
      case "Officer":
        return <OfficerDashboard />;
      case "Reviewer":
        return <ReviewerDashboard />;
      case "Connect":
        return <ConnectDashboard />;
      case "Driver":
        return <DriverDashboard />;
      default:
        return <DispatcherDashboard />; // Default to dispatcher dashboard
    }
  };

  // For demo purposes - role switcher
  const handleRoleChange = (
    role:
      | "Admin"
      | "Dispatcher"
      | "Officer"
      | "Reviewer"
      | "Connect"
      | "Driver",
  ) => {
    setCurrentRole(role);
  };

  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <DashboardLayout
        userRole={currentRole}
        userName={userName}
        userAvatar={userAvatar}
        pageTitle={getPageTitle()}
      >
        {/* Role switcher for demo purposes */}
        <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-dashed">
          <p className="text-sm text-muted-foreground mb-2">
            Demo Mode: Switch between different user roles
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleRoleChange("Admin")}
              className={`px-3 py-1 text-sm rounded-md ${currentRole === "Admin" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              Admin
            </button>
            <button
              onClick={() => handleRoleChange("Dispatcher")}
              className={`px-3 py-1 text-sm rounded-md ${currentRole === "Dispatcher" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              Dispatcher
            </button>
            <button
              onClick={() => handleRoleChange("Officer")}
              className={`px-3 py-1 text-sm rounded-md ${currentRole === "Officer" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              Officer
            </button>
            <button
              onClick={() => handleRoleChange("Reviewer")}
              className={`px-3 py-1 text-sm rounded-md ${currentRole === "Reviewer" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              Reviewer
            </button>
            <button
              onClick={() => handleRoleChange("Connect")}
              className={`px-3 py-1 text-sm rounded-md ${currentRole === "Connect" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              Connect
            </button>
            <button
              onClick={() => handleRoleChange("Driver")}
              className={`px-3 py-1 text-sm rounded-md ${currentRole === "Driver" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              Driver
            </button>
          </div>
        </div>

        {/* Render the appropriate dashboard based on role */}
        {renderDashboard()}
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default DashboardPage;
