import { useServicesStatus, useSystemStatus } from "@/hooks/use-dashboard-data";
import { StatusIndicator } from "@/components/ui/status-indicator";

export default function ServiceStatus() {
  const { data: services, isLoading } = useServicesStatus();
  const { status, percentage } = useSystemStatus();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-slate-800">Service Status</h3>
          <div className="h-5 w-16 bg-slate-200 rounded animate-pulse"></div>
        </div>
        
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded-md animate-pulse">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-slate-200 rounded-full mr-2"></div>
                <div className="h-5 w-32 bg-slate-200 rounded"></div>
              </div>
              <div className="h-4 w-20 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-3 pt-3 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <div className="h-5 w-24 bg-slate-200 rounded"></div>
            <div className="h-5 w-32 bg-slate-200 rounded"></div>
          </div>
          <div className="mt-2 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-200 rounded-full animate-pulse" style={{ width: "50%" }}></div>
          </div>
        </div>
      </div>
    );
  }

  const statusLabel = status === "operational" 
    ? "Operational" 
    : status === "partial_outage" 
      ? "Partial Outage" 
      : "Major Outage";

  const statusColor = status === "operational" 
    ? "bg-success" 
    : status === "partial_outage" 
      ? "bg-warning" 
      : "bg-destructive";

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-slate-800">Service Status</h3>
        <button className="text-xs text-slate-500 hover:text-primary">
          <i className="ri-refresh-line"></i> Refresh
        </button>
      </div>
      
      <div className="space-y-3">
        {services?.map((service) => {
          const statusColor = 
            service.status === "operational" ? "success" :
            service.status === "degraded" ? "warning" : "danger";
          
          const statusLabel = 
            service.status === "operational" ? "Operational" :
            service.status === "degraded" ? "Degraded" : "Outage";
          
          const statusTextColor = 
            service.status === "operational" ? "text-success" :
            service.status === "degraded" ? "text-warning" : "text-destructive";
          
          return (
            <div key={service.id} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded-md">
              <div className="flex items-center">
                <StatusIndicator status={statusColor} />
                <span className="text-sm">{service.name}</span>
              </div>
              <span className={`text-xs ${statusTextColor}`}>{statusLabel}</span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-3 pt-3 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium">Overall Status</span>
          </div>
          <div className="text-sm font-medium text-warning">{statusLabel}</div>
        </div>
        <div className="mt-2 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full ${statusColor} rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    </div>
  );
}
