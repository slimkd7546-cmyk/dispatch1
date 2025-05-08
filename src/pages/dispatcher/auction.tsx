import React, { useState } from "react";
import ThemeAwareDashboardLayout from "@/components/layout/ThemeAwareDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Gauge,
  Clock,
  DollarSign,
  TrendingUp,
  Filter,
  ArrowUpDown,
  Package,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react";

const AuctionPage = () => {
  // State to track which auction's bidders dropdown is open
  const [openBiddersDropdown, setOpenBiddersDropdown] = useState<string | null>(
    null,
  );

  // Toggle bidders dropdown
  const toggleBiddersDropdown = (auctionId: string) => {
    setOpenBiddersDropdown(
      openBiddersDropdown === auctionId ? null : auctionId,
    );
  };

  // Mock auction data with bidders information
  const auctionItems = [
    {
      id: "AUC-1001",
      title: "Electronics Shipment - Chicago to Detroit",
      currentBid: "$850",
      bidCount: 5,
      timeLeft: "2h 15m",
      status: "active",
      bidders: [
        {
          id: "BID-001",
          name: "John Smith",
          company: "Express Logistics",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
          amount: "$850",
          time: "10 minutes ago",
          rating: 4.8,
          completedJobs: 124,
        },
        {
          id: "BID-002",
          name: "Sarah Johnson",
          company: "Midwest Carriers",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
          amount: "$830",
          time: "25 minutes ago",
          rating: 4.6,
          completedJobs: 98,
        },
        {
          id: "BID-003",
          name: "Michael Chen",
          company: "Chen Transport LLC",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
          amount: "$810",
          time: "45 minutes ago",
          rating: 4.9,
          completedJobs: 156,
        },
        {
          id: "BID-004",
          name: "Emily Davis",
          company: "Quick Delivery Services",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
          amount: "$790",
          time: "1 hour ago",
          rating: 4.7,
          completedJobs: 112,
        },
        {
          id: "BID-005",
          name: "Robert Wilson",
          company: "Wilson Freight",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
          amount: "$775",
          time: "1.5 hours ago",
          rating: 4.5,
          completedJobs: 87,
        },
      ],
    },
    {
      id: "AUC-1002",
      title: "Furniture Delivery - Detroit to Cleveland",
      currentBid: "$650",
      bidCount: 3,
      timeLeft: "4h 30m",
      status: "active",
      bidders: [
        {
          id: "BID-006",
          name: "David Brown",
          company: "Brown Logistics",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
          amount: "$650",
          time: "15 minutes ago",
          rating: 4.4,
          completedJobs: 76,
        },
        {
          id: "BID-007",
          name: "Lisa Martinez",
          company: "Martinez Shipping",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
          amount: "$630",
          time: "40 minutes ago",
          rating: 4.7,
          completedJobs: 103,
        },
        {
          id: "BID-008",
          name: "James Wilson",
          company: "Wilson Transport",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
          amount: "$610",
          time: "1.2 hours ago",
          rating: 4.6,
          completedJobs: 92,
        },
      ],
    },
    {
      id: "AUC-1003",
      title: "Medical Supplies - Indianapolis to Columbus",
      currentBid: "$700",
      bidCount: 7,
      timeLeft: "1h 45m",
      status: "active",
      bidders: [
        {
          id: "BID-009",
          name: "Thomas Lee",
          company: "MedExpress Logistics",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=thomas",
          amount: "$700",
          time: "5 minutes ago",
          rating: 4.9,
          completedJobs: 145,
        },
        {
          id: "BID-010",
          name: "Jennifer Kim",
          company: "Kim Medical Transport",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer",
          amount: "$690",
          time: "20 minutes ago",
          rating: 4.8,
          completedJobs: 132,
        },
        {
          id: "BID-011",
          name: "Daniel Garcia",
          company: "Garcia Freight",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel",
          amount: "$680",
          time: "35 minutes ago",
          rating: 4.7,
          completedJobs: 118,
        },
        {
          id: "BID-012",
          name: "Amanda Taylor",
          company: "Taylor Medical Logistics",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amanda",
          amount: "$670",
          time: "50 minutes ago",
          rating: 4.6,
          completedJobs: 105,
        },
        {
          id: "BID-013",
          name: "Christopher White",
          company: "White Transport",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=christopher",
          amount: "$660",
          time: "1.1 hours ago",
          rating: 4.5,
          completedJobs: 95,
        },
        {
          id: "BID-014",
          name: "Melissa Harris",
          company: "Harris Shipping",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=melissa",
          amount: "$650",
          time: "1.3 hours ago",
          rating: 4.4,
          completedJobs: 88,
        },
        {
          id: "BID-015",
          name: "Ryan Johnson",
          company: "Johnson Logistics",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan",
          amount: "$640",
          time: "1.5 hours ago",
          rating: 4.3,
          completedJobs: 79,
        },
      ],
    },
    {
      id: "AUC-1004",
      title: "Auto Parts - Columbus to Cincinnati",
      currentBid: "$550",
      bidCount: 2,
      timeLeft: "5h 20m",
      status: "active",
      bidders: [
        {
          id: "BID-016",
          name: "Kevin Anderson",
          company: "Anderson Auto Transport",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kevin",
          amount: "$550",
          time: "30 minutes ago",
          rating: 4.5,
          completedJobs: 85,
        },
        {
          id: "BID-017",
          name: "Stephanie Clark",
          company: "Clark Logistics",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=stephanie",
          amount: "$530",
          time: "1 hour ago",
          rating: 4.4,
          completedJobs: 72,
        },
      ],
    },
  ];

  const completedAuctions = [
    {
      id: "AUC-0998",
      title: "Retail Goods - Chicago to Milwaukee",
      finalBid: "$780",
      bidCount: 8,
      completedAt: "Yesterday, 3:45 PM",
      winner: "Express Logistics",
    },
    {
      id: "AUC-0999",
      title: "Construction Materials - St. Louis to Indianapolis",
      finalBid: "$920",
      bidCount: 6,
      completedAt: "Yesterday, 11:30 AM",
      winner: "Midwest Carriers",
    },
  ];

  return (
    <ThemeAwareDashboardLayout pageTitle="Load Auction">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Load Auction</h1>
          <Button>
            <Package className="mr-2 h-4 w-4" />
            Create New Auction
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Auctions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Gauge className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">
                  {auctionItems.length}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Bids Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold">24</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Bid Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-2xl font-bold">$725</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Closing Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-2xl font-bold">2</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 max-w-md">
            <TabsTrigger value="active">Active Auctions</TabsTrigger>
            <TabsTrigger value="completed">Completed Auctions</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Active Auctions</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="h-4 w-4 mr-2" /> Sort
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auctionItems.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{item.id}</Badge>
                            <Badge className="bg-green-500">Active</Badge>
                          </div>
                          <h3 className="font-medium mt-2">{item.title}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            {item.currentBid}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.bidCount} bids
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Ends in: {item.timeLeft}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleBiddersDropdown(item.id)}
                            className="flex items-center gap-1"
                          >
                            <Users className="h-4 w-4 mr-1" />
                            View Bidders
                            {openBiddersDropdown === item.id ? (
                              <ChevronUp className="h-3 w-3 ml-1" />
                            ) : (
                              <ChevronDown className="h-3 w-3 ml-1" />
                            )}
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm">Place Bid</Button>
                        </div>
                      </div>
                      {openBiddersDropdown === item.id && (
                        <div className="mt-4 border rounded-md bg-background shadow-sm">
                          <div className="p-3 border-b bg-muted/50">
                            <h4 className="font-medium text-sm">
                              Bidders ({item.bidCount})
                            </h4>
                          </div>
                          <div className="max-h-80 overflow-y-auto">
                            {item.bidders.map((bidder) => (
                              <div
                                key={bidder.id}
                                className="p-3 border-b last:border-0 hover:bg-muted/30 transition-colors"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage
                                        src={bidder.avatar}
                                        alt={bidder.name}
                                      />
                                      <AvatarFallback>
                                        {bidder.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">
                                        {bidder.name}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {bidder.company}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-green-600">
                                      {bidder.amount}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {bidder.time}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                  <div className="flex items-center gap-4">
                                    <span>
                                      Rating:{" "}
                                      <span className="font-medium text-foreground">
                                        {bidder.rating}/5
                                      </span>
                                    </span>
                                    <span>
                                      Completed Jobs:{" "}
                                      <span className="font-medium text-foreground">
                                        {bidder.completedJobs}
                                      </span>
                                    </span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs"
                                  >
                                    View Profile
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Completed Auctions</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="h-4 w-4 mr-2" /> Sort
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedAuctions.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{item.id}</Badge>
                            <Badge variant="secondary">Completed</Badge>
                          </div>
                          <h3 className="font-medium mt-2">{item.title}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            {item.finalBid}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.bidCount} bids
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex flex-col text-sm">
                          <span className="text-muted-foreground">
                            Completed: {item.completedAt}
                          </span>
                          <span>
                            Winner:{" "}
                            <span className="font-medium">{item.winner}</span>
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ThemeAwareDashboardLayout>
  );
};

export default AuctionPage;
