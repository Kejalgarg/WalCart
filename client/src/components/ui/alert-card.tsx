import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Alert } from "@shared/schema";

interface AlertCardProps {
  alert: Alert;
}

export function AlertCard({ alert }: AlertCardProps) {
  const getIcon = () => {
    switch (alert.type) {
      case "stockout":
        return <AlertTriangle className="text-red-500" />;
      case "overstock":
        return <AlertCircle className="text-orange-500" />;
      case "optimal":
        return <CheckCircle className="text-green-500" />;
      default:
        return <AlertCircle className="text-blue-500" />;
    }
  };

  const getTextColor = () => {
    switch (alert.severity) {
      case "high":
        return "text-red-900";
      case "medium":
        return "text-orange-900";
      case "low":
        return "text-green-900";
      default:
        return "text-foreground";
    }
  };

  const getSubTextColor = () => {
    switch (alert.severity) {
      case "high":
        return "text-red-700";
      case "medium":
        return "text-orange-700";
      case "low":
        return "text-green-700";
      default:
        return "text-muted-foreground";
    }
  };

  const getButtonColor = () => {
    switch (alert.severity) {
      case "high":
        return "text-red-600 hover:text-red-800";
      case "medium":
        return "text-orange-600 hover:text-orange-800";
      case "low":
        return "text-green-600 hover:text-green-800";
      default:
        return "text-primary hover:text-primary/80";
    }
  };

  return (
    <div className={`alert-card ${alert.severity}`}>
      <div className="flex items-center space-x-3">
        {getIcon()}
        <div>
          <p className={`font-medium ${getTextColor()}`}>{alert.title}</p>
          <p className={`text-sm ${getSubTextColor()}`}>{alert.message}</p>
        </div>
      </div>
      <Button variant="ghost" className={`font-medium ${getButtonColor()}`}>
        View Details
      </Button>
    </div>
  );
}
