import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Truck,
  MapPin,
  User,
  MoreVertical,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Map,
  Navigation,
  List,
  Clock,
  XCircle,
} from "lucide-react";
import TruckFilterPanel, {
  TruckFilterGroup,
} from "@/components/trucks/TruckFilterPanel";
import AddTruckForm from "@/components/trucks/AddTruckForm";
import TruckDetails from "@/components/trucks/TruckDetails";

export interface TruckData {
  id: string;
  type: string;
  status: "available" | "on_route" | "maintenance" | "offline";
  driver: {
    id: string;
    name: string;
    avatar?: string;
  };
  location: string;
  lastUpdated: string;
  fuelLevel: number;
  mileage: number;
  nextMaintenance: string;
}

interface TruckManagementProps {
  onClose?: () => void;
}

const TruckManagement: React.FC<TruckManagementProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddTruckDialog, setShowAddTruckDialog] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState<TruckData | null>(null);
  const [showTruckDetailsDialog, setShowTruckDetailsDialog] = useState(false);

  // Filter groups
  const [statusFilterGroup, setStatusFilterGroup] = useState<TruckFilterGroup>({
    id: "status",
    name: "Status",
    options: [
      { id: "available", label: "Available", checked: false },
      { id: "on_route", label: "On Route", checked: false },
      { id: "maintenance", label: "Maintenance", checked: false },
      { id: "offline", label: "Offline", checked: false },
    ],
  });

  const [typeFilterGroup, setTypeFilterGroup] = useState<TruckFilterGroup>({
    id: "type",
    name: "Type",
    options: [
      { id: "box_truck", label: "Box Truck", checked: false },
      { id: "cargo_van", label: "Cargo Van", checked: false },
      { id: "refrigerated", label: "Refrigerated", checked: false },
      { id: "flatbed", label: "Flatbed", checked: false },
      { id: "tanker", label: "Tanker", checked: false },
    ],
  });

  // Mock data for trucks
  const [trucks, setTrucks] = useState<TruckData[]>([
    {
      id: "TRK-1001",
      type: "Box Truck",
      status: "available",
      driver: {
        id: "DRV-101",
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      },
      location: "Chicago, IL",
      lastUpdated: "10 minutes ago",
      fuelLevel: 85,
      mileage: 45678,
      nextMaintenance: "2023-08-15",
    },
    {
      id: "TRK-1002",
      type: "Cargo Van",
      status: "on_route",
      driver: {
        id: "DRV-102",
        name: "Mike Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      },
      location: "Detroit, MI",
      lastUpdated: "5 minutes ago",
      fuelLevel: 72,
      mileage: 32145,
      nextMaintenance: "2023-07-30",
    },
    {
      id: "TRK-1003",
      type: "Refrigerated",
      status: "on_route",
      driver: {
        id: "DRV-103",
        name: "Ryan Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan",
      },
      location: "Indianapolis, IN",
      lastUpdated: "15 minutes ago",
      fuelLevel: 65,
      mileage: 28976,
      nextMaintenance: "2023-08-05",
    },
    {
      id: "TRK-1004",
      type: "Flatbed",
      status: "maintenance",
      driver: {
        id: "DRV-104",
        name: "Sarah Williams",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      location: "Columbus, OH",
      lastUpdated: "1 hour ago",
      fuelLevel: 45,
      mileage: 52341,
      nextMaintenance: "2023-07-20",
    },
    {
      id: "TRK-1005",
      type: "Tanker",
      status: "offline",
      driver: {
        id: "DRV-105",
        name: "Dan Brown",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dan",
      },
      location: "St. Louis, MO",
      lastUpdated: "3 hours ago",
      fuelLevel: 30,
      mileage: 67890,
      nextMaintenance: "2023-07-15",
    },
  ]);

  // Calculate active filter count
  const getActiveFilterCount = () => {
    const statusCount = statusFilterGroup.options.filter(
      (o) => o.checked,
    ).length;
    const typeCount = typeFilterGroup.options.filter((o) => o.checked).length;

    return statusCount + typeCount;
  };

  // Handle filter changes
  const handleFilterChange = (
    groupId: string,
    optionId: string,
    checked: boolean,
  ) => {
    if (groupId === "status") {
      setStatusFilterGroup({
        ...statusFilterGroup,
        options: statusFilterGroup.options.map((option) =>
          option.id === optionId ? { ...option, checked } : option,
        ),
      });
    } else if (groupId === "type") {
      setTypeFilterGroup({
        ...typeFilterGroup,
        options: typeFilterGroup.options.map((option) =>
          option.id === optionId ? { ...option, checked } : option,
        ),
      });
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setStatusFilterGroup({
      ...statusFilterGroup,
      options: statusFilterGroup.options.map((option) => ({
        ...option,
        checked: false,
      })),
    });
    setTypeFilterGroup({
      ...typeFilterGroup,
      options: typeFilterGroup.options.map((option) => ({
        ...option,
        checked: false,
      })),
    });
    setSearchQuery("");
  };

  // Filter trucks based on all filters
  const filteredTrucks = trucks.filter((truck) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      truck.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const selectedStatuses = statusFilterGroup.options
      .filter((o) => o.checked)
      .map((o) => o.id);
    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(truck.status);

    // Type filter
    const selectedTypes = typeFilterGroup.options
      .filter((o) => o.checked)
      .map((o) => o.id);
    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.includes(truck.type.toLowerCase().replace(" ", "_"));

    return matchesSearch && matchesStatus && matchesType;
  });

  // Handle adding a new truck
  const handleAddTruck = (data: any) => {
    // In a real app, this would send the data to an API
    console.log("Adding new truck:", data);

    // Create a new truck object from the form data
    const newTruck: TruckData = {
      id: data.truckId || `TRK-${Math.floor(1000 + Math.random() * 9000)}`,
      type:
        data.type === "box_truck"
          ? "Box Truck"
          : data.type === "cargo_van"
            ? "Cargo Van"
            : data.type === "refrigerated"
              ? "Refrigerated"
              : data.type === "flatbed"
                ? "Flatbed"
                : data.type === "tanker"
                  ? "Tanker"
                  : "Box Truck",
      status: "available",
      driver: {
        id: `DRV-${Math.floor(100 + Math.random() * 900)}`,
        name:
          data.driver === "john"
            ? "John Doe"
            : data.driver === "mike"
              ? "Mike Smith"
              : data.driver === "ryan"
                ? "Ryan Johnson"
                : data.driver === "sarah"
                  ? "Sarah Williams"
                  : data.driver === "dan"
                    ? "Dan Brown"
                    : "Unassigned",
        avatar: data.driver
          ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.driver}`
          : undefined,
      },
      location: data.location || "Unknown",
      lastUpdated: "Just now",
      fuelLevel: parseInt(data.fuelLevel) || 100,
      mileage: parseInt(data.mileage) || 0,
      nextMaintenance:
        data.nextMaintenance || new Date().toISOString().split("T")[0],
    };

    // Add the new truck to the list
    setTrucks([...trucks, newTruck]);
    setShowAddTruckDialog(false);
  };

  // Handle viewing truck details
  const handleViewTruckDetails = (truck: TruckData) => {
    setSelectedTruck(truck);
    setShowTruckDetailsDialog(true);
  };

  // Handle assigning a load to a truck
  const handleAssignLoad = (truckId: string) => {
    console.log(`Assign load to ${truckId}`);
    setShowTruckDetailsDialog(false);
  };

  // Handle editing truck details
  const handleEditTruckDetails = (truckId: string) => {
    console.log(`Edit ${truckId}`);
    setShowTruckDetailsDialog(false);
  };

  // Get status badge
  const getStatusBadge = (status: TruckData["status"]) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Available</Badge>;
      case "on_route":
        return <Badge className="bg-blue-500">On Route</Badge>;
      case "maintenance":
        return <Badge variant="secondary">Maintenance</Badge>;
      case "offline":
        return <Badge variant="outline">Offline</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl bg-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Trucks Management</CardTitle>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <XCircle className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" /> Trucks List
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="h-4 w-4" /> General Map
            </TabsTrigger>
            <TabsTrigger value="nearby" className="flex items-center gap-2">
              <Navigation className="h-4 w-4" /> Trucks Nearby
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Available Trucks</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => console.log("Refreshing truck data")}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                  </Button>
                  <Button size="sm" onClick={() => setShowAddTruckDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Add Truck
                  </Button>
                </div>
              </div>

              <TruckFilterPanel
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterGroups={[statusFilterGroup, typeFilterGroup]}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                activeFilterCount={getActiveFilterCount()}
              />

              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Truck ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrucks.length > 0 ? (
                      filteredTrucks.map((truck) => (
                        <TableRow key={truck.id}>
                          <TableCell className="font-medium">
                            {truck.id}
                          </TableCell>
                          <TableCell>{truck.type}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                {truck.driver.avatar ? (
                                  <img
                                    src={truck.driver.avatar}
                                    alt={truck.driver.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <User size={14} className="text-gray-600" />
                                )}
                              </div>
                              {truck.driver.name}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(truck.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin size={14} className="text-gray-500" />
                              {truck.location}
                            </div>
                          </TableCell>
                          <TableCell>{truck.lastUpdated}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewTruckDetails(truck)}
                              >
                                Details
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() =>
                                      console.log(`Assign load to ${truck.id}`)
                                    }
                                  >
                                    Assign Load
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      console.log(`Track ${truck.id}`)
                                    }
                                  >
                                    Track Location
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      console.log(`Maintenance for ${truck.id}`)
                                    }
                                  >
                                    Schedule Maintenance
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      console.log(`Edit ${truck.id}`)
                                    }
                                  >
                                    Edit Details
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center">
                            <Truck className="h-10 w-10 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">
                              No trucks found
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Try adjusting your search or filters to find what
                              you're looking for.
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Truck Locations</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" /> Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-2" /> History
                  </Button>
                </div>
              </div>

              <div className="border rounded-md bg-slate-100 h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Map className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Interactive Map View</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
                    This area would display an interactive map showing all truck
                    locations in real-time with filtering options.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nearby" className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Trucks Nearby</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter location or ZIP code"
                    className="w-64"
                  />
                  <Button size="sm">
                    <Search className="h-4 w-4 mr-2" /> Search
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md bg-slate-100 h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <Navigation className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Proximity Map</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
                      Map showing trucks within specified radius
                    </p>
                  </div>
                </div>

                <div className="border rounded-md">
                  <div className="p-4 border-b font-medium">
                    Nearest Available Trucks
                  </div>
                  <div className="divide-y">
                    {filteredTrucks
                      .filter((truck) => truck.status === "available")
                      .slice(0, 4)
                      .map((truck, index) => (
                        <div key={truck.id} className="p-4 hover:bg-muted/50">
                          <div className="flex justify-between">
                            <div className="font-medium">{truck.id}</div>
                            <Badge>
                              {Math.floor(Math.random() * 20) + 1} miles away
                            </Badge>
                          </div>
                          <div className="flex justify-between mt-2">
                            <div className="text-sm text-muted-foreground">
                              {truck.type} • {truck.location}
                            </div>
                            <Button variant="outline" size="sm">
                              Assign
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Add Truck Dialog */}
      <AddTruckForm
        open={showAddTruckDialog}
        onOpenChange={setShowAddTruckDialog}
        onSave={handleAddTruck}
      />

      {/* Truck Details Dialog */}
      <TruckDetails
        truck={selectedTruck}
        open={showTruckDetailsDialog}
        onOpenChange={setShowTruckDetailsDialog}
        onAssignLoad={handleAssignLoad}
        onEditDetails={handleEditTruckDetails}
      />
    </Card>
  );
};

export default TruckManagement;
