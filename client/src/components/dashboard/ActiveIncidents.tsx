import { useIncidents } from "@/hooks/use-incident-data";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Link } from "wouter";

export default function ActiveIncidents() {
  const { data: incidents, isLoading } = useIncidents();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-slate-800">Active Incidents</h3>
          <div className="h-5 w-20 bg-slate-200 rounded animate-pulse"></div>
        </div>
        
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-3 border border-slate-200 rounded-md bg-slate-50 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="w-3/4">
                  <div className="h-5 bg-slate-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                </div>
                <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="h-4 w-24 bg-slate-200 rounded"></div>
                <div className="h-4 w-16 bg-slate-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-slate-800">Active Incidents</h3>
        <Link href="/incidents" className="text-primary text-sm font-medium flex items-center">
          View All <i className="ri-arrow-right-s-line ml-1"></i>
        </Link>
      </div>
      
      <div className="space-y-3">
        {incidents?.map((incident) => {
          const severityColor = 
            incident.severity === "critical" ? "danger" :
            incident.severity === "warning" ? "warning" : "neutral";
          
          const severityLabel = 
            incident.severity === "critical" ? "Critical" :
            incident.severity === "warning" ? "Warning" : "Monitoring";
          
          const severityBgColor = 
            incident.severity === "critical" ? "bg-red-50 border-red-200" :
            incident.severity === "warning" ? "bg-amber-50 border-amber-200" : 
            "bg-slate-50 border-slate-200";
          
          const severityBadgeColor = 
            incident.severity === "critical" ? "bg-red-100 text-destructive" :
            incident.severity === "warning" ? "bg-amber-100 text-warning" : 
            "bg-slate-200 text-slate-700";
          
          return (
            <div key={incident.id} className={`p-3 border rounded-md ${severityBgColor}`}>
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <StatusIndicator status={severityColor} className="mt-1" />
                  <div>
                    <h4 className="font-medium text-slate-800">{incident.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{incident.description}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${severityBadgeColor}`}>
                  {severityLabel}
                </span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="text-xs text-slate-500">
                  <span>Started: <span className="font-medium">{incident.startTime}</span></span>
                  <span className="ml-4">Duration: <span className="font-medium">{incident.duration}</span></span>
                </div>
                <button className="text-sm font-medium text-primary">Investigate</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
