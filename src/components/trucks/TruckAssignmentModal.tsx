import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Truck, MapPin, Calendar, Clock } from "lucide-react";

interface TruckAssignmentModalProps {
  truckId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (data: any) => void;
}

const TruckAssignmentModal: React.FC<TruckAssignmentModalProps> = ({
  truckId,
  open,
  onOpenChange,
  onAssign,
}) => {
  const [formData, setFormData] = useState({
    loadId: "",
    loadType: "",
    origin: "",
    destination: "",
    pickupDate: "",
    pickupTime: "",
    deliveryDate: "",
    deliveryTime: "",
    priority: "medium",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onAssign({ ...formData, truckId });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" /> Assign Load to {truckId}
          </DialogTitle>
          <DialogDescription>
            Enter load details to assign to this truck.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="load-id">Load ID</Label>
              <Input
                id="load-id"
                placeholder="LD-1234"
                value={formData.loadId}
                onChange={(e) => handleChange("loadId", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="load-type">Load Type</Label>
              <Select
                value={formData.loadType}
                onValueChange={(value) => handleChange("loadType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="general">General Cargo</SelectItem>
                  <SelectItem value="refrigerated">Refrigerated</SelectItem>
                  <SelectItem value="hazardous">Hazardous</SelectItem>
                  <SelectItem value="oversized">Oversized</SelectItem>
                  <SelectItem value="fragile">Fragile</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="origin">Origin</Label>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input
                id="origin"
                placeholder="City, State"
                value={formData.origin}
                onChange={(e) => handleChange("origin", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input
                id="destination"
                placeholder="City, State"
                value={formData.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup-date">Pickup Date</Label>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <Input
                  id="pickup-date"
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => handleChange("pickupDate", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickup-time">Pickup Time</Label>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <Input
                  id="pickup-time"
                  type="time"
                  value={formData.pickupTime}
                  onChange={(e) => handleChange("pickupTime", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="delivery-date">Delivery Date</Label>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <Input
                  id="delivery-date"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => handleChange("deliveryDate", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery-time">Delivery Time</Label>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <Input
                  id="delivery-time"
                  type="time"
                  value={formData.deliveryTime}
                  onChange={(e) => handleChange("deliveryTime", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => handleChange("priority", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Assign Load</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TruckAssignmentModal;
