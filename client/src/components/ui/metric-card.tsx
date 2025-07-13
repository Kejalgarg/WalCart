import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down";
}

export function MetricCard({ title, value, change, icon, trend }: MetricCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = trend === "up" ? "text-green-600" : "text-red-600";

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className={`text-sm mt-1 flex items-center ${trendColor}`}>
            <TrendIcon className="mr-1 h-3 w-3" />
            {change}
          </p>
        </div>
        <div className="bg-primary/10 p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
}
