import { 
  Service, 
  DashboardStat, 
  Incident, 
  LogEntry, 
  Activity, 
  Packet, 
  ChartDataPoint 
} from "@/lib/types";

// Dashboard Stats
export const dashboardStats: DashboardStat[] = [
  {
    id: "total-messages",
    title: "Total Messages",
    value: "247,892",
    change: 12.5,
    changeText: "vs last period",
    icon: "ri-mail-line",
    color: "primary"
  },
  {
    id: "error-rate",
    title: "Error Rate",
    value: "0.24%",
    change: -3.2,
    changeText: "vs last period",
    icon: "ri-error-warning-line",
    color: "danger"
  },
  {
    id: "active-services",
    title: "Active Services",
    value: "18/20",
    change: -2,
    changeText: "services down",
    icon: "ri-service-line",
    color: "success"
  },
  {
    id: "response-time",
    title: "Avg. Response Time",
    value: "128ms",
    change: 4.7,
    changeText: "vs last period",
    icon: "ri-time-line",
    color: "secondary"
  }
];

// Services
export const services: Service[] = [
  { id: "1", name: "Order Service", status: "operational" },
  { id: "2", name: "Customer Service", status: "operational" },
  { id: "3", name: "Payment Service", status: "outage" },
  { id: "4", name: "Product Service", status: "operational" },
  { id: "5", name: "Inventory Service", status: "degraded" },
  { id: "6", name: "Notification Service", status: "operational" }
];

// Incidents
export const incidents: Incident[] = [
  {
    id: "1",
    title: "Payment Service Connection Failure",
    description: "Connection to payment service interrupted. Retry attempts failing.",
    severity: "critical",
    startTime: "Today, 09:32 AM",
    duration: "1h 28m",
    status: "open"
  },
  {
    id: "2",
    title: "Inventory Data Synchronization Delay",
    description: "Inventory updates are delayed by approximately 5 minutes.",
    severity: "warning",
    startTime: "Today, 10:15 AM",
    duration: "45m",
    status: "investigating"
  },
  {
    id: "3",
    title: "Analytics Service High CPU Usage",
    description: "CPU utilization above 85% for more than 15 minutes.",
    severity: "monitoring",
    startTime: "Today, 11:02 AM",
    duration: "5m",
    status: "investigating"
  }
];

// Logs
export const logs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2023-07-21 11:03:12",
    level: "error",
    service: "PaymentService",
    message: "Failed to establish connection to payment gateway. Connection timeout after 30s. Retry attempt 3 of 5."
  },
  {
    id: "2",
    timestamp: "2023-07-21 11:02:42",
    level: "error",
    service: "PaymentService",
    message: "Failed to establish connection to payment gateway. Connection timeout after 30s. Retry attempt 2 of 5."
  },
  {
    id: "3",
    timestamp: "2023-07-21 11:02:12",
    level: "error",
    service: "PaymentService",
    message: "Failed to establish connection to payment gateway. Connection timeout after 30s. Retry attempt 1 of 5."
  },
  {
    id: "4",
    timestamp: "2023-07-21 11:01:42",
    level: "warn",
    service: "PaymentService",
    message: "Connection to payment gateway is taking longer than expected (25s)."
  },
  {
    id: "5",
    timestamp: "2023-07-21 10:55:18",
    level: "warn",
    service: "InventoryService",
    message: "Data synchronization delayed. Current lag: 5m 12s."
  },
  {
    id: "6",
    timestamp: "2023-07-21 10:52:36",
    level: "info",
    service: "OrderService",
    message: "Processed 150 orders in the last 5 minutes. Average processing time: 235ms."
  },
  {
    id: "7",
    timestamp: "2023-07-21 10:45:12",
    level: "debug",
    service: "SystemMonitor",
    message: "Memory usage at 62%, CPU at 48%."
  },
  {
    id: "8",
    timestamp: "2023-07-21 10:43:05",
    level: "info",
    service: "CustomerService",
    message: "Customer data update batch #45281 completed successfully. 423 records processed."
  },
  {
    id: "9",
    timestamp: "2023-07-21 10:38:17",
    level: "info",
    service: "NotificationService",
    message: "Sent 56 email notifications and 78 push notifications in the last 10 minutes."
  },
  {
    id: "10",
    timestamp: "2023-07-21 10:36:22",
    level: "debug",
    service: "DatabaseService",
    message: "Connection pool statistics: active=12, idle=8, waiting=0."
  },
  {
    id: "11",
    timestamp: "2023-07-21 10:35:14",
    level: "debug",
    service: "ApiGateway",
    message: "Request rate: 42.3 req/s, average response time: 128ms."
  },
  {
    id: "12",
    timestamp: "2023-07-21 10:30:00",
    level: "info",
    service: "SchedulerService",
    message: "Started daily maintenance tasks."
  },
  {
    id: "13",
    timestamp: "2023-07-21 10:25:33",
    level: "warn",
    service: "ProductService",
    message: "Slow query detected. Query ID: 8932, execution time: 1243ms."
  },
  {
    id: "14",
    timestamp: "2023-07-21 10:20:15",
    level: "info",
    service: "AuthService",
    message: "134 new user sessions created in the last hour."
  }
];

// Activities
export const activities: Activity[] = [
  {
    id: "1",
    title: "Payment Service Restart Attempted",
    timestamp: "12 minutes ago",
    user: "Admin User",
    icon: "ri-restart-line",
    iconColor: "primary"
  },
  {
    id: "2",
    title: "Critical Alert: Connection Failure",
    timestamp: "1 hour ago",
    user: "System",
    icon: "ri-error-warning-line",
    iconColor: "danger"
  },
  {
    id: "3",
    title: "Order Service Recovered",
    timestamp: "3 hours ago",
    user: "System",
    icon: "ri-check-line",
    iconColor: "success"
  },
  {
    id: "4",
    title: "System Configuration Updated",
    timestamp: "Yesterday",
    user: "Admin User",
    icon: "ri-settings-line",
    iconColor: "muted"
  }
];

// Recent Packets
export const recentPackets: Packet[] = [
  { id: "PKT-8294", timestamp: "Today, 10:45 AM", status: "success" },
  { id: "PKT-8293", timestamp: "Today, 10:32 AM", status: "success" },
  { id: "PKT-8292", timestamp: "Today, 10:28 AM", status: "failed" },
  { id: "PKT-8291", timestamp: "Today, 09:53 AM", status: "success" }
];

// Chart Data
export const chartData: ChartDataPoint[] = [
  { label: "00:00", sent: 1200, received: 1150, failed: 50 },
  { label: "03:00", sent: 1900, received: 1850, failed: 70 },
  { label: "06:00", sent: 3000, received: 2950, failed: 120 },
  { label: "09:00", sent: 5400, received: 5300, failed: 180 },
  { label: "12:00", sent: 8200, received: 8000, failed: 210 },
  { label: "15:00", sent: 12500, received: 12300, failed: 250 },
  { label: "18:00", sent: 14200, received: 14000, failed: 200 },
  { label: "21:00", sent: 15600, received: 15400, failed: 180 }
];
