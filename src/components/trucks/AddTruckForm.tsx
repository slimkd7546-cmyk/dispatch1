import React, { memo } from "react";
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

interface AddTruckFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => void;
}

const AddTruckForm: React.FC<AddTruckFormProps> = ({
  open,
  onOpenChange,
  onSave,
}) => {
  const [formData, setFormData] = React.useState({
    truckId: "",
    type: "",
    driver: "",
    location: "",
    fuelLevel: "100",
    mileage: "0",
    nextMaintenance: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    setFormData({
      truckId: "",
      type: "",
      driver: "",
      location: "",
      fuelLevel: "100",
      mileage: "0",
      nextMaintenance: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Truck</DialogTitle>
          <DialogDescription>
            Enter the details for the new truck. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="truck-id">Truck ID</Label>
              <Input
                id="truck-id"
                placeholder="TRK-1006"
                value={formData.truckId}
                onChange={(e) => handleChange("truckId", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="truck-type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="box_truck">Box Truck</SelectItem>
                  <SelectItem value="cargo_van">Cargo Van</SelectItem>
                  <SelectItem value="refrigerated">Refrigerated</SelectItem>
                  <SelectItem value="flatbed">Flatbed</SelectItem>
                  <SelectItem value="tanker">Tanker</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="driver">Assign Driver</Label>
            <Select
              value={formData.driver}
              onValueChange={(value) => handleChange("driver", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select driver" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="mike">Mike Smith</SelectItem>
                <SelectItem value="ryan">Ryan Johnson</SelectItem>
                <SelectItem value="sarah">Sarah Williams</SelectItem>
                <SelectItem value="dan">Dan Brown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Current Location</Label>
            <Input
              id="location"
              placeholder="City, State"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fuel-level">Fuel Level (%)</Label>
              <Input
                id="fuel-level"
                type="number"
                min="0"
                max="100"
                placeholder="100"
                value={formData.fuelLevel}
                onChange={(e) => handleChange("fuelLevel", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                type="number"
                placeholder="0"
                value={formData.mileage}
                onChange={(e) => handleChange("mileage", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="next-maintenance">Next Maintenance Date</Label>
            <Input
              id="next-maintenance"
              type="date"
              value={formData.nextMaintenance}
              onChange={(e) => handleChange("nextMaintenance", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Truck</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(AddTruckForm);
