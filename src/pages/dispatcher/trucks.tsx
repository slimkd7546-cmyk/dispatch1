import React from "react";
import TruckManagement from "@/components/trucks/TruckManagement";
import DashboardLayout from "@/components/layout/DashboardLayout";

const TrucksPage = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Truck Management</h1>
        <TruckManagement />
      </div>
    </DashboardLayout>
  );
};

export default TrucksPage;
