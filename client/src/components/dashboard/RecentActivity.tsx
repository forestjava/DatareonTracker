import { useRecentActivities } from "@/hooks/use-dashboard-data";
import { Link } from "wouter";

export default function RecentActivity() {
  const { data: activities, isLoading } = useRecentActivities();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-slate-800">Recent Activity</h3>
          <div className="h-5 w-16 bg-slate-200 rounded animate-pulse"></div>
        </div>
        
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start animate-pulse">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0"></div>
              <div className="ml-3">
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-1"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
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
        <h3 className="font-semibold text-slate-800">Recent Activity</h3>
        <Link href="/logs" className="text-primary text-sm font-medium flex items-center">
          View All <i className="ri-arrow-right-s-line ml-1"></i>
        </Link>
      </div>
      
      <div className="space-y-3">
        {activities?.map((activity) => {
          const iconBgColor = 
            activity.iconColor === "primary" ? "bg-blue-100 text-primary" :
            activity.iconColor === "success" ? "bg-green-100 text-success" :
            activity.iconColor === "warning" ? "bg-amber-100 text-warning" :
            activity.iconColor === "danger" ? "bg-red-100 text-destructive" :
            "bg-slate-100 text-slate-600";
          
          return (
            <div key={activity.id} className="flex items-start">
              <div className={`w-8 h-8 rounded-full ${iconBgColor} flex items-center justify-center flex-shrink-0`}>
                <i className={activity.icon}></i>
              </div>
              <div className="ml-3">
                <p className="text-sm text-slate-800">{activity.title}</p>
                <p className="text-xs text-slate-500">{activity.timestamp} · {activity.user}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
