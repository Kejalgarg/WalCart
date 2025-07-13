import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertStoreSchema, insertAlertSchema, insertForecastSchema, insertMetricSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedProduct = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedProduct);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  // Stores
  app.get("/api/stores", async (req, res) => {
    try {
      const stores = await storage.getStores();
      res.json(stores);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stores" });
    }
  });

  app.post("/api/stores", async (req, res) => {
    try {
      const validatedStore = insertStoreSchema.parse(req.body);
      const store = await storage.createStore(validatedStore);
      res.status(201).json(store);
    } catch (error) {
      res.status(400).json({ message: "Invalid store data" });
    }
  });

  // Alerts
  app.get("/api/alerts", async (req, res) => {
    try {
      const alerts = await storage.getActiveAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const validatedAlert = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(validatedAlert);
      res.status(201).json(alert);
    } catch (error) {
      res.status(400).json({ message: "Invalid alert data" });
    }
  });

  // Forecasts
  app.get("/api/forecasts", async (req, res) => {
    try {
      const forecasts = await storage.getForecasts();
      res.json(forecasts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch forecasts" });
    }
  });

  app.get("/api/forecasts/product/:productId", async (req, res) => {
    try {
      const productId = parseInt(req.params.productId);
      const forecasts = await storage.getForecastsByProduct(productId);
      res.json(forecasts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product forecasts" });
    }
  });

  app.post("/api/forecasts", async (req, res) => {
    try {
      const validatedForecast = insertForecastSchema.parse(req.body);
      const forecast = await storage.createForecast(validatedForecast);
      res.status(201).json(forecast);
    } catch (error) {
      res.status(400).json({ message: "Invalid forecast data" });
    }
  });

  // Metrics
  app.get("/api/metrics", async (req, res) => {
    try {
      const metrics = await storage.getLatestMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch metrics" });
    }
  });

  app.post("/api/metrics", async (req, res) => {
    try {
      const validatedMetric = insertMetricSchema.parse(req.body);
      const metric = await storage.createMetric(validatedMetric);
      res.status(201).json(metric);
    } catch (error) {
      res.status(400).json({ message: "Invalid metric data" });
    }
  });

  // CSV Export endpoint
  app.get("/api/export/recommendations", async (req, res) => {
    try {
      const products = await storage.getProducts();
      
      // Create CSV content
      const csvHeader = "SKU ID,Product Name,Current Stock,7-Day Demand,Recommended Reorder,Priority\n";
      const csvContent = products.map(product => 
        `${product.sku},${product.name},${product.currentStock},${product.predictedDemand},${product.recommendedReorder},${product.priority}`
      ).join("\n");
      
      const csv = csvHeader + csvContent;
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="recommendations.csv"');
      res.send(csv);
    } catch (error) {
      res.status(500).json({ message: "Failed to export recommendations" });
    }
  });

  // Chatbot endpoint
  app.post("/api/chatbot", async (req, res) => {
    try {
      const { message } = req.body;
      
      let response = "I can help you with that! Let me check our inventory data...";
      
      if (message.toLowerCase().includes('stock')) {
        const products = await storage.getProducts();
        const lowStockProducts = products.filter(p => p.currentStock < p.predictedDemand);
        response = `I found ${lowStockProducts.length} products with low stock levels. ${lowStockProducts[0]?.name || 'iPhone 15 Pro'} needs immediate attention with only ${lowStockProducts[0]?.currentStock || 23} units remaining.`;
      } else if (message.toLowerCase().includes('forecast')) {
        const metrics = await storage.getLatestMetrics();
        response = `Our AI forecast shows ${metrics?.forecastAccuracy || '94.2'}% accuracy. Based on current trends, we expect demand to increase by 15% in the electronics category next week.`;
      } else if (message.toLowerCase().includes('alert')) {
        const alerts = await storage.getActiveAlerts();
        response = `There are ${alerts.length} active alerts: ${alerts.filter(a => a.severity === 'high').length} high priority, ${alerts.filter(a => a.severity === 'medium').length} medium priority, and ${alerts.filter(a => a.severity === 'low').length} low priority notifications.`;
      } else if (message.toLowerCase().includes('savings')) {
        const metrics = await storage.getLatestMetrics();
        response = `Our smart inventory system has saved $${metrics?.costSavings || '2.8M'} this quarter through optimized stock management and reduced waste.`;
      } else if (message.toLowerCase().includes('stores')) {
        const stores = await storage.getStores();
        response = `We currently monitor ${stores.length} stores across different regions. The highest demand is in our West Coast locations.`;
      }
      
      res.json({ response });
    } catch (error) {
      res.status(500).json({ message: "Failed to process chatbot request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
