import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  MapPin,
  Clock,
  Users,
  AlertTriangle,
  CalendarClock,
} from "lucide-react";
import Truck from "@/components/ui/truck-icon";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadCreationForm from "./LoadCreationForm";

// Form schema validation
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  location: z.string().min(3, { message: "Location is required" }),
  origin: z.string().min(3, { message: "Origin is required" }),
  destination: z.string().min(3, { message: "Destination is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  priority: z.string(),
  estimatedTime: z.string(),
  assignedOfficers: z
    .string()
    .array()
    .min(1, { message: "At least one officer must be assigned" }),
  scheduledDate: z.string().optional(),
  pickupTime: z.string().min(1, { message: "Pickup time is required" }),
  deliveryTime: z.string().min(1, { message: "Delivery time is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  distance: z.string().optional(),
  vehicleType: z.string().min(1, { message: "Vehicle type is required" }),
  reference: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateDispatchModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: FormValues | any) => void;
}

const CreateDispatchModal: React.FC<CreateDispatchModalProps> = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
}) => {
  const [selectedOfficers, setSelectedOfficers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"simple" | "advanced">("simple");

  // Mock data for officers
  const availableOfficers = [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Sarah Johnson" },
    { id: "3", name: "Michael Brown" },
    { id: "4", name: "Emily Davis" },
    { id: "5", name: "Robert Wilson" },
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      origin: "",
      destination: "",
      description: "",
      priority: "medium",
      estimatedTime: "1h",
      assignedOfficers: [],
      scheduledDate: "",
      pickupTime: "",
      deliveryTime: "",
      weight: "",
      distance: "",
      vehicleType: "Box truck",
      reference: "",
    },
  });

  const handleSubmit = (data: FormValues) => {
    // Ensure assignedOfficers is populated from the selectedOfficers state
    if (
      selectedOfficers.length > 0 &&
      (!data.assignedOfficers || data.assignedOfficers.length === 0)
    ) {
      data.assignedOfficers = selectedOfficers;
    }

    onSubmit(data);
    onOpenChange(false);
    // In a real app, this would send the data to the server
    console.log("Dispatch created:", data);
  };

  const handleLoadFormSubmit = (loadData: any) => {
    // Transform load data to dispatch data format if needed
    const dispatchData = {
      ...loadData,
      title: loadData.commodity || "New Load",
      origin: loadData.pickupFacility || "",
      destination: loadData.deliveryFacility || "",
      weight: loadData.weight || "",
      vehicleType: loadData.truckType || "Box truck",
      description: loadData.generalNote || "",
      priority: "medium",
      status: "pending",
    };

    onSubmit(dispatchData);
    onOpenChange(false);
    console.log("Load created as dispatch:", dispatchData);
  };

  const toggleOfficerSelection = (officerId: string) => {
    setSelectedOfficers((prev) => {
      if (prev.includes(officerId)) {
        return prev.filter((id) => id !== officerId);
      } else {
        return [...prev, officerId];
      }
    });

    // Update form value
    const currentOfficers = form.getValues().assignedOfficers || [];
    if (currentOfficers.includes(officerId)) {
      form.setValue(
        "assignedOfficers",
        currentOfficers.filter((id) => id !== officerId),
      );
    } else {
      form.setValue("assignedOfficers", [...currentOfficers, officerId]);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          Create New Dispatch
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create New Dispatch
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in the details to create a new dispatch task.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "simple" | "advanced")
          }
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="simple">Simple Form</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Load Form</TabsTrigger>
          </TabsList>

          <TabsContent value="simple">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    1
                  </div>
                  <h3 className="text-lg font-medium">General Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dispatch Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter dispatch title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference #</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter reference number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="origin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Origin</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-8"
                              placeholder="Enter origin location"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-8"
                              placeholder="Enter destination location"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                  >
                    Create Dispatch
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="advanced">
            <LoadCreationForm
              onSubmit={handleLoadFormSubmit}
              onCancel={handleCancel}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDispatchModal;
