import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart2,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  HelpCircle,
  MessageSquare,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import CompletedDispatchList from "../review/CompletedDispatchList";
import ReportGenerator from "../review/ReportGenerator";
import { useNavigate } from "react-router-dom";

interface ReviewerDashboardProps {
  userName?: string;
  pendingReviews?: number;
  completedReviews?: number;
  flaggedReviews?: number;
}

const ReviewerDashboard = ({
  userName = "Alex Johnson",
  pendingReviews = 12,
  completedReviews = 48,
  flaggedReviews = 3,
}: ReviewerDashboardProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dispatches");
  const [showSupportModal, setShowSupportModal] = useState(false);

  const handleViewDispatch = (id: string) => {
    console.log(`Viewing dispatch ${id}`);
    // Implementation would open the dispatch detail view
  };

  const handleApproveDispatch = (id: string) => {
    console.log(`Approving dispatch ${id}`);
    // Implementation would update the dispatch status
  };

  const handleRejectDispatch = (id: string) => {
    console.log(`Rejecting dispatch ${id}`);
    // Implementation would update the dispatch status
  };

  const handleGenerateReport = (
    reportType: string,
    dateRange: any,
    format: string,
  ) => {
    console.log(
      `Generating ${reportType} report in ${format} format`,
      dateRange,
    );
    // Implementation would generate and download the report
  };

  // Handle view map
  const handleViewMap = () => {
    navigate("/map");
  };

  // Handle support request
  const handleSupportRequest = () => {
    setShowSupportModal(true);
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-slate-50 w-full h-full overflow-auto">
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {userName}
          </h1>
          <p className="text-gray-600 mt-1">
            Review completed dispatches and generate reports
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          <Card className="w-[140px] bg-white">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-xs font-medium text-gray-500">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold">{pendingReviews}</span>
            </CardContent>
          </Card>

          <Card className="w-[140px] bg-white">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-xs font-medium text-gray-500">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{completedReviews}</span>
            </CardContent>
          </Card>

          <Card className="w-[140px] bg-white">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-xs font-medium text-gray-500">
                Flagged
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span className="text-2xl font-bold">{flaggedReviews}</span>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main content */}
      <Tabs
        defaultValue="dispatches"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="dispatches" className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Completed Dispatches
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dispatches" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CompletedDispatchList
              onViewDispatch={handleViewDispatch}
              onApproveDispatch={handleApproveDispatch}
              onRejectDispatch={handleRejectDispatch}
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ReportGenerator onGenerate={handleGenerateReport} />
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          onClick={handleViewMap}
        >
          <MapPin className="h-5 w-5 text-teal-600" />
          <span className="text-sm">View Map</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          onClick={() => setActiveTab("reports")}
        >
          <FileText className="h-5 w-5 text-teal-600" />
          <span className="text-sm">Generate Reports</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          onClick={handleSupportRequest}
        >
          <HelpCircle className="h-5 w-5 text-teal-600" />
          <span className="text-sm">Request Support</span>
        </Button>
      </div>

      {/* Support Request Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Request Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="supportType"
                    className="block text-sm font-medium mb-1"
                  >
                    Support Type
                  </label>
                  <select
                    id="supportType"
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="technical">Technical Support</option>
                    <option value="data">Data Analysis Support</option>
                    <option value="access">Access Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="urgency"
                    className="block text-sm font-medium mb-1"
                  >
                    Urgency Level
                  </label>
                  <select id="urgency" className="w-full p-2 border rounded-md">
                    <option value="low">Low - When Convenient</option>
                    <option value="medium">Medium - As Soon As Possible</option>
                    <option value="high">
                      High - Urgent Assistance Needed
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="w-full p-2 border rounded-md h-24"
                    placeholder="Describe your issue or request..."
                  ></textarea>
                </div>
              </div>
            </CardContent>
            <div className="flex justify-end p-4 space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowSupportModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Support request submitted");
                  setShowSupportModal(false);
                }}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ReviewerDashboard;
