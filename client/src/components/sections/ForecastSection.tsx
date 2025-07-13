import { useState } from "react";
import { ForecastChart } from "@/components/charts/forecast-chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ForecastSection() {
  const [category, setCategory] = useState("electronics");
  const [store, setStore] = useState("all");
  const [dateRange, setDateRange] = useState("7days");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Forecast Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Product Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="sports">Sports & Outdoors</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Store Location
              </label>
              <Select value={store} onValueChange={setStore}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stores</SelectItem>
                  <SelectItem value="store-001">Store #001 - NYC</SelectItem>
                  <SelectItem value="store-002">Store #002 - LA</SelectItem>
                  <SelectItem value="store-003">Store #003 - Chicago</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Date Range
              </label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Next 7 Days</SelectItem>
                  <SelectItem value="14days">Next 14 Days</SelectItem>
                  <SelectItem value="30days">Next 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Demand Forecast vs Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <ForecastChart />
        </CardContent>
      </Card>
    </div>
  );
}
