import React, { useState, useCallback, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  HardDrive,
  Wifi,
  Zap,
  AlertTriangle,
  CheckCircle,
  Smartphone,
  Server,
  RefreshCw,
  PlusCircle,
  Settings,
  MapPin,
  FileText,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ConnectDashboard = () => {
  const navigate = useNavigate();
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Memoize handlers to prevent unnecessary re-renders
  const handleViewMap = useCallback(() => {
    navigate("/map");
  }, [navigate]);

  // Handle reports
  const handleReports = useCallback(() => {
    navigate("/reports");
  }, [navigate]);

  // Handle support request
  const handleSupportRequest = useCallback(() => {
    setShowSupportModal(true);
  }, []);

  return (
    <div className="space-y-6 w-full h-full p-6 bg-background overflow-auto">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Connected Devices
            </CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12 from last week</p>
            <div className="mt-4 flex items-center space-x-2">
              <Badge className="bg-green-500">118 Online</Badge>
              <Badge variant="outline">10 Offline</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Network Status
            </CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">99.8%</div>
              <Badge className="ml-2 bg-green-500">Healthy</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Uptime in last 30 days
            </p>
            <Progress className="mt-4" value={99.8} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Integrations
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">3 pending approval</p>
            <div className="mt-4 grid grid-cols-4 gap-1">
              <div className="h-2 w-full rounded-full bg-blue-500"></div>
              <div className="h-2 w-full rounded-full bg-green-500"></div>
              <div className="h-2 w-full rounded-full bg-yellow-500"></div>
              <div className="h-2 w-full rounded-full bg-purple-500"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 require attention</p>
            <div className="mt-4 flex items-center space-x-2">
              <Badge variant="destructive">1 Critical</Badge>
              <Badge variant="secondary">2 Warning</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="devices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="connectivity">Connectivity</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Device Management</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Device
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Device Cards */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    Fleet GPS Tracker #1
                  </CardTitle>
                  <Badge className="bg-green-500">Online</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Smartphone className="h-10 w-10 text-blue-500" />
                  <div>
                    <p className="text-sm">ID: GPS-001-XYZ</p>
                    <p className="text-xs text-muted-foreground">
                      Last ping: 2 minutes ago
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Battery: 87%
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    Fleet GPS Tracker #2
                  </CardTitle>
                  <Badge className="bg-green-500">Online</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Smartphone className="h-10 w-10 text-blue-500" />
                  <div>
                    <p className="text-sm">ID: GPS-002-XYZ</p>
                    <p className="text-xs text-muted-foreground">
                      Last ping: 5 minutes ago
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Battery: 92%
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    Fleet GPS Tracker #3
                  </CardTitle>
                  <Badge variant="outline">Offline</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Smartphone className="h-10 w-10 text-gray-400" />
                  <div>
                    <p className="text-sm">ID: GPS-003-XYZ</p>
                    <p className="text-xs text-muted-foreground">
                      Last ping: 3 hours ago
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Battery: Unknown
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Troubleshoot
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Integration Management</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Integration
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>API Integrations</CardTitle>
                  <Badge>8 Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Server className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Fleet Management API</p>
                        <p className="text-xs text-muted-foreground">
                          Last sync: 10 minutes ago
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Healthy</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Server className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium">Weather Data Service</p>
                        <p className="text-xs text-muted-foreground">
                          Last sync: 30 minutes ago
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Healthy</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Server className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">Traffic Data Provider</p>
                        <p className="text-xs text-muted-foreground">
                          Last sync: 45 minutes ago
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">Degraded</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Device Integrations</CardTitle>
                  <Badge>6 Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Mobile App Integration</p>
                        <p className="text-xs text-muted-foreground">
                          78 connected devices
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Healthy</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HardDrive className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Vehicle Tracking System</p>
                        <p className="text-xs text-muted-foreground">
                          42 connected vehicles
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Healthy</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">IoT Sensor Network</p>
                        <p className="text-xs text-muted-foreground">
                          8 connected sensors
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">Offline</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="connectivity" className="space-y-4">
          <h2 className="text-xl font-bold">Network Connectivity</h2>

          <Card>
            <CardHeader>
              <CardTitle>Connectivity Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium">Primary Data Center</h3>
                    <Badge className="bg-green-500">Connected</Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: "99%" }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>Latency: 12ms</span>
                    <span>Uptime: 99.99%</span>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium">Backup Data Center</h3>
                    <Badge className="bg-green-500">Connected</Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>Latency: 18ms</span>
                    <span>Uptime: 99.95%</span>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium">Mobile Network</h3>
                    <Badge variant="secondary">Degraded</Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-yellow-500"
                      style={{ width: "87%" }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>Latency: 45ms</span>
                    <span>Uptime: 96.5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">System Alerts</h2>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>

          <div className="space-y-4">
            <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-red-700 dark:text-red-400">
                    Critical Alert
                  </CardTitle>
                  <Badge variant="destructive">Critical</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 dark:text-red-400">
                  Mobile Network Connectivity Issues Detected
                </p>
                <p className="text-sm text-red-600/80 dark:text-red-400/80">
                  Multiple devices experiencing intermittent connection issues
                  with the mobile network.
                </p>
                <div className="mt-4 flex justify-between">
                  <p className="text-xs text-red-600/80 dark:text-red-400/80">
                    Detected: 35 minutes ago
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-700 hover:bg-red-100 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/50"
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      Resolve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-yellow-700 dark:text-yellow-400">
                    Warning Alert
                  </CardTitle>
                  <Badge className="bg-yellow-500 text-white">Warning</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-700 dark:text-yellow-400">
                  API Rate Limit Approaching
                </p>
                <p className="text-sm text-yellow-600/80 dark:text-yellow-400/80">
                  Traffic Data Provider API usage at 85% of daily limit.
                </p>
                <div className="mt-4 flex justify-between">
                  <p className="text-xs text-yellow-600/80 dark:text-yellow-400/80">
                    Detected: 2 hours ago
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-yellow-200 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-800 dark:text-yellow-400 dark:hover:bg-yellow-900/50"
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      className="bg-yellow-600 text-white hover:bg-yellow-700"
                    >
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-yellow-700 dark:text-yellow-400">
                    Warning Alert
                  </CardTitle>
                  <Badge className="bg-yellow-500 text-white">Warning</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-700 dark:text-yellow-400">
                  Device Battery Low
                </p>
                <p className="text-sm text-yellow-600/80 dark:text-yellow-400/80">
                  3 GPS tracking devices reporting battery levels below 20%.
                </p>
                <div className="mt-4 flex justify-between">
                  <p className="text-xs text-yellow-600/80 dark:text-yellow-400/80">
                    Detected: 4 hours ago
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-yellow-200 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-800 dark:text-yellow-400 dark:hover:bg-yellow-900/50"
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      className="bg-yellow-600 text-white hover:bg-yellow-700"
                    >
                      Notify
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          onClick={handleViewMap}
        >
          <MapPin className="h-5 w-5 text-teal-600" />
          <span className="text-sm">View Map</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          onClick={handleReports}
        >
          <FileText className="h-5 w-5 text-teal-600" />
          <span className="text-sm">Reports</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          onClick={handleSupportRequest}
        >
          <HelpCircle className="h-5 w-5 text-teal-600" />
          <span className="text-sm">Request Support</span>
        </Button>
      </div>

      {/* Support Request Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Request Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="supportType"
                    className="block text-sm font-medium mb-1"
                  >
                    Support Type
                  </label>
                  <select
                    id="supportType"
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="technical">Technical Support</option>
                    <option value="connectivity">Connectivity Issues</option>
                    <option value="integration">Integration Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="urgency"
                    className="block text-sm font-medium mb-1"
                  >
                    Urgency Level
                  </label>
                  <select id="urgency" className="w-full p-2 border rounded-md">
                    <option value="low">Low - When Convenient</option>
                    <option value="medium">Medium - As Soon As Possible</option>
                    <option value="high">
                      High - Urgent Assistance Needed
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="w-full p-2 border rounded-md h-24"
                    placeholder="Describe your issue or request..."
                  ></textarea>
                </div>
              </div>
            </CardContent>
            <div className="flex justify-end p-4 space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowSupportModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Support request submitted");
                  setShowSupportModal(false);
                }}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default memo(ConnectDashboard);
