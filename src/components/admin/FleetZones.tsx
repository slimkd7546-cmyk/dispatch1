import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Truck,
  Filter,
  Map,
  Layers,
} from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  type: string;
  status: "active" | "maintenance" | "inactive";
  driver: string;
  location: string;
  lastUpdated: string;
}

interface Zone {
  id: string;
  name: string;
  type: string;
  coverage: string;
  vehicles: number;
  status: "active" | "inactive";
}

const FleetZones = () => {
  const [activeTab, setActiveTab] = useState("fleet");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isAddZoneOpen, setIsAddZoneOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  // Mock data for vehicles
  const mockVehicles: Vehicle[] = [
    {
      id: "V-001",
      name: "Patrol Car 1",
      type: "Sedan",
      status: "active",
      driver: "John Smith",
      location: "Downtown",
      lastUpdated: "5 minutes ago",
    },
    {
      id: "V-002",
      name: "Patrol Car 2",
      type: "SUV",
      status: "active",
      driver: "Sarah Johnson",
      location: "North District",
      lastUpdated: "10 minutes ago",
    },
    {
      id: "V-003",
      name: "Transport Van 1",
      type: "Van",
      status: "maintenance",
      driver: "Unassigned",
      location: "Garage",
      lastUpdated: "2 days ago",
    },
    {
      id: "V-004",
      name: "Patrol Car 3",
      type: "Sedan",
      status: "active",
      driver: "Michael Chen",
      location: "East District",
      lastUpdated: "15 minutes ago",
    },
    {
      id: "V-005",
      name: "Patrol SUV 1",
      type: "SUV",
      status: "inactive",
      driver: "Unassigned",
      location: "Garage",
      lastUpdated: "1 week ago",
    },
  ];

  // Mock data for zones
  const mockZones: Zone[] = [
    {
      id: "Z-001",
      name: "Downtown District",
      type: "Urban",
      coverage: "Central Business District",
      vehicles: 3,
      status: "active",
    },
    {
      id: "Z-002",
      name: "North District",
      type: "Suburban",
      coverage: "Northern Residential Areas",
      vehicles: 2,
      status: "active",
    },
    {
      id: "Z-003",
      name: "East District",
      type: "Mixed",
      coverage: "Eastern Commercial & Residential",
      vehicles: 1,
      status: "active",
    },
    {
      id: "Z-004",
      name: "South District",
      type: "Industrial",
      coverage: "Southern Industrial Zone",
      vehicles: 0,
      status: "inactive",
    },
    {
      id: "Z-005",
      name: "West District",
      type: "Suburban",
      coverage: "Western Residential Areas",
      vehicles: 1,
      status: "active",
    },
  ];

  // Filter vehicles based on search query
  const filteredVehicles = mockVehicles.filter((vehicle) => {
    return (
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Filter zones based on search query
  const filteredZones = mockZones.filter((zone) => {
    return (
      zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.coverage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleEditVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsAddVehicleOpen(true);
  };

  const handleEditZone = (zone: Zone) => {
    setSelectedZone(zone);
    setIsAddZoneOpen(true);
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    // In a real app, this would call an API to delete the vehicle
    console.log(`Deleting vehicle with ID: ${vehicleId}`);
    // Then refresh the vehicle list
  };

  const handleDeleteZone = (zoneId: string) => {
    // In a real app, this would call an API to delete the zone
    console.log(`Deleting zone with ID: ${zoneId}`);
    // Then refresh the zone list
  };

  const getVehicleStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-500">Maintenance</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getZoneStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Fleet & Zones</h1>
          <p className="text-muted-foreground mt-2">
            Manage vehicles and operational zones
          </p>
        </div>
        <div className="flex space-x-2">
          {activeTab === "fleet" ? (
            <Button onClick={() => setIsAddVehicleOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          ) : (
            <Button onClick={() => setIsAddZoneOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Zone
            </Button>
          )}
          <Button variant="outline">
            <Map className="mr-2 h-4 w-4" />
            View Map
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="fleet"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fleet" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Fleet Management
          </TabsTrigger>
          <TabsTrigger value="zones" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Zone Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fleet" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <CardTitle>Vehicles</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search vehicles..."
                      className="pl-8 md:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVehicles.length > 0 ? (
                      filteredVehicles.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                          <TableCell className="font-medium">
                            {vehicle.id}
                          </TableCell>
                          <TableCell>{vehicle.name}</TableCell>
                          <TableCell>{vehicle.type}</TableCell>
                          <TableCell>
                            {getVehicleStatusBadge(vehicle.status)}
                          </TableCell>
                          <TableCell>{vehicle.driver}</TableCell>
                          <TableCell>{vehicle.location}</TableCell>
                          <TableCell>{vehicle.lastUpdated}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditVehicle(vehicle)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteVehicle(vehicle.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No vehicles found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fleet Overview</CardTitle>
              <CardDescription>
                Summary of fleet status and distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Vehicles
                      </p>
                      <p className="text-2xl font-bold">
                        {mockVehicles.length}
                      </p>
                    </div>
                    <Truck className="h-8 w-8 text-primary/50" />
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Active Vehicles
                      </p>
                      <p className="text-2xl font-bold">
                        {
                          mockVehicles.filter((v) => v.status === "active")
                            .length
                        }
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        In Maintenance
                      </p>
                      <p className="text-2xl font-bold">
                        {
                          mockVehicles.filter((v) => v.status === "maintenance")
                            .length
                        }
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">
                  Vehicle Distribution
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm">Sedans</p>
                      <p className="text-sm font-medium">
                        {mockVehicles.filter((v) => v.type === "Sedan").length}
                      </p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{
                          width: `${(mockVehicles.filter((v) => v.type === "Sedan").length / mockVehicles.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm">SUVs</p>
                      <p className="text-sm font-medium">
                        {mockVehicles.filter((v) => v.type === "SUV").length}
                      </p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{
                          width: `${(mockVehicles.filter((v) => v.type === "SUV").length / mockVehicles.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm">Vans</p>
                      <p className="text-sm font-medium">
                        {mockVehicles.filter((v) => v.type === "Van").length}
                      </p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-purple-500"
                        style={{
                          width: `${(mockVehicles.filter((v) => v.type === "Van").length / mockVehicles.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <CardTitle>Operational Zones</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search zones..."
                      className="pl-8 md:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Zone Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Coverage Area</TableHead>
                      <TableHead>Vehicles Assigned</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredZones.length > 0 ? (
                      filteredZones.map((zone) => (
                        <TableRow key={zone.id}>
                          <TableCell className="font-medium">
                            {zone.id}
                          </TableCell>
                          <TableCell>{zone.name}</TableCell>
                          <TableCell>{zone.type}</TableCell>
                          <TableCell>{zone.coverage}</TableCell>
                          <TableCell>{zone.vehicles}</TableCell>
                          <TableCell>
                            {getZoneStatusBadge(zone.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditZone(zone)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteZone(zone.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No zones found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zone Overview</CardTitle>
              <CardDescription>
                Summary of zone coverage and vehicle distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Zones
                      </p>
                      <p className="text-2xl font-bold">{mockZones.length}</p>
                    </div>
                    <MapPin className="h-8 w-8 text-primary/50" />
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Active Zones
                      </p>
                      <p className="text-2xl font-bold">
                        {mockZones.filter((z) => z.status === "active").length}
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Vehicles Assigned
                      </p>
                      <p className="text-2xl font-bold">
                        {mockZones.reduce(
                          (sum, zone) => sum + zone.vehicles,
                          0,
                        )}
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Zone Types</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm">Urban</p>
                      <p className="text-sm font-medium">
                        {mockZones.filter((z) => z.type === "Urban").length}
                      </p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{
                          width: `${(mockZones.filter((z) => z.type === "Urban").length / mockZones.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm">Suburban</p>
                      <p className="text-sm font-medium">
                        {mockZones.filter((z) => z.type === "Suburban").length}
                      </p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{
                          width: `${(mockZones.filter((z) => z.type === "Suburban").length / mockZones.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm">Industrial</p>
                      <p className="text-sm font-medium">
                        {
                          mockZones.filter((z) => z.type === "Industrial")
                            .length
                        }
                      </p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-yellow-500"
                        style={{
                          width: `${(mockZones.filter((z) => z.type === "Industrial").length / mockZones.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm">Mixed</p>
                      <p className="text-sm font-medium">
                        {mockZones.filter((z) => z.type === "Mixed").length}
                      </p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-purple-500"
                        style={{
                          width: `${(mockZones.filter((z) => z.type === "Mixed").length / mockZones.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Vehicle Dialog */}
      <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedVehicle ? "Edit Vehicle" : "Add New Vehicle"}
            </DialogTitle>
            <DialogDescription>
              {selectedVehicle
                ? "Update vehicle details and status"
                : "Add a new vehicle to the fleet"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicle-id" className="text-right">
                ID
              </Label>
              <Input
                id="vehicle-id"
                defaultValue={selectedVehicle?.id || ""}
                className="col-span-3"
                readOnly={!!selectedVehicle}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicle-name" className="text-right">
                Name
              </Label>
              <Input
                id="vehicle-name"
                defaultValue={selectedVehicle?.name || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicle-type" className="text-right">
                Type
              </Label>
              <Select defaultValue={selectedVehicle?.type?.toLowerCase() || ""}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="motorcycle">Motorcycle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicle-status" className="text-right">
                Status
              </Label>
              <Select defaultValue={selectedVehicle?.status || ""}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicle-driver" className="text-right">
                Driver
              </Label>
              <Input
                id="vehicle-driver"
                defaultValue={selectedVehicle?.driver || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicle-location" className="text-right">
                Location
              </Label>
              <Select
                defaultValue={selectedVehicle?.location?.toLowerCase() || ""}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="north district">North District</SelectItem>
                  <SelectItem value="east district">East District</SelectItem>
                  <SelectItem value="south district">South District</SelectItem>
                  <SelectItem value="west district">West District</SelectItem>
                  <SelectItem value="garage">Garage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddVehicleOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {selectedVehicle ? "Save Changes" : "Add Vehicle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Zone Dialog */}
      <Dialog open={isAddZoneOpen} onOpenChange={setIsAddZoneOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedZone ? "Edit Zone" : "Add New Zone"}
            </DialogTitle>
            <DialogDescription>
              {selectedZone
                ? "Update zone details and coverage"
                : "Add a new operational zone"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zone-id" className="text-right">
                ID
              </Label>
              <Input
                id="zone-id"
                defaultValue={selectedZone?.id || ""}
                className="col-span-3"
                readOnly={!!selectedZone}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zone-name" className="text-right">
                Name
              </Label>
              <Input
                id="zone-name"
                defaultValue={selectedZone?.name || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zone-type" className="text-right">
                Type
              </Label>
              <Select defaultValue={selectedZone?.type?.toLowerCase() || ""}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urban">Urban</SelectItem>
                  <SelectItem value="suburban">Suburban</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zone-coverage" className="text-right">
                Coverage
              </Label>
              <Input
                id="zone-coverage"
                defaultValue={selectedZone?.coverage || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zone-status" className="text-right">
                Status
              </Label>
              <Select defaultValue={selectedZone?.status || ""}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddZoneOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {selectedZone ? "Save Changes" : "Add Zone"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FleetZones;
