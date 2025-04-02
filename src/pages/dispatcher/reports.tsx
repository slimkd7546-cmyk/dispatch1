import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileText,
  BarChart2,
  Download,
  Calendar,
  Clock,
  Filter,
  PieChart,
  TrendingUp,
  TrendingDown,
  Truck,
  User,
  DollarSign,
  MapPin,
  ArrowRight,
  Plus,
  Search,
} from "lucide-react";

const ReportsPage = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 Days
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">248</span>
                <div className="flex items-center text-green-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">12%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                On-Time Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">94.2%</span>
                <div className="flex items-center text-green-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">3.1%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Trip Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">4.8 hrs</span>
                <div className="flex items-center text-red-500">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  <span className="text-sm">1.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">$42,580</span>
                <div className="flex items-center text-green-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">8.4%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="fleet">Fleet</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart2 className="mr-2 h-5 w-5 text-muted-foreground" />
                    Delivery Volume
                  </CardTitle>
                  <CardDescription>
                    Number of deliveries completed over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <BarChart2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Bar chart showing delivery volume by day/week/month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5 text-muted-foreground" />
                    Delivery Status Distribution
                  </CardTitle>
                  <CardDescription>
                    Breakdown of delivery statuses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Pie chart showing distribution of delivery statuses
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-muted-foreground" />
                    Performance Metrics
                  </CardTitle>
                  <CardDescription>
                    Key performance indicators over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Line chart showing multiple KPIs over time
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Driver Performance</CardTitle>
                      <CardDescription>
                        Metrics for all drivers in the last 30 days
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" /> Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-muted/50">
                        <tr>
                          <th className="px-4 py-3">Driver</th>
                          <th className="px-4 py-3">Deliveries</th>
                          <th className="px-4 py-3">On-Time %</th>
                          <th className="px-4 py-3">Avg Time</th>
                          <th className="px-4 py-3">Rating</th>
                          <th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[
                          {
                            name: "John Doe",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
                            deliveries: 42,
                            onTime: 96.4,
                            avgTime: "3.2 hrs",
                            rating: 4.8,
                            status: "active",
                          },
                          {
                            name: "Mike Smith",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
                            deliveries: 38,
                            onTime: 94.7,
                            avgTime: "3.5 hrs",
                            rating: 4.7,
                            status: "active",
                          },
                          {
                            name: "Sarah Williams",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
                            deliveries: 45,
                            onTime: 97.8,
                            avgTime: "3.0 hrs",
                            rating: 4.9,
                            status: "active",
                          },
                          {
                            name: "Ryan Johnson",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan",
                            deliveries: 36,
                            onTime: 93.2,
                            avgTime: "3.7 hrs",
                            rating: 4.6,
                            status: "active",
                          },
                          {
                            name: "Dan Brown",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=dan",
                            deliveries: 40,
                            onTime: 95.0,
                            avgTime: "3.4 hrs",
                            rating: 4.7,
                            status: "active",
                          },
                        ].map((driver, index) => (
                          <tr
                            key={index}
                            className="hover:bg-muted/50 transition-colors"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                  <img
                                    src={driver.avatar}
                                    alt={driver.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <span className="font-medium">
                                  {driver.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">{driver.deliveries}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`${driver.onTime >= 95 ? "text-green-500" : driver.onTime >= 90 ? "text-yellow-500" : "text-red-500"}`}
                              >
                                {driver.onTime}%
                              </span>
                            </td>
                            <td className="px-4 py-3">{driver.avgTime}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                {driver.rating}
                                <div className="ml-2 flex">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`h-4 w-4 ${i < Math.floor(driver.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {driver.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Time Analysis</CardTitle>
                    <CardDescription>
                      Average delivery times by route distance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground">
                          Scatter plot showing delivery times vs. distance
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Customer Satisfaction</CardTitle>
                    <CardDescription>
                      Ratings and feedback trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground">
                          Line chart showing customer satisfaction over time
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fleet">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Fleet Utilization</CardTitle>
                      <CardDescription>
                        Vehicle usage and efficiency metrics
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" /> Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-muted/20 rounded-md p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Average Utilization
                      </h3>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold">78%</span>
                        <div className="ml-2 flex items-center text-green-500">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span className="text-sm">5.2%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted/20 rounded-md p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Idle Time
                      </h3>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold">14.3%</span>
                        <div className="ml-2 flex items-center text-green-500">
                          <TrendingDown className="h-4 w-4 mr-1" />
                          <span className="text-sm">2.1%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted/20 rounded-md p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Maintenance Downtime
                      </h3>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold">7.7%</span>
                        <div className="ml-2 flex items-center text-red-500">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span className="text-sm">1.3%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <BarChart2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Stacked bar chart showing fleet utilization by vehicle
                        type
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Fuel Efficiency</CardTitle>
                    <CardDescription>
                      Fuel consumption and cost analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <TrendingDown className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground">
                          Line chart showing fuel efficiency trends
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance Schedule</CardTitle>
                    <CardDescription>
                      Upcoming maintenance for fleet vehicles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: "TRK-1004",
                          type: "Flatbed",
                          maintenance: "Oil Change & Inspection",
                          date: "Jul 20, 2023",
                          status: "scheduled",
                        },
                        {
                          id: "TRK-1001",
                          type: "Box Truck",
                          maintenance: "Brake Service",
                          date: "Jul 25, 2023",
                          status: "scheduled",
                        },
                        {
                          id: "TRK-1003",
                          type: "Refrigerated",
                          maintenance: "Cooling System Check",
                          date: "Aug 05, 2023",
                          status: "scheduled",
                        },
                        {
                          id: "TRK-1002",
                          type: "Cargo Van",
                          maintenance: "Tire Rotation",
                          date: "Aug 10, 2023",
                          status: "scheduled",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{item.id}</span>
                              <span className="text-sm text-muted-foreground">
                                {item.type}
                              </span>
                            </div>
                            <div className="mt-1 text-sm">
                              {item.maintenance}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">{item.date}</div>
                            <div className="mt-1">
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {item.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>
                  Create custom reports with the metrics you need
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="report-name">Report Name</Label>
                        <Input
                          id="report-name"
                          placeholder="Enter report name"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="report-description">
                          Description (Optional)
                        </Label>
                        <Input
                          id="report-description"
                          placeholder="Enter description"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label>Date Range</Label>
                        <div className="grid grid-cols-2 gap-4 mt-1">
                          <div>
                            <Label
                              htmlFor="start-date"
                              className="text-xs text-muted-foreground"
                            >
                              Start Date
                            </Label>
                            <Input id="start-date" type="date" />
                          </div>
                          <div>
                            <Label
                              htmlFor="end-date"
                              className="text-xs text-muted-foreground"
                            >
                              End Date
                            </Label>
                            <Input id="end-date" type="date" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>Select Metrics</Label>
                        <div className="mt-1 space-y-2 border rounded-md p-3">
                          {[
                            "Delivery Volume",
                            "On-Time Performance",
                            "Average Delivery Time",
                            "Driver Performance",
                            "Vehicle Utilization",
                            "Fuel Efficiency",
                            "Customer Satisfaction",
                            "Revenue",
                            "Cost Analysis",
                          ].map((metric, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox id={`metric-${index}`} />
                              <Label
                                htmlFor={`metric-${index}`}
                                className="text-sm"
                              >
                                {metric}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label>Visualization Type</Label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select visualization type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bar">Bar Chart</SelectItem>
                            <SelectItem value="line">Line Chart</SelectItem>
                            <SelectItem value="pie">Pie Chart</SelectItem>
                            <SelectItem value="table">Table</SelectItem>
                            <SelectItem value="summary">
                              Summary Cards
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label>Filters</Label>
                    <div className="mt-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label
                            htmlFor="driver-filter"
                            className="text-xs text-muted-foreground"
                          >
                            Driver
                          </Label>
                          <Select>
                            <SelectTrigger id="driver-filter">
                              <SelectValue placeholder="All Drivers" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Drivers</SelectItem>
                              <SelectItem value="john">John Doe</SelectItem>
                              <SelectItem value="mike">Mike Smith</SelectItem>
                              <SelectItem value="sarah">
                                Sarah Williams
                              </SelectItem>
                              <SelectItem value="ryan">Ryan Johnson</SelectItem>
                              <SelectItem value="dan">Dan Brown</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label
                            htmlFor="vehicle-filter"
                            className="text-xs text-muted-foreground"
                          >
                            Vehicle Type
                          </Label>
                          <Select>
                            <SelectTrigger id="vehicle-filter">
                              <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="box_truck">
                                Box Truck
                              </SelectItem>
                              <SelectItem value="cargo_van">
                                Cargo Van
                              </SelectItem>
                              <SelectItem value="refrigerated">
                                Refrigerated
                              </SelectItem>
                              <SelectItem value="flatbed">Flatbed</SelectItem>
                              <SelectItem value="tanker">Tanker</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label
                            htmlFor="status-filter"
                            className="text-xs text-muted-foreground"
                          >
                            Status
                          </Label>
                          <Select>
                            <SelectTrigger id="status-filter">
                              <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Statuses</SelectItem>
                              <SelectItem value="completed">
                                Completed
                              </SelectItem>
                              <SelectItem value="in_transit">
                                In Transit
                              </SelectItem>
                              <SelectItem value="delayed">Delayed</SelectItem>
                              <SelectItem value="cancelled">
                                Cancelled
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" /> Add Filter
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Preview</Button>
                    <Button>Generate Report</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
