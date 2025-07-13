import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Store } from "@shared/schema";

export function HeatmapSection() {
  const [selectedCategory, setSelectedCategory] = useState("electronics");

  const { data: stores } = useQuery<Store[]>({
    queryKey: ["/api/stores"],
  });

  const getDemandColor = (demandLevel: string) => {
    switch (demandLevel) {
      case "low":
        return "demand-low";
      case "medium":
        return "demand-medium";
      case "high":
        return "demand-high";
      case "very_high":
        return "demand-very-high";
      default:
        return "demand-medium";
    }
  };

  const getRegionalInsights = () => {
    if (!stores) return {};

    const regionStats = stores.reduce((acc, store) => {
      if (!acc[store.region]) {
        acc[store.region] = { total: 0, high: 0, medium: 0, low: 0 };
      }
      acc[store.region].total++;
      if (store.demandLevel === "high" || store.demandLevel === "very_high") {
        acc[store.region].high++;
      } else if (store.demandLevel === "medium") {
        acc[store.region].medium++;
      } else {
        acc[store.region].low++;
      }
      return acc;
    }, {} as any);

    return regionStats;
  };

  const getHighestDemandRegion = () => {
    const insights = getRegionalInsights();
    let highestRegion = "";
    let highestPercentage = 0;

    Object.entries(insights).forEach(([region, stats]: [string, any]) => {
      const percentage = (stats.high / stats.total) * 100;
      if (percentage > highestPercentage) {
        highestPercentage = percentage;
        highestRegion = region;
      }
    });

    return highestRegion;
  };

  const getRedistributionNeeded = () => {
    return stores?.filter(store => store.demandLevel === "very_high").length || 0;
  };

  const regionalInsights = getRegionalInsights();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Store Demand Heatmap</CardTitle>
            <div className="flex items-center space-x-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Low</span>
                <div className="flex space-x-1">
                  <div className="w-4 h-4 bg-green-200 rounded"></div>
                  <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                  <div className="w-4 h-4 bg-orange-300 rounded"></div>
                  <div className="w-4 h-4 bg-red-400 rounded"></div>
                </div>
                <span className="text-sm text-muted-foreground">High</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-6">
            {stores?.map((store) => (
              <div
                key={store.id}
                className={`store-heatmap-cell ${getDemandColor(store.demandLevel)}`}
              >
                <div className="font-medium">{store.storeId}</div>
                <div className="text-xs truncate">{store.city}</div>
              </div>
            ))}
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Regional Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-foreground">Highest Demand:</span>
                <span className="text-foreground ml-2">{getHighestDemandRegion()} region</span>
              </div>
              <div>
                <span className="font-medium text-foreground">Growth Opportunity:</span>
                <span className="text-foreground ml-2">
                  {Object.entries(regionalInsights).find(([, stats]: [string, any]) => 
                    stats.low > stats.high
                  )?.[0] || "Northeast"} region
                </span>
              </div>
              <div>
                <span className="font-medium text-foreground">Redistribution Needed:</span>
                <span className="text-foreground ml-2">{getRedistributionNeeded()} stores flagged</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
