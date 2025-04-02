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
  onSubmit?: (data: FormValues) => void;
}

const CreateDispatchModal: React.FC<CreateDispatchModalProps> = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
}) => {
  const [selectedOfficers, setSelectedOfficers] = useState<string[]>([]);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700">
          Create New Dispatch
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Create New Dispatch
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Fill in the details to create a new dispatch task.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
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
                      <Input placeholder="Enter dispatch title" {...field} />
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
                      <Input placeholder="Enter reference number" {...field} />
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
                        <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
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
                        <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="pickupTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Time</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="datetime-local"
                          className="pl-8"
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
                name="deliveryTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Time</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="datetime-local"
                          className="pl-8"
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
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <div className="relative">
                          <Truck className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <SelectTrigger className="pl-8">
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Box truck">Box truck</SelectItem>
                        <SelectItem value="Cargo van">Cargo van</SelectItem>
                        <SelectItem value="Flatbed">Flatbed</SelectItem>
                        <SelectItem value="Refrigerated truck">
                          Refrigerated truck
                        </SelectItem>
                        <SelectItem value="Tanker">Tanker</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (lbs)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter weight"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="distance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distance (miles)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter distance"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <div className="relative">
                          <AlertTriangle className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <SelectTrigger className="pl-8">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low" className="text-green-600">
                          Low
                        </SelectItem>
                        <SelectItem value="medium" className="text-yellow-600">
                          Medium
                        </SelectItem>
                        <SelectItem value="high" className="text-orange-600">
                          High
                        </SelectItem>
                        <SelectItem value="critical" className="text-red-600">
                          Critical
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide detailed information about the dispatch"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-4 mt-8 mb-4">
              <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                2
              </div>
              <h3 className="text-lg font-medium">Assignment</h3>
            </div>

            <FormField
              control={form.control}
              name="assignedOfficers"
              render={() => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Assign Officers</span>
                    </div>
                  </FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {availableOfficers.map((officer) => (
                      <div
                        key={officer.id}
                        onClick={() => toggleOfficerSelection(officer.id)}
                        className={`
                          flex items-center p-2 rounded-md cursor-pointer border
                          ${
                            selectedOfficers.includes(officer.id)
                              ? "bg-teal-100 border-teal-500"
                              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                          }
                        `}
                      >
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                          {officer.name.charAt(0)}
                        </div>
                        <span className="text-sm">{officer.name}</span>
                      </div>
                    ))}
                  </div>
                  {form.formState.errors.assignedOfficers && (
                    <p className="text-[0.8rem] font-medium text-destructive mt-1">
                      {form.formState.errors.assignedOfficers.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                Create Dispatch
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDispatchModal;
