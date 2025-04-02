import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  User,
  Users,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Phone,
  Mail,
  Shield,
  Clock,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Key,
  Settings,
  Lock,
} from "lucide-react";

const UsersPage = () => {
  // Mock users data
  const activeUsers = [
    {
      id: "USR-101",
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      phone: "(555) 123-4567",
      email: "john.doe@example.com",
      role: "Admin",
      status: "active",
      lastActive: "10 minutes ago",
      joinDate: "Jan 15, 2022",
    },
    {
      id: "USR-102",
      name: "Sarah Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      phone: "(555) 234-5678",
      email: "sarah.williams@example.com",
      role: "Dispatcher",
      status: "active",
      lastActive: "5 minutes ago",
      joinDate: "Mar 22, 2022",
    },
    {
      id: "USR-103",
      name: "Mike Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      phone: "(555) 345-6789",
      email: "mike.smith@example.com",
      role: "Dispatcher",
      status: "active",
      lastActive: "1 hour ago",
      joinDate: "Jun 10, 2022",
    },
    {
      id: "USR-104",
      name: "Emily Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      phone: "(555) 456-7890",
      email: "emily.davis@example.com",
      role: "Reviewer",
      status: "active",
      lastActive: "3 hours ago",
      joinDate: "Nov 5, 2022",
    },
    {
      id: "USR-105",
      name: "Ryan Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan",
      phone: "(555) 567-8901",
      email: "ryan.johnson@example.com",
      role: "Officer",
      status: "inactive",
      lastActive: "2 days ago",
      joinDate: "Feb 15, 2023",
    },
  ];

  const inactiveUsers = [
    {
      id: "USR-106",
      name: "Alex Turner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      phone: "(555) 678-9012",
      email: "alex.turner@example.com",
      role: "Dispatcher",
      status: "suspended",
      lastActive: "1 month ago",
      joinDate: "Aug 20, 2022",
      deactivationDate: "Jun 15, 2023",
      deactivationReason: "Security violation",
    },
    {
      id: "USR-107",
      name: "Jessica Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      phone: "(555) 789-0123",
      email: "jessica.brown@example.com",
      role: "Officer",
      status: "terminated",
      lastActive: "2 months ago",
      joinDate: "Apr 10, 2022",
      deactivationDate: "May 30, 2023",
      deactivationReason: "No longer with company",
    },
  ];

  // Get role badge
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-purple-500">Admin</Badge>;
      case "Dispatcher":
        return <Badge className="bg-blue-500">Dispatcher</Badge>;
      case "Officer":
        return <Badge className="bg-green-500">Officer</Badge>;
      case "Reviewer":
        return <Badge className="bg-yellow-500">Reviewer</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      case "suspended":
        return <Badge className="bg-red-500">Suspended</Badge>;
      case "terminated":
        return <Badge className="bg-red-500">Terminated</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">
                  {activeUsers.length + inactiveUsers.length}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold">
                  {
                    activeUsers.filter((user) => user.status === "active")
                      .length
                  }
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Admins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-2xl font-bold">
                  {activeUsers.filter((user) => user.role === "Admin").length}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Dispatchers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">
                  {
                    activeUsers.filter((user) => user.role === "Dispatcher")
                      .length
                  }
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input placeholder="Search users..." className="w-full pl-10" />
            <div className="absolute left-3 top-2.5">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 max-w-md">
            <TabsTrigger value="active">Active Users</TabsTrigger>
            <TabsTrigger value="inactive">Inactive Users</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                              {user.avatar ? (
                                <img
                                  src={user.avatar}
                                  alt={user.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <User className="h-5 w-5 text-gray-600" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {user.id}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                              {user.phone}
                            </div>
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                              {user.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            {user.lastActive}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            {user.joinDate}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Settings className="h-4 w-4 mr-2" /> Edit
                                  Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Shield className="h-4 w-4 mr-2" /> Change
                                  Role
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Key className="h-4 w-4 mr-2" /> Reset
                                  Password
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Lock className="h-4 w-4 mr-2" /> Permissions
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />{" "}
                                  Suspend
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inactive">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Deactivation Date</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inactiveUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                              {user.avatar ? (
                                <img
                                  src={user.avatar}
                                  alt={user.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <User className="h-5 w-5 text-gray-600" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {user.id}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                              {user.phone}
                            </div>
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                              {user.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            {user.deactivationDate}
                          </div>
                        </TableCell>
                        <TableCell>{user.deactivationReason}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <CheckCircle className="h-4 w-4 mr-2" />{" "}
                                  Reactivate
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" /> View
                                  Logs
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <XCircle className="h-4 w-4 mr-2 text-red-500" />{" "}
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
