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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Plus, X } from "lucide-react";

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
    bookingRep: "",
    customer: "",
    agent: "",
    dispatcher: "",
    sourceBoard: "",
    reference: "",
    totalCharges: "",
    currency: "USD",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
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
                        <SelectItem value="john">John Doe</SelectItem>
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
                <p className="text-sm text-muted-foreground mt-2">
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
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Load Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupLocation">Pickup Location</Label>
                  <Input
                    id="pickupLocation"
                    name="pickupLocation"
                    placeholder="Enter pickup address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryLocation">Delivery Location</Label>
                  <Input
                    id="deliveryLocation"
                    name="deliveryLocation"
                    placeholder="Enter delivery address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Pickup Date & Time</Label>
                  <Input
                    id="pickupDate"
                    name="pickupDate"
                    type="datetime-local"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Delivery Date & Time</Label>
                  <Input
                    id="deliveryDate"
                    name="deliveryDate"
                    type="datetime-local"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="Enter weight"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    name="dimensions"
                    placeholder="L x W x H"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loadType">Load Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select load type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ftl">Full Truckload (FTL)</SelectItem>
                      <SelectItem value="ltl">
                        Less Than Truckload (LTL)
                      </SelectItem>
                      <SelectItem value="partial">Partial Truckload</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialInstructions">
                  Special Instructions
                </Label>
                <Input
                  id="specialInstructions"
                  name="specialInstructions"
                  placeholder="Enter any special instructions or requirements"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="step-3" className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Upload Documents</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-500 mb-2">
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
              Previous
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
