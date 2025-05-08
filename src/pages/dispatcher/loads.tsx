import React, { useState } from "react";
import ThemeAwareDashboardLayout from "@/components/layout/ThemeAwareDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Search,
  Filter,
  ArrowUpDown,
  MapPin,
  ArrowRight,
  Calendar,
  Clock,
  Truck,
  Plus,
  FileText,
} from "lucide-react";
import CreateDispatchModal from "@/components/dispatch/CreateDispatchModal";

const LoadsPage = () => {
  // State for modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock loads data
  const activeLoads = [
    {
      id: "LD-1001",
      title: "Electronics Shipment",
      origin: "Chicago, IL",
      destination: "Detroit, MI",
      distance: "281 miles",
      weight: "5,200 lbs",
      pickupTime: "Today, 2:00 PM",
      deliveryTime: "Tomorrow, 10:00 AM",
      status: "assigned",
      driver: "John Doe",
      truck: "TRK-1001",
    },
    {
      id: "LD-1002",
      title: "Furniture Delivery",
      origin: "Detroit, MI",
      destination: "Cleveland, OH",
      distance: "169 miles",
      weight: "3,800 lbs",
      pickupTime: "Tomorrow, 9:00 AM",
      deliveryTime: "Tomorrow, 3:00 PM",
      status: "in_transit",
      driver: "Mike Smith",
      truck: "TRK-1002",
    },
    {
      id: "LD-1003",
      title: "Medical Supplies",
      origin: "Indianapolis, IN",
      destination: "Columbus, OH",
      distance: "175 miles",
      weight: "2,100 lbs",
      pickupTime: "Jul 18, 8:00 AM",
      deliveryTime: "Jul 18, 2:00 PM",
      status: "pending",
      driver: "Unassigned",
      truck: "Unassigned",
    },
  ];

  const pendingLoads = [
    {
      id: "LD-1004",
      title: "Auto Parts",
      origin: "Columbus, OH",
      destination: "Cincinnati, OH",
      distance: "107 miles",
      weight: "4,500 lbs",
      pickupTime: "Jul 19, 10:00 AM",
      deliveryTime: "Jul 19, 2:00 PM",
      status: "pending",
      driver: "Unassigned",
      truck: "Unassigned",
    },
    {
      id: "LD-1005",
      title: "Retail Goods",
      origin: "Chicago, IL",
      destination: "Milwaukee, WI",
      distance: "92 miles",
      weight: "6,200 lbs",
      pickupTime: "Jul 20, 9:00 AM",
      deliveryTime: "Jul 20, 1:00 PM",
      status: "pending",
      driver: "Unassigned",
      truck: "Unassigned",
    },
  ];

  const completedLoads = [
    {
      id: "LD-0998",
      title: "Construction Materials",
      origin: "St. Louis, MO",
      destination: "Indianapolis, IN",
      distance: "243 miles",
      weight: "8,500 lbs",
      pickupTime: "Jul 12, 8:00 AM",
      deliveryTime: "Jul 12, 5:00 PM",
      status: "completed",
      driver: "Sarah Williams",
      truck: "TRK-1004",
      completedAt: "Jul 12, 4:45 PM",
    },
    {
      id: "LD-0999",
      title: "Food Products",
      origin: "Minneapolis, MN",
      destination: "Milwaukee, WI",
      distance: "337 miles",
      weight: "7,200 lbs",
      pickupTime: "Jul 10, 7:00 AM",
      deliveryTime: "Jul 10, 6:00 PM",
      status: "completed",
      driver: "Ryan Johnson",
      truck: "TRK-1003",
      completedAt: "Jul 10, 5:30 PM",
    },
  ];

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "assigned":
        return <Badge className="bg-blue-500">Assigned</Badge>;
      case "in_transit":
        return <Badge className="bg-green-500">In Transit</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Handle new load creation
  const handleCreateLoad = (data: any) => {
    console.log("New load created:", data);
    // In a real app, this would send the data to the server
    setIsCreateModalOpen(false);
  };

  return (
    <ThemeAwareDashboardLayout pageTitle="Load Management">
      <div className="w-full h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Load Management</h1>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Load
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input placeholder="Search loads..." className="w-full pl-10" />
            <div className="absolute left-3 top-2.5">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button variant="outline">
              <ArrowUpDown className="h-4 w-4 mr-2" /> Sort
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 max-w-md">
            <TabsTrigger value="active">Active Loads</TabsTrigger>
            <TabsTrigger value="pending">Pending Loads</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Loads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeLoads.map((load) => (
                    <div
                      key={load.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{load.id}</Badge>
                            {getStatusBadge(load.status)}
                          </div>
                          <h3 className="font-medium mt-2">{load.title}</h3>
                          <div className="mt-2 flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="font-medium">{load.origin}</span>
                            <ArrowRight className="h-4 w-4 mx-2" />
                            <span className="font-medium">
                              {load.destination}
                            </span>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            {load.distance} • {load.weight}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>Pickup: {load.pickupTime}</span>
                          </div>
                          <div className="flex items-center text-sm mt-1">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>Delivery: {load.deliveryTime}</span>
                          </div>
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{load.driver}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Truck className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{load.truck}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Track
                          </Button>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Loads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingLoads.map((load) => (
                    <div
                      key={load.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{load.id}</Badge>
                            {getStatusBadge(load.status)}
                          </div>
                          <h3 className="font-medium mt-2">{load.title}</h3>
                          <div className="mt-2 flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="font-medium">{load.origin}</span>
                            <ArrowRight className="h-4 w-4 mx-2" />
                            <span className="font-medium">
                              {load.destination}
                            </span>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            {load.distance} • {load.weight}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>Pickup: {load.pickupTime}</span>
                          </div>
                          <div className="flex items-center text-sm mt-1">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>Delivery: {load.deliveryTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4 gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm">Assign</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Loads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedLoads.map((load) => (
                    <div
                      key={load.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{load.id}</Badge>
                            {getStatusBadge(load.status)}
                          </div>
                          <h3 className="font-medium mt-2">{load.title}</h3>
                          <div className="mt-2 flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="font-medium">{load.origin}</span>
                            <ArrowRight className="h-4 w-4 mx-2" />
                            <span className="font-medium">
                              {load.destination}
                            </span>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            {load.distance} • {load.weight}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>Completed: {load.completedAt}</span>
                          </div>
                          <div className="flex items-center text-sm mt-1">
                            <Truck className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>
                              {load.truck} • {load.driver}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          View Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Create Dispatch Modal */}
        <CreateDispatchModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onSubmit={handleCreateLoad}
        />
      </div>
    </ThemeAwareDashboardLayout>
  );
};

export default LoadsPage;

const User = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
