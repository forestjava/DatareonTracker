import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  dashboardStats, 
  services, 
  incidents, 
  logs, 
  activities, 
  recentPackets, 
  chartData 
} from "../client/src/lib/data";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard routes
  app.get("/api/dashboard/stats", (req, res) => {
    res.json(dashboardStats);
  });

  app.get("/api/dashboard/metrics", (req, res) => {
    res.json(chartData);
  });

  // Service routes
  app.get("/api/services/status", (req, res) => {
    res.json(services);
  });

  // Incident routes
  app.get("/api/incidents", (req, res) => {
    res.json(incidents);
  });

  // Log routes
  app.get("/api/logs", (req, res) => {
    res.json(logs);
  });

  // Activity routes
  app.get("/api/activities/recent", (req, res) => {
    res.json(activities);
  });

  // Packet routes
  app.get("/api/packets/recent", (req, res) => {
    res.json(recentPackets);
  });

  app.post("/api/packets/resend", (req, res) => {
    const { id, service, priority, options } = req.body;
    
    // Validate request
    if (!id || !service) {
      return res.status(400).json({ message: "Packet ID and service are required" });
    }
    
    // In a real application, we would perform the actual packet resend operation here
    
    // Return success response
    res.status(200).json({ 
      success: true, 
      message: `Packet ${id} has been queued for resending to ${service} service`,
      data: { id, service, priority, options }
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
