import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  List, 
  FlaskConical, 
  Map 
} from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "forecast", label: "Forecast", icon: TrendingUp },
    { id: "recommendations", label: "Recommendations", icon: List },
    { id: "simulator", label: "What-if Simulator", icon: FlaskConical },
    { id: "heatmap", label: "Store Heatmap", icon: Map },
  ];

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`nav-tab ${activeSection === item.id ? "active" : ""}`}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
