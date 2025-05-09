import { useQuery } from "@tanstack/react-query";
import { 
  DashboardStat,
  Service,
  Activity,
  ChartDataPoint
} from "@/lib/types";
import { 
  dashboardStats, 
  services, 
  activities, 
  chartData
} from "@/lib/data";

export function useDashboardStats() {
  return useQuery<DashboardStat[]>({
    queryKey: ["/api/dashboard/stats"],
    initialData: dashboardStats
  });
}

export function useServicesStatus() {
  return useQuery<Service[]>({
    queryKey: ["/api/services/status"],
    initialData: services
  });
}

export function useRecentActivities() {
  return useQuery<Activity[]>({
    queryKey: ["/api/activities/recent"],
    initialData: activities
  });
}

export function useDataExchangeMetrics() {
  return useQuery<ChartDataPoint[]>({
    queryKey: ["/api/dashboard/metrics"],
    initialData: chartData
  });
}

// Calculate overall system status based on service statuses
export function useSystemStatus() {
  const { data: serviceData, isLoading } = useServicesStatus();
  
  if (isLoading || !serviceData) {
    return { status: "loading", percentage: 0 };
  }
  
  const total = serviceData.length;
  const operational = serviceData.filter(s => s.status === "operational").length;
  const outages = serviceData.filter(s => s.status === "outage").length;
  const degraded = serviceData.filter(s => s.status === "degraded").length;
  
  let status: "operational" | "partial_outage" | "major_outage" = "operational";
  
  if (outages > 0) {
    status = "major_outage";
  } else if (degraded > 0) {
    status = "partial_outage";
  }
  
  const percentage = Math.round((operational / total) * 100);
  
  return { status, percentage };
}
