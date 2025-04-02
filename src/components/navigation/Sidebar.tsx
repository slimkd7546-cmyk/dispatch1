import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ClipboardList,
  Bell,
  Users,
  Settings,
  FileText,
  LogOut,
  Shield,
  Clock,
  Map,
  Car,
  Truck,
  Cog,
  AlertTriangle,
  BarChart2,
  Zap,
  Layers,
  HardDrive,
  Wifi,
  MessageSquare,
  Route,
  Gauge,
  History,
  HelpCircle,
  CheckCircle,
  Activity,
  User,
  Calendar,
  Briefcase,
  Building,
  DollarSign,
  PieChart,
  Smartphone,
  UserPlus,
  Headphones,
  FileSpreadsheet,
  Warehouse,
  Landmark,
  Truck as TruckDelivery,
} from "lucide-react";

interface SidebarProps {
  userRole?:
    | "Admin"
    | "Dispatcher"
    | "Officer"
    | "Reviewer"
    | "Connect"
    | "Driver";
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({
  userRole = "Dispatcher",
  collapsed = false,
  onToggleCollapse = () => {},
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeItem, setActiveItem] = useState<string>("");

  // Set active item based on current URL
  useEffect(() => {
    const path = window.location.pathname;
    setActiveItem(path);

    // Auto-expand parent items if a child is active
    const navigationItems = getNavigationItems();
    navigationItems.forEach((item) => {
      if (item.subItems) {
        const hasActiveChild = item.subItems.some((subItem) =>
          path.startsWith(subItem.href),
        );
        if (hasActiveChild) {
          setOpenItems((prev) => ({ ...prev, [item.title]: true }));
        }
      }
    });
  }, []);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onToggleCollapse();
  };

