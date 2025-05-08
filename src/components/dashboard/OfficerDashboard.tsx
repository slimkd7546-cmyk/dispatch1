import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Bell,
  FileText,
  MapPin,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import TaskList from "@/components/tasks/TaskList";
import TaskDetailModal from "@/components/tasks/TaskDetailModal";
import { useNavigate } from "react-router-dom";

interface OfficerDashboardProps {
  officerName?: string;
  officerRole?: string;
  taskCount?: {
    pending: number;
    inProgress: number;
    completed: number;
  };
}

const OfficerDashboard = ({
  officerName = "Alex Johnson",
  officerRole = "Security Officer",
  taskCount = {
    pending: 3,
    inProgress: 2,
    completed: 8,
  },
}: OfficerDashboardProps) => {
  const navigate = useNavigate();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Mock data for the current date and time
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Handle task selection
  const handleTaskSelect = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  // Handle task status update
  const handleStatusUpdate = (taskId: string, newStatus: string) => {
    console.log(`Updating task ${taskId} to status: ${newStatus}`);
    // In a real app, this would update the task status via API
  };

  // Handle closing the task detail modal
  const handleCloseTaskDetail = () => {
    setSelectedTaskId(null);
  };

  // Handle view reports
  const handleViewReports = () => {
    navigate("/reports");
  };

  // Handle view map
  const handleViewMap = () => {
    navigate("/map");
  };

  // Handle support request
  const handleSupportRequest = () => {
    setShowHelpModal(true);
  };

  return (
    <div className="w-full h-full bg-background p-6 overflow-auto">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome, {officerName}
          </h1>
          <p className="text-muted-foreground mt-1">{currentDate}</p>
          <p className="text-sm text-muted-foreground">{officerRole}</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button>
            <Clock className="mr-2 h-4 w-4" />
            Start Shift
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-2xl font-bold">{taskCount.pending}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">{taskCount.inProgress}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-2xl font-bold">{taskCount.completed}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="history">Task History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start p-3 rounded-md bg-muted/50">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Morning Patrol</h3>
                        <p className="text-sm text-muted-foreground">
                          08:00 AM - 10:00 AM
                        </p>
                        <p className="text-sm">East Wing, Floors 1-3</p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 rounded-md bg-muted/50">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">VIP Escort</h3>
                        <p className="text-sm text-muted-foreground">
                          11:30 AM - 12:30 PM
                        </p>
                        <p className="text-sm">
                          Main Entrance to Conference Room
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 rounded-md bg-muted/50">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Afternoon Patrol</h3>
                        <p className="text-sm text-muted-foreground">
                          02:00 PM - 04:00 PM
                        </p>
                        <p className="text-sm">West Wing, Parking Garage</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Response Time</span>
                      <span className="text-sm font-medium">4.2 min</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Task Completion</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Report Quality</span>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: "88%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleViewReports}
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Full Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskList
                onTaskSelect={handleTaskSelect}
                onStatusUpdate={handleStatusUpdate}
              />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              onClick={handleViewReports}
            >
              <FileText className="h-5 w-5 text-teal-600" />
              <span className="text-sm">Submit Report</span>
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
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>All Assigned Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskList
                onTaskSelect={handleTaskSelect}
                onStatusUpdate={handleStatusUpdate}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Task History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Filter by Date
                  </Button>
                  <Button variant="outline" size="sm">
                    All Tasks
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={handleViewReports}>
                  Export Report
                </Button>
              </div>

              <div className="space-y-4">
                {/* This would be a paginated list of historical tasks */}
                <p className="text-center text-muted-foreground py-8">
                  Historical task data would be displayed here with filtering
                  and pagination options.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Task Detail Modal */}
      {selectedTaskId && (
        <TaskDetailModal
          isOpen={!!selectedTaskId}
          onClose={handleCloseTaskDetail}
          task={{
            id: selectedTaskId,
            title: "Security Check at Main Entrance",
            description:
              "Perform routine security check at the main entrance. Verify all access points and report any suspicious activity.",
            location: "Building A, Main Entrance",
            priority: "high",
            status: "in_progress",
            assignedTime: new Date().toISOString(),
            notes: [
              "Arrived at location at " + new Date().toLocaleTimeString(),
              "All access points secure",
            ],
          }}
        />
      )}

      {/* Support Request Modal */}
      {showHelpModal && (
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
                    <option value="backup">Request Backup</option>
                    <option value="medical">Medical Assistance</option>
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
              <Button variant="outline" onClick={() => setShowHelpModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Support request submitted");
                  setShowHelpModal(false);
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

export default OfficerDashboard;
