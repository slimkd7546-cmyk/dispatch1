import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpDown,
  MoreVertical,
  FileText,
  Plus,
  Filter,
  Search,
} from "lucide-react";
import FilterPanel, {
  FilterGroup,
  DateRangeFilter,
} from "@/components/common/FilterPanel";

interface Load {
  id: string;
  reference: string;
  customer: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  status: "active" | "pending" | "completed" | "cancelled";
  rate: string;
  weight: number;
  distance: number;
  driver?: string;
  notes?: string;
}

const LoadsPage = () => {
  const [loads, setLoads] = useState<Load[]>([
    {
      id: "L-1001",
      reference: "REF-2023-001",
      customer: "ABC Logistics",
      origin: "Chicago, IL",
      destination: "Detroit, MI",
      pickupDate: "2023-06-15T08:00:00",
      deliveryDate: "2023-06-15T16:00:00",
      status: "active",
      rate: "$1,250.00",
      weight: 2500,
      distance: 280,
      driver: "John Smith",
    },
    {
      id: "L-1002",
      reference: "REF-2023-002",
      customer: "XYZ Transport",
      origin: "Dallas, TX",
      destination: "Houston, TX",
      pickupDate: "2023-06-16T09:00:00",
      deliveryDate: "2023-06-16T15:00:00",
      status: "pending",
      rate: "$850.00",
      weight: 1800,
      distance: 240,
    },
    {
      id: "L-1003",
      reference: "REF-2023-003",
      customer: "Global Shipping Co",
      origin: "Miami, FL",
      destination: "Atlanta, GA",
      pickupDate: "2023-06-14T07:30:00",
      deliveryDate: "2023-06-14T19:00:00",
      status: "completed",
      rate: "$1,450.00",
      weight: 3200,
      distance: 660,
      driver: "Sarah Johnson",
      notes: "Delivered ahead of schedule",
    },
    {
      id: "L-1004",
      reference: "REF-2023-004",
      customer: "Fast Freight Inc",
      origin: "Seattle, WA",
      destination: "Portland, OR",
      pickupDate: "2023-06-17T10:00:00",
      deliveryDate: "2023-06-17T14:00:00",
      status: "pending",
      rate: "$750.00",
      weight: 1500,
      distance: 170,
    },
    {
      id: "L-1005",
      reference: "REF-2023-005",
      customer: "Midwest Carriers",
      origin: "Indianapolis, IN",
      destination: "Columbus, OH",
      pickupDate: "2023-06-15T11:00:00",
      deliveryDate: "2023-06-15T16:00:00",
      status: "active",
      rate: "$650.00",
      weight: 1200,
      distance: 175,
      driver: "Mike Wilson",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeFilter>({
    startDate: "",
    endDate: "",
  });

  // Filter groups
  const [statusFilterGroup, setStatusFilterGroup] = useState<FilterGroup>({
    id: "status",
    name: "Status",
    options: [
      { id: "active", label: "Active", checked: false },
      { id: "pending", label: "Pending", checked: false },
      { id: "completed", label: "Completed", checked: false },
      { id: "cancelled", label: "Cancelled", checked: false },
    ],
  });

  const [customerFilterGroup, setCustomerFilterGroup] = useState<FilterGroup>({
    id: "customer",
    name: "Customer",
    options: [
      { id: "abc-logistics", label: "ABC Logistics", checked: false },
      { id: "xyz-transport", label: "XYZ Transport", checked: false },
      { id: "global-shipping", label: "Global Shipping Co", checked: false },
      { id: "fast-freight", label: "Fast Freight Inc", checked: false },
      { id: "midwest-carriers", label: "Midwest Carriers", checked: false },
    ],
  });

  // Calculate active filter count
  const getActiveFilterCount = () => {
    const statusCount = statusFilterGroup.options.filter(
      (o) => o.checked,
    ).length;
    const customerCount = customerFilterGroup.options.filter(
      (o) => o.checked,
    ).length;
    const dateCount = dateRange.startDate && dateRange.endDate ? 1 : 0;

    return statusCount + customerCount + dateCount;
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
    } else if (groupId === "customer") {
      setCustomerFilterGroup({
        ...customerFilterGroup,
        options: customerFilterGroup.options.map((option) =>
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
    setCustomerFilterGroup({
      ...customerFilterGroup,
      options: customerFilterGroup.options.map((option) => ({
        ...option,
        checked: false,
      })),
    });
    setDateRange({ startDate: "", endDate: "" });
    setSearchQuery("");
  };

  // Filter loads based on all filters
  const filteredLoads = loads.filter((load) => {
    // Tab filter
    if (activeTab !== "all" && load.status !== activeTab) {
      return false;
    }

    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      load.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.destination.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const selectedStatuses = statusFilterGroup.options
      .filter((o) => o.checked)
      .map((o) => o.id);
    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(load.status);

    // Customer filter
    const selectedCustomers = customerFilterGroup.options
      .filter((o) => o.checked)
      .map((o) => o.id);
    const matchesCustomer =
      selectedCustomers.length === 0 ||
      selectedCustomers.some((c) =>
        load.customer.toLowerCase().includes(c.replace("-", " ")),
      );

    // Date range filter
    let matchesDateRange = true;
    if (dateRange.startDate && dateRange.endDate) {
      const pickupDate = new Date(load.pickupDate);
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      endDate.setHours(23, 59, 59, 999); // Set to end of day

      matchesDateRange = pickupDate >= startDate && pickupDate <= endDate;
    }

    return (
      matchesSearch && matchesStatus && matchesCustomer && matchesDateRange
    );
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: Load["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Loads</h2>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" /> Create New Load
            </Button>
          </div>

          <div className="space-y-4">
            <FilterPanel
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterGroups={[statusFilterGroup, customerFilterGroup]}
              onFilterChange={handleFilterChange}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              onClearFilters={handleClearFilters}
              activeFilterCount={getActiveFilterCount()}
            />

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="active" />
                <label
                  htmlFor="active"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Active
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="pending" />
                <label
                  htmlFor="pending"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Pending
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="completed" />
                <label
                  htmlFor="completed"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Completed
                </label>
              </div>
            </div>

            {/* Tabs and table */}
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="all">All Loads</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">
                          <div className="flex items-center gap-1 cursor-pointer">
                            <span>ID</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1 cursor-pointer">
                            <span>Reference</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1 cursor-pointer">
                            <span>Customer</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1 cursor-pointer">
                            <span>Origin</span>
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1 cursor-pointer">
                            <span>Destination</span>
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1 cursor-pointer">
                            <span>Pickup</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1 cursor-pointer">
                            <span>Status</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1 cursor-pointer">
                            <span>Rate</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLoads.length > 0 ? (
                        filteredLoads.map((load) => (
                          <TableRow key={load.id}>
                            <TableCell className="font-medium">
                              {load.id}
                            </TableCell>
                            <TableCell>{load.reference}</TableCell>
                            <TableCell>{load.customer}</TableCell>
                            <TableCell>{load.origin}</TableCell>
                            <TableCell>{load.destination}</TableCell>
                            <TableCell>{formatDate(load.pickupDate)}</TableCell>
                            <TableCell>{getStatusBadge(load.status)}</TableCell>
                            <TableCell>{load.rate}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() =>
                                      console.log(`View load ${load.id}`)
                                    }
                                  >
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      console.log(`Edit load ${load.id}`)
                                    }
                                  >
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      console.log(
                                        `Assign driver to load ${load.id}`,
                                      )
                                    }
                                  >
                                    Assign Driver
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      console.log(`Delete load ${load.id}`)
                                    }
                                    className="text-destructive"
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8">
                            <div className="flex flex-col items-center justify-center">
                              <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                              <h3 className="text-lg font-medium">
                                No loads found
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Try adjusting your search or filters to find
                                what you're looking for.
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Tabs>

            {/* Quick stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Loads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{loads.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    All time loads in system
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Loads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {loads.filter((load) => load.status === "active").length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Currently in transit
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Loads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">
                    {loads.filter((load) => load.status === "pending").length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Awaiting assignment
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Loads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {loads.filter((load) => load.status === "completed").length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Successfully delivered
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default LoadsPage;
