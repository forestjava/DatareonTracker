// Service Status Types
export type ServiceStatus = "operational" | "degraded" | "outage" | "maintenance";

export interface Service {
  id: string;
  name: string;
  status: ServiceStatus;
}

// Dashboard Stats Types
export interface DashboardStat {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeText: string;
  icon: string;
  color: "primary" | "success" | "warning" | "danger" | "secondary";
}

// Incident Types
export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "monitoring";
  startTime: string;
  duration: string;
  status: "open" | "investigating" | "resolved";
}

// Log Types
export type LogLevel = "error" | "warn" | "info" | "debug";

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
}

// Activity Types
export interface Activity {
  id: string;
  title: string;
  timestamp: string;
  user: string;
  icon: string;
  iconColor: "primary" | "success" | "warning" | "danger" | "secondary" | "muted";
}

// Packet Types
export interface Packet {
  id: string;
  timestamp: string;
  status: "success" | "failed" | "pending";
}

// Chart Data Types
export interface ChartDataPoint {
  label: string;
  sent: number;
  received: number;
  failed: number;
}
