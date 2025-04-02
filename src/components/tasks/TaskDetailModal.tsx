import React from "react";
import {
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  HelpCircle,
  User,
  Calendar,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface TaskDetailModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  task?: {
    id: string;
    title: string;
    description: string;
    location: string;
    priority: "high" | "medium" | "low";
    status:
      | "pending"
      | "accepted"
      | "in_progress"
      | "completed"
      | "needs_assistance";
    assignedTime: string;
    dueTime?: string;
    assignedTo?: string;
    notes: string[];
  };
  onStatusChange?: (status: string) => void;
  onAddNote?: (note: string) => void;
  onRequestAssistance?: () => void;
}

const TaskDetailModal = ({
  isOpen = true,
  onClose = () => {},
  task = {
    id: "TASK-1234",
    title: "Security Check at Main Entrance",
    description:
      "Perform routine security check at the main entrance. Verify all access points and report any suspicious activity.",
    location: "Building A, Main Entrance",
    priority: "high",
    status: "in_progress",
    assignedTime: "2023-06-15T14:30:00Z",
    dueTime: "2023-06-15T16:30:00Z",
    assignedTo: "John Smith",
    notes: [
      "Arrived at location at 2:30 PM",
      "North side door needs maintenance - lock is sticking",
    ],
  },
  onStatusChange = () => {},
  onAddNote = () => {},
  onRequestAssistance = () => {},
}: TaskDetailModalProps) => {
  const [currentStatus, setCurrentStatus] = React.useState(task.status);
  const [newNote, setNewNote] = React.useState("");

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const formattedAssignedDate = formatDate(task.assignedTime);
  const formattedDueDate = task.dueTime
    ? formatDate(task.dueTime)
    : "Not specified";

  // Status badge styling based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "accepted":
        return <Badge variant="secondary">Accepted</Badge>;
      case "in_progress":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
        );
      case "needs_assistance":
        return <Badge variant="destructive">Needs Assistance</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Priority badge styling
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600">
            Medium Priority
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            Low Priority
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Handle status change
  const handleStatusChange = (value: string) => {
    setCurrentStatus(value as TaskDetailModalProps["task"]["status"]);
    onStatusChange(value);
  };

  // Handle adding a new note
  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote("");
    }
  };

  // Handle requesting assistance
  const handleRequestAssistance = () => {
    setCurrentStatus("needs_assistance");
    onRequestAssistance();
  };

  // Calculate time remaining until due time
  const getTimeRemaining = () => {
    if (!task.dueTime) return null;

    const now = new Date();
    const dueTime = new Date(task.dueTime);
    const diffMs = dueTime.getTime() - now.getTime();

    if (diffMs <= 0) return "Overdue";

    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHrs}h ${diffMins}m remaining`;
  };

  const timeRemaining = getTimeRemaining();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white dark:bg-gray-800">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              {task.title}
            </DialogTitle>
            <div className="flex space-x-2">
              {getPriorityBadge(task.priority)}
              {getStatusBadge(currentStatus)}
            </div>
          </div>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            Task ID: {task.id}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Task Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Task Details</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {task.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{task.location}</span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Assigned: {formattedAssignedDate}</span>
                </div>

                {task.dueTime && (
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Due: {formattedDueDate}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {task.assignedTo && (
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <User className="mr-2 h-4 w-4" />
                    <span>Assigned to: {task.assignedTo}</span>
                  </div>
                )}

                {timeRemaining && (
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Clock className="mr-2 h-4 w-4" />
                    <span
                      className={
                        timeRemaining === "Overdue" ? "text-red-500" : ""
                      }
                    >
                      {timeRemaining}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Update Section */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-medium">Update Status</h3>
            <Select value={currentStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="needs_assistance">
                  Needs Assistance
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes Section */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-medium">Notes & Updates</h3>

            <div className="max-h-40 space-y-2 overflow-y-auto rounded-md bg-gray-50 p-3 dark:bg-gray-700">
              {task.notes.length > 0 ? (
                task.notes.map((note, index) => (
                  <div
                    key={index}
                    className="rounded-md bg-white p-2 shadow-sm dark:bg-gray-600"
                  >
                    <p className="text-sm">{note}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date().toLocaleString()}{" "}
                      {/* In a real app, each note would have its own timestamp */}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  No notes yet
                </p>
              )}
            </div>

            <div className="flex space-x-2">
              <Textarea
                placeholder="Add a note or update..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <Button onClick={handleAddNote} className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Add Note
            </Button>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="flex space-x-2">
            <Button variant="destructive" onClick={handleRequestAssistance}>
              <AlertCircle className="mr-2 h-4 w-4" />
              Request Assistance
            </Button>
            <Button
              variant="default"
              onClick={() => handleStatusChange("completed")}
              disabled={currentStatus === "completed"}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark Complete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailModal;
