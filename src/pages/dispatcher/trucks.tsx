import React from "react";
import TruckManagement from "@/components/trucks/TruckManagement";
import ThemeAwareDashboardLayout from "@/components/layout/ThemeAwareDashboardLayout";

const TrucksPage = () => {
  return (
    <ThemeAwareDashboardLayout pageTitle="Truck Management">
      <div className="w-full h-full">
        <h1 className="text-3xl font-bold mb-6">Truck Management</h1>
        <TruckManagement />
      </div>
    </ThemeAwareDashboardLayout>
  );
};

export default TrucksPage;
