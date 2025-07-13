import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { MetricCard } from "@/components/ui/metric-card";
import { AlertCard } from "@/components/ui/alert-card";
import { Chatbot } from "@/components/ui/chatbot";
import { ForecastSection } from "@/components/sections/ForecastSection";
import { RecommendationsSection } from "@/components/sections/RecommendationsSection";
import { SimulatorSection } from "@/components/sections/SimulatorSection";
import { HeatmapSection } from "@/components/sections/HeatmapSection";
import { AccuracyChart } from "@/components/charts/accuracy-chart";
import { SavingsChart } from "@/components/charts/savings-chart";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart, Store, DollarSign, Target, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metric, Alert } from "@shared/schema";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const { data: metrics, isLoading: metricsLoading } = useQuery<Metric>({
    queryKey: ["/api/metrics"],
  });

  const { data: alerts, isLoading: alertsLoading } = useQuery<Alert[]>({
    queryKey: ["/api/alerts"],
  });

  const renderSection = () => {
    switch (activeSection) {
      case "forecast":
        return <ForecastSection />;
      case "recommendations":
        return <RecommendationsSection />;
      case "simulator":
        return <SimulatorSection />;
      case "heatmap":
        return <HeatmapSection />;
      default:
        return (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Products"
                value={metrics?.totalProducts?.toLocaleString() || "0"}
                change="+2.5% from last month"
                icon={<ShoppingCart className="text-primary" />}
                trend="up"
              />
              <MetricCard
                title="Total Stores"
                value={metrics?.totalStores?.toLocaleString() || "0"}
                change="+12 new stores"
                icon={<Store className="text-primary" />}
                trend="up"
              />
              <MetricCard
                title="Cost Savings"
                value={`$${(parseFloat(metrics?.costSavings || "0") / 1000000).toFixed(1)}M`}
                change="+18% this quarter"
                icon={<DollarSign className="text-green-600" />}
                trend="up"
              />
              <MetricCard
                title="Forecast Accuracy"
                value={`${metrics?.forecastAccuracy || "0"}%`}
                change="+1.2% improvement"
                icon={<Target className="text-primary" />}
                trend="up"
              />
            </div>

            {/* Alerts Section */}
            <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Bell className="text-primary mr-2" />
                Active Alerts
              </h3>
              <div className="space-y-3">
                {alertsLoading ? (
                  <div className="text-muted-foreground">Loading alerts...</div>
                ) : alerts && alerts.length > 0 ? (
                  alerts.map((alert) => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))
                ) : (
                  <div className="text-muted-foreground">No active alerts</div>
                )}
              </div>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Forecast Accuracy Trend
                </h3>
                <AccuracyChart />
              </div>
              <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Cost Savings Overview
                </h3>
                <SavingsChart />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="text-primary text-2xl" />
                <span className="text-2xl font-bold text-primary">WalCart</span>
              </div>
              <span className="text-muted-foreground">|</span>
              <span className="text-lg font-medium text-foreground">
                Smart Inventory Recommender
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">
                  AI Model Active
                </span>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <User className="mr-2 h-4 w-4" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSection()}
      </main>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
