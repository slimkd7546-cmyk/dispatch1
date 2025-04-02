import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Calendar,
  MapPin,
  User,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FilterPanel, {
  FilterGroup,
  DateRangeFilter,
} from "@/components/common/FilterPanel";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed" | "cancelled";
  dueDate: string;
  assignedTo: {
    name: string;
    avatar?: string;
  };
  location: string;
}

interface TaskListProps {
  tasks?: Task[];
  onTaskSelect?: (taskId: string) => void;
  onStatusUpdate?: (taskId: string, newStatus: Task["status"]) => void;
}

const TaskList = ({
  tasks = [
    {
      id: "1",
      title: "Security patrol at main entrance",
      description: "Conduct routine security check at the main entrance area",
      priority: "high",
      status: "pending",
      dueDate: "2023-06-15T14:00:00",
      assignedTo: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      },
      location: "Main Building - North Entrance",
    },
    {
      id: "2",
      title: "Escort VIP to conference room",
      description:
        "Provide security escort for visiting executive from parking to conference room",
      priority: "medium",
      status: "in-progress",
      dueDate: "2023-06-15T10:30:00",
      assignedTo: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      location: "Executive Wing - Floor 5",
    },
    {
      id: "3",
      title: "Investigate suspicious activity report",
      description:
        "Check security cameras and investigate reported suspicious activity in parking garage",
      priority: "high",
      status: "completed",
      dueDate: "2023-06-14T16:45:00",
      assignedTo: {
        name: "Mike Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      },
      location: "Parking Garage - Level B2",
    },
    {
      id: "4",
      title: "Verify building lockdown procedure",
      description: "Conduct test of emergency lockdown procedure for west wing",
      priority: "low",
      status: "cancelled",
      dueDate: "2023-06-16T09:00:00",
      assignedTo: {
        name: "Lisa Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      },
      location: "West Wing - All Floors",
    },
  ],
  onTaskSelect = (id) => console.log(`Task ${id} selected`),
  onStatusUpdate = (id, status) =>
    console.log(`Task ${id} status updated to ${status}`),
}: TaskListProps) => {
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

  const [locationFilterGroup, setLocationFilterGroup] = useState<FilterGroup>({
    id: "location",
    name: "Location",
    options: [
      { id: "main-building", label: "Main Building", checked: false },
      { id: "executive-wing", label: "Executive Wing", checked: false },
      { id: "parking-garage", label: "Parking Garage", checked: false },
      { id: "west-wing", label: "West Wing", checked: false },
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
    const locationCount = locationFilterGroup.options.filter(
      (o) => o.checked,
    ).length;
    const dateCount = dateRange.startDate && dateRange.endDate ? 1 : 0;

    return statusCount + priorityCount + locationCount + dateCount;
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
    } else if (groupId === "location") {
      setLocationFilterGroup({
        ...locationFilterGroup,
        options: locationFilterGroup.options.map((option) =>
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
    setLocationFilterGroup({
      ...locationFilterGroup,
      options: locationFilterGroup.options.map((option) => ({
        ...option,
        checked: false,
      })),
    });
    setDateRange({ startDate: "", endDate: "" });
  };

  // Filter tasks based on all filters
  const filteredTasks = tasks.filter((task) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const selectedStatuses = statusFilterGroup.options
      .filter((o) => o.checked)
      .map((o) => o.id);
    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(task.status.replace("_", "-"));

    // Priority filter
    const selectedPriorities = priorityFilterGroup.options
      .filter((o) => o.checked)
      .map((o) => o.id);
    const matchesPriority =
      selectedPriorities.length === 0 ||
      selectedPriorities.includes(task.priority);

    // Location filter
    const selectedLocations = locationFilterGroup.options
      .filter((o) => o.checked)
      .map((o) => o.id);
    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.some((loc) =>
        task.location.toLowerCase().includes(loc.replace("-", " ")),
      );

    // Date range filter
    let matchesDateRange = true;
    if (dateRange.startDate && dateRange.endDate) {
      const taskDate = new Date(task.dueDate);
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      endDate.setHours(23, 59, 59, 999); // Set to end of day

      matchesDateRange = taskDate >= startDate && taskDate <= endDate;
    }

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesLocation &&
      matchesDateRange
    );
  });

  // Get status icon based on task status
  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  // Get priority badge color
  const getPriorityBadge = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-background p-6 rounded-lg">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Assigned Tasks</h2>
        </div>

        <FilterPanel
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterGroups={[
            statusFilterGroup,
            priorityFilterGroup,
            locationFilterGroup,
          ]}
          onFilterChange={handleFilterChange}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onClearFilters={handleClearFilters}
          activeFilterCount={getActiveFilterCount()}
        />

        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No tasks found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery || getActiveFilterCount() > 0
                ? "Try adjusting your search or filters"
                : "You have no assigned tasks at the moment"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <Card
                key={task.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onTaskSelect(task.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onStatusUpdate(task.id, "pending");
                          }}
                        >
                          Mark as Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onStatusUpdate(task.id, "in-progress");
                          }}
                        >
                          Start Task
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onStatusUpdate(task.id, "completed");
                          }}
                        >
                          Complete Task
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onStatusUpdate(task.id, "cancelled");
                          }}
                        >
                          Cancel Task
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {task.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(task.status)}
                        <span className="text-xs capitalize">
                          {task.status.replace("-", " ")}
                        </span>
                      </div>
                      {getPriorityBadge(task.priority)}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1 mb-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{task.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{new Date(task.dueDate).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center pt-2">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage
                          src={task.assignedTo.avatar}
                          alt={task.assignedTo.name}
                        />
                        <AvatarFallback>
                          {task.assignedTo.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{task.assignedTo.name}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
