import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PerformanceMetrics from "@/components/analytics/PerformanceMetrics";
import { ThemeProvider } from "@/components/ui/theme-provider";

const AnalyticsPage = () => {
  // Handle time range change
  const handleTimeRangeChange = (range: string) => {
    console.log(`Time range changed to: ${range}`);
    // In a real app, this would fetch new data for the selected time range
  };

  // Handle export
  const handleExport = (format: string) => {
    console.log(`Exporting data in ${format} format`);
    // In a real app, this would generate and download the report in the specified format
  };

  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <DashboardLayout pageTitle="Analytics & Reports">
        <PerformanceMetrics
          onTimeRangeChange={handleTimeRangeChange}
          onExport={handleExport}
        />
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default AnalyticsPage;
