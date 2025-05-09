import { useState } from "react";
import { useIncidents } from "@/hooks/use-incident-data";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Helmet } from "react-helmet";

export default function Incidents() {
  const { data: incidents, isLoading } = useIncidents();
  const [filter, setFilter] = useState("all");

  const filteredIncidents = incidents?.filter(incident => {
    if (filter === "all") return true;
    return incident.severity === filter;
  }) || [];

  return (
    <>
      <Helmet>
        <title>Incidents | Datareon Bus Monitoring</title>
        <meta name="description" content="View and manage system incidents, track issues, and monitor resolution progress in real-time." />
      </Helmet>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-800">System Incidents</h2>
          <div className="flex space-x-2 mt-2 md:mt-0">
            <button 
              className={`px-3 py-1 text-sm font-medium rounded ${filter === 'all' ? 'bg-slate-200 text-slate-800' : 'bg-white text-slate-600'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 text-sm font-medium rounded ${filter === 'critical' ? 'bg-red-100 text-destructive' : 'bg-white text-slate-600'}`}
              onClick={() => setFilter('critical')}
            >
              Critical
            </button>
            <button 
              className={`px-3 py-1 text-sm font-medium rounded ${filter === 'warning' ? 'bg-amber-100 text-warning' : 'bg-white text-slate-600'}`}
              onClick={() => setFilter('warning')}
            >
              Warning
            </button>
            <button 
              className={`px-3 py-1 text-sm font-medium rounded ${filter === 'monitoring' ? 'bg-slate-100 text-slate-800' : 'bg-white text-slate-600'}`}
              onClick={() => setFilter('monitoring')}
            >
              Monitoring
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 border border-slate-200 rounded-md animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredIncidents.length > 0 ? (
              <div className="space-y-4">
                {filteredIncidents.map((incident) => {
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
                    <div key={incident.id} className={`p-4 border rounded-md ${severityBgColor}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <StatusIndicator status={severityColor} className="mt-1" />
                          <div>
                            <h3 className="font-medium text-slate-800 text-lg">{incident.title}</h3>
                            <p className="text-sm text-slate-600 mt-1">{incident.description}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${severityBadgeColor}`}>
                          {severityLabel}
                        </span>
                      </div>
                      
                      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="text-sm text-slate-500 space-y-1 sm:space-y-0">
                          <span className="block sm:inline">Started: <span className="font-medium">{incident.startTime}</span></span>
                          <span className="block sm:inline sm:ml-4">Duration: <span className="font-medium">{incident.duration}</span></span>
                          <span className="block sm:inline sm:ml-4">Status: <span className="font-medium capitalize">{incident.status}</span></span>
                        </div>
                        <div className="mt-3 sm:mt-0 flex space-x-2">
                          <button className="text-sm font-medium px-3 py-1 bg-white border border-slate-300 rounded-md text-slate-700">
                            Details
                          </button>
                          <button className="text-sm font-medium px-3 py-1 bg-primary text-white rounded-md">
                            Investigate
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <i className="ri-checkbox-circle-line text-3xl text-success"></i>
                </div>
                <h3 className="text-lg font-medium text-slate-900">No incidents found</h3>
                <p className="mt-2 text-slate-500">
                  {filter !== 'all' 
                    ? `There are currently no ${filter} incidents.` 
                    : 'All systems are operating normally.'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
