import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { DataCard } from "@/components/ui/data-card";
import { Shimmer } from "@/components/ui/shimmer";
import { StatTrend } from "@/components/ui/stat-trend";
import { IconButton } from "@/components/ui/icon-button";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHeader } from "@/components/ui/page-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LoadingButton } from "@/components/ui/loading-button";
import { ActionCard } from "@/components/ui/action-card";
import { QuickActions } from "@/components/ui/quick-actions";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Activity,
  AlertTriangle,
  BarChart2,
  Bell,
  Clock,
  FileText,
  Filter,
  HelpCircle,
  MapPin,
  Plus,
  Search,
  Settings,
  Truck,
  Users,
} from "lucide-react";

const UIComponentsShowcase = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("badges");

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="container py-10">
      <PageHeader
        title="UI Components Showcase"
        description="A showcase of the new UI components for the Dispatch Management System"
        breadcrumbs={
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "UI Components" },
            ]}
          />
        }
        actions={
          <Button variant="default">
            <Plus className="mr-2 h-4 w-4" /> Add New Component
          </Button>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="badges">Badges & Status</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Status Badges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <StatusBadge status="pending" />
                <StatusBadge status="in-progress" />
                <StatusBadge status="completed" />
                <StatusBadge status="cancelled" />
                <StatusBadge status="active" />
                <StatusBadge status="inactive" />
              </div>

              <Separator />

              <div className="flex flex-wrap gap-2">
                <StatusBadge status="warning" />
                <StatusBadge status="error" />
                <StatusBadge status="success" />
                <StatusBadge status="info" />
              </div>

              <Separator />

              <div className="flex flex-wrap gap-2">
                <StatusBadge status="pending" size="sm" />
                <StatusBadge status="in-progress" size="md" />
                <StatusBadge status="completed" size="lg" />
              </div>

              <Separator />

              <div className="flex flex-wrap gap-2">
                <StatusBadge status="pending" showDot={false} />
                <StatusBadge status="in-progress" showDot={false} />
                <StatusBadge status="completed" showDot={false} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stat Trends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <StatTrend value="+12% from last week" trend="up" />
                <StatTrend value="-5% from yesterday" trend="down" />
                <StatTrend value="Same as yesterday" trend="neutral" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="mt-6 space-y-8">
          <SectionHeader
            title="Data Cards"
            description="Cards for displaying statistics and metrics"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DataCard
              title="Active Dispatches"
              value={18}
              icon={<Activity className="h-5 w-5" />}
              description="Currently in progress"
              trend="up"
              trendValue="+2 from yesterday"
              animation="fade"
              delay={0.1}
            />

            <DataCard
              title="Pending Dispatches"
              value={12}
              icon={<AlertTriangle className="h-5 w-5" />}
              description="Awaiting assignment"
              trend="down"
              trendValue="-3 from yesterday"
              animation="fade"
              delay={0.2}
            />

            <DataCard
              title="Completed Today"
              value={24}
              icon={<Clock className="h-5 w-5" />}
              description="Successfully delivered"
              trend="up"
              trendValue="+5 from yesterday"
              animation="fade"
              delay={0.3}
            />

            <DataCard
              title="Available Officers"
              value={15}
              icon={<Users className="h-5 w-5" />}
              description="Ready for assignment"
              trend="neutral"
              trendValue="Same as yesterday"
              animation="fade"
              delay={0.4}
            />
          </div>

          <SectionHeader
            title="Action Cards"
            description="Cards for navigation and actions"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionCard
              icon={<Truck />}
              title="Fleet & Zones"
              description="Manage vehicles and zones"
              onClick={() => console.log("Fleet & Zones clicked")}
              iconContainerClassName="bg-green-500/10"
              iconClassName="text-green-500"
            />

            <ActionCard
              icon={<AlertTriangle />}
              title="Alert Settings"
              description="Configure system alerts"
              onClick={() => console.log("Alert Settings clicked")}
              iconContainerClassName="bg-red-500/10"
              iconClassName="text-red-500"
            />

            <ActionCard
              icon={<Settings />}
              title="System Settings"
              description="Configure system parameters"
              onClick={() => console.log("System Settings clicked")}
              iconContainerClassName="bg-teal-500/10"
              iconClassName="text-teal-500"
            />
          </div>

          <SectionHeader
            title="Loading States"
            description="Shimmer effects for loading states"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Loading Card
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Shimmer className="h-8 w-full mb-2" />
                <Shimmer className="h-4 w-3/4 mb-2" />
                <Shimmer className="h-4 w-1/2" />
              </CardContent>
            </Card>
          </div>

          <SectionHeader
            title="Empty States"
            description="Components for empty data states"
          />

          <Card>
            <CardContent className="p-0">
              <EmptyState
                icon={<Search className="h-10 w-10" />}
                title="No results found"
                description="Try adjusting your search or filters to find what you're looking for."
                actionLabel="Clear Filters"
                actionIcon={<Filter className="h-4 w-4" />}
                onAction={() => console.log("Clear filters clicked")}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buttons" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>

              <Separator />

              <div className="flex flex-wrap gap-2">
                <LoadingButton
                  isLoading={isLoading}
                  loadingText="Loading..."
                  onClick={handleLoadingDemo}
                >
                  Click to Load
                </LoadingButton>
              </div>

              <Separator />

              <div className="flex flex-wrap gap-2">
                <IconButton
                  icon={<Settings className="h-4 w-4" />}
                  tooltip="Settings"
                />

                <IconButton
                  icon={<Bell className="h-4 w-4" />}
                  tooltip="Notifications"
                  badgeContent={3}
                />

                <IconButton
                  icon={<Users className="h-4 w-4" />}
                  tooltip="Users"
                  variant="outline"
                />
              </div>
            </CardContent>
          </Card>

          <SectionHeader
            title="Quick Actions"
            description="Action buttons for common tasks"
          />

          <QuickActions
            actions={[
              {
                icon: <MapPin />,
                label: "View Map",
                onClick: () => console.log("View Map clicked"),
              },
              {
                icon: <FileText />,
                label: "Reports",
                onClick: () => console.log("Reports clicked"),
              },
              {
                icon: <HelpCircle />,
                label: "Support",
                onClick: () => console.log("Support clicked"),
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="layout" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Section Headers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SectionHeader
                title="Analytics Overview"
                description="View your performance metrics"
                action={
                  <Button variant="outline" size="sm">
                    <BarChart2 className="mr-2 h-4 w-4" /> View Details
                  </Button>
                }
              />

              <Separator />

              <SectionHeader
                title="Recent Activity"
                description="Latest system events"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Animated Containers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AnimatedContainer
                  animation="fade"
                  className="p-4 border rounded-md"
                >
                  <h3 className="font-medium">Fade Animation</h3>
                  <p className="text-sm text-muted-foreground">
                    Smooth fade-in effect
                  </p>
                </AnimatedContainer>

                <AnimatedContainer
                  animation="slide-up"
                  className="p-4 border rounded-md"
                >
                  <h3 className="font-medium">Slide Up Animation</h3>
                  <p className="text-sm text-muted-foreground">
                    Slides up from below
                  </p>
                </AnimatedContainer>

                <AnimatedContainer
                  animation="scale"
                  className="p-4 border rounded-md"
                >
                  <h3 className="font-medium">Scale Animation</h3>
                  <p className="text-sm text-muted-foreground">
                    Scales in from 90%
                  </p>
                </AnimatedContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UIComponentsShowcase;
