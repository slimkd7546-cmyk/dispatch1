import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  RefreshCw,
  Calendar,
  Clock,
  MapPin,
  User,
  Truck,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import FilterPanel, {
  FilterGroup,
  DateRangeFilter,
} from "@/components/common/FilterPanel";

interface Dispatch {
  id: string;
  title: string;
  location: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed" | "cancelled";
  assignedTo: string;
  createdAt: string;
  description: string;
  origin?: string;
  destination?: string;
  pickupTime?: string;
  deliveryTime?: string;
  distance?: number;
  weight?: number;
  reference?: string;
  vehicleType?: string;
}

interface DispatchListProps {
  dispatches?: Dispatch[];
  onViewDispatch?: (id: string) => void;
  onEditDispatch?: (id: string) => void;
  onDeleteDispatch?: (id: string) => void;
  onCreateDispatch?: () => void;
}

const DispatchList = ({
  dispatches = [
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
      id: "406681",
      title: "Equipment Delivery",
      location: "Highway 61",
      origin: "Houston, TX, 77061",
      destination: "Hammond, IN, 46320",
      priority: "medium",
      status: "pending",
      assignedTo: "Ethan Filin",
      createdAt: "2023-06-15T11:45:00Z",
      description: "Deliver specialized equipment to manufacturing plant",
      pickupTime: "2023-06-15T22:00:00Z",
      deliveryTime: "2023-06-16T12:00:00Z",
      distance: 1075,
      weight: 1000,
      reference: "#25-46",
      vehicleType: "Cargo van",
    },
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
      description: "Transport medical supplies to regional hospital",
      pickupTime: "2023-06-15T20:00:00Z",
      deliveryTime: "2023-06-16T08:00:00Z",
      distance: 502,
      weight: 300,
      reference: "#20-46",
      vehicleType: "Refrigerated truck",
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
      description: "Deliver retail merchandise to distribution center",
      pickupTime: "2023-06-15T19:30:00Z",
      deliveryTime: "2023-06-16T10:00:00Z",
      distance: 500,
      weight: 300,
      reference: "#16-46",
      vehicleType: "Box truck",
    },
  ],
  onViewDispatch = () => {},
  onEditDispatch = () => {},
  onDeleteDispatch = () => {},
  onCreateDispatch = () => {},
}: DispatchListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [referenceFilter, setReferenceFilter] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeFilter>({
    startDate: "",
    endDate: "",
  });

  // Filter groups
  const [statusFilterGroup, setStatusFilterGroup] = useState<FilterGroup>({
    id: "status",
    name: "Status",
    options: [
      { id: "pending", label: "Pending", checked: false },
      { id: "in-progress", label: "In Progress", checked: false },
      { id: "completed", label: "Completed", checked: false },
      { id: "cancelled", label: "Cancelled", checked: false },
    ],
  });

  const [priorityFilterGroup, setPriorityFilterGroup] = useState<FilterGroup>({
    id: "priority",
    name: "Priority",
    options: [
      { id: "high", label: "High", checked: false },
      { id: "medium", label: "Medium", checked: false },
      { id: "low", label: "Low", checked: false },
    ],
  });

  const [vehicleFilterGroup, setVehicleFilterGroup] = useState<FilterGroup>({
    id: "vehicle",
    name: "Vehicle Type",
    options: [
      { id: "box-truck", label: "Box Truck", checked: false },
      { id: "cargo-van", label: "Cargo Van", checked: false },
      { id: "refrigerated-truck", label: "Refrigerated Truck", checked: false },
    ],
  });

  // Calculate active filter count
  const getActiveFilterCount = () => {
    const statusCount = statusFilterGroup.options.filter(
      (o) => o.checked,
    ).length;
    const priorityCount = priorityFilterGroup.options.filter(
      (o) => o.checked,
    ).length;
    const vehicleCount = vehicleFilterGroup.options.filter(
      (o) => o.checked,
    ).length;
    const dateCount = dateRange.startDate && dateRange.endDate ? 1 : 0;

    return statusCount + priorityCount + vehicleCount + dateCount;
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
    } else if (groupId === "priority") {
      setPriorityFilterGroup({
        ...priorityFilterGroup,
        options: priorityFilterGroup.options.map((option) =>
          option.id === optionId ? { ...option, checked } : option,
        ),
      });
    } else if (groupId === "vehicle") {
      setVehicleFilterGroup({
        ...vehicleFilterGroup,
        options: vehicleFilterGroup.options.map((option) =>
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
    setPriorityFilterGroup({
      ...priorityFilterGroup,
      options: priorityFilterGroup.options.map((option) => ({
        ...option,
        checked: false,
      })),
    });
    setVehicleFilterGroup({
      ...vehicleFilterGroup,
      options: vehicleFilterGroup.options.map((option) => ({
        ...option,
        checked: false,
      })),
    });
    setDateRange({ startDate: "", endDate: "" });
    setReferenceFilter("");
  };

  // Filter dispatches based on all filters
  const filteredDispatches = dispatches.filter((dispatch) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      dispatch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispatch.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispatch.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispatch.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dispatch.reference &&
        dispatch.reference.toLowerCase().includes(searchQuery.toLowerCase()));

    // Reference filter
    const matchesReference =
      referenceFilter === "" ||
      (dispatch.reference &&
        dispatch.reference
          .toLowerCase()
          .includes(referenceFilter.toLowerCase()));

    // Status filter
    const selectedStatuses = statusFilterGroup.options
      .filter((o) => o.checked)
      .map((o) => o.id);
    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(dispatch.status);

    // Priority filter
    const selectedPriorities = priorityFilterGroup.options
      .filter((o) => o.checked)
      .map((o) => o.id);
    const matchesPriority =
      selectedPriorities.length === 0 ||
      selectedPriorities.includes(dispatch.priority);

    // Vehicle filter
    const selectedVehicles = vehicleFilterGroup.options
      .filter((o) => o.checked)
      .map((o) => o.id);
    const matchesVehicle =
      selectedVehicles.length === 0 ||
      (dispatch.vehicleType &&
        selectedVehicles.includes(
          dispatch.vehicleType.toLowerCase().replace(" ", "-"),
        ));

    // Date range filter
    let matchesDateRange = true;
    if (dateRange.startDate && dateRange.endDate) {
      const pickupDate = dispatch.pickupTime
        ? new Date(dispatch.pickupTime)
        : null;
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      endDate.setHours(23, 59, 59, 999); // Set to end of day

      matchesDateRange = pickupDate
        ? pickupDate >= startDate && pickupDate <= endDate
        : false;
    }

    return (
      matchesSearch &&
      matchesReference &&
      matchesStatus &&
      matchesPriority &&
      matchesVehicle &&
      matchesDateRange
    );
  });

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "default";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "in-progress":
        return "default";
      case "in_progress":
        return "default";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="w-full bg-background p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold">Dispatches</h2>
          <Button
            onClick={onCreateDispatch}
            className="bg-teal-600 hover:bg-teal-700"
          >
            Create New Dispatch
          </Button>
        </div>

        <FilterPanel
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterGroups={[
            statusFilterGroup,
            priorityFilterGroup,
            vehicleFilterGroup,
          ]}
          onFilterChange={handleFilterChange}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onClearFilters={handleClearFilters}
          activeFilterCount={getActiveFilterCount()}
        />

        <div className="mt-4 border rounded-md overflow-hidden">
          <div className="bg-muted px-4 py-3 text-sm font-medium grid grid-cols-12 gap-2">
            <div className="col-span-1 flex items-center">
              <span>ID</span>
            </div>
            <div className="col-span-2 flex items-center gap-1 cursor-pointer">
              <span>Origin</span>
              <ArrowUpDown className="h-3 w-3" />
            </div>
            <div className="col-span-2 flex items-center gap-1 cursor-pointer">
              <span>Destination</span>
              <ArrowUpDown className="h-3 w-3" />
            </div>
            <div className="col-span-1 flex items-center gap-1 cursor-pointer">
              <span>Info</span>
            </div>
            <div className="col-span-2 flex items-center gap-1 cursor-pointer">
              <span>Assigned To</span>
              <ArrowUpDown className="h-3 w-3" />
            </div>
            <div className="col-span-2 flex items-center gap-1 cursor-pointer">
              <span>Status</span>
              <ArrowUpDown className="h-3 w-3" />
            </div>
            <div className="col-span-2 flex items-center justify-end">
              <span>Actions</span>
            </div>
          </div>

          {filteredDispatches.length > 0 ? (
            filteredDispatches.map((dispatch) => (
              <div
                key={dispatch.id}
                className="px-4 py-3 border-t grid grid-cols-12 gap-2 hover:bg-muted/50"
              >
                <div className="col-span-1 flex items-center">
                  <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                    {dispatch.id}
                  </span>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {dispatch.origin}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {dispatch.pickupTime
                        ? new Date(dispatch.pickupTime).toLocaleString(
                            undefined,
                            {
                              month: "numeric",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {dispatch.destination}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {dispatch.deliveryTime
                        ? new Date(dispatch.deliveryTime).toLocaleString(
                            undefined,
                            {
                              month: "numeric",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-col">
                    <span className="text-sm">{dispatch.distance} mi</span>
                    <span className="text-xs text-muted-foreground">
                      {dispatch.weight} lbs
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                      {dispatch.assignedTo.charAt(0)}
                    </div>
                    <span className="text-sm">{dispatch.assignedTo}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={getStatusBadgeVariant(dispatch.status)}
                      className="capitalize"
                    >
                      {dispatch.status.replace("-", " ")}
                    </Badge>
                    <Badge
                      variant={getPriorityBadgeVariant(dispatch.priority)}
                      className="capitalize"
                    >
                      {dispatch.priority}
                    </Badge>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDispatch(dispatch.id)}
                  >
                    View
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onViewDispatch(dispatch.id)}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onEditDispatch(dispatch.id)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDeleteDispatch(dispatch.id)}
                        className="text-destructive"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Filter className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No dispatches found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DispatchList;
