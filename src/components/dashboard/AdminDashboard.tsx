import React from "react";
import {
  Users,
  BarChart3,
  Settings,
  Shield,
  Bell,
  Activity,
  Clock,
  Truck,
  AlertTriangle,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataCard } from "@/components/ui/data-card";

interface AdminDashboardProps {
  analytics?: {
    totalUsers: number;
    activeDispatches: number;
    completedTasks: number;
    systemUptime: string;
  };
  recentActivity?: Array<{
    id: string;
    type: string;
    user: string;
    time: string;
    description: string;
  }>;
}

const AdminDashboard = ({
  analytics = {
    totalUsers: 124,
    activeDispatches: 18,
    completedTasks: 432,
    systemUptime: "99.8%",
  },
  recentActivity = [
    {
      id: "1",
      type: "user",
      user: "John Smith",
      time: "10 minutes ago",
      description: "Added new dispatcher account",
    },
    {
      id: "2",
      type: "dispatch",
      user: "Sarah Johnson",
      time: "25 minutes ago",
      description: "Created high priority dispatch #4392",
    },
    {
      id: "3",
      type: "system",
      user: "System",
      time: "1 hour ago",
      description: "Automatic backup completed",
    },
    {
      id: "4",
      type: "alert",
      user: "Michael Chen",
      time: "2 hours ago",
      description: "Updated emergency response protocol",
    },
  ],
}: AdminDashboardProps) => {
  return (
    <div className="w-full h-full bg-background overflow-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          System overview and management
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DataCard
          title="Total Users"
          value={analytics.totalUsers}
          icon={<Users className="h-5 w-5" />}
          description="Across all roles"
          animation="fade"
          delay={0.1}
          iconClassName="text-primary"
        />

        <DataCard
          title="Active Dispatches"
          value={analytics.activeDispatches}
          icon={<Activity className="h-5 w-5" />}
          description="Currently in progress"
          animation="fade"
          delay={0.2}
          iconClassName="text-teal-500"
        />

        <DataCard
          title="Completed Tasks"
          value={analytics.completedTasks}
          icon={<Clock className="h-5 w-5" />}
          description="Last 30 days"
          animation="fade"
          delay={0.3}
          iconClassName="text-green-500"
        />

        <DataCard
          title="System Uptime"
          value={analytics.systemUptime}
          icon={<Shield className="h-5 w-5" />}
          description="Last 7 days"
          animation="fade"
          delay={0.4}
          iconClassName="text-blue-500"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Analytics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>System Analytics</CardTitle>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>
              Usage trends and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Analytics visualization would appear here</p>
              <p className="text-sm mt-2">Showing data for the last 30 days</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 w-full h-full">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 pb-3 border-b last:border-0 last:pb-0"
                >
                  <div className="mt-0.5">
                    {activity.type === "user" && (
                      <Users className="h-5 w-5 text-blue-500" />
                    )}
                    {activity.type === "dispatch" && (
                      <Activity className="h-5 w-5 text-teal-500" />
                    )}
                    {activity.type === "system" && (
                      <Settings className="h-5 w-5 text-gray-500" />
                    )}
                    {activity.type === "alert" && (
                      <Bell className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span>{activity.user}</span>
                      <span className="mx-1">•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <button className="text-sm text-primary hover:underline w-full text-center">
              View All Activity
            </button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card
          className="hover:bg-accent/50 cursor-pointer transition-colors"
          onClick={() => (window.location.href = "/admin/users")}
        >
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Manage Users</h3>
                <p className="text-sm text-muted-foreground">
                  Add, edit or remove users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover:bg-accent/50 cursor-pointer transition-colors"
          onClick={() => (window.location.href = "/admin/settings")}
        >
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-teal-500/10">
                <Settings className="h-6 w-6 text-teal-500" />
              </div>
              <div>
                <h3 className="font-medium">System Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure system parameters
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover:bg-accent/50 cursor-pointer transition-colors"
          onClick={() => (window.location.href = "/admin/analytics")}
        >
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-blue-500/10">
                <BarChart3 className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">View Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Access detailed analytics
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
