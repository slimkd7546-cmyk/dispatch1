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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  AlertTriangle,
  Save,
  RefreshCw,
  Shield,
  Bell,
  Clock,
  Globe,
  Database,
  Server,
  Mail,
} from "lucide-react";

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [dataRetention, setDataRetention] = useState([90]);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  const handleSaveSettings = () => {
    // In a real app, this would save the settings to the backend
    console.log("Saving settings...");
    // Show success message
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure system parameters and preferences
          </p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs
        defaultValue="general"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic system parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="system-name">System Name</Label>
                  <Input
                    id="system-name"
                    defaultValue="Dispatch Management System"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Acme Security" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      <SelectItem value="cst">Central Time (CT)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      When enabled, only administrators can access the system
                    </p>
                  </div>
                  <Switch
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable detailed logging for troubleshooting
                    </p>
                  </div>
                  <Switch checked={debugMode} onCheckedChange={setDebugMode} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>
                Current system status and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Version</p>
                  <p className="text-lg">v2.5.3</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-lg">June 15, 2023</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Server Status</p>
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                    <p className="text-lg">Operational</p>
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Database Status</p>
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                    <p className="text-lg">Connected</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure system-wide notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Master toggle for all system notifications
                    </p>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
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
                          Send notifications via email
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                      disabled={!notificationsEnabled}
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
                      disabled={!notificationsEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Send notifications via SMS
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Events</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Dispatch Created</p>
                      <p className="text-sm text-muted-foreground">
                        Notify when a new dispatch is created
                      </p>
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="admin">Admins Only</SelectItem>
                        <SelectItem value="dispatcher">
                          Dispatchers Only
                        </SelectItem>
                        <SelectItem value="none">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Task Status Changed</p>
                      <p className="text-sm text-muted-foreground">
                        Notify when a task status is updated
                      </p>
                    </div>
                    <Select defaultValue="involved">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="involved">
                          Involved Parties
                        </SelectItem>
                        <SelectItem value="admin">Admins Only</SelectItem>
                        <SelectItem value="none">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Notify about system issues and maintenance
                      </p>
                    </div>
                    <Select defaultValue="admin">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="admin">Admins Only</SelectItem>
                        <SelectItem value="none">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure system security parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password-policy">Password Policy</Label>
                    <Select defaultValue="strong">
                      <SelectTrigger>
                        <SelectValue placeholder="Select policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="strong">Strong</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">
                      Session Timeout (minutes)
                    </Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      defaultValue="30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-login-attempts">
                      Max Login Attempts
                    </Label>
                    <Input
                      id="max-login-attempts"
                      type="number"
                      defaultValue="5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lockout-duration">
                      Account Lockout Duration (minutes)
                    </Label>
                    <Input
                      id="lockout-duration"
                      type="number"
                      defaultValue="15"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all admin accounts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Access Control</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ip-restrictions">IP Restrictions</Label>
                    <Input
                      id="ip-restrictions"
                      placeholder="Enter allowed IP addresses (comma separated)"
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave blank to allow all IP addresses
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enforce Role-Based Access Control</Label>
                        <p className="text-sm text-muted-foreground">
                          Strictly enforce RBAC policies
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Audit Logging</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Detailed Audit Logs</Label>
                      <p className="text-sm text-muted-foreground">
                        Log all user actions for security review
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audit-retention">Log Retention (days)</Label>
                  <Input id="audit-retention" type="number" defaultValue="90" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Configure data storage and retention policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Backup Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">
                        Schedule regular system backups
                      </p>
                    </div>
                    <Switch
                      checked={autoBackup}
                      onCheckedChange={setAutoBackup}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backup-time">Backup Time</Label>
                    <Select defaultValue="midnight">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="midnight">12:00 AM</SelectItem>
                        <SelectItem value="3am">3:00 AM</SelectItem>
                        <SelectItem value="6am">6:00 AM</SelectItem>
                        <SelectItem value="noon">12:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backup-retention">
                      Backup Retention (days)
                    </Label>
                    <Input
                      id="backup-retention"
                      type="number"
                      defaultValue="30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backup-location">Backup Location</Label>
                    <Select defaultValue="cloud">
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local Storage</SelectItem>
                        <SelectItem value="cloud">Cloud Storage</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restore Backup
                  </Button>
                  <Button>
                    <Database className="mr-2 h-4 w-4" />
                    Backup Now
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Retention</h3>
                <div className="space-y-2">
                  <Label>Data Retention Period (days)</Label>
                  <div className="pt-2">
                    <Slider
                      defaultValue={[90]}
                      max={365}
                      step={30}
                      value={dataRetention}
                      onValueChange={setDataRetention}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      30 days
                    </span>
                    <span className="text-sm font-medium">
                      {dataRetention[0]} days
                    </span>
                    <span className="text-sm text-muted-foreground">
                      365 days
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-Archive Old Data</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically archive data older than retention period
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <CardTitle>Advanced Settings</CardTitle>
              </div>
              <CardDescription>
                These settings should only be modified by system administrators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Performance</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
                    <Input id="cache-ttl" type="number" defaultValue="3600" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-connections">
                      Max Database Connections
                    </Label>
                    <Input
                      id="max-connections"
                      type="number"
                      defaultValue="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="query-timeout">
                      Query Timeout (seconds)
                    </Label>
                    <Input id="query-timeout" type="number" defaultValue="30" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="request-limit">
                      API Rate Limit (requests/minute)
                    </Label>
                    <Input id="request-limit" type="number" defaultValue="60" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Integration Settings</h3>
                <div className="space-y-2">
                  <Label htmlFor="api-keys">API Keys</Label>
                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Primary API Key</p>
                        <p className="text-sm text-muted-foreground">
                          Last used: 2 hours ago
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                    </div>
                    <Input
                      className="mt-2 font-mono"
                      value="••••••••••••••••••••••••••••••"
                      readOnly
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhooks">Webhook Endpoints</Label>
                  <Input
                    id="webhooks"
                    placeholder="https://example.com/webhook"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter URLs to receive system event notifications
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Danger Zone</h3>
                <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-900 dark:text-red-400">
                          Reset System
                        </p>
                        <p className="text-sm text-red-800/90 dark:text-red-400/90">
                          Reset all system settings to default values
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        Reset
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-900 dark:text-red-400">
                          Purge All Data
                        </p>
                        <p className="text-sm text-red-800/90 dark:text-red-400/90">
                          Permanently delete all system data
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        Purge
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
