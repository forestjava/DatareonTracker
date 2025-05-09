import { useState } from "react";
import { useFilteredLogs } from "@/hooks/use-incident-data";
import { cn } from "@/lib/utils";

export default function LogsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [logLevel, setLogLevel] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  const { data: filteredLogs, isLoading } = useFilteredLogs(logLevel, searchTerm);
  
  // Pagination
  const totalPages = Math.ceil((filteredLogs?.length || 0) / logsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle level filter
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLogLevel(e.target.value);
    setCurrentPage(1); // Reset to first page on new filter
  };

  // Pagination handlers
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">System Logs</h3>
          <div className="flex items-center space-x-3 animate-pulse">
            <div className="h-8 w-64 bg-slate-200 rounded"></div>
            <div className="h-8 w-32 bg-slate-200 rounded"></div>
            <div className="h-8 w-24 bg-slate-200 rounded"></div>
          </div>
        </div>
        
        <div className="bg-slate-800 text-slate-200 rounded-b-lg">
          <div className="p-4 h-72 overflow-y-auto animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-5 bg-slate-700 rounded w-full mb-2"></div>
            ))}
          </div>
          <div className="p-3 border-t border-slate-700 flex justify-between items-center">
            <div className="animate-pulse h-6 w-24 bg-slate-700 rounded"></div>
            <div className="animate-pulse h-6 w-32 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="mt-6 bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800">System Logs</h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="pl-8 pr-4 py-1 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary text-sm w-64"
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="ri-search-line absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
          </div>
          <select 
            className="text-sm bg-slate-100 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            value={logLevel}
            onChange={handleLevelChange}
          >
            <option value="all">All Levels</option>
            <option value="error">Error</option>
            <option value="warn">Warning</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
          <button className="bg-primary text-white rounded-md px-3 py-1 text-sm font-medium flex items-center">
            <i className="ri-download-2-line mr-1"></i> Export
          </button>
        </div>
      </div>
      
      <div className="bg-slate-800 rounded-b-lg">
        <div className="font-mono text-sm p-4 h-72 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            {paginatedLogs.length > 0 ? (
              paginatedLogs.map((log) => (
                <div key={log.id} className={getLogColorClass(log.level)}>
                  [{log.timestamp}] [{log.level.toUpperCase()}] [{log.service}] {log.message}
                </div>
              ))
            ) : (
              <div className="text-slate-400 text-center py-8">
                No logs match your current filters.
              </div>
            )}
          </div>
        </div>
        <div className="p-3 border-t border-slate-700 flex justify-between items-center text-sm">
          <div className="flex space-x-1">
            <button 
              className="px-3 py-1 rounded hover:bg-slate-700 text-slate-300"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(Math.min(3, totalPages))].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button 
                  key={pageNum}
                  className={cn(
                    "px-3 py-1 rounded",
                    currentPage === pageNum ? "bg-slate-700 text-white" : "hover:bg-slate-700 text-slate-300"
                  )}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button 
              className="px-3 py-1 rounded hover:bg-slate-700 text-slate-300"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <div className="text-slate-400">
            Showing {paginatedLogs.length} of {filteredLogs.length} log entries
          </div>
        </div>
      </div>
    </div>
  );
}
