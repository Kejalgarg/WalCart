import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Package, Calendar, AlertTriangle } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const mockTrendData = [
    { week: "Week 1", demand: 12 },
    { week: "Week 2", demand: 19 },
    { week: "Week 3", demand: 8 },
    { week: "Week 4", demand: 15 },
    { week: "Current", demand: product.predictedDemand },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name} - Detail View</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="bg-muted rounded-lg h-48 flex items-center justify-center mb-4">
              <Package className="h-16 w-16 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">SKU:</span>
                <span>{product.sku}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Current Stock:</span>
                <span>{product.currentStock} units</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Predicted Demand:</span>
                <span>{product.predictedDemand} units</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Recommended Reorder:</span>
                <span>{product.recommendedReorder} units</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Priority:</span>
                <Badge className={getPriorityColor(product.priority)}>
                  {product.priority}
                </Badge>
              </div>
              {product.daysUntilStockout && (
                <div className="flex justify-between">
                  <span className="font-medium">Days Until Stockout:</span>
                  <span className="text-red-600 font-medium flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {product.daysUntilStockout} days
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Demand Trend
            </h4>
            <div className="h-48 bg-muted rounded-lg p-4 mb-4">
              <div className="h-full flex items-end justify-between">
                {mockTrendData.map((point, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div
                      className="bg-primary rounded-t"
                      style={{ height: `${(point.demand / 50) * 100}%`, width: "20px" }}
                    />
                    <span className="text-xs text-muted-foreground">{point.week}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                AI Recommendation
              </h5>
              <p className="text-sm text-blue-800">
                {product.priority === "high" 
                  ? `Immediate reorder of ${product.recommendedReorder} units recommended. High demand expected due to seasonal trends and competitor pricing.`
                  : `Reorder ${product.recommendedReorder} units within the next week. Current stock levels are adequate for short-term demand.`
                }
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
