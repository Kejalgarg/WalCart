import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  sku: text("sku").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  currentStock: integer("current_stock").notNull(),
  predictedDemand: integer("predicted_demand").notNull(),
  recommendedReorder: integer("recommended_reorder").notNull(),
  priority: text("priority").notNull(), // 'high', 'medium', 'low'
  daysUntilStockout: integer("days_until_stockout"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  storeId: text("store_id").notNull().unique(),
  name: text("name").notNull(),
  city: text("city").notNull(),
  region: text("region").notNull(),
  demandLevel: text("demand_level").notNull(), // 'low', 'medium', 'high', 'very_high'
  createdAt: timestamp("created_at").defaultNow(),
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'stockout', 'overstock', 'optimal'
  title: text("title").notNull(),
  message: text("message").notNull(),
  severity: text("severity").notNull(), // 'high', 'medium', 'low'
  productId: integer("product_id").references(() => products.id),
  storeId: integer("store_id").references(() => stores.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const forecasts = pgTable("forecasts", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  storeId: integer("store_id").references(() => stores.id),
  date: timestamp("date").notNull(),
  predictedDemand: integer("predicted_demand").notNull(),
  actualDemand: integer("actual_demand"),
  accuracy: decimal("accuracy", { precision: 5, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const metrics = pgTable("metrics", {
  id: serial("id").primaryKey(),
  totalProducts: integer("total_products").notNull(),
  totalStores: integer("total_stores").notNull(),
  costSavings: decimal("cost_savings", { precision: 12, scale: 2 }).notNull(),
  forecastAccuracy: decimal("forecast_accuracy", { precision: 5, scale: 2 }).notNull(),
  date: timestamp("date").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertStoreSchema = createInsertSchema(stores).omit({
  id: true,
  createdAt: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  createdAt: true,
});

export const insertForecastSchema = createInsertSchema(forecasts).omit({
  id: true,
  createdAt: true,
});

export const insertMetricSchema = createInsertSchema(metrics).omit({
  id: true,
  date: true,
});

export type Product = typeof products.$inferSelect;
export type Store = typeof stores.$inferSelect;
export type Alert = typeof alerts.$inferSelect;
export type Forecast = typeof forecasts.$inferSelect;
export type Metric = typeof metrics.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertStore = z.infer<typeof insertStoreSchema>;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type InsertForecast = z.infer<typeof insertForecastSchema>;
export type InsertMetric = z.infer<typeof insertMetricSchema>;