  const toggleSubMenu = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Handle navigation to different pages
  const handleNavigation = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveItem(href);
    window.location.href = href;
  };

  // Define navigation items based on user role
  const getNavigationItems = () => {
    const commonItems = [
      {
        title: "Dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />,
        href: "/dashboard",
      },
      {
        title: "Notifications",
        icon: <Bell className="h-5 w-5" />,
        href: "/notifications",
      },
    ];

    const roleSpecificItems = {
      Admin: [
        {
          title: "User Management",
          icon: <Users className="h-5 w-5" />,
          href: "/admin/users",
        },
        {
          title: "Fleet & Zones",
          icon: <Truck className="h-5 w-5" />,
          href: "/admin/fleet",
        },
        {
          title: "Alert Settings",
          icon: <AlertTriangle className="h-5 w-5" />,
          href: "/admin/alerts",
        },
        {
          title: "Templates",
          icon: <Layers className="h-5 w-5" />,
          href: "/admin/templates",
        },
        {
          title: "Integrations",
          icon: <Zap className="h-5 w-5" />,
          href: "/admin/integrations",
        },
        {
          title: "System Settings",
          icon: <Settings className="h-5 w-5" />,
          href: "/admin/settings",
        },
        {
          title: "Analytics & Reports",
          icon: <BarChart2 className="h-5 w-5" />,
          href: "/admin/analytics",
        },
      ],
      Dispatcher: [
        {
          title: "Trucks",
          icon: <Truck className="h-5 w-5" />,
          href: "/dispatcher/trucks",
        },
        {
          title: "Auction",
          icon: <Gauge className="h-5 w-5" />,
          href: "/dispatcher/auction",
        },
        {
          title: "Loads",
          icon: <ClipboardList className="h-5 w-5" />,
          href: "/dispatcher/loads",
        },
        {
          title: "Trip Monitor",
          icon: <Activity className="h-5 w-5" />,
          href: "/dispatcher/trip-monitor",
        },
        {
          title: "Owners",
          icon: <Users className="h-5 w-5" />,
          href: "/dispatcher/owners",
        },
        {
          title: "Drivers",
          icon: <User className="h-5 w-5" />,
          href: "/dispatcher/drivers",
        },
        {
          title: "Users",
          icon: <Users className="h-5 w-5" />,
          href: "/dispatcher/users",
        },
        {
          title: "Contragents",
          icon: <Building className="h-5 w-5" />,
          href: "/dispatcher/contragents",
          subItems: [
            {
              title: "Carriers",
              href: "/dispatcher/contragents/carriers",
            },
            {
              title: "Customers",
              href: "/dispatcher/contragents/customers",
            },
            {
              title: "Facilities",
              href: "/dispatcher/contragents/facilities",
            },
            {
              title: "Factoring Companies",
              href: "/dispatcher/contragents/factoring",
            },
          ],
        },
        {
          title: "Reports",
          icon: <FileText className="h-5 w-5" />,
          href: "/dispatcher/reports",
        },
        {
          title: "Live Map",
          icon: <Map className="h-5 w-5" />,
          href: "/dispatcher/map",
        },
        {
          title: "Task Management",
          icon: <CheckCircle className="h-5 w-5" />,
          href: "/dispatcher/tasks",
        },
      ],

      Officer: [
        {
          title: "Current Tasks",
          icon: <ClipboardList className="h-5 w-5" />,
          href: "/officer/tasks",
        },
        {
          title: "Task History",
          icon: <History className="h-5 w-5" />,
          href: "/officer/history",
        },
        {
          title: "Personal Logs",
          icon: <FileText className="h-5 w-5" />,
          href: "/officer/logs",
        },
        {
          title: "Support",
          icon: <HelpCircle className="h-5 w-5" />,
          href: "/officer/support",
        },
      ],
      Reviewer: [
        {
          title: "Overview",
          icon: <Activity className="h-5 w-5" />,
          href: "/reviewer/overview",
        },
        {
          title: "Dispatch Logs",
          icon: <ClipboardList className="h-5 w-5" />,
          href: "/reviewer/dispatches",
        },
        {
          title: "Audit Trails",
          icon: <FileText className="h-5 w-5" />,
          href: "/reviewer/audit",
        },
        {
          title: "Reports",
          icon: <BarChart2 className="h-5 w-5" />,
          href: "/reviewer/reports",
        },
      ],
      Connect: [
        {
          title: "Device Management",
          icon: <HardDrive className="h-5 w-5" />,
          href: "/connect/devices",
        },
        {
          title: "Integration Settings",
          icon: <Zap className="h-5 w-5" />,
          href: "/connect/integrations",
        },
        {
          title: "Rule Configuration",
          icon: <Cog className="h-5 w-5" />,
          href: "/connect/rules",
        },
        {
          title: "Connectivity Logs",
          icon: <Wifi className="h-5 w-5" />,
          href: "/connect/logs",
        },
      ],
      Driver: [
        {
          title: "My Tasks",
          icon: <ClipboardList className="h-5 w-5" />,
          href: "/driver/tasks",
        },
        {
          title: "Vehicle Status",
          icon: <Truck className="h-5 w-5" />,
          href: "/driver/vehicle",
        },
        {
          title: "Navigation",
          icon: <Route className="h-5 w-5" />,
          href: "/driver/navigation",
        },
        {
          title: "History",
          icon: <History className="h-5 w-5" />,
          href: "/driver/history",
        },
        {
          title: "Communication",
          icon: <MessageSquare className="h-5 w-5" />,
          href: "/driver/messages",
        },
      ],
    };

    // If the role doesn't exist in our mapping, default to Dispatcher
    const role = roleSpecificItems[userRole] ? userRole : "Dispatcher";
    return [...commonItems, ...roleSpecificItems[role]];
  };

  const navigationItems = getNavigationItems();

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-slate-900 text-white transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[280px]",
      )}
    >
      {/* Logo and collapse toggle */}
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-teal-400" />
          {!isCollapsed && (
            <span className="ml-2 text-xl font-bold">Dispatch MS</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleCollapse}
          className="text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <Separator className="bg-slate-700" />

      {/* Navigation links */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="flex flex-col gap-1">
          {navigationItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.subItems ? (
                <Collapsible
                  className="w-full"
                  open={openItems[item.title]}
                  onOpenChange={() => toggleSubMenu(item.title)}
                >
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              "flex h-10 w-full items-center justify-start gap-3 rounded-md px-3 text-slate-300 hover:bg-slate-800 hover:text-white",
                              isCollapsed && "justify-center px-2",
                              item.subItems.some((subItem) =>
                                activeItem.startsWith(subItem.href),
                              ) && "bg-slate-800/50 text-white font-medium",
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center justify-center",
                                item.subItems.some((subItem) =>
                                  activeItem.startsWith(subItem.href),
                                ) && "text-primary",
                              )}
                            >
                              {item.icon}
                            </div>
                            {!isCollapsed && (
                              <span className="flex-1">{item.title}</span>
                            )}
                            {!isCollapsed && (
                              <ChevronRight
                                className={cn(
                                  "h-4 w-4 transition-transform duration-200",
                                  openItems[item.title] && "rotate-90",
                                )}
                              />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          <p>{item.title}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                  {!isCollapsed && (
                    <CollapsibleContent className="pl-10 pr-2">
                      <div className="flex flex-col gap-1 py-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <Button
                            key={subIndex}
                            variant="ghost"
                            className={cn(
                              "flex h-8 w-full items-center justify-start gap-2 rounded-md px-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white",
                              activeItem.startsWith(subItem.href) &&
                                "bg-slate-800 text-white font-medium",
                            )}
                            asChild
                          >
                            <a
                              href={subItem.href}
                              onClick={(e) => handleNavigation(subItem.href, e)}
                            >
                              <span>{subItem.title}</span>
                            </a>
                          </Button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              ) : (
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "flex h-10 w-full items-center justify-start gap-3 rounded-md px-3 text-slate-300 hover:bg-slate-800 hover:text-white",
                          isCollapsed && "justify-center px-2",
                          activeItem.startsWith(item.href) &&
                            "bg-slate-800/50 text-white font-medium",
                        )}
                        asChild
                      >
                        <a
                          href={item.href}
                          onClick={(e) => handleNavigation(item.href, e)}
                        >
                          <div
                            className={cn(
                              "flex items-center justify-center",
                              activeItem.startsWith(item.href) &&
                                "text-primary",
                            )}
                          >
                            {item.icon}
                          </div>
                          {!isCollapsed && <span>{item.title}</span>}
                        </a>
                      </Button>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">
                        <p>{item.title}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              )}
            </React.Fragment>
          ))}
        </nav>
      </ScrollArea>

      <Separator className="bg-slate-700" />

      {/* User profile and logout */}
      <div className="p-2 space-y-2">
        <div className="px-3 py-2">
          {!isCollapsed && (
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                <User size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Jane Doe
                </p>
                <p className="text-xs text-slate-400 truncate">{userRole}</p>
              </div>
            </div>
          )}
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    // Clear authentication
                    localStorage.removeItem("isAuthenticated");
                    localStorage.removeItem("userRole");
                    window.location.href = "/";
                  }}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex h-10 w-full items-center justify-start gap-3 rounded-md px-3 text-slate-300 hover:bg-slate-800 hover:text-white",
                      isCollapsed && "justify-center px-2",
                    )}
                  >
                    <LogOut className="h-5 w-5 text-red-400" />
                    {!isCollapsed && <span>Logout</span>}
                  </Button>
                </a>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  <p>Logout</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
