import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Clock,
  Filter,
  Plus,
  Search,
  Calendar,
  User,
  MapPin,
  ArrowRight,
  AlertTriangle,
  MoreVertical,
  FileText,
  MessageSquare,
  PhoneCall,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TasksPage = () => {
  // Mock tasks data
  const activeTasks = [
    {
      id: "TSK-1001",
      title: "Delivery Verification",
      description:
        "Verify delivery of electronics shipment to Detroit facility",
      priority: "high",
      status: "in_progress",
      assignee: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      },
      dueDate: "Today, 5:00 PM",
      createdAt: "Today, 9:00 AM",
      location: "Detroit, MI",
      relatedTo: "LD-1001",
    },
    {
      id: "TSK-1002",
      title: "Customer Follow-up",
      description:
        "Call customer to confirm satisfaction with furniture delivery",
      priority: "medium",
      status: "pending",
      assignee: {
        name: "Sarah Williams",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      dueDate: "Tomorrow, 12:00 PM",
      createdAt: "Today, 10:30 AM",
      location: "Remote",
      relatedTo: "LD-1002",
    },
    {
      id: "TSK-1003",
      title: "Maintenance Scheduling",
      description: "Schedule maintenance for truck TRK-1004",
      priority: "medium",
      status: "pending",
      assignee: {
        name: "Mike Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      },
      dueDate: "Jul 20, 2:00 PM",
      createdAt: "Yesterday, 3:15 PM",
      location: "Columbus, OH",
      relatedTo: "TRK-1004",
    },
    {
      id: "TSK-1004",
      title: "Route Optimization",
      description: "Optimize delivery routes for Chicago area deliveries",
      priority: "low",
      status: "in_progress",
      assignee: {
        name: "Ryan Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan",
      },
      dueDate: "Jul 19, 4:00 PM",
      createdAt: "Yesterday, 11:00 AM",
      location: "Chicago, IL",
      relatedTo: "ROUTE-CHI",
    },
  ];

  const completedTasks = [
    {
      id: "TSK-0998",
      title: "Inventory Check",
      description: "Verify inventory levels at Indianapolis warehouse",
      priority: "high",
      status: "completed",
      assignee: {
        name: "Dan Brown",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dan",
      },
      dueDate: "Jul 15, 3:00 PM",
      completedAt: "Jul 15, 2:45 PM",
      createdAt: "Jul 14, 10:00 AM",
      location: "Indianapolis, IN",
      relatedTo: "INV-IND",
    },
    {
      id: "TSK-0999",
      title: "Driver Training",
      description: "Conduct safety training for new drivers",
      priority: "medium",
      status: "completed",
      assignee: {
        name: "Sarah Williams",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      dueDate: "Jul 14, 1:00 PM",
      completedAt: "Jul 14, 12:50 PM",
      createdAt: "Jul 12, 9:30 AM",
      location: "Training Center",
      relatedTo: "TRN-SAFETY",
    },
  ];

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "low":
        return <Badge className="bg-blue-500">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return <Badge className="bg-green-500">In Progress</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "overdue":
        return <Badge className="bg-red-500">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Task Management</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">
                  {activeTasks.length + completedTasks.length}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold">
                  {
                    activeTasks.filter((task) => task.status === "in_progress")
                      .length
                  }
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-2xl font-bold">
                  {
                    activeTasks.filter((task) => task.status === "pending")
                      .length
                  }
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-2xl font-bold">2</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input placeholder="Search tasks..." className="w-full pl-10" />
            <div className="absolute left-3 top-2.5">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" /> Due Date
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 max-w-md">
            <TabsTrigger value="active">Active Tasks</TabsTrigger>
            <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-4">
              {activeTasks.map((task) => (
                <Card
                  key={task.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{task.id}</span>
                          {getPriorityBadge(task.priority)}
                          {getStatusBadge(task.status)}
                        </div>
                        <h3 className="text-lg font-medium mt-2">
                          {task.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {task.description}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <CheckCircle className="h-4 w-4 mr-2" /> Mark
                            Complete
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <User className="h-4 w-4 mr-2" /> Reassign
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Clock className="h-4 w-4 mr-2" /> Change Due Date
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Assignee
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                            {task.assignee.avatar ? (
                              <img
                                src={task.assignee.avatar}
                                alt={task.assignee.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <User size={14} className="text-gray-600" />
                            )}
                          </div>
                          <span className="text-sm">{task.assignee.name}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Due Date
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{task.dueDate}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Location
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{task.location}</span>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Related to: {task.relatedTo}</span>
                        <span>•</span>
                        <span>Created: {task.createdAt}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" /> Comment
                        </Button>
                        <Button variant="ghost" size="sm">
                          <PhoneCall className="h-4 w-4 mr-2" /> Call
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              {completedTasks.map((task) => (
                <Card
                  key={task.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{task.id}</span>
                          {getPriorityBadge(task.priority)}
                          {getStatusBadge(task.status)}
                        </div>
                        <h3 className="text-lg font-medium mt-2">
                          {task.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {task.description}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ArrowRight className="h-4 w-4 mr-2" /> Create
                            Similar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Assignee
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                            {task.assignee.avatar ? (
                              <img
                                src={task.assignee.avatar}
                                alt={task.assignee.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <User size={14} className="text-gray-600" />
                            )}
                          </div>
                          <span className="text-sm">{task.assignee.name}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Completed
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{task.completedAt}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Location
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{task.location}</span>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Related to: {task.relatedTo}</span>
                        <span>•</span>
                        <span>Created: {task.createdAt}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TasksPage;
