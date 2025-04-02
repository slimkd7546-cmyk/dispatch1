import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Gauge,
  Clock,
  DollarSign,
  TrendingUp,
  Filter,
  ArrowUpDown,
  Package,
} from "lucide-react";

const AuctionPage = () => {
  // Mock auction data
  const auctionItems = [
    {
      id: "AUC-1001",
      title: "Electronics Shipment - Chicago to Detroit",
      currentBid: "$850",
      bidCount: 5,
      timeLeft: "2h 15m",
      status: "active",
    },
    {
      id: "AUC-1002",
      title: "Furniture Delivery - Detroit to Cleveland",
      currentBid: "$650",
      bidCount: 3,
      timeLeft: "4h 30m",
      status: "active",
    },
    {
      id: "AUC-1003",
      title: "Medical Supplies - Indianapolis to Columbus",
      currentBid: "$700",
      bidCount: 7,
      timeLeft: "1h 45m",
      status: "active",
    },
    {
      id: "AUC-1004",
      title: "Auto Parts - Columbus to Cincinnati",
      currentBid: "$550",
      bidCount: 2,
      timeLeft: "5h 20m",
      status: "active",
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
    <DashboardLayout>
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
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm">Place Bid</Button>
                        </div>
                      </div>
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
    </DashboardLayout>
  );
};

export default AuctionPage;
