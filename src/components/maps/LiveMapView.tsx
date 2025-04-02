import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Truck, User, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Officer {
  id: string;
  name: string;
  position: { lat: number; lng: number };
  status: "available" | "busy" | "offline" | "emergency";
  lastUpdate: string;
  vehicle?: string;
}

interface Incident {
  id: string;
  title: string;
  description: string;
  position: { lat: number; lng: number };
  priority: "high" | "medium" | "low";
  status: "active" | "resolved";
  timestamp: string;
  assignedOfficers?: string[];
}

interface LiveMapViewProps {
  officers?: Officer[];
  incidents?: Incident[];
  onOfficerSelect?: (officerId: string) => void;
  onIncidentSelect?: (incidentId: string) => void;
  onDispatchOfficer?: (officerId: string, incidentId: string) => void;
}

const LiveMapView = ({
  officers = [
    {
      id: "o1",
      name: "John Smith",
      position: { lat: 34.052235, lng: -118.243683 },
      status: "available",
      lastUpdate: "2023-06-15T10:30:00Z",
      vehicle: "Patrol Car #12",
    },
    {
      id: "o2",
      name: "Sarah Johnson",
      position: { lat: 34.053235, lng: -118.253683 },
      status: "busy",
      lastUpdate: "2023-06-15T10:28:00Z",
      vehicle: "Patrol Car #08",
    },
    {
      id: "o3",
      name: "Michael Brown",
      position: { lat: 34.055235, lng: -118.243683 },
      status: "offline",
      lastUpdate: "2023-06-15T09:15:00Z",
    },
    {
      id: "o4",
      name: "Emily Davis",
      position: { lat: 34.051235, lng: -118.248683 },
      status: "emergency",
      lastUpdate: "2023-06-15T10:32:00Z",
      vehicle: "Patrol Car #05",
    },
  ],
  incidents = [
    {
      id: "i1",
      title: "Suspicious Activity",
      description: "Suspicious person reported near main entrance",
      position: { lat: 34.052835, lng: -118.245683 },
      priority: "medium",
      status: "active",
      timestamp: "2023-06-15T10:15:00Z",
      assignedOfficers: ["o2"],
    },
    {
      id: "i2",
      title: "Security Breach",
      description: "Unauthorized access at south gate",
      position: { lat: 34.050235, lng: -118.241683 },
      priority: "high",
      status: "active",
      timestamp: "2023-06-15T10:25:00Z",
      assignedOfficers: ["o4"],
    },
    {
      id: "i3",
      title: "Parking Violation",
      description: "Vehicle parked in restricted area",
      position: { lat: 34.053535, lng: -118.246683 },
      priority: "low",
      status: "resolved",
      timestamp: "2023-06-15T09:45:00Z",
      assignedOfficers: [],
    },
  ],
  onOfficerSelect = () => {},
  onIncidentSelect = () => {},
  onDispatchOfficer = () => {},
}: LiveMapViewProps) => {
  const [mapZoom, setMapZoom] = useState(14);
  const [showOfficers, setShowOfficers] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [selectedOfficer, setSelectedOfficer] = useState<string | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);

  // Get status color for officer markers
  const getStatusColor = (status: Officer["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-500";
      case "emergency":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  // Get priority color for incident markers
  const getPriorityColor = (priority: Incident["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  // Format timestamp
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  // Handle officer selection
  const handleOfficerClick = (officerId: string) => {
    setSelectedOfficer(officerId);
    onOfficerSelect(officerId);
  };

  // Handle incident selection
  const handleIncidentClick = (incidentId: string) => {
    setSelectedIncident(incidentId);
    onIncidentSelect(incidentId);
  };

  // Handle dispatch
  const handleDispatch = (officerId: string, incidentId: string) => {
    onDispatchOfficer(officerId, incidentId);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex-1 relative overflow-hidden rounded-lg border">
        {/* Map placeholder - in a real app, this would be a map component */}
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Map view would be displayed here with officer and incident markers
            </p>
          </div>
        </div>

        {/* Officer markers - these would be positioned on the map */}
        {showOfficers &&
          officers.map((officer) => (
            <div
              key={officer.id}
              className="absolute cursor-pointer"
              style={{
                left: `${officer.position.lng * 5 - 590}px`,
                top: `${officer.position.lat * 5 - 170}px`,
              }}
              onClick={() => handleOfficerClick(officer.id)}
            >
              <div
                className={`h-4 w-4 rounded-full ${getStatusColor(
                  officer.status,
                )} ring-2 ring-white`}
              ></div>
              {selectedOfficer === officer.id && (
                <div className="absolute z-10 mt-1 w-48 rounded-md bg-white shadow-lg dark:bg-gray-800 p-2">
                  <p className="font-medium">{officer.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {officer.vehicle || "On foot"}
                  </p>
                  <div className="flex items-center mt-1">
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(officer.status)} text-white`}
                    >
                      {officer.status}
                    </Badge>
                    <span className="text-xs ml-2">
                      Updated: {formatTime(officer.lastUpdate)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}

        {/* Incident markers - these would be positioned on the map */}
        {showIncidents &&
          incidents.map((incident) => (
            <div
              key={incident.id}
              className="absolute cursor-pointer"
              style={{
                left: `${incident.position.lng * 5 - 590}px`,
                top: `${incident.position.lat * 5 - 170}px`,
              }}
              onClick={() => handleIncidentClick(incident.id)}
            >
              <div
                className={`h-5 w-5 ${getPriorityColor(
                  incident.priority,
                )} flex items-center justify-center rounded-full`}
              >
                <AlertTriangle className="h-3 w-3 text-white" />
              </div>
              {selectedIncident === incident.id && (
                <div className="absolute z-10 mt-1 w-64 rounded-md bg-white shadow-lg dark:bg-gray-800 p-2">
                  <div className="flex justify-between items-start">
                    <p className="font-medium">{incident.title}</p>
                    <Badge
                      variant={
                        incident.status === "active" ? "default" : "outline"
                      }
                    >
                      {incident.status}
                    </Badge>
                  </div>
                  <p className="text-xs mt-1">{incident.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Reported: {formatTime(incident.timestamp)}
                  </p>
                  {selectedOfficer && incident.status === "active" && (
                    <Button
                      size="sm"
                      className="mt-2 w-full"
                      onClick={() =>
                        handleDispatch(selectedOfficer, incident.id)
                      }
                    >
                      Dispatch Officer
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}

        {/* Map controls */}
        <div className="absolute bottom-4 right-4 space-y-2">
          <Card className="w-10 shadow-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMapZoom(Math.min(mapZoom + 1, 18))}
            >
              +
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMapZoom(Math.max(mapZoom - 1, 10))}
            >
              -
            </Button>
          </Card>
        </div>
      </div>

      {/* Controls and filters */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Map Layers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-officers">Show Officers</Label>
                <Switch
                  id="show-officers"
                  checked={showOfficers}
                  onCheckedChange={setShowOfficers}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-incidents">Show Incidents</Label>
                <Switch
                  id="show-incidents"
                  checked={showIncidents}
                  onCheckedChange={setShowIncidents}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm font-medium">Officers</p>
                <p className="text-2xl font-bold">{officers.length}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Available</p>
                <p className="text-2xl font-bold text-green-500">
                  {officers.filter((o) => o.status === "available").length}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Active Incidents</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {incidents.filter((i) => i.status === "active").length}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">High Priority</p>
                <p className="text-2xl font-bold text-red-500">
                  {
                    incidents.filter(
                      (i) => i.priority === "high" && i.status === "active",
                    ).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Officer and incident lists */}
      <Tabs defaultValue="officers" className="mt-4">
        <TabsList>
          <TabsTrigger value="officers">Officers</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
        </TabsList>
        <TabsContent value="officers" className="mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {officers.map((officer) => (
              <Card
                key={officer.id}
                className={`cursor-pointer ${selectedOfficer === officer.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => handleOfficerClick(officer.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${getStatusColor(
                          officer.status,
                        )}`}
                      >
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{officer.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {officer.vehicle || "On foot"}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(officer.status)} text-white`}
                    >
                      {officer.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="incidents" className="mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {incidents.map((incident) => (
              <Card
                key={incident.id}
                className={`cursor-pointer ${selectedIncident === incident.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => handleIncidentClick(incident.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <div
                          className={`h-6 w-6 rounded-full flex items-center justify-center ${getPriorityColor(
                            incident.priority,
                          )}`}
                        >
                          <AlertTriangle className="h-3 w-3 text-white" />
                        </div>
                        <p className="font-medium ml-2">{incident.title}</p>
                      </div>
                      <p className="text-sm mt-1">{incident.description}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge
                        variant={
                          incident.status === "active" ? "default" : "outline"
                        }
                      >
                        {incident.status}
                      </Badge>
                      <Badge variant="outline" className="mt-1">
                        {incident.priority}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      Reported: {formatTime(incident.timestamp)}
                    </p>
                    {incident.status === "active" && selectedOfficer && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDispatch(selectedOfficer, incident.id);
                        }}
                      >
                        Dispatch
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LiveMapView;
