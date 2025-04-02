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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  Bell,
  Clock,
  Edit,
  Plus,
  Save,
  Trash2,
  Volume2,
  Zap,
  MessageSquare,
  Mail,
  Phone,
  Shield,
} from "lucide-react";

interface AlertRule {
  id: string;
  name: string;
  type: string;
  condition: string;
  threshold: string;
  priority: "low" | "medium" | "high" | "critical";
  notifications: string[];
  status: "active" | "inactive";
}

const AlertSettings = () => {
  const [activeTab, setActiveTab] = useState("rules");
  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);
  const [isEditRuleOpen, setIsEditRuleOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<AlertRule | null>(null);
  const [globalAlertsEnabled, setGlobalAlertsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);

  // Mock data for alert rules
  const mockAlertRules: AlertRule[] = [
    {
      id: "AR-001",
      name: "High Priority Dispatch",
      type: "dispatch",
      condition: "priority",
      threshold: "high",
      priority: "high",
      notifications: ["email", "push", "sms"],
      status: "active",
    },
    {
      id: "AR-002",
      name: "Officer Response Time",
      type: "performance",
      condition: "response_time",
      threshold: "> 10 minutes",
      priority: "medium",
      notifications: ["email", "push"],
      status: "active",
    },
    {
      id: "AR-003",
      name: "System Downtime",
      type: "system",
      condition: "uptime",
      threshold: "< 99.9%",
      priority: "critical",
      notifications: ["email", "push", "sms"],
      status: "active",
    },
    {
      id: "AR-004",
      name: "Low Fuel Alert",
      type: "vehicle",
      condition: "fuel_level",
      threshold: "< 15%",
      priority: "medium",
      notifications: ["push"],
      status: "inactive",
    },
    {
      id: "AR-005",
      name: "New User Registration",
      type: "user",
      condition: "registration",
      threshold: "any",
      priority: "low",
      notifications: ["email"],
      status: "active",
    },
  ];

  const handleEditRule = (rule: AlertRule) => {
    setSelectedRule(rule);
    setIsEditRuleOpen(true);
  };

  const handleDeleteRule = (ruleId: string) => {
    // In a real app, this would call an API to delete the rule
    console.log(`Deleting rule with ID: ${ruleId}`);
    // Then refresh the rule list
  };

  const handleToggleRuleStatus = (ruleId: string, currentStatus: string) => {
    // In a real app, this would call an API to toggle the rule status
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    console.log(`Toggling rule ${ruleId} to ${newStatus}`);
    // Then refresh the rule list
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <div className="flex items-center">
            <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
            <span>Low</span>
          </div>
        );
      case "medium":
        return (
          <div className="flex items-center">
            <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
            <span>Medium</span>
          </div>
        );
      case "high":
        return (
          <div className="flex items-center">
            <div className="mr-2 h-2 w-2 rounded-full bg-orange-500"></div>
            <span>High</span>
          </div>
        );
      case "critical":
        return (
          <div className="flex items-center">
            <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
            <span>Critical</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center">
            <div className="mr-2 h-2 w-2 rounded-full bg-gray-500"></div>
            <span>{priority}</span>
          </div>
        );
    }
  };

  const getNotificationIcons = (notifications: string[]) => {
    return (
      <div className="flex space-x-1">
        {notifications.includes("email") && (
          <Mail className="h-4 w-4 text-blue-500" />
        )}
        {notifications.includes("push") && (
          <Bell className="h-4 w-4 text-purple-500" />
        )}
        {notifications.includes("sms") && (
          <Phone className="h-4 w-4 text-green-500" />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Alert Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure system alerts and notifications
          </p>
        </div>
        <Button onClick={() => setIsAddRuleOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Alert Rule
        </Button>
      </div>

      <Tabs
        defaultValue="rules"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alert Rules
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            Notification Settings
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Alert History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Rules</CardTitle>
              <CardDescription>
                Configure rules that trigger alerts based on system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Notifications</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAlertRules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell className="font-medium">
                          {rule.name}
                        </TableCell>
                        <TableCell className="capitalize">
                          {rule.type}
                        </TableCell>
                        <TableCell>
                          {rule.condition} {rule.threshold}
                        </TableCell>
                        <TableCell>{getPriorityBadge(rule.priority)}</TableCell>
                        <TableCell>
                          {getNotificationIcons(rule.notifications)}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={rule.status === "active"}
                            onCheckedChange={() =>
                              handleToggleRuleStatus(rule.id, rule.status)
                            }
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditRule(rule)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteRule(rule.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Types</CardTitle>
              <CardDescription>
                Overview of different alert categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Dispatch Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Alerts related to dispatch operations
                      </p>
                    </div>
                    <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                      <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Performance Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Alerts for performance metrics
                      </p>
                    </div>
                    <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                      <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">System Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Alerts for system health and status
                      </p>
                    </div>
                    <div className="rounded-full bg-red-100 p-2 dark:bg-red-900/30">
                      <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Vehicle Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Alerts for vehicle status and maintenance
                      </p>
                    </div>
                    <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900/30">
                      <Truck className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when alerts are delivered
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Master toggle for all system alerts
                    </p>
                  </div>
                  <Switch
                    checked={globalAlertsEnabled}
                    onCheckedChange={setGlobalAlertsEnabled}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Send alerts via email
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                      disabled={!globalAlertsEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Send in-app notifications
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                      disabled={!globalAlertsEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Send alerts via SMS
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                      disabled={!globalAlertsEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Sound Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Play sound for critical alerts
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={soundAlerts}
                      onCheckedChange={setSoundAlerts}
                      disabled={!globalAlertsEnabled}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Schedule</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="quiet-hours-start">Quiet Hours Start</Label>
                    <Select defaultValue="22:00">
                      <SelectTrigger id="quiet-hours-start">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                        <SelectItem value="22:00">10:00 PM</SelectItem>
                        <SelectItem value="23:00">11:00 PM</SelectItem>
                        <SelectItem value="00:00">12:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quiet-hours-end">Quiet Hours End</Label>
                    <Select defaultValue="07:00">
                      <SelectTrigger id="quiet-hours-end">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="05:00">5:00 AM</SelectItem>
                        <SelectItem value="06:00">6:00 AM</SelectItem>
                        <SelectItem value="07:00">7:00 AM</SelectItem>
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Override for Critical Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Send critical alerts even during quiet hours
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
              <CardDescription>
                Recent alerts and notification history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="dispatch">Dispatch</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="vehicle">Vehicle</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="7days">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24hours">Last 24 Hours</SelectItem>
                        <SelectItem value="7days">Last 7 Days</SelectItem>
                        <SelectItem value="30days">Last 30 Days</SelectItem>
                        <SelectItem value="90days">Last 90 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    Clear History
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Alert</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Today, 10:23 AM</TableCell>
                        <TableCell className="font-medium">
                          High Priority Dispatch #4392
                        </TableCell>
                        <TableCell>Dispatch</TableCell>
                        <TableCell>{getPriorityBadge("high")}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                            <span>Resolved</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Today, 9:45 AM</TableCell>
                        <TableCell className="font-medium">
                          Officer Response Time Exceeded
                        </TableCell>
                        <TableCell>Performance</TableCell>
                        <TableCell>{getPriorityBadge("medium")}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                            <span>Resolved</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Yesterday, 3:12 PM</TableCell>
                        <TableCell className="font-medium">
                          System Maintenance Scheduled
                        </TableCell>
                        <TableCell>System</TableCell>
                        <TableCell>{getPriorityBadge("low")}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                            <span>Informational</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Yesterday, 11:30 AM</TableCell>
                        <TableCell className="font-medium">
                          Database Connectivity Issue
                        </TableCell>
                        <TableCell>System</TableCell>
                        <TableCell>{getPriorityBadge("critical")}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                            <span>Resolved</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Jul 15, 2:45 PM</TableCell>
                        <TableCell className="font-medium">
                          Vehicle #V-501 Low Fuel
                        </TableCell>
                        <TableCell>Vehicle</TableCell>
                        <TableCell>{getPriorityBadge("medium")}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                            <span>Resolved</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Alert Rule Dialog */}
      <Dialog open={isAddRuleOpen} onOpenChange={setIsAddRuleOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Alert Rule</DialogTitle>
            <DialogDescription>
              Create a new rule to trigger alerts based on system events
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rule-name" className="text-right">
                Name
              </Label>
              <Input
                id="rule-name"
                placeholder="Enter rule name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rule-type" className="text-right">
                Type
              </Label>
              <Select>
                <SelectTrigger id="rule-type" className="col-span-3">
                  <SelectValue placeholder="Select rule type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dispatch">Dispatch</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="vehicle">Vehicle</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rule-condition" className="text-right">
                Condition
              </Label>
              <Select>
                <SelectTrigger id="rule-condition" className="col-span-3">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="response_time">Response Time</SelectItem>
                  <SelectItem value="uptime">Uptime</SelectItem>
                  <SelectItem value="fuel_level">Fuel Level</SelectItem>
                  <SelectItem value="registration">Registration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rule-threshold" className="text-right">
                Threshold
              </Label>
              <Input
                id="rule-threshold"
                placeholder="Enter threshold value"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rule-priority" className="text-right">
                Priority
              </Label>
              <Select>
                <SelectTrigger id="rule-priority" className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Notifications</Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-email" />
                  <Label htmlFor="notify-email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-push" defaultChecked />
                  <Label htmlFor="notify-push">Push Notification</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-sms" />
                  <Label htmlFor="notify-sms">SMS</Label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rule-status" className="text-right">
                Status
              </Label>
              <Select defaultValue="active">
                <SelectTrigger id="rule-status" className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRuleOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Rule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Alert Rule Dialog */}
      <Dialog open={isEditRuleOpen} onOpenChange={setIsEditRuleOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Alert Rule</DialogTitle>
            <DialogDescription>
              Modify the existing alert rule settings
            </DialogDescription>
          </DialogHeader>
          {selectedRule && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-rule-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-rule-name"
                  defaultValue={selectedRule.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-rule-type" className="text-right">
                  Type
                </Label>
                <Select defaultValue={selectedRule.type}>
                  <SelectTrigger id="edit-rule-type" className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dispatch">Dispatch</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="vehicle">Vehicle</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-rule-condition" className="text-right">
                  Condition
                </Label>
                <Select defaultValue={selectedRule.condition}>
                  <SelectTrigger
                    id="edit-rule-condition"
                    className="col-span-3"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="response_time">Response Time</SelectItem>
                    <SelectItem value="uptime">Uptime</SelectItem>
                    <SelectItem value="fuel_level">Fuel Level</SelectItem>
                    <SelectItem value="registration">Registration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-rule-threshold" className="text-right">
                  Threshold
                </Label>
                <Input
                  id="edit-rule-threshold"
                  defaultValue={selectedRule.threshold}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-rule-priority" className="text-right">
                  Priority
                </Label>
                <Select defaultValue={selectedRule.priority}>
                  <SelectTrigger id="edit-rule-priority" className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Notifications</Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-notify-email"
                      defaultChecked={selectedRule.notifications.includes(
                        "email",
                      )}
                    />
                    <Label htmlFor="edit-notify-email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-notify-push"
                      defaultChecked={selectedRule.notifications.includes(
                        "push",
                      )}
                    />
                    <Label htmlFor="edit-notify-push">Push Notification</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-notify-sms"
                      defaultChecked={selectedRule.notifications.includes(
                        "sms",
                      )}
                    />
                    <Label htmlFor="edit-notify-sms">SMS</Label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-rule-status" className="text-right">
                  Status
                </Label>
                <Select defaultValue={selectedRule.status}>
                  <SelectTrigger id="edit-rule-status" className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRuleOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AlertSettings;
