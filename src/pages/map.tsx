import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LiveMapView from "@/components/maps/LiveMapView";
import { ThemeProvider } from "@/components/ui/theme-provider";

const MapPage = () => {
  // Handle officer selection
  const handleOfficerSelect = (officerId: string) => {
    console.log(`Selected officer: ${officerId}`);
    // In a real app, this would fetch officer details or update UI
  };

  // Handle incident selection
  const handleIncidentSelect = (incidentId: string) => {
    console.log(`Selected incident: ${incidentId}`);
    // In a real app, this would fetch incident details or update UI
  };

  // Handle dispatching an officer to an incident
  const handleDispatchOfficer = (officerId: string, incidentId: string) => {
    console.log(`Dispatching officer ${officerId} to incident ${incidentId}`);
    // In a real app, this would update the dispatch status in the backend
  };

  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <DashboardLayout pageTitle="Live Map View">
        <div className="h-[calc(100vh-12rem)]">
          <LiveMapView
            onOfficerSelect={handleOfficerSelect}
            onIncidentSelect={handleIncidentSelect}
            onDispatchOfficer={handleDispatchOfficer}
          />
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default MapPage;
