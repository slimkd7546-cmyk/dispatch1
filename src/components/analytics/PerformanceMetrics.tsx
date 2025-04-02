import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Download,
  BarChart2,
  PieChart,
  LineChart,
} from "lucide-react";

interface PerformanceMetricsProps {
  timeRange?: "day" | "week" | "month" | "quarter" | "year";
  onTimeRangeChange?: (range: string) => void;
  onExport?: (format: string) => void;
}

const PerformanceMetrics = ({
  timeRange = "week",
  onTimeRangeChange = () => {},
  onExport = () => {},
}: PerformanceMetricsProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [exportFormat, setExportFormat] = React.useState<string>("pdf");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Performance Metrics</h2>

        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select defaultValue={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Daily</SelectItem>
              <SelectItem value="week">Weekly</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="quarter">Quarterly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={exportFormat}
            onValueChange={(value) => {
              setExportFormat(value);
              onExport(value);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Export as..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">Export as PDF</SelectItem>
              <SelectItem value="csv">Export as CSV</SelectItem>
              <SelectItem value="excel">Export as Excel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.2 min</div>
            <p className="text-sm text-muted-foreground">
              Avg. time to respond to incidents
            </p>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-full"
                style={{ width: "85%" }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              15% faster than last {timeRange}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Task Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92%</div>
            <p className="text-sm text-muted-foreground">
              Tasks completed on time
            </p>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full"
                style={{ width: "92%" }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              5% improvement from last {timeRange}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Officer Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78%</div>
            <p className="text-sm text-muted-foreground">
              Average officer utilization
            </p>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full"
                style={{ width: "78%" }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              2% decrease from last {timeRange}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="dispatches" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Dispatches
          </TabsTrigger>
          <TabsTrigger value="officers" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Officers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
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

        <TabsContent value="dispatches" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Dispatch Analytics</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Dispatch analytics chart would appear here</p>
                <p className="text-sm mt-2">
                  Showing data for the selected time period
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="officers" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Officer Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Officer performance chart would appear here</p>
                <p className="text-sm mt-2">
                  Showing data for the selected time period
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Officers</CardTitle>
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
                      15 tasks completed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">98%</p>
                  <p className="text-xs text-muted-foreground">
                    On-time completion
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
                      12 tasks completed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">95%</p>
                  <p className="text-xs text-muted-foreground">
                    On-time completion
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
                      10 tasks completed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">92%</p>
                  <p className="text-xs text-muted-foreground">
                    On-time completion
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Incident Response Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Incident response breakdown chart would appear here</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center mt-4">
              <div>
                <p className="text-xs text-muted-foreground">High Priority</p>
                <p className="font-medium text-red-500">15%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Medium Priority</p>
                <p className="font-medium text-amber-500">45%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Low Priority</p>
                <p className="font-medium text-green-500">40%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Full Report
        </Button>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
