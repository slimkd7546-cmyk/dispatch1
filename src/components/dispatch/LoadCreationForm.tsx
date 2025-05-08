import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/ui/date-picker";
import { Plus, X, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

interface LoadCreationFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

const LoadCreationForm = ({
  onSubmit = () => {},
  onCancel = () => {},
}: LoadCreationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: General
    bookingRep: "",
    customer: "",
    agent: "",
    dispatcher: "",
    sourceBoard: "",
    reference: "",
    totalCharges: "",
    currency: "USD",

    // Step 2: Load Info
    pickupFacility: "",
    pickupDate: null as Date | null,
    pickupTime: "",
    pickupTimeZone: "EDT",
    pickupTimeFrame: "FCFS", // First Come, First Served
    pickupAdditionalInfo: "",

    deliveryFacility: "",
    deliveryDate: null as Date | null,
    deliveryTime: "",
    deliveryTimeZone: "EDT",
    deliveryTimeFrame: "FCFS",
    deliveryAdditionalInfo: "",

    commodity: "",
    pieces: "1",
    weight: "",
    length: "",
    width: "",
    height: "",
    isStackable: false,
    isHazmat: false,

    // Truck Info
    truckType: "Box truck",
    trailerType: "",
    truckEquipment: "",
    teamDrivers: false,

    // General Load Note
    generalNote: "",

    // Step 3: Files
    files: [] as File[],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleDateChange = (name: string, date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, [name]: date || null }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send a notification to all drivers
    // about the new load being available for bidding
    const loadWithId = {
      ...formData,
      id: `LD-${Math.floor(Math.random() * 10000)}`,
      status: "open_for_bidding",
      createdAt: new Date().toISOString(),
    };
    onSubmit(loadWithId);
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderTimeFrameOptions = () => (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="fcfs"
          name="timeFrame"
          value="FCFS"
          checked={formData.pickupTimeFrame === "FCFS"}
          onChange={() => handleSelectChange("pickupTimeFrame", "FCFS")}
          className="h-4 w-4"
        />
        <label htmlFor="fcfs" className="text-sm">
          FCFS
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="appt"
          name="timeFrame"
          value="APPT"
          checked={formData.pickupTimeFrame === "APPT"}
          onChange={() => handleSelectChange("pickupTimeFrame", "APPT")}
          className="h-4 w-4"
        />
        <label htmlFor="appt" className="text-sm">
          APPT
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="direct"
          name="timeFrame"
          value="DIRECT"
          checked={formData.pickupTimeFrame === "DIRECT"}
          onChange={() => handleSelectChange("pickupTimeFrame", "DIRECT")}
          className="h-4 w-4"
        />
        <label htmlFor="direct" className="text-sm">
          DIRECT
        </label>
      </div>
    </div>
  );

  const renderDeliveryTimeFrameOptions = () => (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="fcfs-delivery"
          name="deliveryTimeFrame"
          value="FCFS"
          checked={formData.deliveryTimeFrame === "FCFS"}
          onChange={() => handleSelectChange("deliveryTimeFrame", "FCFS")}
          className="h-4 w-4"
        />
        <label htmlFor="fcfs-delivery" className="text-sm">
          FCFS
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="appt-delivery"
          name="deliveryTimeFrame"
          value="APPT"
          checked={formData.deliveryTimeFrame === "APPT"}
          onChange={() => handleSelectChange("deliveryTimeFrame", "APPT")}
          className="h-4 w-4"
        />
        <label htmlFor="appt-delivery" className="text-sm">
          APPT
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="direct-delivery"
          name="deliveryTimeFrame"
          value="DIRECT"
          checked={formData.deliveryTimeFrame === "DIRECT"}
          onChange={() => handleSelectChange("deliveryTimeFrame", "DIRECT")}
          className="h-4 w-4"
        />
        <label htmlFor="direct-delivery" className="text-sm">
          DIRECT
        </label>
      </div>
    </div>
  );

  const renderUnitOptions = () => (
    <div className="flex space-x-2 mb-4">
      <Button
        variant="outline"
        size="sm"
        className="bg-primary/10 hover:bg-primary/20"
      >
        lbs
      </Button>
      <Button variant="outline" size="sm">
        kg
      </Button>
      <Button variant="outline" size="sm">
        ton
      </Button>
      <Button variant="outline" size="sm">
        ft
      </Button>
      <Button variant="outline" size="sm">
        in
      </Button>
      <Button variant="outline" size="sm">
        m
      </Button>
      <Button variant="outline" size="sm">
        cm
      </Button>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto bg-background">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Create Load Card</CardTitle>
        <CardDescription>
          Enter the details to create a new load
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs
          value={`step-${currentStep}`}
          onValueChange={(value) =>
            setCurrentStep(parseInt(value.split("-")[1]))
          }
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="step-1" disabled={currentStep !== 1}>
              Step 1. General
            </TabsTrigger>
            <TabsTrigger value="step-2" disabled={currentStep !== 2}>
              Step 2. Load Info
            </TabsTrigger>
            <TabsTrigger value="step-3" disabled={currentStep !== 3}>
              Step 3. All files
            </TabsTrigger>
          </TabsList>

          <TabsContent value="step-1" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Booked by:</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bookingRep">BOOKING REP *</Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.bookingRep}
                      onValueChange={(value) =>
                        handleSelectChange("bookingRep", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="choose dispatcher from the list" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="david">David Solomon</SelectItem>
                        <SelectItem value="sarah">Sarah Smith</SelectItem>
                        <SelectItem value="mike">Mike Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Booked with:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">CUSTOMER *</Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.customer}
                      onValueChange={(value) =>
                        handleSelectChange("customer", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="choose company from the list" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acme">Acme Corp</SelectItem>
                        <SelectItem value="globex">Globex Inc</SelectItem>
                        <SelectItem value="initech">Initech LLC</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agent">AGENT</Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.agent}
                      onValueChange={(value) =>
                        handleSelectChange("agent", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="choose agent from the list" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agent1">Agent One</SelectItem>
                        <SelectItem value="agent2">Agent Two</SelectItem>
                        <SelectItem value="agent3">Agent Three</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Send updates to:</h4>
                  <Button variant="outline" size="sm" className="h-8">
                    <Plus className="h-3 w-3 mr-1" /> add email
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  no selected dispatchers
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  no selected agents
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Assign to:</h3>
              <div className="space-y-2">
                <Label htmlFor="dispatcher">DISPATCHER NAME</Label>
                <Select
                  value={formData.dispatcher}
                  onValueChange={(value) =>
                    handleSelectChange("dispatcher", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="choose dispatcher from the list" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="sarah">Sarah Smith</SelectItem>
                    <SelectItem value="mike">Mike Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Source Boards:</h3>
              <div className="space-y-2">
                <Label htmlFor="sourceBoard">BOARD NAME</Label>
                <Select
                  value={formData.sourceBoard}
                  onValueChange={(value) =>
                    handleSelectChange("sourceBoard", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="choose board source from the list" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="board1">DAT Board</SelectItem>
                    <SelectItem value="board2">Truckstop</SelectItem>
                    <SelectItem value="board3">123Loadboard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Billing info:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reference">REF#1 *</Label>
                  <Input
                    id="reference"
                    name="reference"
                    placeholder="enter reference number 1"
                    value={formData.reference}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalCharges">TOTAL CHARGES *</Label>
                  <Input
                    id="totalCharges"
                    name="totalCharges"
                    placeholder="total rate"
                    value={formData.totalCharges}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">CURRENCY *</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) =>
                      handleSelectChange("currency", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">
                        $ United States Dollar USD
                      </SelectItem>
                      <SelectItem value="CAD">$ Canadian Dollar CAD</SelectItem>
                      <SelectItem value="EUR">€ Euro EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" /> add another field
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="step-2" className="space-y-6 mt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Trip Info:</h3>

              {/* Pickup Section */}
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Step (1) Pick Up #1</h4>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupFacility">FACILITY *</Label>
                    <div className="flex gap-2">
                      <Select
                        value={formData.pickupFacility}
                        onValueChange={(value) =>
                          handleSelectChange("pickupFacility", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="choose facility name" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facility1">
                            Chicago Warehouse
                          </SelectItem>
                          <SelectItem value="facility2">
                            Detroit Distribution Center
                          </SelectItem>
                          <SelectItem value="facility3">
                            Indianapolis Hub
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>TIME FRAMES *</Label>
                    {renderTimeFrameOptions()}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="px-3 py-2 bg-muted border-r">
                    <Select
                      value={formData.pickupTimeZone}
                      onValueChange={(value) =>
                        handleSelectChange("pickupTimeZone", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EDT">EDT</SelectItem>
                        <SelectItem value="CDT">CDT</SelectItem>
                        <SelectItem value="MDT">MDT</SelectItem>
                        <SelectItem value="PDT">PDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="px-3 py-2 bg-muted border-r">
                    <div className="flex items-center border rounded-md">
                      <div className="px-3 py-2 bg-muted border-r">
                        <Calendar className="h-4 w-4 text-gray-500" />
                      </div>
                      <DatePicker
                        date={formData.pickupDate}
                        setDate={(date) => handleDateChange("pickupDate", date)}
                        placeholder="Select date"
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>

                  <div className="px-3 py-2 bg-muted border-r">
                    <div className="flex items-center border rounded-md">
                      <div className="px-3 py-2 bg-muted border-r">
                        <Clock className="h-4 w-4 text-gray-500" />
                      </div>
                      <Input
                        type="time"
                        name="pickupTime"
                        value={formData.pickupTime}
                        onChange={handleInputChange}
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="px-3 py-2 bg-muted border-r">
                    <div className="flex items-center border rounded-md">
                      <div className="px-3 py-2 bg-muted border-r">
                        <Calendar className="h-4 w-4 text-gray-500" />
                      </div>
                      <DatePicker
                        date={formData.pickupDate}
                        setDate={(date) => handleDateChange("pickupDate", date)}
                        placeholder="Select date"
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>

                  <div className="px-3 py-2 bg-muted border-r">
                    <div className="flex items-center border rounded-md">
                      <div className="px-3 py-2 bg-muted border-r">
                        <Clock className="h-4 w-4 text-gray-500" />
                      </div>
                      <Input
                        type="time"
                        name="pickupTime"
                        value={formData.pickupTime}
                        onChange={handleInputChange}
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>ADDITIONAL STOP INFO</Label>
                  <Textarea
                    name="pickupAdditionalInfo"
                    value={formData.pickupAdditionalInfo}
                    onChange={handleInputChange}
                    placeholder="PUP, agent, contact person name and phone#, etc."
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              {/* Units of Measure */}
              <div className="space-y-2">
                <Label>Set up units of measure in the stop</Label>
                {renderUnitOptions()}
              </div>

              {/* Commodity */}
              <div className="space-y-2">
                <Label>COMMODITY</Label>
                <Input
                  name="commodity"
                  value={formData.commodity}
                  onChange={handleInputChange}
                  placeholder="enter commodity"
                />
              </div>

              {/* Freight */}
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">FREIGHT #1</h4>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="space-y-2">
                    <Label>PIECES *</Label>
                    <Input
                      name="pieces"
                      value={formData.pieces}
                      onChange={handleInputChange}
                      type="number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>WEIGHT *</Label>
                    <Input
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      type="number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>LENGTH</Label>
                    <div className="flex items-center">
                      <Input
                        name="length"
                        value={formData.length}
                        onChange={handleInputChange}
                        type="number"
                        className="rounded-r-none"
                      />
                      <div className="bg-gray-100 px-2 py-2 border border-l-0 rounded-r-md">
                        ft
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>WIDTH</Label>
                    <div className="flex items-center">
                      <Input
                        name="width"
                        value={formData.width}
                        onChange={handleInputChange}
                        type="number"
                        className="rounded-r-none"
                      />
                      <div className="bg-gray-100 px-2 py-2 border border-l-0 rounded-r-md">
                        ft
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>HEIGHT</Label>
                    <div className="flex items-center">
                      <Input
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        type="number"
                        className="rounded-r-none"
                      />
                      <div className="bg-gray-100 px-2 py-2 border border-l-0 rounded-r-md">
                        ft
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="stackable"
                        checked={formData.isStackable}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "isStackable",
                            checked as boolean,
                          )
                        }
                      />
                      <Label htmlFor="stackable">STACKABLE</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hazmat"
                        checked={formData.isHazmat}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("isHazmat", checked as boolean)
                        }
                      />
                      <Label htmlFor="hazmat">HAZMAT</Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Section */}
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Step (2) Delivery #1</h4>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryFacility">FACILITY *</Label>
                    <div className="flex gap-2">
                      <Select
                        value={formData.deliveryFacility}
                        onValueChange={(value) =>
                          handleSelectChange("deliveryFacility", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="choose facility name" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facility1">
                            Chicago Warehouse
                          </SelectItem>
                          <SelectItem value="facility2">
                            Detroit Distribution Center
                          </SelectItem>
                          <SelectItem value="facility3">
                            Indianapolis Hub
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>TIME FRAMES *</Label>
                    {renderDeliveryTimeFrameOptions()}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="px-3 py-2 bg-muted border-r">
                    <Select
                      value={formData.deliveryTimeZone}
                      onValueChange={(value) =>
                        handleSelectChange("deliveryTimeZone", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EDT">EDT</SelectItem>
                        <SelectItem value="CDT">CDT</SelectItem>
                        <SelectItem value="MDT">MDT</SelectItem>
                        <SelectItem value="PDT">PDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="px-3 py-2 bg-muted border-r">
                    <div className="flex items-center border rounded-md">
                      <div className="px-3 py-2 bg-muted border-r">
                        <Calendar className="h-4 w-4 text-gray-500" />
                      </div>
                      <DatePicker
                        date={formData.deliveryDate}
                        setDate={(date) =>
                          handleDateChange("deliveryDate", date)
                        }
                        placeholder="Select date"
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>

                  <div className="px-3 py-2 bg-muted border-r">
                    <div className="flex items-center border rounded-md">
                      <div className="px-3 py-2 bg-muted border-r">
                        <Clock className="h-4 w-4 text-gray-500" />
                      </div>
                      <Input
                        type="time"
                        name="deliveryTime"
                        value={formData.deliveryTime}
                        onChange={handleInputChange}
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="px-3 py-2 bg-muted border-r">
                    <div className="flex items-center border rounded-md">
                      <div className="px-3 py-2 bg-muted border-r">
                        <Calendar className="h-4 w-4 text-gray-500" />
                      </div>
                      <DatePicker
                        date={formData.deliveryDate}
                        setDate={(date) =>
                          handleDateChange("deliveryDate", date)
                        }
                        placeholder="Select date"
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>

                  <div className="px-3 py-2 bg-muted border-r">
                    <div className="flex items-center border rounded-md">
                      <div className="px-3 py-2 bg-muted border-r">
                        <Clock className="h-4 w-4 text-gray-500" />
                      </div>
                      <Input
                        type="time"
                        name="deliveryTime"
                        value={formData.deliveryTime}
                        onChange={handleInputChange}
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>ADDITIONAL STOP INFO</Label>
                  <Textarea
                    name="deliveryAdditionalInfo"
                    value={formData.deliveryAdditionalInfo}
                    onChange={handleInputChange}
                    placeholder="PUP, agent, contact person name and phone#, etc."
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              {/* Check in as */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Check in as:</h3>
                <div className="space-y-2">
                  <Label>CONTRAGENT NAME / COMPANY NAME *</Label>
                  <Input placeholder="YELLOW DIAMOND" />
                </div>
              </div>

              {/* Required Truck Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Required Truck Info:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>TRUCK TYPE</Label>
                    <div className="flex gap-2">
                      <Select
                        value={formData.truckType}
                        onValueChange={(value) =>
                          handleSelectChange("truckType", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select truck type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Box truck">Box truck</SelectItem>
                          <SelectItem value="Cargo van">Cargo van</SelectItem>
                          <SelectItem value="Straight truck">
                            Straight truck
                          </SelectItem>
                          <SelectItem value="Refrigerated truck">
                            Refrigerated truck
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>TRAILER TYPE</Label>
                    <Input
                      name="trailerType"
                      value={formData.trailerType}
                      onChange={handleInputChange}
                      placeholder="choose or enter the trailer type"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>TRUCK EQUIPMENT (optional)</Label>
                  <Input
                    name="truckEquipment"
                    value={formData.truckEquipment}
                    onChange={handleInputChange}
                    placeholder="choose or enter the required equipment"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="teamDrivers"
                    checked={formData.teamDrivers}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("teamDrivers", checked as boolean)
                    }
                  />
                  <Label htmlFor="teamDrivers">Team Drivers</Label>
                </div>
              </div>

              {/* General Load Note */}
              <div className="space-y-2">
                <Label>General Load Note:</Label>
                <Textarea
                  name="generalNote"
                  value={formData.generalNote}
                  onChange={handleInputChange}
                  placeholder="enter information about the current load"
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="step-3" className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Upload Documents</h3>
              <div className="border-2 border-dashed border-border rounded-md p-6 text-center">
                <div className="flex flex-col items-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop files here, or click to select files
                  </p>
                  <Button variant="outline" size="sm">
                    Select Files
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Uploaded Files</h4>
                <p className="text-sm text-muted-foreground">
                  No files uploaded yet
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <div className="flex gap-2">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevStep}>
              Previous Step
            </Button>
          )}
          {currentStep < 3 ? (
            <Button onClick={handleNextStep}>Next Step</Button>
          ) : (
            <Button onClick={handleSubmit}>Create Load</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoadCreationForm;
