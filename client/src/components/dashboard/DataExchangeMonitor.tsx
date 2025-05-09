import { useState, useRef, useEffect } from "react";
import { useDataExchangeMetrics } from "@/hooks/use-dashboard-data";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

type TimeRange = "today" | "week" | "month";

export default function DataExchangeMonitor() {
  const [timeRange, setTimeRange] = useState<TimeRange>("today");
  const { data: chartData, isLoading } = useDataExchangeMetrics();
  
  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
    // In a real application, we would call a different API endpoint or pass a parameter
    // to get data for the selected time range
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-slate-800">Data Exchange Monitor</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs font-medium rounded bg-slate-200 animate-pulse">&nbsp;</button>
            <button className="px-3 py-1 text-xs font-medium rounded bg-slate-200 animate-pulse">&nbsp;</button>
            <button className="px-3 py-1 text-xs font-medium rounded bg-slate-200 animate-pulse">&nbsp;</button>
          </div>
        </div>
        
        <div className="h-60 bg-slate-100 rounded-md animate-pulse"></div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center p-2 rounded-md bg-slate-100 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto mb-2"></div>
              <div className="h-6 bg-slate-200 rounded w-1/3 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const summaryData = {
    sent: chartData?.reduce((sum, item) => sum + item.sent, 0).toLocaleString() || "0",
    received: chartData?.reduce((sum, item) => sum + item.received, 0).toLocaleString() || "0",
    pending: "856", // This would come from the API in a real application
    failed: chartData?.reduce((sum, item) => sum + item.failed, 0).toLocaleString() || "0",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-slate-800">Data Exchange Monitor</h3>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-xs font-medium rounded ${
              timeRange === "today" ? "bg-slate-100 hover:bg-slate-200 text-slate-600" : "text-slate-600 hover:bg-slate-100"
            }`}
            onClick={() => handleTimeRangeChange("today")}
          >
            Today
          </button>
          <button 
            className={`px-3 py-1 text-xs font-medium rounded ${
              timeRange === "week" ? "bg-slate-100 hover:bg-slate-200 text-slate-600" : "text-slate-600 hover:bg-slate-100"
            }`}
            onClick={() => handleTimeRangeChange("week")}
          >
            Week
          </button>
          <button 
            className={`px-3 py-1 text-xs font-medium rounded ${
              timeRange === "month" ? "bg-slate-100 hover:bg-slate-200 text-slate-600" : "text-slate-600 hover:bg-slate-100"
            }`}
            onClick={() => handleTimeRangeChange("month")}
          >
            Month
          </button>
        </div>
      </div>
      
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="sent" 
              stroke="#3b82f6" 
              strokeWidth={2}
              activeDot={{ r: 8 }} 
              dot={{ r: 2 }}
              name="Sent" 
            />
            <Line 
              type="monotone" 
              dataKey="received" 
              stroke="#22c55e" 
              strokeWidth={2}
              dot={{ r: 2 }}
              name="Received" 
            />
            <Line 
              type="monotone" 
              dataKey="failed" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={{ r: 2 }}
              name="Failed" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="text-center p-2 rounded-md bg-blue-50">
          <p className="text-xs text-slate-500">Sent</p>
          <p className="text-lg font-semibold text-primary">{summaryData.sent}</p>
        </div>
        <div className="text-center p-2 rounded-md bg-green-50">
          <p className="text-xs text-slate-500">Received</p>
          <p className="text-lg font-semibold text-success">{summaryData.received}</p>
        </div>
        <div className="text-center p-2 rounded-md bg-amber-50">
          <p className="text-xs text-slate-500">Pending</p>
          <p className="text-lg font-semibold text-warning">{summaryData.pending}</p>
        </div>
        <div className="text-center p-2 rounded-md bg-red-50">
          <p className="text-xs text-slate-500">Failed</p>
          <p className="text-lg font-semibold text-destructive">{summaryData.failed}</p>
        </div>
      </div>
    </div>
  );
}
