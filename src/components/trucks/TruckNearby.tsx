import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Navigation } from "lucide-react";
import { TruckData } from "@/components/trucks/TruckManagement";

interface TruckNearbyProps {
  trucks: TruckData[];
  onAssignTruck: (truckId: string) => void;
  onViewTruckDetails: (truck: TruckData) => void;
}

const TruckNearby: React.FC<TruckNearbyProps> = ({
  trucks,
  onAssignTruck,
  onViewTruckDetails,
}) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchRadius, setSearchRadius] = useState(50);

  // Filter available trucks
  const availableTrucks = trucks.filter(
    (truck) => truck.status === "available",
  );

  // Generate random distances for demo purposes
  const trucksWithDistance = availableTrucks.map((truck) => ({
    ...truck,
    distance: Math.floor(Math.random() * searchRadius) + 1,
  }));

  // Sort by distance
  const sortedTrucks = [...trucksWithDistance].sort(
    (a, b) => a.distance - b.distance,
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Trucks Nearby</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Enter location or ZIP code"
            className="w-64"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <Button size="sm">
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-md bg-slate-100 h-[300px] flex items-center justify-center relative">
          <div className="text-center">
            <Navigation className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium">Proximity Map</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
              Map showing trucks within {searchRadius} miles
              {searchLocation ? ` of ${searchLocation}` : ""}
            </p>
          </div>

          {/* Radius selector */}
          <div className="absolute bottom-4 left-4 bg-white p-2 rounded-md shadow-md">
            <div className="text-sm font-medium mb-1">Search Radius</div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="10"
                max="100"
                step="10"
                value={searchRadius}
                onChange={(e) => setSearchRadius(parseInt(e.target.value))}
                className="w-32"
              />
              <span className="text-sm">{searchRadius} miles</span>
            </div>
          </div>

          {/* Truck markers (simplified for demo) */}
          {sortedTrucks.slice(0, 5).map((truck, index) => {
            // Generate positions in a circle around center
            const angle = (index / 5) * Math.PI * 2;
            const distance = (truck.distance / searchRadius) * 40;
            const left = `calc(50% + ${Math.cos(angle) * distance}%)`;
            const top = `calc(50% + ${Math.sin(angle) * distance}%)`;

            return (
              <div
                key={truck.id}
                className="absolute w-3 h-3 bg-green-500 rounded-full border border-white"
                style={{ left, top }}
              ></div>
            );
          })}
        </div>

        <div className="border rounded-md">
          <div className="p-4 border-b font-medium">
            Nearest Available Trucks
          </div>
          <div className="divide-y max-h-[300px] overflow-y-auto">
            {sortedTrucks.length > 0 ? (
              sortedTrucks.map((truck) => (
                <div key={truck.id} className="p-4 hover:bg-muted/50">
                  <div className="flex justify-between">
                    <div
                      className="font-medium cursor-pointer hover:text-blue-500"
                      onClick={() => onViewTruckDetails(truck)}
                    >
                      {truck.id}
                    </div>
                    <Badge>{truck.distance} miles away</Badge>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="text-sm text-muted-foreground">
                      {truck.type} • {truck.location}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAssignTruck(truck.id)}
                    >
                      Assign
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">
                  No available trucks found in this area.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckNearby;
