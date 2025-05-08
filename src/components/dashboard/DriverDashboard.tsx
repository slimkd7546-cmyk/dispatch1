import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Truck,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Route,
  Fuel,
  Thermometer,
  BarChart2,
  ArrowRight,
  Package,
  FileText,
  Navigation,
  PhoneCall,
  User,
  X,
  HelpCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("current");
  const [showBiddingPanel, setShowBiddingPanel] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [availableLoads, setAvailableLoads] = useState([
    {
      id: "LD-4567",
      title: "Electronics Shipment",
      origin: "Chicago, IL",
      destination: "Detroit, MI",
      distance: "281 miles",
      weight: "5,200 lbs",
      pickupTime: "Tomorrow, 9:00 AM",
      deliveryTime: "Tomorrow, 4:30 PM",
      price: "$850",
      bidCount: 3,
      status: "open_for_bidding",
    },
    {
      id: "LD-4568",
      title: "Furniture Delivery",
      origin: "Detroit, MI",
      destination: "Cleveland, OH",
      distance: "169 miles",
      weight: "3,800 lbs",
      pickupTime: "Jul 18, 10:00 AM",
      deliveryTime: "Jul 18, 3:00 PM",
      price: "$650",
      bidCount: 5,
      status: "open_for_bidding",
    },
    {
      id: "LD-4569",
      title: "Medical Supplies",
      origin: "Indianapolis, IN",
      destination: "Columbus, OH",
      distance: "175 miles",
      weight: "2,100 lbs",
      pickupTime: "Jul 19, 8:00 AM",
      deliveryTime: "Jul 19, 2:00 PM",
      price: "$700",
      bidCount: 2,
      status: "open_for_bidding",
    },
  ]);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [bidAmount, setBidAmount] = useState("");

  // Mock data for current trip
  const currentTrip = {
    id: "T-1234",
    status: "in-progress",
    origin: "Chicago, IL",
    destination: "Detroit, MI",
    distance: "281 miles",
    progress: 65,
    estimatedArrival: "Today, 4:30 PM",
    customer: "Acme Corp",
    loadType: "General Cargo",
    weight: "12,500 lbs",
    pickupTime: "Today, 8:00 AM",
    deliveryTime: "Today, 4:30 PM",
    dispatcher: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      phone: "(555) 123-4567",
    },
  };

  // Mock data for vehicle status
  const vehicleStatus = {
    id: "V-501",
    type: "Box Truck",
    status: "operational",
    fuelLevel: 72,
    mileage: "45,678 miles",
    lastMaintenance: "2023-05-15",
    nextMaintenance: "2023-08-15",
    temperature: "72°F",
    tiresPressure: "OK",
    engineStatus: "Good",
  };

  // Mock data for upcoming trips
  const upcomingTrips = [
    {
      id: "T-1235",
      origin: "Detroit, MI",
      destination: "Cleveland, OH",
      date: "Tomorrow, 9:00 AM",
      customer: "Globex Inc",
      status: "scheduled",
    },
    {
      id: "T-1236",
      origin: "Cleveland, OH",
      destination: "Pittsburgh, PA",
      date: "Jul 18, 10:00 AM",
      customer: "Wayne Enterprises",
      status: "scheduled",
    },
  ];

  // Mock data for recent trips
  const recentTrips = [
    {
      id: "T-1233",
      origin: "Milwaukee, WI",
      destination: "Chicago, IL",
      date: "Yesterday",
      customer: "Initech LLC",
      status: "completed",
    },
    {
      id: "T-1232",
      origin: "Minneapolis, MN",
      destination: "Milwaukee, WI",
      date: "Jul 12",
      customer: "Umbrella Corp",
      status: "completed",
    },
  ];

  // Handle view map
  const handleViewMap = () => {
    navigate("/map");
  };

  // Handle reports
  const handleReports = () => {
    navigate("/reports");
  };

  // Handle support request
  const handleSupportRequest = () => {
    setShowSupportModal(true);
  };

  return (
    <div className="space-y-6 p-6 bg-background w-full h-full overflow-auto">
      {/* Driver header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Driver Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your trips and vehicle
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm font-normal">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
            Active Driver
          </Badge>
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
        </div>
      </div>

      {/* Current trip status */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold flex items-center">
                <Route className="h-5 w-5 mr-2 text-blue-500" />
                Current Trip
              </h2>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-2">
                    {currentTrip.status}
                  </Badge>
                  <span className="text-sm font-medium">#{currentTrip.id}</span>
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="font-medium">{currentTrip.origin}</span>
                  <ArrowRight className="h-4 w-4 mx-2" />
                  <span className="font-medium">{currentTrip.destination}</span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {currentTrip.distance} • {currentTrip.weight}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Progress
              </h3>
              <Progress value={currentTrip.progress} className="h-2" />
              <div className="flex justify-between text-sm">
                <span>{currentTrip.progress}% Complete</span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  ETA: {currentTrip.estimatedArrival}
                </span>
              </div>
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleViewMap}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  View Route
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Dispatcher
              </h3>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src={currentTrip.dispatcher.avatar}
                    alt="Dispatcher"
                  />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{currentTrip.dispatcher.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentTrip.dispatcher.phone}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <PhoneCall className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main content tabs */}
      <Tabs
        defaultValue={currentTab}
        onValueChange={setCurrentTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current Trip</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
          <TabsTrigger value="available">Available Loads</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Customer
                      </h3>
                      <p>{currentTrip.customer}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Load Type
                      </h3>
                      <p>{currentTrip.loadType}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Weight
                      </h3>
                      <p>{currentTrip.weight}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Distance
                      </h3>
                      <p>{currentTrip.distance}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Pickup Time
                      </h3>
                      <p>{currentTrip.pickupTime}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Delivery Time
                      </h3>
                      <p>{currentTrip.deliveryTime}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Trip Timeline</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Pickup Completed</p>
                          <p className="text-sm text-muted-foreground">
                            Today, 8:05 AM • Chicago, IL
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <Truck className="h-4 w-4 text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">In Transit</p>
                          <p className="text-sm text-muted-foreground">
                            Current • 65% Complete
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                            <Package className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">
                            Delivery
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Today, 4:30 PM • Detroit, MI
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{vehicleStatus.type}</p>
                        <p className="text-sm text-muted-foreground">
                          ID: {vehicleStatus.id}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">
                      {vehicleStatus.status}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          Fuel Level
                        </span>
                        <span className="font-medium">
                          {vehicleStatus.fuelLevel}%
                        </span>
                      </div>
                      <Progress
                        value={vehicleStatus.fuelLevel}
                        className="h-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Mileage</p>
                        <p className="font-medium">{vehicleStatus.mileage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Temperature
                        </p>
                        <p className="font-medium">
                          {vehicleStatus.temperature}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Last Maintenance
                        </p>
                        <p className="font-medium">
                          {vehicleStatus.lastMaintenance}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Next Maintenance
                        </p>
                        <p className="font-medium">
                          {vehicleStatus.nextMaintenance}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

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
              onClick={handleReports}
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

        <TabsContent value="upcoming" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Trips</CardTitle>
              <CardDescription>
                Your scheduled trips for the next days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            {trip.status}
                          </Badge>
                          <span className="text-sm font-medium">
                            #{trip.id}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="font-medium">{trip.origin}</span>
                          <ArrowRight className="h-4 w-4 mx-2" />
                          <span className="font-medium">
                            {trip.destination}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{trip.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {trip.customer}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm">
                        <Navigation className="h-4 w-4 mr-2" />
                        View Route
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Trips</CardTitle>
              <CardDescription>Your completed trips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <Badge variant="secondary" className="mr-2">
                            {trip.status}
                          </Badge>
                          <span className="text-sm font-medium">
                            #{trip.id}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="font-medium">{trip.origin}</span>
                          <ArrowRight className="h-4 w-4 mx-2" />
                          <span className="font-medium">
                            {trip.destination}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{trip.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {trip.customer}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Loads</CardTitle>
              <CardDescription>Loads available for bidding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableLoads.map((load) => (
                  <div
                    key={load.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{load.title}</h3>
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
                        <div className="text-lg font-bold">{load.price}</div>
                        <p className="text-sm text-muted-foreground">
                          {load.bidCount} bids
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Pickup: </span>
                        <span>{load.pickupTime}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Delivery:{" "}
                        </span>
                        <span>{load.deliveryTime}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedLoad(load);
                          setShowBiddingPanel(true);
                        }}
                      >
                        Place Bid
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bidding Panel */}
      {showBiddingPanel && selectedLoad && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Place Bid</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBiddingPanel(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                {selectedLoad.origin} to {selectedLoad.destination}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Load ID</p>
                    <p className="font-medium">#{selectedLoad.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Price</p>
                    <p className="font-medium">{selectedLoad.price}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Distance</p>
                    <p className="font-medium">{selectedLoad.distance}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Weight</p>
                    <p className="font-medium">{selectedLoad.weight}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="bid-amount">Your Bid Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5">$</span>
                    <Input
                      id="bid-amount"
                      type="number"
                      placeholder="Enter your bid"
                      className="pl-7"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Suggested bid range: $600 - $850
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bid-notes">Notes (Optional)</Label>
                  <Input
                    id="bid-notes"
                    placeholder="Add any notes about your bid"
                  />
                </div>
              </div>
            </CardContent>
            <div className="flex justify-end p-4 space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowBiddingPanel(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log(
                    `Bid placed: $${bidAmount} for load ${selectedLoad.id}`,
                  );
                  setShowBiddingPanel(false);
                  setBidAmount("");
                }}
              >
                Submit Bid
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Support Request Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Request Support</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSupportModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="supportType">Support Type</Label>
                  <select
                    id="supportType"
                    className="w-full p-2 border rounded-md mt-1"
                  >
                    <option value="technical">Technical Support</option>
                    <option value="mechanical">Mechanical Issue</option>
                    <option value="route">Route Assistance</option>
                    <option value="emergency">Emergency Assistance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <select
                    id="urgency"
                    className="w-full p-2 border rounded-md mt-1"
                  >
                    <option value="low">Low - When Convenient</option>
                    <option value="medium">Medium - As Soon As Possible</option>
                    <option value="high">
                      High - Urgent Assistance Needed
                    </option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    className="w-full p-2 border rounded-md h-24 mt-1"
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

export default DriverDashboard;
