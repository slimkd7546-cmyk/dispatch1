import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  Clock,
  Calendar,
  FileText,
  Download,
  Star,
  MapPin,
  Truck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { format } from "date-fns";

interface Dispatch {
  id: string;
  title: string;
  location: string;
  officer: string;
  completedDate: Date;
  priority: "high" | "medium" | "low";
  status: "completed" | "reviewed";
  rating: number;
}

const mockDispatches: Dispatch[] = [
  {
    id: "DSP-1001",
    title: "Security Patrol - North Campus",
    location: "North Campus, Building A",
    officer: "John Smith",
    completedDate: new Date(2023, 5, 15, 14, 30),
    priority: "high",
    status: "completed",
    rating: 5,
  },
  {
    id: "DSP-1002",
    title: "Alarm Response - Admin Building",
    location: "Admin Building, Floor 2",
    officer: "Sarah Johnson",
    completedDate: new Date(2023, 5, 14, 9, 15),
    priority: "high",
    status: "reviewed",
    rating: 4,
  },
  {
    id: "DSP-1003",
    title: "Escort Service - Parking Lot C",
    location: "Parking Lot C, East Entrance",
    officer: "Michael Brown",
    completedDate: new Date(2023, 5, 13, 22, 45),
    priority: "medium",
    status: "completed",
    rating: 5,
  },
  {
    id: "DSP-1004",
    title: "Suspicious Activity Check",
    location: "Student Center, South Wing",
    officer: "Emily Davis",
    completedDate: new Date(2023, 5, 12, 16, 20),
    priority: "medium",
    status: "reviewed",
    rating: 3,
  },
  {
    id: "DSP-1005",
    title: "Building Lockup - Science Hall",
    location: "Science Hall, All Floors",
    officer: "Robert Wilson",
    completedDate: new Date(2023, 5, 11, 23, 0),
    priority: "low",
    status: "completed",
    rating: 5,
  },
];

const CompletedDispatchList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDispatches, setFilteredDispatches] =
    useState<Dispatch[]>(mockDispatches);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredDispatches(mockDispatches);
    } else {
      const filtered = mockDispatches.filter(
        (dispatch) =>
          dispatch.id.toLowerCase().includes(term) ||
          dispatch.title.toLowerCase().includes(term) ||
          dispatch.location.toLowerCase().includes(term) ||
          dispatch.officer.toLowerCase().includes(term),
      );
      setFilteredDispatches(filtered);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "reviewed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
        />
      ));
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-950 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Completed Dispatches
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Review and manage completed security dispatches
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download size={14} />
              Export
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter size={14} />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search dispatches..."
              className="pl-8 bg-white dark:bg-gray-950"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Officer</TableHead>
                <TableHead>Completed Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDispatches.map((dispatch) => (
                <TableRow key={dispatch.id}>
                  <TableCell className="font-medium">{dispatch.id}</TableCell>
                  <TableCell>{dispatch.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-gray-500" />
                      {dispatch.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center">
                        <User size={14} className="text-gray-600" />
                      </div>
                      {dispatch.officer}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-gray-500" />
                      {format(dispatch.completedDate, "MMM dd, yyyy h:mm a")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getPriorityColor(dispatch.priority)}
                    >
                      {dispatch.priority.charAt(0).toUpperCase() +
                        dispatch.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(dispatch.status)}
                    >
                      <div className="flex items-center gap-1">
                        {dispatch.status === "completed" ? (
                          <CheckCircle size={12} />
                        ) : (
                          <FileText size={12} />
                        )}
                        {dispatch.status.charAt(0).toUpperCase() +
                          dispatch.status.slice(1)}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex">{renderStars(dispatch.rating)}</div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Generate Report</DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletedDispatchList;
