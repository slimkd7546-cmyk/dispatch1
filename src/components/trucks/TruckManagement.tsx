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
  Filter,
  RefreshCw,
  Map,
  Navigation,
  List,
  Clock,
  XCircle,
} from "lucide-react";
import TruckFilterPanel from "@/components/trucks/TruckFilterPanel";
import AddTruckForm from "@/components/trucks/AddTruckForm";
import TruckDetails from "@/components/trucks/TruckDetails";
import TruckDataTable, {
  TruckDataItem,
} from "@/components/trucks/TruckDataTable";

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

export const TruckManagement: React.FC<TruckManagementProps> = ({
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddTruckDialog, setShowAddTruckDialog] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState<TruckData | null>(null);
  const [showTruckDetailsDialog, setShowTruckDetailsDialog] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<any>(null);

  // Filter groups
  const [statusFilterGroup, setStatusFilterGroup] = useState<any>({
    id: "status",
    name: "Status",
    options: [
      { id: "available", label: "Available", checked: false },
      { id: "on_route", label: "On Route", checked: false },
      { id: "maintenance", label: "Maintenance", checked: false },
      { id: "offline", label: "Offline", checked: false },
    ],
  });

  const [typeFilterGroup, setTypeFilterGroup] = useState<any>({
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

  // Mock data for Delta Express style truck data
  const [deltaExpressTrucks, setDeltaExpressTrucks] = useState<TruckDataItem[]>(
    [
      {
        id: "0007",
        contact: {
          role: "(crd) ",
          name: "Scott",
          phone: "+1 (864) 558-5740",
        },
        info: {
          type: "Cargo van",
          flags: {
            language: "EN",
          },
        },
        dimensions: {
          length: 127,
          width: 53,
          height: 72,
          isLong: true,
          payload: 2500,
        },
        status: "available",
        availability: {
          needsUpdate: true,
        },
        lastKnown: {
          city: "Chicago",
          state: "IL",
          zip: "60666",
          country: "US",
          datetime: "04/22/2025 11:18 EDT",
        },
        actions: {
          canReserve: true,
        },
      },
      {
        id: "0008",
        documentStatus: "expired",
        contact: {
          role: "(crd) ",
          name: "Scott",
          phone: "+1 (864) 558-5740",
        },
        info: {
          type: "Cargo van",
          flags: {
            language: "RU",
          },
        },
        dimensions: {
          length: 96,
          width: 53,
          height: 72,
          isLong: true,
          payload: 2500,
        },
        status: "busy",
        availability: {
          needsUpdate: true,
        },
        lastKnown: {
          city: "Chicago",
          state: "IL",
          zip: "60666",
          country: "US",
          datetime: "03/27/2025 13:55 EDT",
        },
        actions: {
          canReserve: false,
        },
      },
      {
        id: "0009",
        contact: {
          role: "(crd) ",
          name: "Scott",
          phone: "+1 (864) 558-5740",
        },
        info: {
          type: "Cargo van",
          flags: {
            language: "EN",
          },
        },
        dimensions: {
          length: 127,
          width: 53,
          height: 72,
          payload: 2500,
        },
        status: "available",
        availability: {
          needsUpdate: true,
        },
        lastKnown: {
          city: "Chicago",
          state: "IL",
          zip: "60666",
          country: "US",
          datetime: "04/18/2025 13:12 EDT",
        },
        actions: {
          canReserve: true,
        },
      },
      {
        id: "0010",
        contact: {
          role: "(crd) ",
          name: "Max",
          phone: "+1 (864) 558-5740",
        },
        info: {
          type: "Straight truck",
          features: ["liftgate", "pallet jack"],
          flags: {
            language: "EN",
          },
        },
        dimensions: {
          length: 288,
          width: 96,
          height: 96,
          payload: 7000,
        },
        status: "available",
        availability: {
          needsUpdate: true,
        },
        lastKnown: {
          city: "Chicago",
          state: "IL",
          zip: "60666",
          country: "US",
          datetime: "04/03/2025 11:44 EDT",
        },
        actions: {
          canReserve: true,
        },
      },
      {
        id: "0011",
        documentStatus: "expired",
        contact: {
          role: "(crd) ",
          name: "Scott",
          phone: "+1 (864) 558-5740",
        },
        info: {
          type: "Cargo van",
          flags: {
            language: "EN",
          },
        },
        dimensions: {
          length: 145,
          width: 48,
          height: 72,
          payload: 3000,
        },
        status: "busy",
        availability: {
          needsUpdate: true,
        },
        lastKnown: {
          city: "Chicago",
          state: "IL",
          zip: "60666",
          country: "US",
          datetime: "02/12/2025 12:50 EDT",
        },
        actions: {
          canReserve: false,
        },
      },
      {
        id: "0012",
        documentStatus: "expired",
        contact: {
          role: "(crd) ",
          name: "Max",
          phone: "+1 (864) 558-5740",
        },
        info: {
          type: "Cargo van",
          flags: {
            language: "EN",
          },
        },
        dimensions: {
          length: 130,
          width: 52,
          height: 69,
          payload: 2500,
        },
        status: "busy",
        availability: {
          needsUpdate: true,
        },
        lastKnown: {
          city: "Chicago",
          state: "IL",
          zip: "60666",
          country: "US",
          datetime: "04/10/2025 10:48 EDT",
        },
        actions: {
          canReserve: false,
        },
      },
      {
        id: "001Ref-012V",
        contact: {
          role: "(o/d) ",
          name: "Dispatchland",
          company: "COMPANY NAME",
          phone: "+1 (112) 121-2121",
        },
        info: {
          type: "Cargo van",
          flags: {
            language: "RU",
            rate: 0.07,
            rateUnit: "mi",
          },
        },
        dimensions: {
          length: 1,
          width: 1,
          height: 1,
          payload: 2000,
        },
        status: "available",
        availability: {
          needsUpdate: true,
        },
        lastKnown: {
          city: "unknown",
          state: "unknown",
          zip: "unknown",
          country: "",
          datetime: "11/18/2024 09:33 EDT",
        },
        actions: {
          canReserve: true,
        },
      },
      {
        id: "016",
        contact: {
          role: "(o/d) ",
          name: "Uladzimir Biaheza",
          phone: "+1 (916) 296-0176",
        },
        info: {
          type: "Cargo van",
          flags: {
            language: "RU",
            rate: 1.09,
            rateUnit: "mi",
          },
        },
        dimensions: {
          length: 158,
          width: 54,
          height: 68,
          payload: 3000,
        },
        status: "available",
        availability: {
          needsUpdate: true,
        },
        lastKnown: {
          city: "Penn Valley",
          state: "CA",
          zip: "95946",
          country: "US",
          datetime: "03/07/2025 10:12 EDT",
        },
        actions: {
          canReserve: true,
        },
      },
      {
        id: "036",
        contact: {
          role: "(o/d) ",
          name: "Sergey Lutsik",
          phone: "+1 (916) 837-4577",
        },
        info: {
          type: "Cargo van",
          flags: {
            language: "RU",
            rate: 1.9,
            rateUnit: "mi",
          },
        },
        dimensions: {
          length: 147,
          width: 52,
          height: 70,
          isLong: true,
          payload: 2100,
        },
        status: "available",
        availability: {
          location: "La Mirada, CA, 90638, US",
          datetime: "04/24/2025 11:00 EDT",
        },
        lastKnown: {
          city: "La Mirada",
          state: "CA",
          zip: "90638",
          country: "US",
          datetime: "04/24/2025 10:02 EDT",
        },
        actions: {
          canReserve: true,
        },
      },
      {
        id: "040",
        contact: {
          role: "(o/d) ",
          name: "Oleg Vyaznevich",
          company: "Turtle Express LLC",
          phone: "+1 (864) 345-4704",
        },
        info: {
          type: "Straight truck",
          features: ["air ride", "curtains"],
          flags: {
            language: "RU",
            rate: 1.8,
            rateUnit: "mi",
          },
        },
        dimensions: {
          length: 244,
          width: 94,
          height: 96,
          payload: 6500,
        },
        status: "available",
        availability: {
          needsUpdate: true,
        },
        lastKnown: {
          city: "Orange",
          state: "TX",
          zip: "77630",
          country: "US",
          datetime: "04/01/2025 09:23 EDT",
        },
        actions: {
          canReserve: true,
        },
      },
    ],
  );

  // Calculate active filter count
  const getActiveFilterCount = () => {
    const statusCount = statusFilterGroup.options.filter(
      (o: any) => o.checked,
    ).length;
    const typeCount = typeFilterGroup.options.filter(
      (o: any) => o.checked,
    ).length;

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
        options: statusFilterGroup.options.map((option: any) =>
          option.id === optionId ? { ...option, checked } : option,
        ),
      });
    } else if (groupId === "type") {
      setTypeFilterGroup({
        ...typeFilterGroup,
        options: typeFilterGroup.options.map((option: any) =>
          option.id === optionId ? { ...option, checked } : option,
        ),
      });
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setStatusFilterGroup({
      ...statusFilterGroup,
      options: statusFilterGroup.options.map((option: any) => ({
        ...option,
        checked: false,
      })),
    });
    setTypeFilterGroup({
      ...typeFilterGroup,
      options: typeFilterGroup.options.map((option: any) => ({
        ...option,
        checked: false,
      })),
    });
    setSearchQuery("");
    setAppliedFilters(null);
  };

  // Handle applying advanced filters
  const handleApplyFilters = (filters: any) => {
    setAppliedFilters(filters);
  };

  // Filter trucks based on all filters
  const filteredTrucks = trucks.filter((truck) => {
    // Basic search query filter
    const matchesSearch =
      searchQuery === "" ||
      truck.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const selectedStatuses = statusFilterGroup.options
      .filter((o: any) => o.checked)
      .map((o: any) => o.id);
    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(truck.status);

    // Type filter
    const selectedTypes = typeFilterGroup.options
      .filter((o: any) => o.checked)
      .map((o: any) => o.id);
    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.includes(truck.type.toLowerCase().replace(" ", "_"));

    // Advanced filters
    let matchesAdvancedFilters = true;
    if (appliedFilters) {
      // Check truck number
      if (
        appliedFilters.truckNumber &&
        !truck.id
          .toLowerCase()
          .includes(appliedFilters.truckNumber.toLowerCase())
      ) {
        matchesAdvancedFilters = false;
      }

      // Check location city
      if (
        appliedFilters.locationCity &&
        !truck.location
          .toLowerCase()
          .includes(appliedFilters.locationCity.toLowerCase())
      ) {
        matchesAdvancedFilters = false;
      }

      // Check status
      if (appliedFilters.status && appliedFilters.status !== truck.status) {
        matchesAdvancedFilters = false;
      }

      // Check driver
      if (
        appliedFilters.driver &&
        !truck.driver.name
          .toLowerCase()
          .includes(appliedFilters.driver.toLowerCase())
      ) {
        matchesAdvancedFilters = false;
      }

      // Additional filters can be added here as needed
    }

    return (
      matchesSearch && matchesStatus && matchesType && matchesAdvancedFilters
    );
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

  // Handle Delta Express truck actions
  const handleReserveTruck = (truckId: string) => {
    console.log(`Reserve truck ${truckId}`);
  };

  const handleViewTruckLogs = (truckId: string) => {
    console.log(`View logs for truck ${truckId}`);
  };

  const handleArchiveTruck = (truckId: string) => {
    console.log(`Archive truck ${truckId}`);
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
        {/* Advanced Filter Panel */}
        <TruckFilterPanel
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleClearFilters}
        />

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

              {/* Delta Express Style Truck Data Table */}
              <div className="border rounded-md mb-8">
                <TruckDataTable
                  data={deltaExpressTrucks}
                  onReserve={handleReserveTruck}
                  onViewDetails={handleEditTruckDetails}
                  onEdit={handleEditTruckDetails}
                  onViewLogs={handleViewTruckLogs}
                  onArchive={handleArchiveTruck}
                />
              </div>

              {/* Original Truck Table */}
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
                  <h3 className="text-lg font-medium">Map View Coming Soon</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This feature is currently under development.
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
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" /> Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                  </Button>
                </div>
              </div>

              <div className="border rounded-md bg-slate-100 h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">
                    Nearby View Coming Soon
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This feature is currently under development.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Truck Dialog */}
        {showAddTruckDialog && (
          <AddTruckForm
            onClose={() => setShowAddTruckDialog(false)}
            onSubmit={handleAddTruck}
          />
        )}

        {/* Truck Details Dialog */}
        {showTruckDetailsDialog && selectedTruck && (
          <TruckDetails
            truck={selectedTruck}
            onClose={() => setShowTruckDetailsDialog(false)}
            onAssignLoad={handleAssignLoad}
            onEdit={handleEditTruckDetails}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TruckManagement;
