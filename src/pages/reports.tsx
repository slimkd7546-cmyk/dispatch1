import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Download,
  FileText,
  BarChart2,
  PieChart,
  LineChart,
  Calendar as CalendarIcon,
  Filter,
  RefreshCw,
  Truck,
  Users,
  Clock,
  DollarSign,
  MapPin,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("performance");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const [reportFormat, setReportFormat] = useState("pdf");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would trigger a download or display the report
      console.log("Report generated:", {
        type: activeTab,
        dateRange,
        format: reportFormat,
      });
    }, 2000);
  };

  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <DashboardLayout pageTitle="Reports & Analytics">
        <div className="container mx-auto py-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
              <p className="text-muted-foreground mt-1">
                Generate and analyze detailed reports for your operations
              </p>
            </div>
          </div>

          {/* Report Generator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-teal-500" />
                Report Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select value={activeTab} onValueChange={setActiveTab}>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">
                        <div className="flex items-center">
                          <BarChart2 className="mr-2 h-4 w-4 text-teal-500" />
                          <span>Performance Metrics</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="fleet">
                        <div className="flex items-center">
                          <Truck className="mr-2 h-4 w-4 text-blue-500" />
                          <span>Fleet Analytics</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="driver">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-purple-500" />
                          <span>Driver Performance</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="financial">
                        <div className="flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                          <span>Financial Reports</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                              {format(dateRange.to, "MMM dd, yyyy")}
                            </>
                          ) : (
                            format(dateRange.from, "MMM dd, yyyy")
                          )
                        ) : (
                          <span>Select date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="report-format">Export Format</Label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger id="report-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                      <SelectItem value="xlsx">Excel Workbook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Report Preview */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">
                <BarChart2 className="mr-2 h-4 w-4" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="fleet">
                <Truck className="mr-2 h-4 w-4" />
                Fleet
              </TabsTrigger>
              <TabsTrigger value="driver">
                <Users className="mr-2 h-4 w-4" />
                Drivers
              </TabsTrigger>
              <TabsTrigger value="financial">
                <DollarSign className="mr-2 h-4 w-4" />
                Financial
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Response Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">4.2 min</div>
                    <p className="text-sm text-muted-foreground">
                      Avg. time to respond to incidents
                    </p>
                    <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      15% faster than last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Task Completion Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">92%</div>
                    <p className="text-sm text-muted-foreground">
                      Tasks completed on time
                    </p>
                    <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                      <div
                        className="bg-blue-500 h-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      5% improvement from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Resource Utilization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">78%</div>
                    <p className="text-sm text-muted-foreground">
                      Average resource utilization
                    </p>
                    <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                      <div
                        className="bg-amber-500 h-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      2% decrease from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart2 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Performance overview chart would appear here</p>
                    <p className="text-sm mt-2">
                      Showing data for the selected time period
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fleet" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Vehicles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">42</div>
                    <p className="text-sm text-muted-foreground">
                      Vehicles currently in service
                    </p>
                    <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: "84%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      84% of total fleet
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Mileage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1,245 mi</div>
                    <p className="text-sm text-muted-foreground">
                      Average monthly mileage per vehicle
                    </p>
                    <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                      <div
                        className="bg-blue-500 h-full"
                        style={{ width: "62%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      3% increase from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Maintenance Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      Good
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Overall fleet health status
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Due Soon
                        </p>
                        <p className="font-medium text-amber-500">5</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Overdue</p>
                        <p className="font-medium text-red-500">2</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Completed
                        </p>
                        <p className="font-medium text-green-500">35</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Fleet Utilization</CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Fleet utilization chart would appear here</p>
                    <p className="text-sm mt-2">
                      Showing data for the selected time period
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="driver" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Drivers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">38</div>
                    <p className="text-sm text-muted-foreground">
                      Drivers currently on duty
                    </p>
                    <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: "76%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      76% of total drivers
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      On-Time Delivery
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">94.2%</div>
                    <p className="text-sm text-muted-foreground">
                      Deliveries completed on time
                    </p>
                    <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                      <div
                        className="bg-blue-500 h-full"
                        style={{ width: "94.2%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      2.1% improvement from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Safety Rating
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">A+</div>
                    <p className="text-sm text-muted-foreground">
                      Overall driver safety rating
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Incidents
                        </p>
                        <p className="font-medium text-red-500">3</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Warnings
                        </p>
                        <p className="font-medium text-amber-500">7</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Perfect</p>
                        <p className="font-medium text-green-500">28</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Drivers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                          JS
                        </div>
                        <div>
                          <p className="font-medium">John Smith</p>
                          <p className="text-xs text-muted-foreground">
                            15 deliveries completed
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">98%</p>
                        <p className="text-xs text-muted-foreground">
                          On-time delivery
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium">
                          SJ
                        </div>
                        <div>
                          <p className="font-medium">Sarah Johnson</p>
                          <p className="text-xs text-muted-foreground">
                            12 deliveries completed
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">95%</p>
                        <p className="text-xs text-muted-foreground">
                          On-time delivery
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium">
                          MB
                        </div>
                        <div>
                          <p className="font-medium">Michael Brown</p>
                          <p className="text-xs text-muted-foreground">
                            10 deliveries completed
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">92%</p>
                        <p className="text-xs text-muted-foreground">
                          On-time delivery
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$128,450</div>
                    <p className="text-sm text-muted-foreground">
                      Revenue for selected period
                    </p>
                    <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      12% increase from previous period
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Operating Costs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$84,320</div>
                    <p className="text-sm text-muted-foreground">
                      Costs for selected period
                    </p>
                    <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                      <div
                        className="bg-amber-500 h-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      5% increase from previous period
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Profit Margin
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">34.4%</div>
                    <p className="text-sm text-muted-foreground">
                      Margin for selected period
                    </p>
                    <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                      <div
                        className="bg-blue-500 h-full"
                        style={{ width: "34.4%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      2.1% increase from previous period
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Service Type</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Revenue breakdown chart would appear here</p>
                      <p className="text-sm mt-2">
                        Showing data for the selected time period
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cost Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart2 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Cost breakdown chart would appear here</p>
                      <p className="text-sm mt-2">
                        Showing data for the selected time period
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Saved Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Saved Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Monthly Performance Report</p>
                      <p className="text-xs text-muted-foreground">
                        Generated on Jun 30, 2023 • PDF
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center text-green-600 dark:bg-green-900 dark:text-green-400">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Q2 Financial Summary</p>
                      <p className="text-xs text-muted-foreground">
                        Generated on Jul 5, 2023 • Excel
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center text-purple-600 dark:bg-purple-900 dark:text-purple-400">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Driver Performance Analysis</p>
                      <p className="text-xs text-muted-foreground">
                        Generated on Jul 10, 2023 • PDF
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default ReportsPage;
