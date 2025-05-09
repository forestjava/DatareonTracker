import { useDashboardStats } from "@/hooks/use-dashboard-data";

export default function StatusOverview() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats?.map((stat) => (
        <div key={stat.id} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
            </div>
            <div 
              className={`p-2 rounded-md ${
                stat.color === "primary" ? "bg-blue-100 text-primary" :
                stat.color === "danger" ? "bg-red-100 text-destructive" :
                stat.color === "success" ? "bg-green-100 text-success" :
                stat.color === "warning" ? "bg-amber-100 text-warning" :
                "bg-indigo-100 text-secondary"
              }`}
            >
              <i className={`${stat.icon} text-xl`}></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span 
              className={`text-sm font-medium flex items-center ${
                stat.change > 0 
                  ? stat.color === "danger" ? "text-destructive" : "text-success" 
                  : stat.color === "success" ? "text-destructive" : "text-warning"
              }`}
            >
              <i className={`${stat.change > 0 ? "ri-arrow-up-line" : "ri-arrow-down-line"} mr-1`}></i>
              {Math.abs(stat.change)}%
            </span>
            <span className="text-xs text-slate-500 ml-2">{stat.changeText}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
