import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Play, TrendingUp, RotateCcw, DollarSign } from "lucide-react";

export function SimulatorSection() {
  const [category, setCategory] = useState("electronics");
  const [promotion, setPromotion] = useState("none");
  const [externalFactor, setExternalFactor] = useState("normal");
  const [hasRunSimulation, setHasRunSimulation] = useState(false);

  const handleRunSimulation = () => {
    setHasRunSimulation(true);
  };

  const getSimulationResults = () => {
    // Mock simulation results based on selections
    const baseResults = {
      demandChange: 15,
      inventoryTurnover: 2.1,
      revenueImpact: 125000,
    };

    let multiplier = 1;
    if (promotion === "10off") multiplier = 1.5;
    if (promotion === "20off") multiplier = 2.0;
    if (promotion === "blackfriday") multiplier = 3.0;
    if (promotion === "backtoschool") multiplier = 1.8;

    if (externalFactor === "holiday") multiplier *= 1.2;
    if (externalFactor === "extreme") multiplier *= 0.7;
    if (externalFactor === "downturn") multiplier *= 0.6;
    if (externalFactor === "sports") multiplier *= 1.4;

    return {
      demandChange: Math.round(baseResults.demandChange * multiplier),
      inventoryTurnover: (baseResults.inventoryTurnover * multiplier).toFixed(1),
      revenueImpact: Math.round(baseResults.revenueImpact * multiplier),
    };
  };

  const results = hasRunSimulation ? getSimulationResults() : null;

  const getRecommendations = () => {
    if (!results) return [];

    const recommendations = [
      `Increase ${category} inventory by ${Math.round(results.demandChange * 0.8)}% before promotion`,
    ];

    if (category === "electronics") {
      recommendations.push("Focus on smartphones and tablets for maximum impact");
    } else if (category === "clothing") {
      recommendations.push("Prioritize seasonal apparel and accessories");
    } else if (category === "home") {
      recommendations.push("Stock up on home improvement and gardening supplies");
    }

    recommendations.push(`Prepare for ${Math.ceil(results.demandChange / 10)}-day stockout recovery period`);

    return recommendations;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Scenario Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Promotion Type
              </label>
              <Select value={promotion} onValueChange={setPromotion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Promotion</SelectItem>
                  <SelectItem value="10off">10% Off Sale</SelectItem>
                  <SelectItem value="20off">20% Off Sale</SelectItem>
                  <SelectItem value="blackfriday">Black Friday Event</SelectItem>
                  <SelectItem value="backtoschool">Back to School</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                External Factors
              </label>
              <Select value={externalFactor} onValueChange={setExternalFactor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal Weather</SelectItem>
                  <SelectItem value="holiday">Holiday Season</SelectItem>
                  <SelectItem value="extreme">Extreme Weather</SelectItem>
                  <SelectItem value="downturn">Economic Downturn</SelectItem>
                  <SelectItem value="sports">Sports Event</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleRunSimulation} 
              className="w-full bg-primary text-primary-foreground"
            >
              <Play className="mr-2 h-4 w-4" />
              Run Simulation
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Simulation Results</CardTitle>
        </CardHeader>
        <CardContent>
          {!hasRunSimulation ? (
            <div className="text-center py-8 text-muted-foreground">
              Configure your scenario and click "Run Simulation" to see results
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Expected Demand Change
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    +{results?.demandChange}%
                  </span>
                </div>
                <Progress value={results?.demandChange || 0} className="w-full" />
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground flex items-center">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Inventory Turnover
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {results?.inventoryTurnover}x
                  </span>
                </div>
                <Progress value={parseFloat(results?.inventoryTurnover || "0") * 20} className="w-full" />
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Revenue Impact
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    +${results?.revenueImpact?.toLocaleString()}
                  </span>
                </div>
                <Progress value={Math.min((results?.revenueImpact || 0) / 5000, 100)} className="w-full" />
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">AI Recommendations</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  {getRecommendations().map((rec, index) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
