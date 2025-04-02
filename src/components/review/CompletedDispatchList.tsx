import React, { useState } from "react";
import { format } from "date-fns";
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Dispatch {
  id: string;
  title: string;
  location: string;
  assignedOfficer: string;
  completedAt: Date;
  status: "approved" | "rejected" | "pending" | "flagged";
  priority: "high" | "medium" | "low";
}

interface CompletedDispatchListProps {
  dispatches?: Dispatch[];
  onViewDispatch?: (id: string) => void;
  onApproveDispatch?: (id: string) => void;
  onRejectDispatch?: (id: string) => void;
  onExportReport?: (filters: any) => void;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "rejected":
      return <XCircle className="h-5 w-5 text-red-500" />;
    case "pending":
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case "flagged":
      return <AlertCircle className="h-5 w-5 text-orange-500" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-300";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "flagged":
      return "bg-orange-100 text-orange-800 border-orange-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-300";
    case "medium":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "low":
      return "bg-green-100 text-green-800 border-green-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const CompletedDispatchList = ({
  dispatches = [
    {
      id: "DSP-1001",
      title: "Suspicious Activity at Main Entrance",
      location: "Building A, Main Entrance",
      assignedOfficer: "John Smith",
      completedAt: new Date(2023, 5, 15, 14, 30),
      status: "approved",
      priority: "high",
    },
    {
      id: "DSP-1002",
      title: "Parking Violation",
      location: "Parking Lot B, Space 45",
      assignedOfficer: "Maria Rodriguez",
      completedAt: new Date(2023, 5, 15, 10, 15),
      status: "rejected",
      priority: "low",
    },
    {
      id: "DSP-1003",
      title: "Maintenance Request",
      location: "Floor 3, Room 302",
      assignedOfficer: "David Chen",
      completedAt: new Date(2023, 5, 14, 16, 45),
      status: "pending",
      priority: "medium",
    },
    {
      id: "DSP-1004",
      title: "Unauthorized Access",
      location: "Server Room, Basement",
      assignedOfficer: "Sarah Johnson",
      completedAt: new Date(2023, 5, 14, 9, 20),
      status: "flagged",
      priority: "high",
    },
    {
      id: "DSP-1005",
      title: "Fire Alarm Check",
      location: "Building C, All Floors",
      assignedOfficer: "Michael Brown",
      completedAt: new Date(2023, 5, 13, 13, 10),
      status: "approved",
      priority: "medium",
    },
  ],
  onViewDispatch = () => {},
  onApproveDispatch = () => {},
  onRejectDispatch = () => {},
  onExportReport = () => {},
}: CompletedDispatchListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const filteredDispatches = dispatches.filter((dispatch) => {
    // Search filter
    const matchesSearch =
      dispatch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispatch.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispatch.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispatch.assignedOfficer.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "all" || dispatch.status === statusFilter;

    // Priority filter
    const matchesPriority =
      priorityFilter === "all" || dispatch.priority === priorityFilter;

    // Date filter (simplified for demo)
    let matchesDate = true;
    const today = new Date();
    const dispatchDate = new Date(dispatch.completedAt);

    if (dateFilter === "today") {
      matchesDate =
        dispatchDate.getDate() === today.getDate() &&
        dispatchDate.getMonth() === today.getMonth() &&
        dispatchDate.getFullYear() === today.getFullYear();
    } else if (dateFilter === "week") {
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);
      matchesDate = dispatchDate >= weekAgo;
    } else if (dateFilter === "month") {
      const monthAgo = new Date(today);
      monthAgo.setMonth(today.getMonth() - 1);
      matchesDate = dispatchDate >= monthAgo;
    }

    return matchesSearch && matchesStatus && matchesPriority && matchesDate;
  });

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Completed Dispatches
          </h2>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() =>
                onExportReport({
                  status: statusFilter,
                  priority: priorityFilter,
                  date: dateFilter,
                })
              }
            >
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search dispatches..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 bg-slate-50 p-4 text-sm font-medium text-slate-600">
                <div className="col-span-2">ID</div>
                <div className="col-span-3">Title</div>
                <div className="col-span-2">Officer</div>
                <div className="col-span-2">Completed</div>
                <div className="col-span-1">Priority</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>

              {filteredDispatches.length > 0 ? (
                <div className="divide-y">
                  {filteredDispatches.map((dispatch) => (
                    <motion.div
                      key={dispatch.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-12 items-center p-4 text-sm"
                    >
                      <div className="col-span-2 font-medium">
                        {dispatch.id}
                      </div>
                      <div
                        className="col-span-3 truncate"
                        title={dispatch.title}
                      >
                        {dispatch.title}
                      </div>
                      <div className="col-span-2 truncate">
                        {dispatch.assignedOfficer}
                      </div>
                      <div className="col-span-2">
                        {format(
                          new Date(dispatch.completedAt),
                          "MMM d, yyyy h:mm a",
                        )}
                      </div>
                      <div className="col-span-1">
                        <Badge
                          className={`${getPriorityColor(dispatch.priority)} capitalize`}
                        >
                          {dispatch.priority}
                        </Badge>
                      </div>
                      <div className="col-span-1">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(dispatch.status)}
                          <span className="sr-only">{dispatch.status}</span>
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-end gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onViewDispatch(dispatch.id)}
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No dispatches found matching your filters.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="grid" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDispatches.length > 0 ? (
                filteredDispatches.map((dispatch) => (
                  <motion.div
                    key={dispatch.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">
                            {dispatch.title}
                          </CardTitle>
                          <Badge className={getStatusColor(dispatch.status)}>
                            {dispatch.status.charAt(0).toUpperCase() +
                              dispatch.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">ID:</span>
                            <span className="text-sm font-medium">
                              {dispatch.id}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Location:
                            </span>
                            <span className="text-sm">{dispatch.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Officer:
                            </span>
                            <span className="text-sm">
                              {dispatch.assignedOfficer}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Completed:
                            </span>
                            <span className="text-sm">
                              {format(
                                new Date(dispatch.completedAt),
                                "MMM d, yyyy h:mm a",
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Priority:
                            </span>
                            <Badge
                              className={getPriorityColor(dispatch.priority)}
                            >
                              {dispatch.priority.charAt(0).toUpperCase() +
                                dispatch.priority.slice(1)}
                            </Badge>
                          </div>
                          <div className="pt-2 flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onViewDispatch(dispatch.id)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full p-8 text-center text-gray-500">
                  No dispatches found matching your filters.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompletedDispatchList;
