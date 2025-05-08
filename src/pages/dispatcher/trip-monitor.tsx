import React from "react";
import ThemeAwareDashboardLayout from "@/components/layout/ThemeAwareDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Truck,
  MapPin,
  Search,
  Filter,
  ArrowUpDown,
  ArrowRight,
  Clock,
  Calendar,
  Route,
  AlertTriangle,
  CheckCircle,
  Activity,
  Map,
  MessageSquare,
  PhoneCall,
} from "lucide-react";

const TripMonitorPage = () => {
  // Mock trips data
  const activeTrips = [
    {
      id: "T-1001",
      loadId: "LD-1001",
      title: "Electronics Shipment",
      origin: "Chicago, IL",
      destination: "Detroit, MI",
      distance: "281 miles",
      progress: 65,
      status: "in_transit",
      driver: "John Doe",
      truck: "TRK-1001",
      estimatedArrival: "Today, 4:30 PM",
      startedAt: "Today, 8:00 AM",
      currentLocation: "Near Toledo, OH",
      lastUpdate: "10 minutes ago",
    },
    {
      id: "T-1002",
      loadId: "LD-1002",
      title: "Furniture Delivery",
      origin: "Detroit, MI",
      destination: "Cleveland, OH",
      distance: "169 miles",
      progress: 25,
      status: "in_transit",
      driver: "Mike Smith",
      truck: "TRK-1002",
      estimatedArrival: "Today, 6:00 PM",
      startedAt: "Today, 11:00 AM",
      currentLocation: "Near Ann Arbor, MI",
      lastUpdate: "5 minutes ago",
    },
    {
      id: "T-1003",
      loadId: "LD-1003",
      title: "Medical Supplies",
      origin: "Indianapolis, IN",
      destination: "Columbus, OH",
      distance: "175 miles",
      progress: 0,
      status: "scheduled",
      driver: "Ryan Johnson",
      truck: "TRK-1003",
      estimatedArrival: "Tomorrow, 2:00 PM",
      startedAt: "Tomorrow, 8:00 AM",
      currentLocation: "Indianapolis, IN",
      lastUpdate: "1 hour ago",
    },
  ];

  const completedTrips = [
    {
      id: "T-0998",
      loadId: "LD-0998",
      title: "Construction Materials",
      origin: "St. Louis, MO",
      destination: "Indianapolis, IN",
      distance: "243 miles",
      status: "completed",
      driver: "Sarah Williams",
      truck: "TRK-1004",
      startedAt: "Jul 12, 8:00 AM",
      completedAt: "Jul 12, 4:45 PM",
      onTime: true,
    },
    {
      id: "T-0999",
      loadId: "LD-0999",
      title: "Food Products",
      origin: "Minneapolis, MN",
      destination: "Milwaukee, WI",
      distance: "337 miles",
      status: "completed",
      driver: "Dan Brown",
      truck: "TRK-1005",
      startedAt: "Jul 10, 7:00 AM",
      completedAt: "Jul 10, 5:30 PM",
      onTime: true,
    },
  ];

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_transit":
        return <Badge className="bg-green-500">In Transit</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "delayed":
        return <Badge className="bg-yellow-500">Delayed</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <ThemeAwareDashboardLayout pageTitle="Trip Monitor">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Trip Monitor</h1>
          <Button>
            <Map className="mr-2 h-4 w-4" />
            View All on Map
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Trips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">{activeTrips.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                On Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold">2</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Delayed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-2xl font-bold">0</span>
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
                <Activity className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-2xl font-bold">3</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input placeholder="Search trips..." className="w-full pl-10" />
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
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 max-w-md">
            <TabsTrigger value="active">Active Trips</TabsTrigger>
            <TabsTrigger value="completed">Completed Trips</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-6">
              {activeTrips.map((trip) => (
                <Card key={trip.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{trip.id}</Badge>
                          <Badge variant="outline">Load: {trip.loadId}</Badge>
                          {getStatusBadge(trip.status)}
                        </div>
                        <CardTitle className="mt-2">{trip.title}</CardTitle>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Map className="h-4 w-4 mr-2" />
                          Track
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="font-medium">{trip.origin}</span>
                          <ArrowRight className="h-4 w-4 mx-2" />
                          <span className="font-medium">
                            {trip.destination}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {trip.distance}
                        </div>
                        <div className="flex items-center text-sm mt-2">
                          <Truck className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>
                            {trip.driver} • {trip.truck}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Progress
                        </h3>
                        <Progress value={trip.progress} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span>{trip.progress}% Complete</span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            ETA: {trip.estimatedArrival}
                          </span>
                        </div>
                        <div className="flex items-center text-sm mt-2">
                          <Route className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Current location: {trip.currentLocation}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Started
                            </p>
                            <p className="text-sm font-medium">
                              {trip.startedAt}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">ETA</p>
                            <p className="text-sm font-medium">
                              {trip.estimatedArrival}
                            </p>
                          </div>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            Last update: {trip.lastUpdate}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <PhoneCall className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              {completedTrips.map((trip) => (
                <Card key={trip.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{trip.id}</Badge>
                          <Badge variant="outline">Load: {trip.loadId}</Badge>
                          {getStatusBadge(trip.status)}
                        </div>
                        <CardTitle className="mt-2">{trip.title}</CardTitle>
                      </div>
                      <Button variant="outline" size="sm">
                        View Report
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="font-medium">{trip.origin}</span>
                          <ArrowRight className="h-4 w-4 mx-2" />
                          <span className="font-medium">
                            {trip.destination}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {trip.distance}
                        </div>
                        <div className="flex items-center text-sm mt-2">
                          <Truck className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>
                            {trip.driver} • {trip.truck}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Started
                            </p>
                            <p className="text-sm font-medium">
                              {trip.startedAt}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Completed
                            </p>
                            <p className="text-sm font-medium">
                              {trip.completedAt}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center">
                          {trip.onTime ? (
                            <Badge className="bg-green-500">On Time</Badge>
                          ) : (
                            <Badge className="bg-yellow-500">Delayed</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ThemeAwareDashboardLayout>
  );
};

export default TripMonitorPage;
