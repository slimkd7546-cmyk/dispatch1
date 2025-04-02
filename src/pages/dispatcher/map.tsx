import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Map as MapIcon,
  Layers,
  Filter,
  Truck,
  MapPin,
  Route,
  Clock,
  Search,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const MapPage = () => {
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Live Map</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Layers className="mr-2 h-4 w-4" />
              Layers
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {showFilters ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {showFilters && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label>Vehicle Types</Label>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="box-truck" defaultChecked />
                      <Label htmlFor="box-truck">Box Trucks</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cargo-van" defaultChecked />
                      <Label htmlFor="cargo-van">Cargo Vans</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="refrigerated" defaultChecked />
                      <Label htmlFor="refrigerated">Refrigerated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="flatbed" defaultChecked />
                      <Label htmlFor="flatbed">Flatbeds</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="in-transit" defaultChecked />
                      <Label htmlFor="in-transit">In Transit</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="available" defaultChecked />
                      <Label htmlFor="available">Available</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="maintenance" defaultChecked />
                      <Label htmlFor="maintenance">Maintenance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="offline" />
                      <Label htmlFor="offline">Offline</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Time Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="from-date" className="text-xs">
                        From
                      </Label>
                      <Input id="from-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="to-date" className="text-xs">
                        To
                      </Label>
                      <Input id="to-date" type="date" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="relative">
                    <Input placeholder="Search location..." className="pl-10" />
                    <div className="absolute left-3 top-2.5">
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Checkbox id="show-geofences" />
                    <Label htmlFor="show-geofences">Show Geofences</Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" className="mr-2">
                  Reset
                </Button>
                <Button>Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Card className="h-[700px]">
              <CardContent className="p-0 h-full">
                <div className="bg-slate-100 h-full flex items-center justify-center">
                  <div className="text-center">
                    <MapIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Interactive Map</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
                      This area would display an interactive map showing
                      real-time locations of all vehicles, routes, and
                      geofences. It would integrate with a mapping service like
                      Google Maps or Mapbox.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Tabs defaultValue="vehicles" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
                <TabsTrigger value="routes">Routes</TabsTrigger>
              </TabsList>

              <TabsContent value="vehicles" className="mt-4">
                <div className="relative mb-4">
                  <Input placeholder="Search vehicles..." className="pl-10" />
                  <div className="absolute left-3 top-2.5">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2 max-h-[550px] overflow-y-auto pr-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Card
                      key={index}
                      className="hover:bg-muted/50 cursor-pointer"
                    >
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-1">
                              <Truck className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">
                                TRK-100{index + 1}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {index % 2 === 0 ? "Box Truck" : "Cargo Van"}
                            </div>
                          </div>
                          {index % 3 === 0 ? (
                            <Badge className="bg-green-500">In Transit</Badge>
                          ) : index % 3 === 1 ? (
                            <Badge className="bg-blue-500">Available</Badge>
                          ) : (
                            <Badge variant="outline">Maintenance</Badge>
                          )}
                        </div>
                        <div className="mt-2 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
                            {index % 2 === 0
                              ? "Chicago, IL"
                              : index % 3 === 0
                                ? "Detroit, MI"
                                : "Indianapolis, IN"}
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                            Updated {index * 5 + 5} mins ago
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="routes" className="mt-4">
                <div className="relative mb-4">
                  <Input placeholder="Search routes..." className="pl-10" />
                  <div className="absolute left-3 top-2.5">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2 max-h-[550px] overflow-y-auto pr-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Card
                      key={index}
                      className="hover:bg-muted/50 cursor-pointer"
                    >
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-1">
                              <Route className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">
                                T-100{index + 1}
                              </span>
                            </div>
                            <div className="text-sm mt-1">
                              {index % 2 === 0
                                ? "Electronics Shipment"
                                : "Furniture Delivery"}
                            </div>
                          </div>
                          {index % 2 === 0 ? (
                            <Badge className="bg-green-500">Active</Badge>
                          ) : (
                            <Badge className="bg-blue-500">Scheduled</Badge>
                          )}
                        </div>
                        <div className="mt-2 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
                            {index % 2 === 0 ? "Chicago, IL" : "Detroit, MI"}
                            <ArrowRight className="h-3 w-3 mx-1" />
                            {index % 2 === 0 ? "Detroit, MI" : "Cleveland, OH"}
                          </div>
                          <div className="flex items-center mt-1">
                            <Truck className="h-3 w-3 text-muted-foreground mr-1" />
                            TRK-100{index + 1} •{" "}
                            {index % 2 === 0 ? "John Doe" : "Mike Smith"}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapPage;
