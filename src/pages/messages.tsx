import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import ThemeAwareDashboardLayout from "@/components/layout/ThemeAwareDashboardLayout";
import ChatInterface from "@/components/messaging/ChatInterface";

const MessagesPage = () => {
  return (
    <AuthProvider>
      <ThemeAwareDashboardLayout pageTitle="Messages">
        <div className="container mx-auto py-6 h-[calc(100vh-4rem)]">
          <ChatInterface standalone={true} />
        </div>
      </ThemeAwareDashboardLayout>
    </AuthProvider>
  );
};

export default MessagesPage;
