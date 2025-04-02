import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  BarChart2,
  Clock,
  Users,
  AlertTriangle,
  Plus,
  Truck,
  MapPin,
  Calendar,
  Search,
  Filter,
  ArrowUpDown,
  FileText,
  UserPlus,
} from "lucide-react";
import TruckManagement from "@/components/trucks/TruckManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import DispatchList from "@/components/dispatch/DispatchList";
import CreateDispatchModal from "@/components/dispatch/CreateDispatchModal";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DispatcherDashboardProps {
  userName?: string;
  activeDispatches?: number;
  pendingDispatches?: number;
  completedDispatches?: number;
  availableOfficers?: number;
}

const DispatcherDashboard: React.FC<DispatcherDashboardProps> = ({
  userName = "Sarah Johnson",
  activeDispatches = 8,
  pendingDispatches = 12,
  completedDispatches = 24,
  availableOfficers = 15,
}) => {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [activeTrucksTab, setActiveTrucksTab] = useState("list");
  const [showTrucksPanel, setShowTrucksPanel] = useState(false);
  const [truckSearchQuery, setTruckSearchQuery] = useState("");
  const [isAddOfficerModalOpen, setIsAddOfficerModalOpen] = useState(false);

  // Mock data for quick stats
  const quickStats = [
    {
      title: "Active Dispatches",
      value: activeDispatches,
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      change: "+2 from yesterday",
      trend: "up",
    },
    {
      title: "Pending Dispatches",
      value: pendingDispatches,
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      change: "-3 from yesterday",
      trend: "down",
    },
    {
      title: "Completed Today",
      value: completedDispatches,
      icon: <BarChart2 className="h-5 w-5 text-green-500" />,
      change: "+5 from yesterday",
      trend: "up",
    },
    {
      title: "Available Officers",
      value: availableOfficers,
      icon: <Users className="h-5 w-5 text-purple-500" />,
      change: "Same as yesterday",
      trend: "neutral",
    },
  ];

  // Mock data for recent activity
  const recentActivity = [
    {
      id: "act1",
      action: "Dispatch created",
      user: "Sarah Johnson",
      time: "10 minutes ago",
      details: "Created dispatch #406682 to Madison, IN",
    },
    {
      id: "act2",
      action: "Officer assigned",
      user: "John Smith",
      time: "25 minutes ago",
      details: "Assigned Joey Fedorov to dispatch #406682",
    },
    {
      id: "act3",
      action: "Status updated",
      user: "Emily Davis",
      time: "1 hour ago",
      details: "Updated dispatch #406680 to Completed",
    },
    {
      id: "act4",
      action: "Note added",
      user: "Robert Wilson",
      time: "2 hours ago",
      details: "Added note to dispatch #406679",
    },
  ];

  const handleCreateDispatch = (data: any) => {
    console.log("New dispatch created:", data);
    // In a real application, this would send the data to an API
    setIsCreateModalOpen(false);
  };

  const handleViewDispatch = (id: string) => {
    console.log(`Viewing dispatch with ID: ${id}`);
    // In a real application, this would open a detailed view or navigate to a details page
  };

  const handleEditDispatch = (id: string) => {
    console.log(`Editing dispatch with ID: ${id}`);
    // In a real application, this would open the edit modal with pre-filled data
  };

  const handleDeleteDispatch = (id: string) => {
    console.log(`Deleting dispatch with ID: ${id}`);
    // In a real application, this would show a confirmation dialog and then delete
  };

  // Function to handle Add Officer button click
  const handleAddOfficer = () => {
    setIsAddOfficerModalOpen(true);
  };

  // Function to handle View Map button click
  const handleViewMap = () => {
    navigate("/map");
  };

  // Function to handle Reports button click
  const handleReports = () => {
    navigate("/reports");
  };

  // Function to handle Add Officer form submission
  const handleAddOfficerSubmit = (data: any) => {
    console.log("New officer added:", data);
    // In a real application, this would send the data to an API
    setIsAddOfficerModalOpen(false);
  };

  return (
    <div className="w-full h-full bg-background p-6 overflow-auto">
      <div className="flex flex-col space-y-6">
        {/* Welcome section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome, {userName}
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor all dispatch operations from your dashboard.
            </p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 md:mt-0 bg-teal-600 hover:bg-teal-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Dispatch
          </Button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  {stat.trend === "up" && (
                    <ChevronUp className="h-3 w-3 text-green-500 mr-1" />
                  )}
                  {stat.trend === "down" && (
                    <ChevronDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dispatch management section - takes up 2/3 of the space */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Dispatch Management</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Filter className="h-4 w-4" /> Filter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="h-4 w-4" /> Sort
                </Button>
              </div>
            </div>

            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <DispatchList
                  onViewDispatch={handleViewDispatch}
                  onEditDispatch={handleEditDispatch}
                  onDeleteDispatch={handleDeleteDispatch}
                  onCreateDispatch={() => setIsCreateModalOpen(true)}
                />
              </TabsContent>
              <TabsContent value="pending" className="mt-4">
                <DispatchList
                  dispatches={[
                    {
                      id: "406681",
                      title: "Equipment Delivery",
                      location: "Highway 61",
                      origin: "Houston, TX, 77061",
                      destination: "Hammond, IN, 46320",
                      priority: "medium",
                      status: "pending",
                      assignedTo: "Ethan Filin",
                      createdAt: "2023-06-15T11:45:00Z",
                      description:
                        "Deliver specialized equipment to manufacturing plant",
                      pickupTime: "2023-06-15T22:00:00Z",
                      deliveryTime: "2023-06-16T12:00:00Z",
                      distance: 1075,
                      weight: 1000,
                      reference: "#25-46",
                      vehicleType: "Cargo van",
                    },
                    {
                      id: "406679",
                      title: "Electronics Shipment",
                      location: "Interstate 20",
                      origin: "Laredo, TX, 78040",
                      destination: "Henderson, TN, 38340",
                      priority: "high",
                      status: "pending",
                      assignedTo: "Janet Smith",
                      createdAt: "2023-06-15T14:00:00Z",
                      description: "Transport sensitive electronics equipment",
                      pickupTime: "2023-06-15T13:30:00Z",
                      deliveryTime: "2023-06-16T08:00:00Z",
                      distance: 985,
                      weight: 1100,
                      reference: "#18-46",
                      vehicleType: "Box truck",
                    },
                  ]}
                  onViewDispatch={handleViewDispatch}
                  onEditDispatch={handleEditDispatch}
                  onDeleteDispatch={handleDeleteDispatch}
                  onCreateDispatch={() => setIsCreateModalOpen(true)}
                />
              </TabsContent>
              <TabsContent value="in-progress" className="mt-4">
                <DispatchList
                  dispatches={[
                    {
                      id: "406682",
                      title: "Cargo Transport",
                      location: "Interstate Route 95",
                      origin: "Laredo, TX, 78040",
                      destination: "Madison, IN, 47250",
                      priority: "high",
                      status: "in-progress",
                      assignedTo: "Joey Fedorov",
                      createdAt: "2023-06-15T10:30:00Z",
                      description: "Transport cargo from origin to destination",
                      pickupTime: "2023-06-15T14:30:00Z",
                      deliveryTime: "2023-06-16T07:00:00Z",
                      distance: 1344,
                      weight: 2000,
                      reference: "#27-46",
                      vehicleType: "Box truck",
                    },
                    {
                      id: "406678",
                      title: "Retail Goods Delivery",
                      location: "Interstate 75",
                      origin: "Suwanee, GA, 30024",
                      destination: "Bridgewater, VA, 22812",
                      priority: "medium",
                      status: "in-progress",
                      assignedTo: "Ryan Bagrenko",
                      createdAt: "2023-06-15T13:20:00Z",
                      description:
                        "Deliver retail merchandise to distribution center",
                      pickupTime: "2023-06-15T19:30:00Z",
                      deliveryTime: "2023-06-16T10:00:00Z",
                      distance: 500,
                      weight: 300,
                      reference: "#16-46",
                      vehicleType: "Box truck",
                    },
                  ]}
                  onViewDispatch={handleViewDispatch}
                  onEditDispatch={handleEditDispatch}
                  onDeleteDispatch={handleDeleteDispatch}
                  onCreateDispatch={() => setIsCreateModalOpen(true)}
                />
              </TabsContent>
              <TabsContent value="completed" className="mt-4">
                <DispatchList
                  dispatches={[
                    {
                      id: "406680",
                      title: "Medical Supplies Transport",
                      location: "Interstate 85",
                      origin: "Suwanee, GA, 30024",
                      destination: "Bridgewater, VA, 22812",
                      priority: "high",
                      status: "completed",
                      assignedTo: "Dan Kozovyy",
                      createdAt: "2023-06-15T09:15:00Z",
                      description:
                        "Transport medical supplies to regional hospital",
                      pickupTime: "2023-06-15T20:00:00Z",
                      deliveryTime: "2023-06-16T08:00:00Z",
                      distance: 502,
                      weight: 300,
                      reference: "#20-46",
                      vehicleType: "Refrigerated truck",
                    },
                  ]}
                  onViewDispatch={handleViewDispatch}
                  onEditDispatch={handleEditDispatch}
                  onDeleteDispatch={handleDeleteDispatch}
                  onCreateDispatch={() => setIsCreateModalOpen(true)}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Activity feed - takes up 1/3 of the space */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4 hover:bg-muted/50">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-sm">
                          {activity.action}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activity.details}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center mr-2 text-xs">
                          {activity.user.charAt(0)}
                        </div>
                        <span className="text-xs">{activity.user}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <h2 className="text-xl font-semibold mt-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => setShowTrucksPanel(!showTrucksPanel)}
              >
                <Truck className="h-5 w-5 text-teal-600" />
                <span className="text-sm">Manage Trucks</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={handleAddOfficer}
              >
                <UserPlus className="h-5 w-5 text-teal-600" />
                <span className="text-sm">Add Officer</span>
              </Button>
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
                onClick={handleReports}
              >
                <FileText className="h-5 w-5 text-teal-600" />
                <span className="text-sm">Reports</span>
              </Button>
            </div>

            <h2 className="text-xl font-semibold mt-6">Upcoming Dispatches</h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Today</span>
                  </div>

                  <div className="border rounded-md p-3 hover:bg-muted/50">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Cargo Pickup</span>
                      <Badge variant="outline">14:30</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Laredo, TX → Madison, IN
                    </p>
                    <div className="flex items-center mt-2 gap-2">
                      <div className="h-5 w-5 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                        J
                      </div>
                      <span className="text-xs">Joey Fedorov</span>
                    </div>
                  </div>

                  <div className="border rounded-md p-3 hover:bg-muted/50">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Equipment Delivery
                      </span>
                      <Badge variant="outline">22:00</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Houston, TX → Hammond, IN
                    </p>
                    <div className="flex items-center mt-2 gap-2">
                      <div className="h-5 w-5 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                        E
                      </div>
                      <span className="text-xs">Ethan Filin</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Trucks Management Panel */}
      {showTrucksPanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <TruckManagement onClose={() => setShowTrucksPanel(false)} />
        </div>
      )}
      {/* Create Dispatch Modal */}
      <CreateDispatchModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleCreateDispatch}
      />
      {/* Add Officer Modal */}
      <Dialog
        open={isAddOfficerModalOpen}
        onOpenChange={setIsAddOfficerModalOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Officer</DialogTitle>
            <DialogDescription>
              Create a new officer account with appropriate permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" placeholder="John Doe" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="col-span-3"
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                className="col-span-3"
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select defaultValue="active">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="training">In Training</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddOfficerModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                handleAddOfficerSubmit({
                  name: (document.getElementById("name") as HTMLInputElement)
                    ?.value,
                  email: (document.getElementById("email") as HTMLInputElement)
                    ?.value,
                  phone: (document.getElementById("phone") as HTMLInputElement)
                    ?.value,
                  status: "active",
                });
              }}
            >
              Add Officer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="w-[166px] h-[5px]"></div>
    </div>
  );
};

export default DispatcherDashboard;
