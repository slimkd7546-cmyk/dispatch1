import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Map, Filter, Clock, Truck, MapPin } from "lucide-react";
import { TruckData } from "@/components/trucks/TruckManagement";

interface TruckMapProps {
  trucks: TruckData[];
  onViewTruckDetails: (truck: TruckData) => void;
}

const TruckMap: React.FC<TruckMapProps> = ({ trucks, onViewTruckDetails }) => {
  // Get status color
  const getStatusColor = (status: TruckData["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "on_route":
        return "bg-blue-500";
      case "maintenance":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Truck Locations</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" /> History
          </Button>
        </div>
      </div>

      <div className="border rounded-md bg-slate-100 h-[400px] relative overflow-hidden">
        {/* Placeholder map background */}
        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
          <Map className="h-16 w-16 text-slate-400" />
        </div>

        {/* Truck markers */}
        {trucks.map((truck) => {
          // Generate random positions for demo
          const left = `${10 + Math.random() * 80}%`;
          const top = `${10 + Math.random() * 80}%`;

          return (
            <div
              key={truck.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left, top }}
              onClick={() => onViewTruckDetails(truck)}
            >
              <div
                className={`h-4 w-4 rounded-full ${getStatusColor(
                  truck.status,
                )} border-2 border-white shadow-md`}
              ></div>

              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-white rounded-md shadow-md p-2 whitespace-nowrap">
                  <div className="font-medium text-sm">{truck.id}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Truck className="h-3 w-3" /> {truck.type}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {truck.location}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Map legend */}
        <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md">
          <div className="text-sm font-medium mb-1">Legend</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-xs">On Route</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs">Maintenance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gray-500"></div>
              <span className="text-xs">Offline</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trucks
          .filter((truck) => truck.status === "on_route")
          .slice(0, 4)
          .map((truck) => (
            <Card
              key={truck.id}
              className="hover:bg-muted/50 cursor-pointer"
              onClick={() => onViewTruckDetails(truck)}
            >
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium flex justify-between items-center">
                  <span>{truck.id}</span>
                  <Badge className="bg-blue-500">On Route</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-sm">{truck.driver.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" /> {truck.location}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Updated: {truck.lastUpdated}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default TruckMap;
