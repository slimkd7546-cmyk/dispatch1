import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Zap, Gauge, Clock, BarChart2 } from "lucide-react";
import LazyImage from "@/components/common/LazyImage";
import OptimizedTable from "@/components/common/OptimizedTable";

const PerformanceOptimizationsStoryboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for the optimized table
  const tableData = Array.from({ length: 100 }, (_, i) => ({
    id: `ITEM-${1000 + i}`,
    name: `Test Item ${i + 1}`,
    status: i % 3 === 0 ? "active" : i % 3 === 1 ? "pending" : "completed",
    date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
    value: Math.floor(Math.random() * 1000),
  }));

  // Table columns definition
  const columns = [
    {
      key: "id",
      header: "ID",
      cell: (item: any) => <span className="font-medium">{item.id}</span>,
    },
    {
      key: "name",
      header: "Name",
      cell: (item: any) => item.name,
    },
    {
      key: "status",
      header: "Status",
      cell: (item: any) => (
        <Badge
          className={`${item.status === "active" ? "bg-green-500" : item.status === "pending" ? "bg-yellow-500" : "bg-blue-500"}`}
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: "date",
      header: "Date",
      cell: (item: any) => item.date,
    },
    {
      key: "value",
      header: "Value",
      cell: (item: any) => `$${item.value.toLocaleString()}`,
      className: "text-right",
    },
  ];

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Performance Optimizations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="optimized-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Zap className="h-4 w-4 mr-2 text-yellow-500" /> Lazy Loading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Components and images load only when needed
            </p>
          </CardContent>
        </Card>

        <Card className="optimized-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Gauge className="h-4 w-4 mr-2 text-blue-500" /> Virtualization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Only renders visible items in long lists
            </p>
          </CardContent>
        </Card>

        <Card className="optimized-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-green-500" /> Debouncing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Prevents excessive function calls
            </p>
          </CardContent>
        </Card>

        <Card className="optimized-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BarChart2 className="h-4 w-4 mr-2 text-purple-500" /> Memoization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Prevents unnecessary re-renders
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lazy-loading">Lazy Loading</TabsTrigger>
          <TabsTrigger value="virtualization">Virtualization</TabsTrigger>
          <TabsTrigger value="animations">Smooth Animations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Optimizations Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                This application has been optimized for better performance and smoother user experience through several techniques:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Code splitting and lazy loading to reduce initial load time</li>
                <li>Memoization of components and callbacks to prevent unnecessary re-renders</li>
                <li>Virtualization for large lists and tables</li>
                <li>Debouncing and throttling for search inputs and scroll events</li>
                <li>Optimized animations with hardware acceleration</li>
                <li>Improved Tailwind configuration for production</li>
              </ul>
              <div className="pt-4">
                <Button className="smooth-button">Smooth Interaction</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lazy-loading" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lazy Loaded Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <LazyImage
                  src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&q=80"
                  alt="Gradient 1"
                  className="rounded-md"
                  height={200}
                  loadingEffect="fade"
                />
                <LazyImage
                  src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=80"
                  alt="Gradient 2"
                  className="rounded-md"
                  height={200}
                  loadingEffect="fade"
                />
                <LazyImage
                  src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=500&q=80"
                  alt="Gradient 3"
                  className="rounded-md"
                  height={200}
                  loadingEffect="fade"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="virtualization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Virtualized Table</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                This table only renders the rows that are visible in the viewport, significantly improving performance for large datasets.
              </p>
              <OptimizedTable
                data={tableData}
                columns={columns}
                virtualScroll={true}
                maxHeight={400}
                itemHeight={48}
                onRowClick={(item) => console.log("Clicked:", item)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="animations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Smooth Animations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <div className="h-20 w-20 bg-blue-500 rounded-lg animate-fade-in"></div>
                  <p className="mt-2 text-sm font-medium">Fade In</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-20 w-20 bg-green-500 rounded-lg animate-slide-in"></div>
                  <p className="mt-2 text-sm font-medium">Slide In</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-20 w-20 bg-purple-500 rounded-lg animate-spin"></div>
                  <p className="mt-2 text-sm font-medium">Spin</p>
                </div>
              </div>
              <div className="mt-8">
                <p className="mb-4 text-sm text-muted-foreground">
                  All animations are hardware-accelerated and optimized for 60fps performance.
                </p>
                <div className="flex gap-4">
                  <Button className="smooth-button bg-teal-600 hover:bg-teal-700 transition-all">
                    Hover Me
                  </Button>
                  <Button variant="outline" className="smooth-button">
                    Smooth Transition
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceOptimizationsStoryboard;
