import React, { memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, User, MapPin, Map, Settings, FileText } from "lucide-react";

interface TruckData {
  id: string;
  type: string;
  status: "available" | "on_route" | "maintenance" | "offline";
  driver: {
    id: string;
    name: string;
    avatar?: string;
  };
  location: string;
  lastUpdated: string;
  fuelLevel: number;
  mileage: number;
  nextMaintenance: string;
}

interface TruckDetailsProps {
  truck: TruckData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssignLoad?: (truckId: string) => void;
  onEditDetails?: (truckId: string) => void;
}

const TruckDetails: React.FC<TruckDetailsProps> = ({
  truck,
  open,
  onOpenChange,
  onAssignLoad,
  onEditDetails,
}) => {
  if (!truck) return null;

  // Get status badge
  const getStatusBadge = (status: TruckData["status"]) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Available</Badge>;
      case "on_route":
        return <Badge className="bg-blue-500">On Route</Badge>;
      case "maintenance":
        return <Badge variant="secondary">Maintenance</Badge>;
      case "offline":
        return <Badge variant="outline">Offline</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" /> {truck.id} Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Type</p>
                <p>{truck.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                {getStatusBadge(truck.status)}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium">Driver</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {truck.driver.avatar ? (
                    <img
                      src={truck.driver.avatar}
                      alt={truck.driver.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={16} className="text-gray-600" />
                  )}
                </div>
                <span>{truck.driver.name}</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium">Current Location</p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={16} className="text-gray-500" />
                <span>{truck.location}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Last updated: {truck.lastUpdated}
              </p>
            </div>

            <div className="pt-4">
              <Button variant="outline" className="w-full">
                <Map className="mr-2 h-4 w-4" />
                View on Map
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Fuel Level</p>
              <div className="mt-1 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${truck.fuelLevel}%` }}
                  ></div>
                </div>
                <span className="text-sm">{truck.fuelLevel}%</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium">Mileage</p>
              <p>{truck.mileage.toLocaleString()} miles</p>
            </div>

            <div>
              <p className="text-sm font-medium">Maintenance</p>
              <div className="flex items-center gap-2 mt-1">
                <Settings size={16} className="text-gray-500" />
                <span>Next scheduled: {truck.nextMaintenance}</span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                View Full Report
              </Button>
              <Button variant="outline" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Schedule Maintenance
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAssignLoad && onAssignLoad(truck.id)}
            >
              Assign Load
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditDetails && onEditDetails(truck.id)}
            >
              Edit Details
            </Button>
          </div>
          <Button onClick={() => onOpenChange(false)} className="ml-auto">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(TruckDetails);
