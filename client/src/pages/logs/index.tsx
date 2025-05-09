import { useState, useEffect } from "react";
import { useFilteredLogs } from "@/hooks/use-incident-data";
import { Helmet } from "react-helmet";
import { cn } from "@/lib/utils";

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [logLevel, setLogLevel] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [serviceFilter, setServiceFilter] = useState("");
  const [timeRange, setTimeRange] = useState("24h");
  const logsPerPage = 15;

  const { data: filteredLogs, isLoading } = useFilteredLogs(logLevel, searchTerm);
  
  // Apply service filter
  const serviceFilteredLogs = serviceFilter 
    ? filteredLogs.filter(log => log.service.toLowerCase().includes(serviceFilter.toLowerCase()))
    : filteredLogs;
  
  // Pagination
  const totalPages = Math.ceil((serviceFilteredLogs?.length || 0) / logsPerPage);
  const paginatedLogs = serviceFilteredLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, logLevel, serviceFilter, timeRange]);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Get unique services for filtering
  const services = [...new Set(filteredLogs.map(log => log.service))].sort();

  const getLogColorClass = (level: string) => {
    switch(level) {
      case "error": return "text-red-400";
      case "warn": return "text-yellow-400";
      case "info": return "text-blue-400";
      case "debug": return "text-green-400";
      default: return "text-slate-300";
    }
  };

  return (
    <>
      <Helmet>
        <title>System Logs | Datareon Bus Monitoring</title>
        <meta name="description" content="Browse and search system logs, filter by severity and service, and export log data for analysis." />
      </Helmet>
      
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">System Logs</h2>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search logs by message or service..." 
                  className="pl-8 pr-4 py-2 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary text-sm w-full"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <i className="ri-search-line absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
              </div>
            </div>
            
            <div className="flex gap-3">
              <select 
                className="text-sm bg-slate-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={logLevel}
                onChange={(e) => setLogLevel(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="error">Error</option>
                <option value="warn">Warning</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
              
              <select 
                className="text-sm bg-slate-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
              >
                <option value="">All Services</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
              
              <select 
                className="text-sm bg-slate-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="1h">Last Hour</option>
                <option value="6h">Last 6 Hours</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              
              <button className="bg-primary text-white rounded-md px-4 py-2 text-sm font-medium flex items-center whitespace-nowrap">
                <i className="ri-download-2-line mr-1"></i> Export Logs
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-b-lg">
          {isLoading ? (
            <div className="font-mono text-sm p-4 h-[calc(100vh-300px)] overflow-y-auto animate-pulse">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-5 bg-slate-700 rounded w-full mb-2"></div>
              ))}
            </div>
          ) : (
            <div className="font-mono text-sm p-4 h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
              {paginatedLogs.length > 0 ? (
                <div className="space-y-1">
                  {paginatedLogs.map((log) => (
                    <div key={log.id} className={getLogColorClass(log.level)}>
                      [{log.timestamp}] [{log.level.toUpperCase()}] [{log.service}] {log.message}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <i className="ri-file-search-line text-4xl mb-2"></i>
                  <p>No logs match your current filters</p>
                  <button 
                    className="mt-2 text-primary hover:underline"
                    onClick={() => {
                      setSearchTerm("");
                      setLogLevel("all");
                      setServiceFilter("");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          )}
          
          {paginatedLogs.length > 0 && (
            <div className="p-3 border-t border-slate-700 flex justify-between items-center text-sm">
              <div className="flex space-x-1">
                <button 
                  className="px-3 py-1 rounded hover:bg-slate-700 text-slate-300"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {totalPages <= 5 ? (
                  [...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button 
                        key={pageNum}
                        className={cn(
                          "px-3 py-1 rounded",
                          currentPage === pageNum ? "bg-slate-700 text-white" : "hover:bg-slate-700 text-slate-300"
                        )}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })
                ) : (
                  <>
                    {[...Array(3)].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button 
                          key={pageNum}
                          className={cn(
                            "px-3 py-1 rounded",
                            currentPage === pageNum ? "bg-slate-700 text-white" : "hover:bg-slate-700 text-slate-300"
                          )}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {currentPage > 3 && currentPage < totalPages - 2 && (
                      <span className="px-3 py-1 text-slate-300">...</span>
                    )}
                    {currentPage > 3 && (
                      <button 
                        className={cn(
                          "px-3 py-1 rounded",
                          "bg-slate-700 text-white"
                        )}
                      >
                        {currentPage}
                      </button>
                    )}
                    {currentPage < totalPages - 2 && (
                      <span className="px-3 py-1 text-slate-300">...</span>
                    )}
                    <button 
                      className={cn(
                        "px-3 py-1 rounded",
                        currentPage === totalPages ? "bg-slate-700 text-white" : "hover:bg-slate-700 text-slate-300"
                      )}
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                <button 
                  className="px-3 py-1 rounded hover:bg-slate-700 text-slate-300"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
              <div className="text-slate-400">
                Showing {paginatedLogs.length} of {serviceFilteredLogs.length} log entries
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
