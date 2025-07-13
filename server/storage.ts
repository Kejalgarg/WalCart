import { 
  products, stores, alerts, forecasts, metrics,
  type Product, type Store, type Alert, type Forecast, type Metric,
  type InsertProduct, type InsertStore, type InsertAlert, type InsertForecast, type InsertMetric
} from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  
  // Stores
  getStores(): Promise<Store[]>;
  getStore(id: number): Promise<Store | undefined>;
  createStore(store: InsertStore): Promise<Store>;
  
  // Alerts
  getAlerts(): Promise<Alert[]>;
  getActiveAlerts(): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  
  // Forecasts
  getForecasts(): Promise<Forecast[]>;
  getForecastsByProduct(productId: number): Promise<Forecast[]>;
  getForecastsByStore(storeId: number): Promise<Forecast[]>;
  createForecast(forecast: InsertForecast): Promise<Forecast>;
  
  // Metrics
  getLatestMetrics(): Promise<Metric | undefined>;
  createMetric(metric: InsertMetric): Promise<Metric>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product> = new Map();
  private stores: Map<number, Store> = new Map();
  private alerts: Map<number, Alert> = new Map();
  private forecasts: Map<number, Forecast> = new Map();
  private metrics: Map<number, Metric> = new Map();
  
  private currentProductId = 1;
  private currentStoreId = 1;
  private currentAlertId = 1;
  private currentForecastId = 1;
  private currentMetricId = 1;

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize mock products
    const mockProducts: InsertProduct[] = [
      {
        sku: "SKU-001847",
        name: "iPhone 15 Pro 256GB",
        category: "Electronics",
        currentStock: 23,
        predictedDemand: 45,
        recommendedReorder: 50,
        priority: "high",
        daysUntilStockout: 2,
      },
      {
        sku: "SKU-002193",
        name: "Samsung 65\" QLED TV",
        category: "Electronics",
        currentStock: 8,
        predictedDemand: 12,
        recommendedReorder: 15,
        priority: "medium",
        daysUntilStockout: 5,
      },
      {
        sku: "SKU-003456",
        name: "Nike Air Max 270",
        category: "Clothing",
        currentStock: 156,
        predictedDemand: 89,
        recommendedReorder: 100,
        priority: "low",
        daysUntilStockout: 14,
      },
      {
        sku: "SKU-004789",
        name: "Dyson V15 Vacuum",
        category: "Home & Garden",
        currentStock: 34,
        predictedDemand: 67,
        recommendedReorder: 75,
        priority: "high",
        daysUntilStockout: 3,
      },
    ];

    mockProducts.forEach(product => {
      this.products.set(this.currentProductId, { ...product, id: this.currentProductId, createdAt: new Date() });
      this.currentProductId++;
    });

    // Initialize mock stores
    const mockStores: InsertStore[] = [
      { storeId: "STORE-001", name: "WalCart NYC", city: "New York", region: "Northeast", demandLevel: "high" },
      { storeId: "STORE-002", name: "WalCart LA", city: "Los Angeles", region: "West", demandLevel: "very_high" },
      { storeId: "STORE-003", name: "WalCart Chicago", city: "Chicago", region: "Midwest", demandLevel: "medium" },
      { storeId: "STORE-004", name: "WalCart Houston", city: "Houston", region: "South", demandLevel: "high" },
      { storeId: "STORE-005", name: "WalCart Phoenix", city: "Phoenix", region: "West", demandLevel: "medium" },
      { storeId: "STORE-006", name: "WalCart Philadelphia", city: "Philadelphia", region: "Northeast", demandLevel: "medium" },
      { storeId: "STORE-007", name: "WalCart San Antonio", city: "San Antonio", region: "South", demandLevel: "medium" },
      { storeId: "STORE-008", name: "WalCart Dallas", city: "Dallas", region: "South", demandLevel: "high" },
    ];

    mockStores.forEach(store => {
      this.stores.set(this.currentStoreId, { ...store, id: this.currentStoreId, createdAt: new Date() });
      this.currentStoreId++;
    });

    // Initialize mock alerts
    const mockAlerts: InsertAlert[] = [
      {
        type: "stockout",
        title: "Stockout Alert",
        message: "iPhone 15 Pro expected stockout at Store #2847 in 2 days",
        severity: "high",
        productId: 1,
        storeId: 1,
        isActive: true,
      },
      {
        type: "overstock",
        title: "Overstock Warning",
        message: "Winter Jackets category showing 40% overstock in Northeast region",
        severity: "medium",
        productId: null,
        storeId: null,
        isActive: true,
      },
      {
        type: "optimal",
        title: "Optimal Stock Level",
        message: "Gaming Consoles maintaining perfect stock balance across all stores",
        severity: "low",
        productId: null,
        storeId: null,
        isActive: true,
      },
    ];

    mockAlerts.forEach(alert => {
      this.alerts.set(this.currentAlertId, { ...alert, id: this.currentAlertId, createdAt: new Date() });
      this.currentAlertId++;
    });

    // Initialize mock metrics
    const mockMetric: InsertMetric = {
      totalProducts: 15234,
      totalStores: 1847,
      costSavings: "2800000",
      forecastAccuracy: "94.2",
    };

    this.metrics.set(this.currentMetricId, { ...mockMetric, id: this.currentMetricId, date: new Date() });
    this.currentMetricId++;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: this.currentProductId++,
      createdAt: new Date(),
    };
    this.products.set(newProduct.id, newProduct);
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...product };
    this.products.set(id, updated);
    return updated;
  }

  // Stores
  async getStores(): Promise<Store[]> {
    return Array.from(this.stores.values());
  }

  async getStore(id: number): Promise<Store | undefined> {
    return this.stores.get(id);
  }

  async createStore(store: InsertStore): Promise<Store> {
    const newStore: Store = {
      ...store,
      id: this.currentStoreId++,
      createdAt: new Date(),
    };
    this.stores.set(newStore.id, newStore);
    return newStore;
  }

  // Alerts
  async getAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values());
  }

  async getActiveAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values()).filter(alert => alert.isActive);
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const newAlert: Alert = {
      ...alert,
      id: this.currentAlertId++,
      createdAt: new Date(),
    };
    this.alerts.set(newAlert.id, newAlert);
    return newAlert;
  }

  // Forecasts
  async getForecasts(): Promise<Forecast[]> {
    return Array.from(this.forecasts.values());
  }

  async getForecastsByProduct(productId: number): Promise<Forecast[]> {
    return Array.from(this.forecasts.values()).filter(forecast => forecast.productId === productId);
  }

  async getForecastsByStore(storeId: number): Promise<Forecast[]> {
    return Array.from(this.forecasts.values()).filter(forecast => forecast.storeId === storeId);
  }

  async createForecast(forecast: InsertForecast): Promise<Forecast> {
    const newForecast: Forecast = {
      ...forecast,
      id: this.currentForecastId++,
      createdAt: new Date(),
    };
    this.forecasts.set(newForecast.id, newForecast);
    return newForecast;
  }

  // Metrics
  async getLatestMetrics(): Promise<Metric | undefined> {
    const metrics = Array.from(this.metrics.values());
    return metrics.length > 0 ? metrics[metrics.length - 1] : undefined;
  }

  async createMetric(metric: InsertMetric): Promise<Metric> {
    const newMetric: Metric = {
      ...metric,
      id: this.currentMetricId++,
      date: new Date(),
    };
    this.metrics.set(newMetric.id, newMetric);
    return newMetric;
  }
}

export const storage = new MemStorage();
